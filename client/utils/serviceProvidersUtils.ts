// Local Service Providers utilities

export interface ServiceProvider {
  id: string;
  name: string;
  type: "solar" | "rtrwh" | "both";
  category: "installer" | "consultant" | "maintenance";
  location: string;
  distance: number; // km from user location
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating: number; // 0-5
  reviewCount: number;
  certifications: string[];
  yearsOfExperience: number;
  serviceArea: string[]; // states/cities they serve
  languages: string[];
  responseTime: string; // e.g., "24 hours"
  averageProjectCost: string;
  previousProjects: number;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

// Mock LocalServiceRegistry
export const getServiceProvidersForLocation = async (
  location: string,
  serviceType?: "solar" | "rtrwh" | "both",
  category?: "installer" | "consultant" | "maintenance",
): Promise<ServiceProvider[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const providers: ServiceProvider[] = [
    {
      id: "sp1",
      name: "SolarTech Solutions",
      type: "solar",
      category: "installer",
      location: "Bangalore",
      distance: 2.3,
      address: "123 Tech Park, Whitefield, Bangalore",
      phone: "+91-8025-123456",
      email: "info@solartechsolutions.com",
      website: "www.solartechsolutions.com",
      rating: 4.8,
      reviewCount: 147,
      certifications: ["MNRE Certified", "BIS Certified", "ISO 9001:2015"],
      yearsOfExperience: 8,
      serviceArea: ["Karnataka", "Telangana", "Tamil Nadu"],
      languages: ["English", "Kannada", "Hindi"],
      responseTime: "24 hours",
      averageProjectCost: "₹3,00,000 - ₹5,00,000",
      previousProjects: 450,
      reviews: [
        {
          author: "Rajesh K.",
          rating: 5,
          comment:
            "Excellent service! Installation was completed on time with great workmanship.",
          date: "2024-01-15",
        },
        {
          author: "Priya S.",
          rating: 5,
          comment: "Very professional team. They explained everything clearly.",
          date: "2024-01-10",
        },
      ],
    },
    {
      id: "sp2",
      name: "EcoWater Harvesting Experts",
      type: "rtrwh",
      category: "installer",
      location: "Bangalore",
      distance: 5.1,
      address: "456 Green Garden, Koramangala, Bangalore",
      phone: "+91-9876-543210",
      email: "contact@ecowaterharvesting.in",
      website: "www.ecowaterharvesting.in",
      rating: 4.6,
      reviewCount: 89,
      certifications: [
        "Ministry of Jal Shakti Approved",
        "NWDPRA Member",
        "ISO Certified",
      ],
      yearsOfExperience: 12,
      serviceArea: ["Karnataka", "Andhra Pradesh", "Telangana"],
      languages: ["English", "Kannada", "Telugu", "Hindi"],
      responseTime: "48 hours",
      averageProjectCost: "₹1,50,000 - ₹3,00,000",
      previousProjects: 320,
      reviews: [
        {
          author: "Amit P.",
          rating: 5,
          comment: "Perfect RTRWH system setup. Great maintenance support.",
          date: "2024-01-20",
        },
        {
          author: "Sneha M.",
          rating: 4,
          comment: "Good quality work. Would recommend!",
          date: "2024-01-18",
        },
      ],
    },
    {
      id: "sp3",
      name: "Renewable Energy Consultants",
      type: "both",
      category: "consultant",
      location: "Bangalore",
      distance: 3.7,
      address: "789 Innovation Hub, Indiranagar, Bangalore",
      phone: "+91-7654-321098",
      email: "consult@renewableenergycons.com",
      website: "www.renewableenergycons.com",
      rating: 4.9,
      reviewCount: 156,
      certifications: [
        "B.E. in Renewable Energy",
        "MNRE Advisor",
        "PV Design Expert",
      ],
      yearsOfExperience: 15,
      serviceArea: ["All Indian States"],
      languages: ["English", "Hindi", "Kannada", "Tamil"],
      responseTime: "Same day",
      averageProjectCost: "Consultation: ₹5,000-₹15,000",
      previousProjects: 680,
      reviews: [
        {
          author: "Vikram R.",
          rating: 5,
          comment:
            "Excellent technical guidance. Helped me choose the right system.",
          date: "2024-01-22",
        },
      ],
    },
    {
      id: "sp4",
      name: "ProSolar Maintenance Services",
      type: "solar",
      category: "maintenance",
      location: "Bangalore",
      distance: 4.2,
      address: "321 Service Center, Yelahanka, Bangalore",
      phone: "+91-8888-999999",
      email: "service@prosolarcare.in",
      rating: 4.7,
      reviewCount: 203,
      certifications: [
        "Authorized Service Partner",
        "Inverter Expert",
        "Panel Cleaning Certified",
      ],
      yearsOfExperience: 6,
      serviceArea: ["Karnataka"],
      languages: ["English", "Kannada", "Hindi"],
      responseTime: "24 hours",
      averageProjectCost: "Annual Maintenance: ₹5,000-₹10,000",
      previousProjects: 500,
      reviews: [
        {
          author: "Deepak V.",
          rating: 5,
          comment:
            "Regular maintenance keeps my system running efficiently. Great support!",
          date: "2024-01-19",
        },
      ],
    },
    {
      id: "sp5",
      name: "Integrated Water Solutions",
      type: "rtrwh",
      category: "consultant",
      location: "Bangalore",
      distance: 6.8,
      address: "654 Water Park, Hebbal, Bangalore",
      phone: "+91-9090-123456",
      email: "info@waterintegrated.org",
      rating: 4.5,
      reviewCount: 76,
      certifications: ["Hydrogeologist", "Water Quality Expert"],
      yearsOfExperience: 18,
      serviceArea: ["All States"],
      languages: ["English", "Hindi", "Kannada", "Tamil", "Telugu"],
      responseTime: "2-3 days",
      averageProjectCost: "Consultation: ₹10,000-₹25,000",
      previousProjects: 450,
      reviews: [
        {
          author: "Suresh K.",
          rating: 5,
          comment: "Thorough water quality analysis. Very knowledgeable.",
          date: "2024-01-17",
        },
      ],
    },
    {
      id: "sp6",
      name: "Smart Systems Integration",
      type: "both",
      category: "installer",
      location: "Bangalore",
      distance: 7.5,
      address: "987 Tech Complex, Marathahalli, Bangalore",
      phone: "+91-7777-666666",
      email: "projects@smartsysint.com",
      website: "www.smartsystemsintegration.com",
      rating: 4.4,
      reviewCount: 112,
      certifications: ["IoT Expert", "SCADA Trained", "Smart Monitoring"],
      yearsOfExperience: 7,
      serviceArea: ["Karnataka", "Andhra Pradesh"],
      languages: ["English", "Hindi", "Kannada"],
      responseTime: "24-48 hours",
      averageProjectCost: "₹3,50,000 - ₹7,50,000",
      previousProjects: 200,
      reviews: [
        {
          author: "Arjun S.",
          rating: 5,
          comment:
            "Smart monitoring system is very helpful. Great integration!",
          date: "2024-01-21",
        },
      ],
    },
  ];

  // Filter by service type if specified
  let filtered = providers;
  if (serviceType && serviceType !== "both") {
    filtered = filtered.filter(
      (p) => p.type === "both" || p.type === serviceType,
    );
  }

  // Filter by category if specified
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Sort by rating and then by distance
  return filtered.sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return a.distance - b.distance;
  });
};

export const getProviderStats = (providers: ServiceProvider[]) => {
  if (providers.length === 0) {
    return {
      avgRating: 0,
      totalReviews: 0,
      avgExperience: 0,
      totalProjects: 0,
    };
  }

  return {
    avgRating:
      Math.round(
        (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length) *
          10,
      ) / 10,
    totalReviews: providers.reduce((sum, p) => sum + p.reviewCount, 0),
    avgExperience: Math.round(
      providers.reduce((sum, p) => sum + p.yearsOfExperience, 0) /
        providers.length,
    ),
    totalProjects: providers.reduce((sum, p) => sum + p.previousProjects, 0),
  };
};
