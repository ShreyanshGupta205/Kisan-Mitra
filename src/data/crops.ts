export interface Crop {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  image: string;
  season: string;
  soilType: string;
  climate: string;
  waterNeeds: string;
  growingPeriod: string;
  expectedYield: string;
  overview: string;
  bestPractices: {
    sowing: string;
    irrigation: string;
    pestControl: string;
    harvesting: string;
    fertilizer: string;
  };
  diseases: string[];
}

export const crops: Crop[] = [
  {
    id: "rice",
    name: "Rice",
    hindiName: "चावल",
    category: "Cereal",
    image: "🌾",
    season: "Kharif (June–November)",
    soilType: "Clayey, loamy",
    climate: "Hot & humid, 20–37°C",
    waterNeeds: "High – requires standing water",
    growingPeriod: "120–150 days",
    expectedYield: "3–6 tonnes/hectare",
    overview: "Rice is the staple food for over half of India. It is grown primarily in irrigated and rain-fed lowland areas across states like West Bengal, Punjab, and Tamil Nadu.",
    bestPractices: {
      sowing: "Transplanting nursery seedlings at 20–25 days old in puddled fields. Maintain 20×15 cm spacing.",
      irrigation: "Maintain 5 cm standing water during vegetative stage. Drain 2 weeks before harvest.",
      pestControl: "Watch for stem borers, leaf folders, and BPH. Use neem-based sprays and pheromone traps.",
      harvesting: "Harvest when 80% grains turn golden. Use combine harvesters for efficiency.",
      fertilizer: "Apply 120:60:40 kg NPK/ha. Split nitrogen into 3 doses: basal, tillering, panicle initiation.",
    },
    diseases: ["Blast", "Bacterial leaf blight", "Sheath blight", "Brown spot"],
  },
  {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेहूं",
    category: "Cereal",
    image: "🌾",
    season: "Rabi (November–April)",
    soilType: "Well-drained loamy",
    climate: "Cool & dry, 10–25°C",
    waterNeeds: "Moderate – 4-6 irrigations",
    growingPeriod: "110–140 days",
    expectedYield: "4–6 tonnes/hectare",
    overview: "Wheat is India's second most important cereal after rice. Major producing states include Punjab, Haryana, UP, and MP.",
    bestPractices: {
      sowing: "Sow in mid-November using seed drill at 20 cm row spacing. Seed rate: 100 kg/ha.",
      irrigation: "Critical stages: crown root initiation, tillering, flowering, and grain filling.",
      pestControl: "Monitor for aphids and army worms. Use systemic insecticides if threshold exceeded.",
      harvesting: "Harvest when grains are hard and moisture drops to 14%. Use combine harvester.",
      fertilizer: "Apply 120:60:40 kg NPK/ha. Full P & K at sowing, split N in 2–3 doses.",
    },
    diseases: ["Rust (yellow, brown, black)", "Karnal bunt", "Powdery mildew", "Loose smut"],
  },
  {
    id: "cotton",
    name: "Cotton",
    hindiName: "कपास",
    category: "Fiber",
    image: "🌿",
    season: "Kharif (April–December)",
    soilType: "Black cotton soil, deep loamy",
    climate: "Warm, 21–35°C",
    waterNeeds: "Moderate – furrow irrigation",
    growingPeriod: "150–180 days",
    expectedYield: "2–3 tonnes lint/hectare",
    overview: "Cotton is India's most important fiber crop, grown primarily in Gujarat, Maharashtra, Telangana, and Rajasthan.",
    bestPractices: {
      sowing: "Sow after pre-monsoon showers. Use Bt cotton hybrids. Spacing: 90×60 cm.",
      irrigation: "Drip irrigation preferred. Critical stages: flowering and boll development.",
      pestControl: "IPM approach for bollworm, whitefly, jassids. Use pheromone traps and refuge crops.",
      harvesting: "Pick bolls as they open fully. 3–4 pickings over 6–8 weeks.",
      fertilizer: "Apply 120:60:60 kg NPK/ha. Use micronutrients like zinc and boron.",
    },
    diseases: ["Bacterial blight", "Grey mildew", "Fusarium wilt", "Root rot"],
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    hindiName: "गन्ना",
    category: "Cash Crop",
    image: "🎋",
    season: "Year-round (plant: Feb–Mar)",
    soilType: "Deep, well-drained loamy",
    climate: "Tropical, 20–35°C",
    waterNeeds: "Very high – frequent irrigation",
    growingPeriod: "10–18 months",
    expectedYield: "70–100 tonnes/hectare",
    overview: "Sugarcane is a major cash crop grown in UP, Maharashtra, Karnataka, and Tamil Nadu. It is the primary source of sugar and jaggery.",
    bestPractices: {
      sowing: "Plant 2–3 budded setts in furrows at 75 cm spacing. Treat setts with fungicide.",
      irrigation: "Irrigate every 7–10 days. Drip irrigation saves 30–40% water.",
      pestControl: "Early shoot borer and top borer are major pests. Release Trichogramma parasitoids.",
      harvesting: "Harvest 10–12 months after planting when Brix reading exceeds 18%.",
      fertilizer: "Apply 250:100:120 kg NPK/ha in splits. Use press mud and green manure.",
    },
    diseases: ["Red rot", "Smut", "Wilt", "Grassy shoot disease"],
  },
  {
    id: "tomato",
    name: "Tomato",
    hindiName: "टमाटर",
    category: "Vegetable",
    image: "🍅",
    season: "Rabi & Kharif",
    soilType: "Well-drained sandy loam",
    climate: "Warm, 20–30°C",
    waterNeeds: "Moderate – drip preferred",
    growingPeriod: "60–90 days",
    expectedYield: "20–40 tonnes/hectare",
    overview: "Tomato is one of India's most widely grown vegetables, cultivated across seasons in states like Andhra Pradesh, Karnataka, and MP.",
    bestPractices: {
      sowing: "Transplant 25–30 day old seedlings at 60×45 cm spacing. Use mulch for weed control.",
      irrigation: "Drip irrigation with fertigation is ideal. Avoid water stress during fruiting.",
      pestControl: "Major pests: fruit borer, whitefly, leaf miner. Use yellow sticky traps and neem sprays.",
      harvesting: "Pick fruits at breaker stage for distant markets, ripe for local sale.",
      fertilizer: "Apply 120:80:80 kg NPK/ha. Supplement with calcium to prevent blossom end rot.",
    },
    diseases: ["Early blight", "Late blight", "Bacterial wilt", "Tomato leaf curl virus"],
  },
  {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    category: "Oilseed",
    image: "🫘",
    season: "Kharif (June–October)",
    soilType: "Well-drained loamy",
    climate: "Warm, 20–30°C",
    waterNeeds: "Moderate – rain-fed mostly",
    growingPeriod: "85–120 days",
    expectedYield: "1.5–3 tonnes/hectare",
    overview: "Soybean is a major oilseed and protein crop grown extensively in Madhya Pradesh, Maharashtra, and Rajasthan.",
    bestPractices: {
      sowing: "Sow with onset of monsoon. Row spacing 30–45 cm. Seed rate: 60–80 kg/ha. Treat with Rhizobium.",
      irrigation: "Mostly rain-fed. Provide life-saving irrigation during dry spells at flowering.",
      pestControl: "Watch for stem fly, girdle beetle, and semilooper. Use IPM approaches.",
      harvesting: "Harvest when 95% pods turn brown and leaves shed. Avoid delays to reduce shattering.",
      fertilizer: "Apply 20:60:40 kg NPK/ha. Rhizobium inoculation reduces N requirement.",
    },
    diseases: ["Yellow mosaic", "Charcoal rot", "Anthracnose", "Pod blight"],
  },
  {
    id: "potato",
    name: "Potato",
    hindiName: "आलू",
    category: "Vegetable",
    image: "🥔",
    season: "Rabi (October–March)",
    soilType: "Sandy loam, well-drained",
    climate: "Cool, 15–25°C",
    waterNeeds: "Moderate – 8-10 irrigations",
    growingPeriod: "75–120 days",
    expectedYield: "25–40 tonnes/hectare",
    overview: "Potato is the most important vegetable crop in India, grown mainly in UP, West Bengal, Bihar, and Gujarat.",
    bestPractices: {
      sowing: "Plant certified seed tubers at 60×20 cm spacing. Cut large tubers into pieces with 2–3 eyes.",
      irrigation: "Light, frequent irrigations. Critical at stolon formation and tuber bulking stages.",
      pestControl: "Major pests: potato tuber moth, aphids. Use treated seed and crop rotation.",
      harvesting: "Harvest 10–15 days after haulm cutting when skin sets. Avoid bruising.",
      fertilizer: "Apply 180:80:100 kg NPK/ha. Use organic manure for soil health.",
    },
    diseases: ["Late blight", "Early blight", "Black scurf", "Common scab"],
  },
  {
    id: "maize",
    name: "Maize",
    hindiName: "मक्का",
    category: "Cereal",
    image: "🌽",
    season: "Kharif & Rabi",
    soilType: "Well-drained sandy loam to loam",
    climate: "Warm, 21–30°C",
    waterNeeds: "Moderate – 6-8 irrigations",
    growingPeriod: "80–110 days",
    expectedYield: "5–10 tonnes/hectare",
    overview: "Maize is a versatile crop used for food, feed, and industrial purposes. Major states include Karnataka, Rajasthan, MP, and Bihar.",
    bestPractices: {
      sowing: "Use single-cross hybrids. Spacing: 60×20 cm. Seed rate: 20 kg/ha.",
      irrigation: "Critical at knee-high, tasseling, and grain-fill stages. Avoid waterlogging.",
      pestControl: "Fall army worm is a major threat. Scout early, use bio-pesticides and chemical sprays.",
      harvesting: "Harvest when husks dry and grain moisture drops to 20–25%. Dry to 12% for storage.",
      fertilizer: "Apply 150:60:40 kg NPK/ha. Zinc application boosts yield significantly.",
    },
    diseases: ["Turcicum leaf blight", "Maydis leaf blight", "Downy mildew", "Stalk rot"],
  },
];

export const cropCategories = [...new Set(crops.map((c) => c.category))];
export const cropSeasons = [...new Set(crops.map((c) => c.season))];
