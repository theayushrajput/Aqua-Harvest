import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gift,
  DollarSign,
  CheckCircle,
  FileText,
  ExternalLink,
  Loader2,
  AlertCircle,
  MapPin,
  Zap,
  Droplets,
  Calendar,
  FileCheck,
} from "lucide-react";
import { getCurrentUser } from "@/utils/authUtils";
import {
  getSubsidiesForState,
  type StateSubsidies,
} from "@/utils/subsidiesUtils";

export default function Subsidies() {
  const [subsidies, setSubsidies] = useState<StateSubsidies | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "solar" | "rtrwh"
  >("all");
  const user = getCurrentUser();

  useEffect(() => {
    const loadSubsidies = async () => {
      try {
        setIsLoading(true);
        const userLocation = user?.location || "Pan-India";

        const category =
          selectedCategory === "all"
            ? undefined
            : (selectedCategory as "solar" | "rtrwh");
        const data = await getSubsidiesForState(userLocation, category);
        setSubsidies(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load subsidies",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSubsidies();
  }, [user, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Government Subsidies & Incentives
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore available financial benefits and incentives for solar panel
          and rainwater harvesting installations in your area
        </p>
      </div>

      {/* Location Info */}
      {user?.location && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Showing subsidies for:</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.location}
                  {user.pincode && ` (${user.pincode})`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="mb-8 flex gap-3 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="flex items-center space-x-2"
        >
          <Gift className="w-4 h-4" />
          <span>All Subsidies</span>
        </Button>
        <Button
          variant={selectedCategory === "solar" ? "default" : "outline"}
          onClick={() => setSelectedCategory("solar")}
          className="flex items-center space-x-2"
        >
          <Zap className="w-4 h-4" />
          <span>Solar Only</span>
        </Button>
        <Button
          variant={selectedCategory === "rtrwh" ? "default" : "outline"}
          onClick={() => setSelectedCategory("rtrwh")}
          className="flex items-center space-x-2"
        >
          <Droplets className="w-4 h-4" />
          <span>RTRWH Only</span>
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading available subsidies...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Subsidies List */}
      {subsidies && subsidies.subsidies.length > 0 && (
        <>
          {/* Summary Card */}
          <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">
                    Available Programs
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {subsidies.subsidies.length}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">
                    Total Potential Subsidy
                  </h3>
                  <p className="text-3xl font-bold text-emerald-600">
                    ₹{(subsidies.totalPotentialSubsidy / 100000).toFixed(1)}L+
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subsidies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subsidies.subsidies.map((subsidy) => (
              <Card
                key={subsidy.id}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{subsidy.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">
                        {subsidy.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Badges */}
                  <div className="flex gap-2 flex-wrap">
                    {subsidy.applicableFor.includes("solar") && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Zap className="w-3 h-3 mr-1" />
                        Solar
                      </Badge>
                    )}
                    {subsidy.applicableFor.includes("rtrwh") && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Droplets className="w-3 h-3 mr-1" />
                        RTRWH
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Benefits */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">
                        Subsidy Rate
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {subsidy.subsidyPercentage}%
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">
                        Max Amount
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{(subsidy.maxSubsidyAmount / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-blue-600" />
                      <span>Required Documents</span>
                    </h4>
                    <ul className="space-y-2">
                      {subsidy.documents.map((doc, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Process */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>Application Process</span>
                    </h4>
                    <ol className="space-y-2">
                      {subsidy.applicationProcess.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-3 text-sm text-gray-700"
                        >
                          <span className="font-semibold text-purple-600 min-w-6">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-3">
                      For more information:
                    </p>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${subsidy.contactEmail}`}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-2"
                      >
                        <span className="truncate">{subsidy.contactEmail}</span>
                      </a>
                      <a
                        href={subsidy.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Deadline if applicable */}
                  {subsidy.deadline && (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs text-amber-700 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Application Deadline:{" "}
                          <strong>{subsidy.deadline}</strong>
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Apply Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {subsidies && subsidies.subsidies.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No subsidies found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or check back later for new programs
          </p>
          <Button variant="outline" onClick={() => setSelectedCategory("all")}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span>Important Information</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            • Subsidy amounts and eligibility criteria vary by state and may
            change periodically
          </li>
          <li>• Most schemes require application within specific deadlines</li>
          <li>
            • Some subsidies are stackable (e.g., central + state schemes)
          </li>
          <li>
            • Always verify current eligibility and application requirements on
            official portals
          </li>
          <li>
            • Qualified installers and engineers must be registered with
            respective authorities
          </li>
        </ul>
      </div>
    </div>
  );
}
