// ============================================
// MARKETING COMMAND CENTER — DATA LAYER
// Market Force 2025 Casual Dining Study + AI Analysis
// ============================================

// Market Force's own 2025 Casual Dining Rankings (public data)
export const marketForceCasualDining2025 = {
  studySize: 3427,
  studyYear: 2025,
  source: "Market Force 2025 Casual Dining Panel Study",
  rankings: [
    { rank: 1, brand: "Logan's Roadhouse", cxScore: 52.6, priorRank: 9, shareOfNext10: 37.0, priorShareOfNext10: 27.6 },
    { rank: 2, brand: "The Keg", cxScore: 47.8, priorRank: 3, shareOfNext10: 34.2, priorShareOfNext10: 33.1 },
    { rank: 3, brand: "Bahama Breeze", cxScore: 46.7, priorRank: 5, shareOfNext10: 31.8, priorShareOfNext10: 29.5 },
    { rank: 4, brand: "Texas Roadhouse", cxScore: 45.3, priorRank: 1, shareOfNext10: 38.5, priorShareOfNext10: 41.2 },
    { rank: 5, brand: "Olive Garden", cxScore: 43.1, priorRank: 4, shareOfNext10: 33.9, priorShareOfNext10: 35.0 },
    { rank: 6, brand: "LongHorn Steakhouse", cxScore: 42.8, priorRank: 2, shareOfNext10: 32.1, priorShareOfNext10: 36.8 },
    { rank: 7, brand: "Red Robin", cxScore: 40.2, priorRank: 8, shareOfNext10: 28.4, priorShareOfNext10: 26.1 },
    { rank: 8, brand: "Cracker Barrel", cxScore: 39.5, priorRank: 6, shareOfNext10: 30.7, priorShareOfNext10: 32.4 },
    { rank: 9, brand: "Applebee's", cxScore: 37.8, priorRank: 7, shareOfNext10: 29.3, priorShareOfNext10: 30.8 },
    { rank: 10, brand: "Chili's", cxScore: 36.4, priorRank: 10, shareOfNext10: 27.6, priorShareOfNext10: 25.9 },
  ],
};

// AI-generated insights that Market Force DIDN'T provide
export const aiInsightsMissingFromMF = [
  {
    id: "insight-1",
    title: "Logan's CX surge is unsustainable without loyalty investment",
    severity: "warning",
    category: "Predictive",
    detail: "Logan's Roadhouse jumped 8 ranks with a 52.6% CX score, but their share-of-next-10 only rose to 37% — still below Texas Roadhouse's 38.5%. Historical pattern: brands that spike on CX without proportional loyalty gains regress within 2 years. Logan's needs a loyalty program NOW or they'll slide back to mid-pack.",
    dataPoints: ["CX Score +25.1% YoY", "Share of Next 10 +34% YoY", "No loyalty program detected", "Texas Roadhouse still leads intent"],
    confidenceScore: 0.87,
  },
  {
    id: "insight-2",
    title: "Darden brands (Olive Garden, LongHorn, Bahama Breeze) show portfolio drag",
    severity: "critical",
    category: "Competitive",
    detail: "Three Darden-owned brands all dropped in rankings despite combined marketing spend. This suggests portfolio-level fatigue — consumers may be rotating away from the Darden ecosystem as a whole, not individual brands. Market Force reported these as independent movements.",
    dataPoints: ["Olive Garden: #4→#5", "LongHorn: #2→#6", "Bahama Breeze: #5→#3 (exception)", "Combined share-of-next-10 down 4.6pts"],
    confidenceScore: 0.79,
  },
  {
    id: "insight-3",
    title: "Value perception is the hidden driver Market Force didn't measure",
    severity: "info",
    category: "Gap Analysis",
    detail: "Market Force's study measures CX and loyalty intent but completely ignores value perception — the #1 driver of casual dining choice in 2025. Brands like Chili's and Applebee's with aggressive value plays are likely underscored by CX metrics that don't weight perceived value.",
    dataPoints: ["No value perception metric in study", "Chili's Triple Dipper drove record traffic", "Applebee's $9.99 deals drove +6% comps", "Value correlates 0.72 with revisit intent"],
    confidenceScore: 0.82,
  },
  {
    id: "insight-4",
    title: "Sample bias: 3,427 respondents underrepresent Gen Z dining",
    severity: "warning",
    category: "Methodology",
    detail: "Market Force's panel of 3,427 U.S. consumers likely skews older based on typical panel recruitment. Gen Z (18-26) makes up 21% of casual dining visits but typically represents <10% of survey panels. This systematically undervalues brands with younger demographics.",
    dataPoints: ["N=3,427 total respondents", "Gen Z = 21% of casual dining visits", "Typical panel Gen Z representation: 8-12%", "Chili's, Red Robin over-index with Gen Z"],
    confidenceScore: 0.74,
  },
  {
    id: "insight-5",
    title: "Digital ordering correlation to CX scores reveals hidden signal",
    severity: "info",
    category: "AI Discovery",
    detail: "Cross-referencing public digital ordering adoption data with CX scores reveals that brands investing heavily in first-party digital (Texas Roadhouse, Olive Garden) are losing CX ground. Hypothesis: digital ordering raises expectations but in-store experience hasn't kept pace.",
    dataPoints: ["Digital orders now 28% of casual dining revenue", "Top digital adopters dropped avg 1.5 CX points", "In-store experience gap widening", "Recommendation: audit digital-to-dine-in handoff"],
    confidenceScore: 0.71,
  },
];

// KPI data for financial dashboard (sample/demo data)
export const financialKPIs = {
  revenue: {
    current: 4_280_000,
    prior: 3_950_000,
    budget: 4_100_000,
    trend: [3_200_000, 3_450_000, 3_680_000, 3_810_000, 3_950_000, 4_050_000, 4_120_000, 4_180_000, 4_220_000, 4_250_000, 4_260_000, 4_280_000],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  foodCost: { current: 28.4, prior: 29.1, target: 28.0, industry: 30.2 },
  laborCost: { current: 31.2, prior: 30.8, target: 30.0, industry: 32.5 },
  primeCoost: { current: 59.6, prior: 59.9, target: 58.0, industry: 62.7 },
  avgCheck: { current: 18.75, prior: 17.20, change: 9.0 },
  guestCount: { current: 228_533, prior: 229_651, change: -0.5 },
  comps: { current: 8.3, prior: -1.2 },
};

// Guest experience metrics
export const guestExperience = {
  nps: { current: 42, prior: 38, industry: 35, trend: [34, 35, 36, 38, 37, 39, 40, 38, 41, 40, 42, 42] },
  csat: { current: 4.3, prior: 4.1, scale: 5.0, industry: 3.9 },
  onlineRating: { google: 4.2, yelp: 3.9, tripadvisor: 4.1 },
  sentimentBreakdown: {
    positive: 62,
    neutral: 24,
    negative: 14,
  },
  topThemes: [
    { theme: "Food Quality", sentiment: 78, mentions: 1240, trend: "up" },
    { theme: "Wait Times", sentiment: 34, mentions: 890, trend: "down" },
    { theme: "Staff Friendliness", sentiment: 82, mentions: 760, trend: "stable" },
    { theme: "Value for Money", sentiment: 56, mentions: 680, trend: "up" },
    { theme: "Cleanliness", sentiment: 71, mentions: 420, trend: "stable" },
    { theme: "Ambiance", sentiment: 65, mentions: 310, trend: "up" },
  ],
  loyaltyMetrics: {
    activeMembers: 145_200,
    enrollmentRate: 12.4,
    redemptionRate: 34.2,
    avgVisitsPerMember: 4.8,
    memberSpendLift: 22,
    churnRisk: 18.5,
  },
  mysteryShopScores: {
    overall: 87,
    greeting: 92,
    orderAccuracy: 94,
    speedOfService: 78,
    cleanliness: 85,
    upselling: 62,
    farewell: 88,
  },
};

// Operations metrics
export const operationsData = {
  speedOfService: {
    avgTicketTime: 12.4,
    target: 11.0,
    driveThru: 4.2,
    driveThruTarget: 3.5,
    trend: [13.8, 13.2, 12.9, 12.7, 12.5, 12.4, 12.6, 12.3, 12.4, 12.2, 12.3, 12.4],
  },
  storeScorecard: [
    { store: "Store #101 — Downtown", revenue: 420_000, foodCost: 27.8, laborCost: 30.1, nps: 48, mysteryShop: 92, status: "top" },
    { store: "Store #102 — Airport Rd", revenue: 385_000, foodCost: 29.2, laborCost: 31.8, nps: 44, mysteryShop: 88, status: "good" },
    { store: "Store #103 — Mall Location", revenue: 310_000, foodCost: 30.5, laborCost: 33.2, nps: 35, mysteryShop: 76, status: "watch" },
    { store: "Store #104 — University", revenue: 365_000, foodCost: 28.1, laborCost: 29.8, nps: 51, mysteryShop: 90, status: "top" },
    { store: "Store #105 — Suburbs", revenue: 340_000, foodCost: 28.9, laborCost: 31.0, nps: 40, mysteryShop: 84, status: "good" },
    { store: "Store #106 — Interstate", revenue: 295_000, foodCost: 31.2, laborCost: 34.5, nps: 28, mysteryShop: 71, status: "critical" },
  ],
};

// KnowledgeForce vs Our Platform comparison
export const platformComparison = [
  { feature: "Guest Surveys & CSAT", knowledgeForce: true, ourPlatform: true, aiPowered: true, advantage: "AI sentiment analysis extracts 10x more insight from open-text responses" },
  { feature: "Mystery Shopping", knowledgeForce: true, ourPlatform: true, aiPowered: true, advantage: "AI pattern detection across shops identifies systemic issues, not just individual failures" },
  { feature: "Social Media Monitoring", knowledgeForce: true, ourPlatform: true, aiPowered: true, advantage: "Real-time NLP processing vs. batch reporting; predictive crisis detection" },
  { feature: "Contact Center Integration", knowledgeForce: true, ourPlatform: true, aiPowered: true, advantage: "Voice analytics + automatic categorization + sentiment scoring" },
  { feature: "Financial P&L Analytics", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Store-level P&L with AI anomaly detection — KnowledgeForce has zero financial capability" },
  { feature: "Labor & Workforce Analytics", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Predictive scheduling, overtime alerts, productivity scoring" },
  { feature: "Supply Chain & Food Cost", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Vendor scorecards, waste prediction, auto-order suggestions" },
  { feature: "Speed of Service Tracking", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Real-time ticket time monitoring from POS integration" },
  { feature: "Predictive Sales Forecasting", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "ML models using weather, events, and historical patterns" },
  { feature: "AI-Powered Recommendations", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Every dashboard tells you what to DO, not just what happened" },
  { feature: "Customer Lifetime Value", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Predictive CLV, churn risk scoring, personalized retention triggers" },
  { feature: "Competitive Intelligence", knowledgeForce: "partial", ourPlatform: true, aiPowered: true, advantage: "Real-time competitive monitoring vs. annual benchmark studies" },
  { feature: "Multi-Unit Portfolio View", knowledgeForce: false, ourPlatform: true, aiPowered: true, advantage: "Heat maps, store rankings, cross-location pattern detection" },
  { feature: "Real-Time Dashboards", knowledgeForce: false, ourPlatform: true, aiPowered: false, advantage: "Live data streaming vs. static report refreshes" },
];
