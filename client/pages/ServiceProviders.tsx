import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Wrench,
  Users,
  Clock,
  DollarSign,
  ExternalLink,
  Loader2,
  AlertCircle,
  Building2,
  Zap,
  Droplets,
  MessageCircle,
} from "lucide-react";
import { getCurrentUser } from "@/utils/authUtils";
import {
  getServiceProvidersForLocation,
  getProviderStats,
  type ServiceProvider,
} from "@/utils/serviceProvidersUtils";

export default function ServiceProviders() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"solar" | "rtrwh" | "both">(
    "both",
  );
  const [selectedCategory, setSelectedCategory] = useState<
    "installer" | "consultant" | "maintenance" | "all"
  >("all");
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const user = getCurrentUser();

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setIsLoading(true);
        const userLocation = user?.location || "Bangalore";

        const cat =
          selectedCategory === "all"
            ? undefined
            : (selectedCategory as "installer" | "consultant" | "maintenance");

        const data = await getServiceProvidersForLocation(
          userLocation,
          selectedType,
          cat,
        );
        setProviders(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load service providers",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProviders();
  }, [user, selectedType, selectedCategory]);

  const stats = getProviderStats(providers);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "installer":
        return <Wrench className="w-4 h-4" />;
      case "consultant":
        return <Users className="w-4 h-4" />;
      case "maintenance":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "installer":
        return "bg-blue-100 text-blue-800";
      case "consultant":
        return "bg-purple-100 text-purple-800";
      case "maintenance":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return "text-green-600";
    if (rating >= 4.3) return "text-blue-600";
    return "text-amber-600";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Local Service Providers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find certified installers, consultants, and maintenance professionals
          for your solar and rainwater harvesting projects
        </p>
      </div>

      {/* Location Info */}
      {user?.location && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  Service providers near you:
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.location}
                  {user.pincode && ` (${user.pincode})`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Service Type
          </h3>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "both", label: "All Services" },
              { value: "solar", label: "Solar", icon: Zap },
              { value: "rtrwh", label: "RTRWH", icon: Droplets },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedType(option.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  selectedType === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {"icon" in option && option.icon && (
                  <>
                    {option.value === "solar" && <Zap className="w-4 h-4" />}
                    {option.value === "rtrwh" && (
                      <Droplets className="w-4 h-4" />
                    )}
                  </>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Provider Type
          </h3>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "all", label: "All Types", icon: Building2 },
              { value: "installer", label: "Installers", icon: Wrench },
              { value: "consultant", label: "Consultants", icon: Users },
              { value: "maintenance", label: "Maintenance", icon: Clock },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  selectedCategory === option.value
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      {providers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {providers.length}
              </div>
              <div className="text-sm text-gray-600">Providers Found</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div
                className={`text-2xl font-bold ${getRatingColor(stats.avgRating)}`}
              >
                {stats.avgRating}
              </div>
              <div className="text-sm text-gray-600">Avg. Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.avgExperience}+ yrs
              </div>
              <div className="text-sm text-gray-600">Avg. Experience</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalReviews}+
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading service providers...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Providers List */}
      {providers.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star
                          className={`w-5 h-5 ${getRatingColor(provider.rating)}`}
                        />
                        <span className="font-semibold text-gray-900">
                          {provider.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(provider.category)}>
                    {getCategoryIcon(provider.category)}
                    <span className="ml-1 capitalize">{provider.category}</span>
                  </Badge>
                </div>

                {/* Type badges */}
                <div className="flex gap-2">
                  {(provider.type === "both" || provider.type === "solar") && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Zap className="w-3 h-3 mr-1" />
                      Solar
                    </Badge>
                  )}
                  {(provider.type === "both" || provider.type === "rtrwh") && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Droplets className="w-3 h-3 mr-1" />
                      RTRWH
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location & Distance */}
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {provider.address}
                    </p>
                    <p className="text-gray-600">{provider.distance} km away</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a
                      href={`tel:${provider.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {provider.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <a
                      href={`mailto:${provider.email}`}
                      className="text-blue-600 hover:text-blue-700 truncate"
                    >
                      {provider.email}
                    </a>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="font-semibold text-gray-900">
                      {provider.yearsOfExperience}+ years
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Projects</p>
                    <p className="font-semibold text-gray-900">
                      {provider.previousProjects}+
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Response</p>
                    <p className="text-sm font-medium text-gray-900">
                      {provider.responseTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Cost</p>
                    <p className="text-sm font-medium text-gray-900">
                      {provider.averageProjectCost}
                    </p>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <p className="text-xs text-gray-600 mb-2 flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>Certifications</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {provider.certifications.slice(0, 2).map((cert, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                    {provider.certifications.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{provider.certifications.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && providers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No providers found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or check back later
          </p>
        </div>
      )}
    </div>
  );
}
