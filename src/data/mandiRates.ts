export interface MandiRate {
  id: string;
  commodity: string;
  state: string;
  mandi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  previousModalPrice: number;
  unit: string;
  date: string;
}

export const mandiRates: MandiRate[] = [
  { id: "1", commodity: "Rice", state: "Punjab", mandi: "Amritsar", minPrice: 2100, maxPrice: 2350, modalPrice: 2200, previousModalPrice: 2150, unit: "Quintal", date: "2026-02-14" },
  { id: "2", commodity: "Rice", state: "West Bengal", mandi: "Burdwan", minPrice: 1900, maxPrice: 2200, modalPrice: 2050, previousModalPrice: 2100, unit: "Quintal", date: "2026-02-14" },
  { id: "3", commodity: "Wheat", state: "Haryana", mandi: "Karnal", minPrice: 2275, maxPrice: 2500, modalPrice: 2400, previousModalPrice: 2350, unit: "Quintal", date: "2026-02-14" },
  { id: "4", commodity: "Wheat", state: "Madhya Pradesh", mandi: "Indore", minPrice: 2200, maxPrice: 2450, modalPrice: 2350, previousModalPrice: 2380, unit: "Quintal", date: "2026-02-14" },
  { id: "5", commodity: "Cotton", state: "Gujarat", mandi: "Rajkot", minPrice: 6500, maxPrice: 7200, modalPrice: 6900, previousModalPrice: 6750, unit: "Quintal", date: "2026-02-14" },
  { id: "6", commodity: "Cotton", state: "Maharashtra", mandi: "Nagpur", minPrice: 6200, maxPrice: 7000, modalPrice: 6650, previousModalPrice: 6700, unit: "Quintal", date: "2026-02-14" },
  { id: "7", commodity: "Soybean", state: "Madhya Pradesh", mandi: "Indore", minPrice: 4200, maxPrice: 4800, modalPrice: 4500, previousModalPrice: 4400, unit: "Quintal", date: "2026-02-14" },
  { id: "8", commodity: "Tomato", state: "Karnataka", mandi: "Kolar", minPrice: 800, maxPrice: 1500, modalPrice: 1100, previousModalPrice: 1250, unit: "Quintal", date: "2026-02-14" },
  { id: "9", commodity: "Potato", state: "Uttar Pradesh", mandi: "Agra", minPrice: 600, maxPrice: 900, modalPrice: 750, previousModalPrice: 700, unit: "Quintal", date: "2026-02-14" },
  { id: "10", commodity: "Maize", state: "Karnataka", mandi: "Davangere", minPrice: 1800, maxPrice: 2200, modalPrice: 2000, previousModalPrice: 1950, unit: "Quintal", date: "2026-02-14" },
  { id: "11", commodity: "Sugarcane", state: "Uttar Pradesh", mandi: "Lucknow", minPrice: 350, maxPrice: 400, modalPrice: 385, previousModalPrice: 380, unit: "Quintal", date: "2026-02-14" },
  { id: "12", commodity: "Rice", state: "Tamil Nadu", mandi: "Thanjavur", minPrice: 2000, maxPrice: 2300, modalPrice: 2150, previousModalPrice: 2100, unit: "Quintal", date: "2026-02-14" },
  { id: "13", commodity: "Wheat", state: "Punjab", mandi: "Ludhiana", minPrice: 2300, maxPrice: 2550, modalPrice: 2450, previousModalPrice: 2400, unit: "Quintal", date: "2026-02-14" },
  { id: "14", commodity: "Tomato", state: "Andhra Pradesh", mandi: "Madanapalle", minPrice: 600, maxPrice: 1200, modalPrice: 900, previousModalPrice: 1050, unit: "Quintal", date: "2026-02-14" },
  { id: "15", commodity: "Potato", state: "West Bengal", mandi: "Hooghly", minPrice: 500, maxPrice: 800, modalPrice: 650, previousModalPrice: 680, unit: "Quintal", date: "2026-02-14" },
];

export const mandiStates = [...new Set(mandiRates.map((r) => r.state))];
export const mandiCommodities = [...new Set(mandiRates.map((r) => r.commodity))];
