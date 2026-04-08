// Solar Panel Assessment utilities

export interface RoofGeometryData {
  usableRoofArea: number; // sq meters
  shadeFactor: number; // 0-1, where 1 = no shade
  obstaclePercentage: number; // percentage of roof with obstacles
  bestOrientation: string; // "North", "South", "East", "West"
  tiltAngle: number; // degrees
  confidence: number; // 0-1, confidence in estimate
}

// Mock RoofGeometryAI API - simulates satellite/image-based roof area detection
export const mockRoofGeometryAI = async (
  address: string,
  latitude?: number,
  longitude?: number,
): Promise<RoofGeometryData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate realistic data based on address/coordinates
  // In production, this would call an actual API like Google Roofs API or similar
  const baseArea = 80 + Math.random() * 200; // 80-280 sq meters
  const shadeFactor = 0.7 + Math.random() * 0.3; // 70-100%
  const obstaclePercentage = 5 + Math.random() * 25; // 5-30%

  // Determine best orientation based on hemisphere/coordinates
  let bestOrientation = "South";
  if (latitude && latitude < -20) {
    bestOrientation = "North"; // Southern hemisphere
  }

  // Tilt angle varies by latitude (approximately equal to latitude for optimal solar gain)
  const tiltAngle = latitude ? Math.abs(Math.round(latitude)) : 28;

  return {
    usableRoofArea: Math.round(baseArea * (1 - obstaclePercentage / 100)),
    shadeFactor,
    obstaclePercentage,
    bestOrientation,
    tiltAngle: Math.max(10, Math.min(60, tiltAngle)),
    confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
  };
};

export interface SolarAssessmentResults {
  roofGeometry: RoofGeometryData;
  installableCapacity: number; // kWp
  panelCount: number;
  panelSize: number; // watts per panel
  estimatedCost: number; // INR
  costPerWatt: number; // INR/Watt
  dailyGeneration: number; // kWh
  annualGeneration: number; // kWh
  annualSavings: number; // INR
  paybackPeriodYears: number;
  roiPercentage: number; // 30 years ROI
  co2Reduction: number; // tonnes per year
  systemSize: string; // Small/Medium/Large
  warranty: string;
  subsidyEligibility: boolean;
  performanceRatio: number; // 0-1, system efficiency
}

export interface SolarMetrics {
  solarIrradiance: number; // kWh/sq.m/day average (location-dependent)
  systemEfficiency: number; // 0-1 (accounting for inverter losses, temperature, etc)
  peakSunHours: number; // equivalent full-power hours per day
}

// Get solar metrics based on location
export const getSolarMetricsForLocation = (
  latitude: number,
  state: string,
): SolarMetrics => {
  // India-specific solar irradiance values based on regions
  let solarIrradiance = 4.5; // kWh/sq.m/day average for India
  let peakSunHours = 5.0;

  // Adjust based on latitude
  if (Math.abs(latitude) <= 15) {
    // Near equator - highest solar potential
    solarIrradiance = 5.0;
    peakSunHours = 5.5;
  } else if (Math.abs(latitude) <= 25) {
    // Tropical zone
    solarIrradiance = 4.8;
    peakSunHours = 5.3;
  } else if (Math.abs(latitude) <= 35) {
    // Subtropical zone
    solarIrradiance = 4.3;
    peakSunHours = 4.8;
  } else {
    // Higher latitudes
    solarIrradiance = 3.8;
    peakSunHours = 4.2;
  }

  // Adjust for seasonal variation in India
  // Most of India receives good sunshine year-round
  const stateAdjustments: Record<string, number> = {
    "Rajasthan": 1.15,
    "Gujarat": 1.12,
    "Maharashtra": 1.05,
    "Karnataka": 1.08,
    "Telangana": 1.1,
    "Andhra Pradesh": 1.09,
    "Tamil Nadu": 1.08,
    "Madhya Pradesh": 1.1,
    "Uttar Pradesh": 0.98,
    "Delhi": 0.99,
    "Punjab": 0.95,
    "Himachal Pradesh": 0.85,
    "Assam": 0.88,
    "Kerala": 0.92,
    "West Bengal": 0.9,
  };

  const multiplier = stateAdjustments[state] || 1.0;
  solarIrradiance *= multiplier;
  peakSunHours *= (multiplier * 0.9 + 0.1); // Less variance for peak sun hours

  // System efficiency accounts for:
  // - Inverter efficiency: ~97%
  // - Temperature losses: ~95%
  // - Soiling: ~95%
  // - Wiring losses: ~98%
  // Total: approximately 84-86%
  const systemEfficiency = 0.85;

  return {
    solarIrradiance: Math.round(solarIrradiance * 100) / 100,
    systemEfficiency,
    peakSunHours: Math.round(peakSunHours * 100) / 100,
  };
};

// Calculate solar assessment results
export const calculateSolarAssessment = (
  roofGeometry: RoofGeometryData,
  latitude: number,
  state: string,
  userPreferences?: {
    budgetConstraint?: number; // INR
    targetCapacity?: number; // kWp
  },
): SolarAssessmentResults => {
  const solarMetrics = getSolarMetricsForLocation(latitude, state);

  // Standard solar panel specifications
  const standardPanelWattage = 385; // watts (typical modern panel)
  const costPerWatt = 45; // INR per watt (approximate for 2024 in India)

  // Calculate usable roof area (considering orientation and shade)
  const effectiveRoofArea =
    roofGeometry.usableRoofArea * roofGeometry.shadeFactor;

  // Space required per kW: approximately 60-70 sq.m per kW
  const spacePerKw = 65; // sq.m per kW
  const maxCapacityFromSpace = effectiveRoofArea / spacePerKw;

  // Typical residential constraints
  let targetCapacity = userPreferences?.targetCapacity || Math.min(maxCapacityFromSpace, 10);
  targetCapacity = Math.max(3, Math.min(targetCapacity, maxCapacityFromSpace));

  // Calculate number of panels and actual capacity
  const panelCount = Math.ceil((targetCapacity * 1000) / standardPanelWattage);
  const actualCapacity = (panelCount * standardPanelWattage) / 1000; // kWp

  // Cost calculation
  const totalSystemCost = actualCapacity * 1000 * costPerWatt;
  const estimatedCost = Math.round(totalSystemCost);

  // Energy generation
  // Daily generation = Capacity (kW) × Peak Sun Hours × System Efficiency
  const dailyGeneration =
    actualCapacity * solarMetrics.peakSunHours * solarMetrics.systemEfficiency;
  const annualGeneration = dailyGeneration * 365;

  // Savings calculation (based on average electricity rate)
  const electricityRate = 7; // INR per kWh (varies by state, average for 2024)
  const annualSavings = Math.round(annualGeneration * electricityRate);

  // Payback period
  const paybackPeriodYears = Math.round(estimatedCost / annualSavings);

  // ROI over 30 years (typical solar panel lifetime)
  const totalSavingsIn30Years = annualSavings * 30;
  const roiPercentage = ((totalSavingsIn30Years - estimatedCost) / estimatedCost) * 100;

  // CO2 reduction (1 kWh = ~0.73 kg CO2 equivalent in India)
  const co2PerKwh = 0.73;
  const co2Reduction = (annualGeneration * co2PerKwh) / 1000; // tonnes per year

  // Determine system size category
  let systemSize = "Small";
  if (actualCapacity >= 5 && actualCapacity < 10) systemSize = "Medium";
  if (actualCapacity >= 10) systemSize = "Large";

  // Warranty (typical for quality panels)
  const warranty = "25 years product + 5 years installation";

  // Subsidy eligibility (India has various subsidy schemes)
  const subsidyEligible =
    actualCapacity >= 1 && actualCapacity <= 10; // Residential subsidy schemes

  return {
    roofGeometry,
    installableCapacity: Math.round(actualCapacity * 100) / 100,
    panelCount,
    panelSize: standardPanelWattage,
    estimatedCost,
    costPerWatt,
    dailyGeneration: Math.round(dailyGeneration * 100) / 100,
    annualGeneration: Math.round(annualGeneration),
    annualSavings,
    paybackPeriodYears,
    roiPercentage: Math.round(roiPercentage),
    co2Reduction: Math.round(co2Reduction * 100) / 100,
    systemSize,
    warranty,
    subsidyEligibility: subsidyEligible,
    performanceRatio: solarMetrics.systemEfficiency,
  };
};

// Get suitable solar panel recommendations
export const getPanelRecommendations = (capacity: number) => {
  const recommendations = [];

  if (capacity <= 3) {
    recommendations.push({
      type: "Residential Starter",
      description: "Perfect for small homes or offices",
      features: [
        "3-5 kWp capacity",
        "Essential for backup power",
        "Cost-effective for small families",
        "Minimal maintenance required",
      ],
    });
  } else if (capacity <= 7) {
    recommendations.push({
      type: "Residential Standard",
      description: "Most popular choice for Indian households",
      features: [
        "5-7 kWp capacity",
        "Covers 70-90% of daily consumption",
        "Ideal for medium-sized homes",
        "Eligible for most state subsidies",
      ],
    });
  } else {
    recommendations.push({
      type: "Residential Premium",
      description: "For energy-independent living",
      features: [
        "7-10+ kWp capacity",
        "Potential for net-zero energy",
        "Supports EV charging",
        "Maximum government incentives",
      ],
    });
  }

  return recommendations;
};

// Generate monthly generation profile
export const getMonthlyGenerationProfile = (
  annualGeneration: number,
): Array<{ month: string; generation: number }> => {
  // India has seasonal variation with summer months having higher generation
  const monthlyFactors = [
    0.08, // January - winter
    0.09, // February
    0.1, // March - spring
    0.095, // April
    0.09, // May
    0.083, // June - monsoon (clouds)
    0.08, // July
    0.085, // August
    0.092, // September - post-monsoon
    0.1, // October
    0.11, // November - winter peak
    0.095, // December
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month, index) => ({
    month,
    generation: Math.round(annualGeneration * monthlyFactors[index]),
  }));
};
