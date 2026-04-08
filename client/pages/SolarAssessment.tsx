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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Zap,
  TrendingUp,
  MapPin,
  Home,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Leaf,
  AlertCircle,
  Loader2,
  Building,
  Calendar,
  Award,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getCurrentLocation,
  getIndianStateFromCoordinates,
} from "@/utils/locationUtils";
import {
  mockRoofGeometryAI,
  calculateSolarAssessment,
  getSolarMetricsForLocation,
  getPanelRecommendations,
  getMonthlyGenerationProfile,
  type RoofGeometryData,
  type SolarAssessmentResults,
} from "@/utils/solarUtils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface SolarFormData {
  name: string;
  location: string;
  state: string;
  latitude?: number;
  longitude?: number;
  detectedLocation?: string;
  roofType: string;
  roofCondition: string;
  shadowObstacles: string;
  budgetConstraint?: string;
  targetCapacity?: string;
  previousSolarExperience: string;
}

export default function SolarAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SolarFormData>({
    name: "",
    location: "",
    state: "",
    roofType: "",
    roofCondition: "",
    shadowObstacles: "",
    previousSolarExperience: "",
  });
  const [results, setResults] = useState<{
    assessment: SolarAssessmentResults;
    roofGeometry: RoofGeometryData;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [roofError, setRoofError] = useState<string | null>(null);
  const [isCheckingRoof, setIsCheckingRoof] = useState(false);
  const [roofGeometryData, setRoofGeometryData] =
    useState<RoofGeometryData | null>(null);

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
    "Concrete/RCC (Best)",
    "Metal Sheet",
    "Tiled",
    "Asbestos",
    "Other",
  ];

  const roofConditions = ["Excellent", "Good", "Fair", "Needs Repair"];
  const shadowObstacleOptions = [
    "No significant shadows",
    "Minor shadows",
    "Moderate obstacles",
    "Significant obstacles",
  ];

  const handleInputChange = (field: keyof SolarFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    try {
      const locationData = await getCurrentLocation();
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
    } catch (error) {
      setLocationError(
        error instanceof Error ? error.message : "Failed to detect location",
      );
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const checkRoofGeometry = async () => {
    setIsCheckingRoof(true);
    setRoofError(null);

    try {
      if (!formData.location) {
        setRoofError("Please provide a location first");
        setIsCheckingRoof(false);
        return;
      }

      const geometry = await mockRoofGeometryAI(
        formData.location,
        formData.latitude,
        formData.longitude,
      );

      setRoofGeometryData(geometry);
    } catch (error) {
      setRoofError(
        error instanceof Error
          ? error.message
          : "Failed to analyze roof geometry",
      );
    } finally {
      setIsCheckingRoof(false);
    }
  };

  const calculateResults = async () => {
    setIsCalculating(true);

    try {
      if (!formData.latitude || !formData.state || !roofGeometryData) {
        throw new Error("Missing required information");
      }

      // Simulate calculation delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const assessment = calculateSolarAssessment(
        roofGeometryData,
        formData.latitude,
        formData.state,
        {
          budgetConstraint: formData.budgetConstraint
            ? parseFloat(formData.budgetConstraint)
            : undefined,
          targetCapacity: formData.targetCapacity
            ? parseFloat(formData.targetCapacity)
            : undefined,
        },
      );

      setResults({
        assessment,
        roofGeometry: roofGeometryData,
      });

      setCurrentStep(4);
    } catch (error) {
      setRoofError(
        error instanceof Error ? error.message : "Calculation failed",
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      location: "",
      state: "",
      roofType: "",
      roofCondition: "",
      shadowObstacles: "",
      previousSolarExperience: "",
    });
    setResults(null);
    setRoofGeometryData(null);
    setLocationError(null);
    setRoofError(null);
  };

  const isStep1Valid = formData.name && formData.location && formData.state;
  const isStep2Valid =
    formData.roofType &&
    formData.roofCondition &&
    formData.shadowObstacles &&
    roofGeometryData;
  const isStep3Valid = true; // Optional preferences

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Solar Panel Installation Assessment
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover your solar potential with our advanced roof analysis and
          energy generation calculations powered by satellite imagery and
          location-based metrics.
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
          <span className={currentStep >= 1 ? "text-blue-600" : ""}>
            Basic Info
          </span>
          <span className={currentStep >= 2 ? "text-blue-600" : ""}>
            Roof Analysis
          </span>
          <span className={currentStep >= 3 ? "text-blue-600" : ""}>
            Preferences
          </span>
          <span className={currentStep >= 4 ? "text-blue-600" : ""}>
            Results
          </span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-yellow-600" />
              </div>
              <span>Location & Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Detection */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-blue-600" />
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
                  <span>Location: {formData.detectedLocation}</span>
                </div>
              )}

              {locationError && (
                <div className="flex items-center space-x-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                  <AlertCircle className="w-4 h-4" />
                  <span>{locationError}</span>
                </div>
              )}

              <p className="text-xs text-blue-600 mt-2">
                Accurate location helps us analyze solar irradiance and
                state-specific incentives
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
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                Solar Potential Indicators
              </h4>
              {formData.state && (
                <div className="text-sm text-green-700 space-y-1">
                  <p>
                    ✓ {formData.state} has{" "}
                    {["Rajasthan", "Gujarat", "Maharashtra"].includes(
                      formData.state,
                    )
                      ? "excellent"
                      : ["Karnataka", "Telangana", "Tamil Nadu"].includes(
                            formData.state,
                          )
                        ? "very good"
                        : "good"}{" "}
                    solar potential
                  </p>
                  <p>✓ Government subsidies and incentives available</p>
                  <p>✓ Growing solar installation network</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Roof Analysis */}
      {currentStep === 2 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-yellow-600" />
              </div>
              <span>Roof Analysis & Geometry</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* RoofGeometryAI Analysis */}
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    RoofGeometryAI Analysis
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkRoofGeometry}
                  disabled={isCheckingRoof || !formData.location}
                  className="border-purple-200 text-purple-700 hover:bg-purple-100"
                >
                  {isCheckingRoof ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Analyze Roof
                    </>
                  )}
                </Button>
              </div>

              {roofGeometryData && (
                <div className="space-y-3 bg-white p-3 rounded">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-purple-700 font-medium">
                        {roofGeometryData.usableRoofArea} sq.m
                      </div>
                      <div className="text-gray-600">Usable Roof Area</div>
                    </div>
                    <div>
                      <div className="text-purple-700 font-medium">
                        {Math.round(roofGeometryData.shadeFactor * 100)}%
                      </div>
                      <div className="text-gray-600">Shade Factor</div>
                    </div>
                    <div>
                      <div className="text-purple-700 font-medium">
                        {roofGeometryData.obstaclePercentage}%
                      </div>
                      <div className="text-gray-600">Obstacles</div>
                    </div>
                    <div>
                      <div className="text-purple-700 font-medium">
                        {roofGeometryData.tiltAngle}°
                      </div>
                      <div className="text-gray-600">Optimal Tilt</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-600">
                    ✓ Best orientation: {roofGeometryData.bestOrientation}{" "}
                    facing
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700"
                  >
                    Confidence: {Math.round(roofGeometryData.confidence * 100)}%
                  </Badge>
                </div>
              )}

              {roofError && (
                <div className="flex items-center space-x-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                  <AlertCircle className="w-4 h-4" />
                  <span>{roofError}</span>
                </div>
              )}

              <p className="text-xs text-purple-600 mt-2">
                Uses satellite imagery and advanced algorithms to estimate roof
                area, shadows, and obstacles
              </p>
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
                <Label htmlFor="roofCondition">Roof Condition *</Label>
                <Select
                  value={formData.roofCondition}
                  onValueChange={(value) =>
                    handleInputChange("roofCondition", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {roofConditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shadowObstacles">Shadow & Obstacles *</Label>
              <Select
                value={formData.shadowObstacles}
                onValueChange={(value) =>
                  handleInputChange("shadowObstacles", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shadow situation" />
                </SelectTrigger>
                <SelectContent>
                  {shadowObstacleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Trees, nearby buildings, chimneys, or water tanks that might
                cast shadows
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!isStep2Valid}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preferences & Constraints */}
      {currentStep === 3 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-yellow-600" />
              </div>
              <span>Preferences & Budget</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                These preferences help us customize recommendations for your
                needs. Leave blank to use defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="targetCapacity">Target Capacity (kWp)</Label>
                <Input
                  id="targetCapacity"
                  type="number"
                  placeholder="e.g., 5"
                  min="1"
                  step="0.5"
                  value={formData.targetCapacity || ""}
                  onChange={(e) =>
                    handleInputChange("targetCapacity", e.target.value)
                  }
                />
                <p className="text-xs text-gray-500">
                  Leave blank for automatic calculation based on roof area
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetConstraint">Budget Constraint (₹)</Label>
                <Input
                  id="budgetConstraint"
                  type="number"
                  placeholder="e.g., 500000"
                  value={formData.budgetConstraint || ""}
                  onChange={(e) =>
                    handleInputChange("budgetConstraint", e.target.value)
                  }
                />
                <p className="text-xs text-gray-500">
                  Optional: System will be sized within your budget
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="previousSolarExperience">
                  Previous Solar Experience
                </Label>
                <Select
                  value={formData.previousSolarExperience}
                  onValueChange={(value) =>
                    handleInputChange("previousSolarExperience", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No experience</SelectItem>
                    <SelectItem value="basic">Basic knowledge</SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate knowledge
                    </SelectItem>
                    <SelectItem value="advanced">Advanced knowledge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                Government Incentives
              </h4>
              <p className="text-sm text-green-700 mb-2">
                Most Indian states offer subsidies for residential solar
                installations:
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>
                  • Central PM-KUSUM subsidy: Up to 40% for systems ≤ 10 kWp
                </li>
                <li>• State-specific incentives vary (MNRE database)</li>
                <li>• Net metering benefits for surplus energy generation</li>
                <li>
                  • Accelerated depreciation benefits for commercial systems
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
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    Calculate Results
                    <Zap className="ml-2 w-4 h-4" />
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
          {/* Key Metrics */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span>Solar Assessment Results for {formData.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.assessment.installableCapacity} kWp
                  </div>
                  <div className="text-sm text-gray-600">System Capacity</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <Sun className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    {results.assessment.annualGeneration} kWh
                  </div>
                  <div className="text-sm text-gray-600">Annual Generation</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    ₹{results.assessment.annualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {results.assessment.paybackPeriodYears} years
                  </div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Panel Count</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.assessment.panelCount}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    @ {results.assessment.panelSize}W each
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Cost per Watt</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{results.assessment.costPerWatt}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Industry standard
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">System Efficiency</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(results.assessment.performanceRatio * 100)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    After all losses
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Daily Generation</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.assessment.dailyGeneration} kWh
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Average per day
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Usable Roof Area</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.roofGeometry.usableRoofArea} m²
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    After obstacles
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Total Cost</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{results.assessment.estimatedCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Complete system
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Analysis */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Financial Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      30-Year ROI
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {results.assessment.roiPercentage}%
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      Total returns on investment over system lifetime
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Payback Period
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {results.assessment.paybackPeriodYears} years
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      Time to recover initial investment
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">
                      Key Financial Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Initial Investment:
                        </span>
                        <span className="font-medium">
                          ₹{results.assessment.estimatedCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Savings:</span>
                        <span className="font-medium text-green-600">
                          +₹{results.assessment.annualSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-gray-600">
                          30-Year Total Savings:
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹
                          {(
                            results.assessment.annualSavings * 30
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Net Gain (30 years):
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹
                          {(
                            results.assessment.annualSavings * 30 -
                            results.assessment.estimatedCost
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annual Generation Profile */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Generation Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getMonthlyGenerationProfile(
                      results.assessment.annualGeneration,
                    )}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="generation" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span>Environmental Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {results.assessment.co2Reduction}
                  </div>
                  <div className="text-gray-700 font-medium">
                    Tonnes CO₂ Reduction/Year
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Equivalent to planting{" "}
                    {Math.round(results.assessment.co2Reduction * 16)} trees
                  </div>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {(results.assessment.co2Reduction * 30).toFixed(1)}
                  </div>
                  <div className="text-gray-700 font-medium">
                    Tonnes CO₂ Over System Lifetime
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Clean energy generation for 30 years
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Panel & System Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPanelRecommendations(
                  results.assessment.installableCapacity,
                ).map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {rec.type}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      {rec.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warranty & Support */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span>Warranty & Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">
                    Warranty Details
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {results.assessment.warranty}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Module degradation covered</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Inverter replacement included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Free maintenance for first year</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">
                    Subsidy Eligibility
                  </h4>
                  {results.assessment.subsidyEligibility && (
                    <div className="bg-green-50 p-3 rounded mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 mb-2"
                      >
                        Eligible for Central Subsidies
                      </Badge>
                      <p className="text-sm text-gray-700 space-y-1">
                        <div>• PM-KUSUM program: Up to 40% subsidy</div>
                        <div>• State incentives available</div>
                        <div>• Net metering benefits</div>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Button
              variant="outline"
              onClick={resetAssessment}
              className="px-8"
            >
              Start New Assessment
            </Button>
            <Button className="px-8 bg-yellow-600 hover:bg-yellow-700">
              Download Report
            </Button>
            <Button className="px-8 bg-green-600 hover:bg-green-700">
              Get Installation Quote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
