// Aggregated state-level average annual rainfall (mm)
// Sources: IMD long-period averages and Kaggle India rainfall datasets (pre-aggregated)
// Values are approximate state-wide means intended for decision support, not micro-siting
export const STATE_RAINFALL_MM: Record<string, number> = {
  "Andhra Pradesh": 1000,
  "Arunachal Pradesh": 2782,
  Assam: 2130,
  Bihar: 1100,
  Chhattisgarh: 1300,
  Goa: 3000,
  Gujarat: 800,
  Haryana: 617,
  "Himachal Pradesh": 1250,
  Jharkhand: 1200,
  Karnataka: 1240,
  Kerala: 2925,
  "Madhya Pradesh": 1200,
  Maharashtra: 1130,
  Manipur: 1500,
  Meghalaya: 2814,
  Mizoram: 2540,
  Nagaland: 1800,
  Odisha: 1450,
  Punjab: 649,
  Rajasthan: 530,
  Sikkim: 2050,
  "Tamil Nadu": 970,
  Telangana: 905,
  Tripura: 2100,
  "Uttar Pradesh": 885,
  Uttarakhand: 1550,
  "West Bengal": 1770,
};

export const allStateValues = Object.values(STATE_RAINFALL_MM);
export const RAIN_MIN = Math.min(...allStateValues); // ~530
export const RAIN_MAX = Math.max(...allStateValues); // ~3000
