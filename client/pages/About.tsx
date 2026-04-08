import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Target,
  Users,
  TrendingUp,
  Leaf,
  Shield,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: Target,
      title: "Precise Assessment",
      description:
        "Advanced algorithms analyze your property's specific characteristics for accurate recommendations.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Designed to promote public participation in groundwater conservation efforts across India.",
    },
    {
      icon: TrendingUp,
      title: "Data-Driven",
      description:
        "GIS-based models provide reliable feasibility analysis and sizing recommendations.",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description:
        "Comprehensive sustainability metrics to showcase your contribution to water conservation.",
    },
  ];

  const benefits = [
    "Reduce dependency on municipal water supply",
    "Lower water bills and operational costs",
    "Improve groundwater levels in your area",
    "Ensure water security during drought periods",
    "Support government water conservation initiatives",
    "Increase property value with sustainable features",
  ];

  const process = [
    {
      step: 1,
      title: "Data Collection",
      description:
        "Input basic information about your location, household, and property details.",
    },
    {
      step: 2,
      title: "GIS Analysis",
      description:
        "Our system analyzes rainfall patterns, geological data, and local water characteristics.",
    },
    {
      step: 3,
      title: "Calculation",
      description:
        "Advanced algorithms compute harvest potential, system sizing, and cost estimates.",
    },
    {
      step: 4,
      title: "Recommendations",
      description:
        "Receive personalized recommendations with implementation guidelines.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="bg-water-100 text-water-700">
            About AquaHarvest
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Revolutionizing{" "}
            <span className="bg-gradient-to-r from-water-600 to-nature-600 bg-clip-text text-transparent">
              Water Conservation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform empowers individuals and communities to assess, plan,
            and implement rooftop rainwater harvesting systems for sustainable
            water management and groundwater conservation.
          </p>
          <Button asChild size="lg" className="bg-water-600 hover:bg-water-700">
            <Link to="/assessment">
              Start Your Assessment
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* What is RTRWH Section */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Rooftop Rainwater Harvesting?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Rooftop Rainwater Harvesting (RTRWH) is a sustainable practice
                  of collecting and storing rainwater from rooftops for various
                  uses including drinking, domestic purposes, and groundwater
                  recharge.
                </p>
                <p>
                  This ancient practice, modernized with today's technology,
                  provides an efficient solution to water scarcity while
                  reducing the burden on existing water infrastructure.
                </p>
                <p>
                  Our platform makes it easy for anyone to assess the
                  feasibility and potential of implementing RTRWH systems at
                  their location, promoting widespread adoption of this
                  sustainable practice.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-water-50 to-nature-50 rounded-2xl p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-water-500 to-water-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Key Components
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">Catchment</div>
                    <div className="text-gray-600">Roof surface</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">Conveyance</div>
                    <div className="text-gray-600">Gutters & pipes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">Storage</div>
                    <div className="text-gray-600">Tanks & reservoirs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">Treatment</div>
                    <div className="text-gray-600">Filtration systems</div>
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
            Why Choose Our Assessment Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced platform combines cutting-edge technology with proven
            methodologies to deliver accurate, actionable insights for your
            rainwater harvesting project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-water-500 to-water-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Assessment Process */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Assessment Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures you get accurate, comprehensive
              results in just a few minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-water-500 to-water-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Benefits of RTRWH Implementation
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Implementing a rooftop rainwater harvesting system brings multiple
              benefits to you, your community, and the environment.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-nature-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Button asChild className="mt-8 bg-nature-600 hover:bg-nature-700">
              <Link to="/assessment">
                Calculate Your Benefits
                <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg bg-gradient-to-br from-water-50 to-water-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-water-600 mb-2">
                  40%
                </div>
                <div className="text-gray-700">
                  Average reduction in water bills
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-nature-50 to-nature-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-nature-600 mb-2">
                  60%
                </div>
                <div className="text-gray-700">Water security improvement</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-earth-50 to-earth-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-earth-600 mb-2">
                  3-5 years
                </div>
                <div className="text-gray-700">Typical payback period</div>
              </CardContent>
            </Card>
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
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of households already contributing to water
                conservation. Start your RTRWH assessment today and take the
                first step towards sustainable water management.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-water-700 hover:bg-gray-100"
              >
                <Link to="/assessment">
                  Start Assessment Now
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
