import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Droplets,
  TrendingUp,
  ChevronRight,
  Zap,
  Leaf,
  Clock,
  CheckCircle,
  BarChart3,
  Users,
  Award,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface AssessmentStats {
  totalAssessments: number;
  activeUsers: number;
  waterSavedKL: number;
  energyGeneratedMWh: number;
  co2ReductionTonnes: number;
  benefitingHouseholds: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<AssessmentStats>({
    totalAssessments: 0,
    activeUsers: 0,
    waterSavedKL: 0,
    energyGeneratedMWh: 0,
    co2ReductionTonnes: 0,
    benefitingHouseholds: 0,
  });

  useEffect(() => {
    // Animate counters
    const timer = setTimeout(() => {
      setStats({
        totalAssessments: 3847,
        activeUsers: 2156,
        waterSavedKL: 2450000,
        energyGeneratedMWh: 8920,
        co2ReductionTonnes: 6540,
        benefitingHouseholds: 1892,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const rtrwhFeatures = [
    {
      icon: Droplets,
      title: "Water Potential Analysis",
      description: "Real-time rainfall data and roof area assessment",
    },
    {
      icon: MapPin,
      title: "Geological Assessment",
      description: "Soil type, groundwater depth, and aquifer analysis",
    },
    {
      icon: Award,
      title: "Government Compliance",
      description: "Ministry of Jal Shakti guidelines and mandatory requirements",
    },
    {
      icon: TrendingUp,
      title: "ROI & Savings",
      description: "Annual water savings and payback period calculation",
    },
  ];

  const solarFeatures = [
    {
      icon: Sun,
      title: "Roof Geometry Analysis",
      description: "Satellite-based area detection with shade & obstacle analysis",
    },
    {
      icon: Zap,
      title: "Energy Generation",
      description: "Location-based solar irradiance and annual generation potential",
    },
    {
      icon: BarChart3,
      title: "Financial Analysis",
      description: "Cost estimation, ROI, and 30-year projections",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "CO₂ reduction and carbon footprint offset calculation",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Aqua & Solar Assessment Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your assessment journey. Whether you want to harvest rainwater or harness solar energy,
              our advanced AI-powered analysis tools provide accurate, location-based recommendations for sustainable living.
            </p>
          </div>

          {/* Main Assessment Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* RTRWH Assessment Card */}
            <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-3xl opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Water Conservation
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  Rooftop Rainwater Harvesting
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  RTRWH Assessment Tool
                </p>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <p className="text-gray-700">
                  Get personalized recommendations for your rooftop rainwater harvesting system with real-time weather data,
                  geological assessment, and government compliance guidelines.
                </p>

                <div className="space-y-3">
                  {rtrwhFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {feature.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-3 text-center mb-6">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">
                        ~15,000L
                      </div>
                      <div className="text-xs text-gray-600">
                        Annual Potential
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-600">
                        40%
                      </div>
                      <div className="text-xs text-gray-600">
                        Bill Reduction
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-600">
                        ~5 yrs
                      </div>
                      <div className="text-xs text-gray-600">
                        Avg Payback
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link to="/assessment">
                      Start RTRWH Assessment
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Typical duration: 5-10 minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Solar Assessment Card */}
            <Card className="border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-3xl opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Sun className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Clean Energy
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  Solar Panel Installation
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Solar Assessment Tool
                </p>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <p className="text-gray-700">
                  Discover your solar potential with AI-powered roof analysis, energy generation forecasting,
                  and comprehensive financial analysis including subsidies and incentives.
                </p>

                <div className="space-y-3">
                  {solarFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {feature.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-3 text-center mb-6">
                    <div>
                      <div className="text-lg font-semibold text-yellow-600">
                        ~6 kWp
                      </div>
                      <div className="text-xs text-gray-600">
                        Avg Capacity
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-yellow-600">
                        ~₹3.5L
                      </div>
                      <div className="text-xs text-gray-600">
                        Typical Cost
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-yellow-600">
                        ~6-7 yrs
                      </div>
                      <div className="text-xs text-gray-600">
                        Avg Payback
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Link to="/solar-assessment">
                      Start Solar Assessment
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Typical duration: 8-12 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combined Benefits */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span>Combined RTRWH + Solar Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Implementing both rainwater harvesting and solar energy creates a truly sustainable home:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    60-70%
                  </div>
                  <div className="text-sm text-gray-700">Water Independence</div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    80-90%
                  </div>
                  <div className="text-sm text-gray-700">Energy Self-Sufficiency</div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    50-60%
                  </div>
                  <div className="text-sm text-gray-700">Utility Bill Reduction</div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    1.5T+ CO₂
                  </div>
                  <div className="text-sm text-gray-700">Annual Carbon Offset</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Impact
            </h2>
            <p className="text-lg text-gray-600">
              Thousands of households are already benefiting from our assessments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalAssessments.toLocaleString()}
                </div>
                <div className="text-gray-600">Assessments Completed</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.activeUsers.toLocaleString()}
                </div>
                <div className="text-gray-600">Active Users</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <Droplets className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {(stats.waterSavedKL / 1000000).toFixed(1)}M KL
                </div>
                <div className="text-gray-600">Water Saved Annually</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {(stats.energyGeneratedMWh / 1000).toFixed(1)} GWh
                </div>
                <div className="text-gray-600">Energy Generated Annually</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.co2ReductionTonnes.toLocaleString()} T
                </div>
                <div className="text-gray-600">CO₂ Reduction Annually</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.benefitingHouseholds.toLocaleString()}+
                </div>
                <div className="text-gray-600">Households Benefiting</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Both Assessments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced technology meets practical sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Location Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Automatic location detection with real-time weather data, rainfall statistics,
              solar irradiance mapping, and state-specific government incentives.
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Advanced Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Satellite-based roof detection, geological assessments, energy generation forecasting,
              and comprehensive financial projections with subsidy eligibility checks.
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Government Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Ensures compliance with Ministry of Jal Shakti guidelines, MoHUA bylaws,
              environmental standards, and eligibility for subsidies and incentives.
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Financial Clarity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Detailed cost breakdowns, ROI calculations, payback period analysis,
              and 30-year financial projections for informed decision-making.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 border-none text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Start Your Sustainability Journey Today
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get accurate assessments for rainwater harvesting, solar energy, or both.
                Join thousands of households creating a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100"
                >
                  <Link to="/assessment">
                    RTRWH Assessment
                    <Droplets className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-700 hover:bg-gray-100"
                >
                  <Link to="/solar-assessment">
                    Solar Assessment
                    <Sun className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
