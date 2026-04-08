import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Video,
  Users,
  Calculator,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Resources() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Implementation Guides",
      description: "Step-by-step guides for implementing RTRWH systems",
      count: 12,
      items: [
        "Complete Installation Manual",
        "Maintenance Guidelines",
        "Quality Control Checklist",
        "Safety Procedures",
      ],
    },
    {
      icon: FileText,
      title: "Technical Documents",
      description: "Technical specifications and design standards",
      count: 8,
      items: [
        "Design Standards",
        "Material Specifications",
        "Cost Estimation Templates",
        "Performance Metrics",
      ],
    },
    {
      icon: Video,
      title: "Educational Videos",
      description: "Visual guides and educational content",
      count: 15,
      items: [
        "RTRWH Basics",
        "Installation Tutorials",
        "Maintenance Tips",
        "Success Stories",
      ],
    },
    {
      icon: Calculator,
      title: "Calculation Tools",
      description: "Additional tools and calculators for planning",
      count: 6,
      items: [
        "Storage Calculator",
        "Cost Estimator",
        "ROI Calculator",
        "Water Quality Checker",
      ],
    },
  ];

  const popularResources = [
    {
      title: "RTRWH Implementation Handbook",
      description:
        "Comprehensive guide covering all aspects of rooftop rainwater harvesting implementation",
      type: "PDF Guide",
      size: "2.4 MB",
      downloads: 1247,
    },
    {
      title: "State-wise Guidelines",
      description:
        "Specific guidelines and regulations for different Indian states",
      type: "PDF Document",
      size: "1.8 MB",
      downloads: 856,
    },
    {
      title: "Cost Estimation Template",
      description:
        "Excel template for calculating implementation costs and ROI",
      type: "Excel File",
      size: "245 KB",
      downloads: 2134,
    },
    {
      title: "Maintenance Checklist",
      description: "Monthly and yearly maintenance checklist for RTRWH systems",
      type: "PDF Checklist",
      size: "156 KB",
      downloads: 967,
    },
  ];

  const externalLinks = [
    {
      title: "Ministry of Jal Shakti",
      description: "Official government resources on water conservation",
      url: "https://jalshakti.gov.in",
      organization: "Government of India",
    },
    {
      title: "Central Ground Water Board",
      description: "Guidelines and policies for groundwater management",
      url: "https://cgwb.gov.in",
      organization: "CGWB",
    },
    {
      title: "Rainwater Harvesting Association",
      description: "Industry best practices and standards",
      url: "https://rainwaterharvesting.org",
      organization: "RHA India",
    },
  ];

  const faqs = [
    {
      question: "What is the minimum roof area required for RTRWH?",
      answer:
        "There's no strict minimum, but typically 500 sq ft can provide meaningful water collection for a small household.",
    },
    {
      question: "How much does a basic RTRWH system cost?",
      answer:
        "Basic systems start from ₹25,000-50,000 depending on the size and components chosen.",
    },
    {
      question: "Is rainwater safe for drinking?",
      answer:
        "With proper filtration and treatment, harvested rainwater can be made safe for drinking. First-flush diverters and filtration systems are essential.",
    },
    {
      question: "What maintenance is required?",
      answer:
        "Regular cleaning of gutters, checking filters, and annual system inspection are the main maintenance requirements.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="bg-water-100 text-water-700">
            Learning Resources
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            RTRWH{" "}
            <span className="bg-gradient-to-r from-water-600 to-nature-600 bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources to help you understand, plan, and implement
            rooftop rainwater harvesting systems successfully.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Resource Categories
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about rainwater harvesting, organized by
            category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-water-500 to-water-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {category.count} items
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 text-water-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    View All Resources
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Popular Downloads */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Downloads
            </h2>
            <p className="text-lg text-gray-600">
              Most downloaded resources by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularResources.map((resource, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{resource.type}</span>
                        <span>{resource.size}</span>
                        <span>
                          {resource.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-water-600 flex-shrink-0 ml-4" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            External Resources
          </h2>
          <p className="text-lg text-gray-600">
            Additional resources from government and industry organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {externalLinks.map((link, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {link.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {link.organization}
                    </Badge>
                  </div>
                  <ExternalLink className="w-5 h-5 text-water-600 flex-shrink-0 ml-4" />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Site
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about RTRWH
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 text-water-600 mr-2 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-water-600 to-nature-600 border-none text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Have all the information you need? Take the next step and assess
                your property's rainwater harvesting potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-water-700 hover:bg-gray-100"
                >
                  <Link to="/assessment">
                    Start Assessment
                    <Calculator className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-water-700"
                >
                  Contact Support
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
