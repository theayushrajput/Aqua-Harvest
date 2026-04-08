import {
  STATE_RAINFALL_MM,
  RAIN_MAX,
  RAIN_MIN,
} from "@/data/imd_kaggle_rainfall";

export interface RainfallProvenance {
  usedAnnualRainfall: number; // mm
  imdKaggleStateAverage?: number; // mm
  liveAnnualRainfall?: number; // mm
  userProvidedAnnualRainfall?: number; // mm
  sourceLabel: string; // e.g., "IMD/Kaggle state avg", "Live (OpenWeather) + IMD blend", "User provided"
}

export function getStateAverageRainfall(state?: string): number | undefined {
  if (!state) return undefined;
  return STATE_RAINFALL_MM[state] ?? undefined;
}

// Blend rule: if IMD/Kaggle state value and live are available => 70% state + 30% live (stability + recency)
// else prefer state, else prefer live, else use user input
export function getBlendedAnnualRainfall(
  state: string | undefined,
  liveAnnualRainfall: number | undefined,
  userProvidedAnnualRainfall: number | undefined,
): RainfallProvenance {
  const stateAvg = getStateAverageRainfall(state);
  if (stateAvg != null && isFinite(liveAnnualRainfall ?? NaN)) {
    const used = Math.round(
      stateAvg * 0.7 + (liveAnnualRainfall as number) * 0.3,
    );
    return {
      usedAnnualRainfall: used,
      imdKaggleStateAverage: stateAvg,
      liveAnnualRainfall: liveAnnualRainfall,
      userProvidedAnnualRainfall,
      sourceLabel: "IMD/Kaggle + Live blend",
    };
  }
  if (stateAvg != null) {
    return {
      usedAnnualRainfall: Math.round(stateAvg),
      imdKaggleStateAverage: stateAvg,
      liveAnnualRainfall,
      userProvidedAnnualRainfall,
      sourceLabel: "IMD/Kaggle state avg",
    };
  }
  if (isFinite(liveAnnualRainfall ?? NaN)) {
    return {
      usedAnnualRainfall: Math.round(liveAnnualRainfall as number),
      imdKaggleStateAverage: undefined,
      liveAnnualRainfall,
      userProvidedAnnualRainfall,
      sourceLabel: "Live annual rainfall",
    };
  }
  const fallback = userProvidedAnnualRainfall ?? 1000;
  return {
    usedAnnualRainfall: Math.round(fallback),
    imdKaggleStateAverage: undefined,
    liveAnnualRainfall,
    userProvidedAnnualRainfall,
    sourceLabel: userProvidedAnnualRainfall ? "User provided" : "Default",
  };
}

export function rainfallPercentile(mm: number): number {
  const clamped = Math.max(RAIN_MIN, Math.min(RAIN_MAX, mm));
  return (clamped - RAIN_MIN) / (RAIN_MAX - RAIN_MIN); // 0..1
}
