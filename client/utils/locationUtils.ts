// Location and Weather API utilities

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

export interface WeatherData {
  annualRainfall: number;
  monthlyRainfall: number[];
  temperature: number;
  humidity: number;
  dataSource: string;
}

// Get user's current location using Geolocation API
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding to get location details
          const locationData = await reverseGeocode(latitude, longitude);
          resolve(locationData);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    );
  });
};

// Reverse geocoding using OpenStreetMap Nominatim API (free alternative)
const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<LocationData> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "AquaHarvest-RTRWH-App",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location details");
    }

    const data = await response.json();

    return {
      latitude,
      longitude,
      city:
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "Unknown",
      state: data.address?.state || "Unknown",
      country: data.address?.country || "Unknown",
    };
  } catch (error) {
    throw new Error("Failed to get location details");
  }
};

// Get weather data using OpenWeatherMap API
export const getWeatherData = async (
  latitude: number,
  longitude: number,
): Promise<WeatherData> => {
  try {
    // Note: In production, you should use environment variables for API keys
    // For demo purposes, we'll use a mock implementation with realistic data

    // This would be the actual API call:
    // const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    // );

    // Mock weather data based on location (simulating real API response)
    const mockWeatherData = generateMockWeatherData(latitude, longitude);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return mockWeatherData;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

// Generate realistic mock weather data based on geographical location
const generateMockWeatherData = (
  latitude: number,
  longitude: number,
): WeatherData => {
  // India-specific rainfall patterns based on geographical zones
  let baseRainfall = 1000; // mm
  let temperature = 25; // °C

  // Adjust based on latitude (rough approximation for Indian subcontinent)
  if (latitude > 30) {
    // Northern regions (less rainfall, more extreme temperatures)
    baseRainfall = 600 + Math.random() * 400;
    temperature = 20 + Math.random() * 15;
  } else if (latitude > 23) {
    // Central regions
    baseRainfall = 800 + Math.random() * 600;
    temperature = 25 + Math.random() * 10;
  } else if (latitude > 15) {
    // Central-South regions
    baseRainfall = 1000 + Math.random() * 800;
    temperature = 27 + Math.random() * 8;
  } else {
    // Southern regions (higher rainfall)
    baseRainfall = 1200 + Math.random() * 1000;
    temperature = 28 + Math.random() * 6;
  }

  // Adjust for coastal areas (higher longitude values in India typically mean eastern regions)
  if (longitude > 85) {
    baseRainfall *= 1.3; // Eastern regions get more rainfall
  }

  // Generate monthly rainfall distribution (monsoon pattern)
  const monthlyRainfall = Array.from({ length: 12 }, (_, index) => {
    // Monsoon months (June-September) get higher rainfall
    if (index >= 5 && index <= 8) {
      return Math.round(
        baseRainfall * 0.15 + Math.random() * baseRainfall * 0.25,
      );
    }
    // Winter months get less rainfall
    else if (index >= 11 || index <= 2) {
      return Math.round(Math.random() * baseRainfall * 0.05);
    }
    // Transition months
    else {
      return Math.round(Math.random() * baseRainfall * 0.1);
    }
  });

  return {
    annualRainfall: Math.round(baseRainfall),
    monthlyRainfall,
    temperature: Math.round(temperature * 10) / 10,
    humidity: 60 + Math.random() * 30,
    dataSource: "OpenWeatherMap API (Simulated)",
  };
};

// Get state name from coordinates (for Indian states)
export const getIndianStateFromCoordinates = (
  latitude: number,
  longitude: number,
): string => {
  // Simplified state detection based on coordinates
  // In production, you'd use a more sophisticated geocoding service

  if (
    latitude >= 23.5 &&
    latitude <= 37 &&
    longitude >= 68 &&
    longitude <= 97
  ) {
    // Northern states
    if (latitude >= 30) {
      if (longitude <= 77) return "Punjab";
      if (longitude <= 80) return "Haryana";
      return "Himachal Pradesh";
    }
    if (longitude <= 72) return "Rajasthan";
    if (longitude <= 77) return "Delhi";
    if (longitude <= 81) return "Uttar Pradesh";
    if (longitude <= 88) return "Bihar";
    return "West Bengal";
  }

  if (latitude >= 15 && latitude <= 23.5) {
    // Central states
    if (longitude <= 74) return "Gujarat";
    if (longitude <= 77) return "Madhya Pradesh";
    if (longitude <= 81) return "Chhattisgarh";
    if (longitude <= 85) return "Jharkhand";
    return "Odisha";
  }

  if (latitude >= 8 && latitude <= 19) {
    // Southern states
    if (longitude <= 74) return "Goa";
    if (longitude <= 76) return "Karnataka";
    if (longitude <= 78) return "Tamil Nadu";
    if (longitude <= 80) return "Andhra Pradesh";
    return "Kerala";
  }

  // Default fallback
  return "Maharashtra";
};
