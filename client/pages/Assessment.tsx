import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import InstallationGuide from "@/components/InstallationGuide";
import {
  getBlendedAnnualRainfall,
  rainfallPercentile,
} from "@/utils/rainfallUtils";
import type { RainfallProvenance } from "@/utils/rainfallUtils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Calculator,
  MapPin,
  Users,
  Home,
  Droplets,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Shield,
  FileText,
  Layers,
  Zap,
  Building,
  Navigation,
  Cloud,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getCurrentLocation,
  getWeatherData,
  getIndianStateFromCoordinates,
} from "@/utils/locationUtils";

interface AssessmentData {
  name: string;
  location: string;
  state: string;
  dwellers: string;
  roofArea: string;
  roofType: string;
  openSpace: string;
  currentWaterSource: string;
  annualRainfall: string;
  soilType: string;
  geologicalCondition: string;
  groundwaterDepth: string;
  buildingArea: string;
  plotArea: string;
  latitude?: number;
  longitude?: number;
  detectedLocation?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

interface WeatherData {
  annualRainfall: number;
  monthlyRainfall: number[];
  temperature: number;
  humidity: number;
  dataSource: string;
}

interface Sustainability {
  verdict: string;
  demandCoveredPct: number;
  needLevel: string;
  basis: string[];
  rainfallProvenance: RainfallProvenance;
}

interface AssessmentResults {
  harvestPotential: number;
  systemSize: string;
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  environmentalImpact: string;
  rechargeStructures: RechargeStructure[];
  geologicalFeasibility: string;
  governmentCompliance: GovernmentCompliance;
  aquiferInfo: AquiferInfo;
  runoffCapacity: number;
  sustainability: Sustainability;
}

interface RechargeStructure {
  type: string;
  dimensions: string;
  cost: number;
  suitability: string;
  specifications: string[];
}

interface GovernmentCompliance {
  mandatoryRequirement: boolean;
  complianceLevel: string;
  requiredPermits: string[];
  guidelines: string[];
}

interface AquiferInfo {
  type: string;
  depth: string;
  quality: string;
  rechargeCapacity: string;
}

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    name: "",
    location: "",
    state: "",
    dwellers: "",
    roofArea: "",
    roofType: "",
    openSpace: "",
    currentWaterSource: "",
    annualRainfall: "",
    soilType: "",
    geologicalCondition: "",
    groundwaterDepth: "",
    buildingArea: "",
    plotArea: "",
  });
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Location and weather states
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const roofTypes = [
    "Concrete/RCC",
    "Tiled",
    "Metal Sheet",
    "Asbestos",
    "Other",
  ];

  const waterSources = [
    "Municipal Supply",
    "Borewell",
    "Well",
    "Tanker Supply",
    "Mixed Sources",
  ];

  const soilTypes = [
    "Alluvial Soil",
    "Black Cotton Soil",
    "Red Soil",
    "Laterite Soil",
    "Sandy Soil",
    "Clay Soil",
    "Loamy Soil",
    "Rocky/Hard Rock",
  ];

  const geologicalConditions = [
    "Alluvial Terrain",
    "Fractured Hard Rock",
    "Sedimentary Rock",
    "Igneous Rock",
    "Metamorphic Rock",
    "Coastal Plain",
    "Hilly Terrain",
  ];

  const groundwaterDepths = [
    "0-5 meters",
    "5-10 meters",
    "10-20 meters",
    "20-50 meters",
    "Above 50 meters",
    "Unknown",
  ];

  const handleInputChange = (field: keyof AssessmentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateResults = async () => {
    setIsCalculating(true);

    // Simulate API call for calculation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Enhanced calculation based on form data, weather data, and government guidelines
    const roofArea = parseFloat(formData.roofArea) || 0;
    let dwellers = parseInt(formData.dwellers) || 1;
    if (formData.dwellers.includes("+")) dwellers += 2; // approximate for 10+

    const rainfallProv = getBlendedAnnualRainfall(
      formData.state || undefined,
      weatherData?.annualRainfall,
      formData.annualRainfall ? parseFloat(formData.annualRainfall) : undefined,
    );
    const rainfall = rainfallProv.usedAnnualRainfall;
    const plotArea = parseFloat(formData.plotArea) || roofArea * 1.5;
    const buildingArea = parseFloat(formData.buildingArea) || roofArea;

    // Calculate runoff coefficient based on roof type
    const runoffCoefficient =
      formData.roofType === "Concrete/RCC"
        ? 0.85
        : formData.roofType === "Tiled"
          ? 0.75
          : formData.roofType === "Metal Sheet"
            ? 0.9
            : 0.7;

    const harvestPotential = Math.round(
      roofArea * rainfall * runoffCoefficient * 0.001,
    );

    // Water demand per BIS: 135 L/person/day
    const annualDemandKL = Math.round((dwellers * 135 * 365) / 1000);
    const demandCovered = harvestPotential / Math.max(annualDemandKL, 1);
    const demandCoveredPct = Math.max(0, Math.min(1, demandCovered));

    const rainPct = rainfallPercentile(rainfall);
    let needScore = 0;
    if (formData.currentWaterSource === "Tanker Supply") needScore += 2;
    if (
      formData.currentWaterSource === "Borewell" ||
      formData.currentWaterSource === "Well"
    )
      needScore += 1.5;
    if (formData.groundwaterDepth.includes("Above 50")) needScore += 2;
    else if (formData.groundwaterDepth.includes("20-50")) needScore += 1;
    if (rainPct < 0.3) needScore += 1.5;
    else if (rainPct < 0.6) needScore += 1;
    if (demandCoveredPct >= 0.6) needScore -= 1;
    else if (demandCoveredPct < 0.3) needScore += 1;

    const needLevel =
      needScore >= 3 ? "High" : needScore >= 1.5 ? "Medium" : "Low";
    const sustainabilityVerdict =
      demandCoveredPct >= 0.8
        ? "High sustainability (meets most demand)"
        : demandCoveredPct >= 0.5
          ? "Moderate sustainability"
          : demandCoveredPct >= 0.3
            ? "Partial support"
            : "Low sustainability (non‑potable uses recommended)";
    const runoffCapacity = Math.round(
      roofArea * 0.001 * rainfall * runoffCoefficient,
    );

    // Government compliance check (mandatory for buildings >300 sq m as per guidelines)
    const mandatoryRequirement = buildingArea >= 300;

    // Determine suitable recharge structures based on geological conditions
    const rechargeStructures = getRechargeStructures(
      formData.geologicalCondition,
      formData.soilType,
      plotArea,
    );

    // Calculate costs including recharge structures
    const baseSystemCost = roofArea * 250 + 30000;
    const rechargeStructureCost = rechargeStructures.reduce(
      (total, structure) => total + structure.cost,
      0,
    );
    const totalCost = baseSystemCost + rechargeStructureCost;

    const annualSavings = Math.round(harvestPotential * 18); // Updated rate
    const paybackPeriod = Math.round(totalCost / Math.max(annualSavings, 1));

    // Determine aquifer information based on location and geological condition
    const aquiferInfo = getAquiferInfo(
      formData.geologicalCondition,
      formData.groundwaterDepth,
    );

    setResults({
      harvestPotential,
      systemSize:
        roofArea > 150
          ? "Large Scale"
          : roofArea > 75
            ? "Medium Scale"
            : "Small Scale",
      estimatedCost: totalCost,
      annualSavings,
      paybackPeriod,
      environmentalImpact: `${Math.round(harvestPotential * 1000)} liters saved annually`,
      rechargeStructures,
      geologicalFeasibility: getGeologicalFeasibility(
        formData.geologicalCondition,
        formData.soilType,
      ),
      governmentCompliance: {
        mandatoryRequirement,
        complianceLevel: mandatoryRequirement
          ? "Mandatory Installation Required"
          : "Voluntary Installation",
        requiredPermits: mandatoryRequirement
          ? ["Building Plan Approval", "Water Authority NOC"]
          : [],
        guidelines: [
          "Ministry of Jal Shakti Guidelines",
          "MoHUA Building Bylaws",
          "State Water Conservation Rules",
        ],
      },
      aquiferInfo,
      runoffCapacity,
      sustainability: {
        verdict: sustainabilityVerdict,
        demandCoveredPct: Math.round(demandCoveredPct * 100) / 100,
        needLevel,
        basis: [
          `Annual rainfall used: ${rainfall} mm (${rainfallProv.sourceLabel})`,
          `Roof runoff coefficient: ${runoffCoefficient}`,
          `Estimated annual demand: ${annualDemandKL} KL for ${dwellers} people`,
          `Harvest can meet ~${Math.round(demandCoveredPct * 100)}% of demand`,
        ],
        rainfallProvenance: rainfallProv,
      },
    });

    setIsCalculating(false);
    setCurrentStep(4);
  };

  // Helper function to determine suitable recharge structures
  const getRechargeStructures = (
    geological: string,
    soil: string,
    area: number,
  ): RechargeStructure[] => {
    const structures: RechargeStructure[] = [];

    if (geological.includes("Alluvial") || geological.includes("Sedimentary")) {
      structures.push({
        type: "Recharge Pit",
        dimensions: "3m x 3m x 3m depth",
        cost: 25000,
        suitability: "Highly Suitable",
        specifications: [
          "Filter bed: 30cm gravel + 60cm sand",
          "Overflow pipe at 2.5m depth",
          "Maintenance cover provided",
          "First flush diverter included",
        ],
      });
    }

    if (geological.includes("Hard Rock") || geological.includes("Fractured")) {
      structures.push({
        type: "Recharge Shaft",
        dimensions: "1.5m diameter x 15m depth",
        cost: 45000,
        suitability: "Suitable",
        specifications: [
          "Casing pipe for top 3m",
          "Filter pack around perforated section",
          "Gravel pack: 20-40mm aggregate",
          "Development and yield testing",
        ],
      });
    }

    if (area > 500) {
      structures.push({
        type: "Recharge Trench",
        dimensions: `${Math.min(area / 100, 50)}m length x 1m width x 1.5m depth`,
        cost: Math.round(area * 80),
        suitability: "Suitable for large areas",
        specifications: [
          "Rubble stone filling",
          "Sand and gravel layers",
          "Perforated distribution pipe",
          "Geotextile filter layer",
        ],
      });
    }

    return structures;
  };

  // Helper function to get aquifer information
  const getAquiferInfo = (geological: string, depth: string): AquiferInfo => {
    if (geological.includes("Alluvial")) {
      return {
        type: "Unconfined Alluvial Aquifer",
        depth: depth || "Shallow to moderate depth",
        quality: "Good to Moderate",
        rechargeCapacity: "High potential for artificial recharge",
      };
    } else if (geological.includes("Hard Rock")) {
      return {
        type: "Fractured Hard Rock Aquifer",
        depth: depth || "Variable depth",
        quality: "Generally Good",
        rechargeCapacity: "Moderate potential through fractures",
      };
    } else {
      return {
        type: "Mixed Aquifer System",
        depth: depth || "Variable",
        quality: "Variable",
        rechargeCapacity: "Site-specific assessment required",
      };
    }
  };

  // Helper function to assess geological feasibility
  const getGeologicalFeasibility = (
    geological: string,
    soil: string,
  ): string => {
    if (
      (geological.includes("Alluvial") || geological.includes("Fractured")) &&
      !soil.includes("Clay")
    ) {
      return "Highly Feasible - Excellent conditions for RTRWH and artificial recharge";
    } else if (geological.includes("Hard Rock") && soil.includes("Sandy")) {
      return "Feasible - Good conditions with proper structure design";
    } else if (soil.includes("Clay") || soil.includes("Black Cotton")) {
      return "Moderately Feasible - Requires additional filtration and drainage measures";
    } else {
      return "Site Assessment Required - Detailed geological study recommended";
    }
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      location: "",
      state: "",
      dwellers: "",
      roofArea: "",
      roofType: "",
      openSpace: "",
      currentWaterSource: "",
      annualRainfall: "",
      soilType: "",
      geologicalCondition: "",
      groundwaterDepth: "",
      buildingArea: "",
      plotArea: "",
    });
    setResults(null);
    setWeatherData(null);
    setLocationError(null);
    setWeatherError(null);
  };

  // Location detection function
  const detectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    try {
      const locationData = await getCurrentLocation();

      // Update form data with detected location
      setFormData((prev) => ({
        ...prev,
        location: locationData.city,
        state: getIndianStateFromCoordinates(
          locationData.latitude,
          locationData.longitude,
        ),
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        detectedLocation: `${locationData.city}, ${locationData.state}`,
      }));

      // Fetch weather data for the detected location
      await fetchWeatherData(locationData.latitude, locationData.longitude);
    } catch (error) {
      setLocationError(
        error instanceof Error ? error.message : "Failed to detect location",
      );
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Fetch weather data function
  const fetchWeatherData = async (lat: number, lon: number) => {
    setIsFetchingWeather(true);
    setWeatherError(null);

    try {
      const weather = await getWeatherData(lat, lon);
      setWeatherData(weather);

      // Auto-fill rainfall data if not already provided
      if (!formData.annualRainfall) {
        setFormData((prev) => ({
          ...prev,
          annualRainfall: weather.annualRainfall.toString(),
        }));
      }
    } catch (error) {
      setWeatherError(
        error instanceof Error ? error.message : "Failed to fetch weather data",
      );
    } finally {
      setIsFetchingWeather(false);
    }
  };

  // Auto-fetch weather data when location coordinates are available
  useEffect(() => {
    if (formData.latitude && formData.longitude && !weatherData) {
      fetchWeatherData(formData.latitude, formData.longitude);
    }
  }, [formData.latitude, formData.longitude]);

  const isStep1Valid = formData.name && formData.location && formData.state;
  const isStep2Valid =
    formData.dwellers &&
    formData.roofArea &&
    formData.roofType &&
    formData.openSpace &&
    formData.currentWaterSource;
  const isStep3Valid =
    formData.soilType &&
    formData.geologicalCondition &&
    formData.groundwaterDepth &&
    formData.buildingArea &&
    formData.plotArea;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          RTRWH Assessment Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get personalized recommendations for your rooftop rainwater harvesting
          system based on your location, household needs, and property details.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={currentStep >= 1 ? "text-water-600" : ""}>
            Basic Info
          </span>
          <span className={currentStep >= 2 ? "text-water-600" : ""}>
            Property Details
          </span>
          <span className={currentStep >= 3 ? "text-water-600" : ""}>
            Geological Info
          </span>
          <span className={currentStep >= 4 ? "text-water-600" : ""}>
            Results
          </span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-water-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-water-600" />
              </div>
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Detection Section */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Auto-detect Location
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-2" />
                      Detect Location
                    </>
                  )}
                </Button>
              </div>

              {formData.detectedLocation && (
                <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                  <CheckCircle className="w-4 h-4" />
                  <span>Location detected: {formData.detectedLocation}</span>
                </div>
              )}

              {locationError && (
                <div className="flex items-center space-x-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                  <AlertCircle className="w-4 h-4" />
                  <span>{locationError}</span>
                </div>
              )}

              <p className="text-xs text-blue-600 mt-2">
                Allow location access for automatic detection of your city and
                real-time rainfall data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">City/Town *</Label>
                <Input
                  id="location"
                  placeholder="Enter your city or town"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
                {formData.detectedLocation && (
                  <p className="text-xs text-green-600">
                    Auto-detected from your location
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.detectedLocation && (
                <p className="text-xs text-green-600">
                  Auto-detected from your location
                </p>
              )}
            </div>

            {/* Weather Data Display */}
            {weatherData && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Cloud className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Live Weather Data
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    {weatherData.dataSource}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-800">
                      {weatherData.annualRainfall}mm
                    </div>
                    <div className="text-green-600">Annual Rainfall</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-800">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-green-600">Temperature</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-800">
                      {Math.round(weatherData.humidity)}%
                    </div>
                    <div className="text-green-600">Humidity</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-800">
                      {Math.max(...weatherData.monthlyRainfall)}mm
                    </div>
                    <div className="text-green-600">Peak Month</div>
                  </div>
                </div>

                <p className="text-xs text-green-600 mt-2">
                  Rainfall data will be automatically used in calculations
                </p>
              </div>
            )}

            {isFetchingWeather && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-blue-800">
                    Fetching real-time weather data...
                  </span>
                </div>
              </div>
            )}

            {weatherError && (
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>{weatherError}</span>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid}
                className="bg-water-600 hover:bg-water-700"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Property Details */}
      {currentStep === 2 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-water-100 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-water-600" />
              </div>
              <span>Property Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dwellers">Number of Household Members *</Label>
                <Select
                  value={formData.dwellers}
                  onValueChange={(value) =>
                    handleInputChange("dwellers", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "person" : "people"}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">More than 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofArea">Roof Area (sq ft) *</Label>
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.roofArea}
                  onChange={(e) =>
                    handleInputChange("roofArea", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type *</Label>
                <Select
                  value={formData.roofType}
                  onValueChange={(value) =>
                    handleInputChange("roofType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roofTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openSpace">
                  Available Open Space (sq ft) *
                </Label>
                <Input
                  id="openSpace"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.openSpace}
                  onChange={(e) =>
                    handleInputChange("openSpace", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentWaterSource">Current Water Source *</Label>
              <Select
                value={formData.currentWaterSource}
                onValueChange={(value) =>
                  handleInputChange("currentWaterSource", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary water source" />
                </SelectTrigger>
                <SelectContent>
                  {waterSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="annualRainfall">Annual Rainfall (mm)</Label>
                {weatherData && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    <Cloud className="w-3 h-3 mr-1" />
                    Live Data
                  </Badge>
                )}
              </div>
              <Input
                id="annualRainfall"
                type="number"
                placeholder="e.g., 1200"
                value={formData.annualRainfall}
                onChange={(e) =>
                  handleInputChange("annualRainfall", e.target.value)
                }
                className={weatherData ? "border-green-300 bg-green-50" : ""}
              />
              {weatherData ? (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Auto-filled from real weather data for your location (
                  {weatherData.annualRainfall}mm)
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Use location detection above to get real rainfall data for
                  your area
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!isStep2Valid}
                className="bg-water-600 hover:bg-water-700"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Geological & Technical Information */}
      {currentStep === 3 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-water-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-water-600" />
              </div>
              <span>Geological & Technical Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                This information helps determine the most suitable recharge
                structures as per Ministry of Jal Shakti and MoHUA guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type *</Label>
                <Select
                  value={formData.soilType}
                  onValueChange={(value) =>
                    handleInputChange("soilType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="geologicalCondition">
                  Geological Condition *
                </Label>
                <Select
                  value={formData.geologicalCondition}
                  onValueChange={(value) =>
                    handleInputChange("geologicalCondition", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select geological condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {geologicalConditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="groundwaterDepth">Groundwater Depth *</Label>
                <Select
                  value={formData.groundwaterDepth}
                  onValueChange={(value) =>
                    handleInputChange("groundwaterDepth", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select groundwater depth" />
                  </SelectTrigger>
                  <SelectContent>
                    {groundwaterDepths.map((depth) => (
                      <SelectItem key={depth} value={depth}>
                        {depth}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingArea">
                  Total Building Area (sq ft) *
                </Label>
                <Input
                  id="buildingArea"
                  type="number"
                  placeholder="e.g., 1500"
                  value={formData.buildingArea}
                  onChange={(e) =>
                    handleInputChange("buildingArea", e.target.value)
                  }
                />
                <p className="text-xs text-gray-500">
                  Buildings ≥300 sq ft require mandatory RTRWH installation
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plotArea">Total Plot Area (sq ft) *</Label>
              <Input
                id="plotArea"
                type="number"
                placeholder="e.g., 2400"
                value={formData.plotArea}
                onChange={(e) => handleInputChange("plotArea", e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Used for determining appropriate recharge structure dimensions
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                Government Guidelines Compliance
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Suitable for alluvial or fractured hard rock terrains</li>
                <li>• Ensures proper filtration with sand and gravel beds</li>
                <li>• Meets MoHUA mandatory installation requirements</li>
                <li>
                  • Follows Ministry of Jal Shakti technical specifications
                </li>
              </ul>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={calculateResults}
                disabled={!isStep3Valid || isCalculating}
                className="bg-water-600 hover:bg-water-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    Calculate Results
                    <Calculator className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && results && (
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-gradient-to-r from-water-50 to-nature-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span>Assessment Results for {formData.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Droplets className="w-8 h-8 text-water-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-water-600">
                    {results.harvestPotential}KL
                  </div>
                  <div className="text-sm text-gray-600">
                    Annual Harvest Potential
                  </div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <TrendingUp className="w-8 h-8 text-nature-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-nature-600">
                    ₹{results.annualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <Home className="w-8 h-8 text-earth-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-earth-600">
                    {results.paybackPeriod} years
                  </div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>IMD/Kaggle Prediction: Sustainability & Need</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">
                    Sustainability
                  </div>
                  <Badge variant="secondary">
                    {results.sustainability.verdict}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    Demand covered:{" "}
                    {Math.round(results.sustainability.demandCoveredPct * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">Need Level</div>
                  <Badge>{results.sustainability.needLevel}</Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    Higher need indicates greater benefits/urgency
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">
                    Rainfall Basis
                  </div>
                  <div className="text-xs text-gray-700">
                    {results.sustainability.rainfallProvenance.sourceLabel}
                    {results.sustainability.rainfallProvenance
                      .imdKaggleStateAverage ? (
                      <div>
                        State avg:{" "}
                        {
                          results.sustainability.rainfallProvenance
                            .imdKaggleStateAverage
                        }{" "}
                        mm
                      </div>
                    ) : null}
                    <div>
                      Used:{" "}
                      {
                        results.sustainability.rainfallProvenance
                          .usedAnnualRainfall
                      }{" "}
                      mm
                    </div>
                  </div>
                </div>
              </div>
              <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
                {results.sustainability.basis.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Data sources: IMD long‑period averages and Kaggle India rainfall
                datasets (pre‑aggregated), blended with live data where
                available.
              </p>
            </CardContent>
          </Card>

          {/* Government Compliance */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Government Compliance Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge
                      variant={
                        results.governmentCompliance.mandatoryRequirement
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {results.governmentCompliance.complianceLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {results.governmentCompliance.mandatoryRequirement
                      ? "Your building falls under mandatory RTRWH installation requirements as per MoHUA guidelines."
                      : "RTRWH installation is voluntary for your building size but highly recommended."}
                  </p>

                  {results.governmentCompliance.requiredPermits.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        Required Permits:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {results.governmentCompliance.requiredPermits.map(
                          (permit, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <FileText className="w-4 h-4" />
                              <span>{permit}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Applicable Guidelines:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {results.governmentCompliance.guidelines.map(
                      (guideline, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{guideline}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rainfall Distribution */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Rainfall Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={(weatherData?.monthlyRainfall?.length
                      ? weatherData.monthlyRainfall
                      : // Simple fallback distribution if live monthly data missing
                        (() => {
                          const r =
                            results.sustainability.rainfallProvenance
                              .usedAnnualRainfall;
                          const arr = new Array(12).fill(0);
                          for (let i = 0; i < 12; i++) {
                            if (i >= 5 && i <= 8) arr[i] = (r * 0.65) / 4;
                            else if (i === 4 || i === 9) arr[i] = (r * 0.1) / 2;
                            else arr[i] = (r * 0.25) / 6;
                          }
                          return arr.map((v, idx) => ({
                            month: [
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
                            ][idx],
                            value: Math.round(v),
                          }));
                        })()
                    ).map((v: any, idx: number) =>
                      typeof v === "number"
                        ? {
                            month: [
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
                            ][idx],
                            value: v,
                          }
                        : v,
                    )}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Geological Feasibility */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-earth-600" />
                <span>Geological Feasibility Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Site Assessment
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {results.geologicalFeasibility}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Runoff Generation
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-water-600" />
                      <span className="text-lg font-semibold">
                        {results.runoffCapacity} KL/year
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on roof type and local rainfall
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">
                    Principal Aquifer Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aquifer Type:</span>
                      <span className="font-medium">
                        {results.aquiferInfo.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depth Range:</span>
                      <span className="font-medium">
                        {results.aquiferInfo.depth}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water Quality:</span>
                      <span className="font-medium">
                        {results.aquiferInfo.quality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recharge Potential:</span>
                      <span className="font-medium">
                        {results.aquiferInfo.rechargeCapacity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Recharge Structures */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-nature-600" />
                <span>Recommended Recharge Structures</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {results.rechargeStructures.map((structure, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {structure.type}
                        </h4>
                        <Badge variant="outline" className="mt-1">
                          {structure.suitability}
                        </Badge>
                      </div>
                      <span className="text-lg font-bold text-water-600">
                        ₹{structure.cost.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Dimensions:</strong> {structure.dimensions}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">
                          Technical Specifications:
                        </h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {structure.specifications.map((spec, specIndex) => (
                            <li
                              key={specIndex}
                              className="flex items-start space-x-1"
                            >
                              <span className="text-water-600 mt-1">•</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>System Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Size:</span>
                  <Badge variant="secondary">{results.systemSize}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Estimated Cost:</span>
                  <span className="font-semibold">
                    ₹{results.estimatedCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Roof Area Used:</span>
                  <span className="font-semibold">
                    {formData.roofArea} sq ft
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Storage Capacity:</span>
                  <span className="font-semibold">
                    {Math.round(results.harvestPotential * 0.3)}KL recommended
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Water Conservation</div>
                    <div className="text-sm text-gray-600">
                      {results.environmentalImpact}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Groundwater Recharge</div>
                    <div className="text-sm text-gray-600">
                      Enhances local groundwater through{" "}
                      {results.rechargeStructures.length} recharge structure(s)
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Compliance Achievement</div>
                    <div className="text-sm text-gray-600">
                      Meets government guidelines for sustainable water
                      management
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <InstallationGuide
            systemSize={results.systemSize}
            rechargeStructures={results.rechargeStructures}
          />

          <Card className="border-none shadow-lg bg-gradient-to-r from-water-600 to-nature-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="mb-4 opacity-90">
                Contact local implementers or get detailed technical
                specifications for your RTRWH system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={resetAssessment}>
                  New Assessment
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-water-700"
                >
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
