import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Calculator,
  MapPin,
  Users,
  Home,
  Zap,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Leaf,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Index() {
  const [stats, setStats] = useState({
    assessments: 0,
    waterSaved: 0,
    households: 0,
  });

  useEffect(() => {
    // Animate counters
    const timer = setTimeout(() => {
      setStats({
        assessments: 1247,
        waterSaved: 15640,
        households: 890,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Calculator,
      title: "Real-Time Data Integration",
      description:
        "Auto-location detection and live weather data integration for accurate rainfall calculations and feasibility analysis",
    },
    {
      icon: MapPin,
      title: "Government Guidelines Compliant",
      description:
        "Follows Ministry of Jal Shakti and MoHUA guidelines for mandatory installations and technical specifications",
    },
    {
      icon: Zap,
      title: "Smart Recharge Design",
      description:
        "AI-powered recommendations for recharge pits, trenches, and shafts based on geological conditions and real data",
    },
    {
      icon: Shield,
      title: "Precision Engineering",
      description:
        "Location-based aquifer analysis, live rainfall data, and complete technical specifications for optimal implementation",
    },
  ];

  const benefits = [
    "Get instant results with automatic location detection",
    "Access real-time rainfall data for accurate calculations",
    "Meet mandatory government installation requirements",
    "Receive precision-engineered recharge structure recommendations",
    "Understand local aquifer conditions with live weather integration",
    "Ensure compliance with Ministry of Jal Shakti guidelines",
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-water-100 text-water-700"
                >
                  Groundwater Conservation Initiative
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Assess Your{" "}
                  <span className="bg-gradient-to-r from-water-600 to-nature-600 bg-clip-text text-transparent">
                    Rooftop Rainwater
                  </span>{" "}
                  Harvesting Potential
                </h1>
                <p className="text-xl text-gray-600 mt-6">
                  Get personalized recommendations with real-time weather data,
                  automatic location detection, and AI-powered analysis for
                  optimal rainwater harvesting implementation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-water-600 hover:bg-water-700"
                >
                  <Link to="/dashboard">
                    Start Assessment
                    <Calculator className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">
                    Learn More
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-water-600">
                    {stats.assessments.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Assessments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nature-600">
                    {stats.waterSaved.toLocaleString()}L
                  </div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-earth-600">
                    {stats.households.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Households</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-water-100 to-nature-100 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-water-500 to-water-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Droplets className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Smart Assessment
                    </h3>
                    <p className="text-gray-600">
                      Auto-location detection + real-time weather data
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-water-600" />
                      <span>Roof Area</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-water-600" />
                      <span>Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-water-600" />
                      <span>Household Size</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-water-600" />
                      <span>Open Space</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Assessment Tool?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced platform combines GIS technology with proven algorithms
            to provide accurate, personalized recommendations for your rainwater
            harvesting project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-water-500 to-water-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Benefits of Rooftop Rainwater Harvesting
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of households already benefiting from sustainable
                water management and contributing to groundwater conservation
                efforts.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-nature-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="mt-8 bg-nature-600 hover:bg-nature-700"
              >
                <Link to="/assessment">
                  Get Started Today
                  <Leaf className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-nature-50 to-water-50 rounded-2xl p-8">
              <div className="text-center space-y-6">
                <div className="text-4xl font-bold text-nature-600">40%</div>
                <div className="text-lg text-gray-700">
                  Average water bill reduction
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-water-600">
                      15,000L
                    </div>
                    <div className="text-sm text-gray-600">
                      Annual harvest potential
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-earth-600">
                      ₹12,000
                    </div>
                    <div className="text-sm text-gray-600">Annual savings</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic">
                  *Based on average household assessments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-water-600 to-nature-600 border-none text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Water Conservation Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get your personalized RTRWH assessment in less than 5 minutes.
                Join the movement towards sustainable water management.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-water-700 hover:bg-gray-100"
              >
                <Link to="/assessment">
                  Start Free Assessment
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
