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

// Profit & Loss statement for Five Guys
export const profitAndLoss = {
  period: 'Q1 2025',
  lines: [
    { category: 'Net Sales', amount: 4_280_000, budget: 4_100_000, priorYear: 3_950_000 },
    { category: 'Food & Paper', amount: -1_215_520, budget: -1_148_000, priorYear: -1_150_450, pctSales: 28.4 },
    { category: 'Labor', amount: -1_335_360, budget: -1_230_000, priorYear: -1_216_600, pctSales: 31.2 },
    { category: 'Occupancy', amount: -342_400, budget: -328_000, priorYear: -316_000, pctSales: 8.0 },
    { category: 'Operating Expenses', amount: -256_800, budget: -246_000, priorYear: -237_000, pctSales: 6.0 },
    { category: 'Marketing', amount: -128_400, budget: -123_000, priorYear: -118_500, pctSales: 3.0 },
    { category: 'EBITDA', amount: 1_001_520, budget: 1_025_000, priorYear: 911_450, pctSales: 23.4 },
    { category: 'Depreciation', amount: -171_200, budget: -164_000, priorYear: -158_000, pctSales: 4.0 },
    { category: 'Net Operating Income', amount: 830_320, budget: 861_000, priorYear: 753_450, pctSales: 19.4 },
  ]
};

// Labor breakdown data
export const laborAnalytics = {
  totalHours: 18_420,
  overtimeHours: 1_240,
  overtimeCost: 48_360,
  avgHourlyRate: 16.85,
  turnoverRate: 68,
  industryTurnover: 75,
  byRole: [
    { role: 'Crew Members', headcount: 84, avgHours: 28, costPct: 52 },
    { role: 'Shift Leaders', headcount: 18, avgHours: 38, costPct: 22 },
    { role: 'Assistant Managers', headcount: 8, avgHours: 44, costPct: 14 },
    { role: 'General Managers', headcount: 6, avgHours: 48, costPct: 12 },
  ],
  peakHours: [
    { hour: '11am', staffing: 12, demand: 14, gap: -2 },
    { hour: '12pm', staffing: 14, demand: 18, gap: -4 },
    { hour: '1pm', staffing: 14, demand: 16, gap: -2 },
    { hour: '2pm', staffing: 10, demand: 9, gap: 1 },
    { hour: '5pm', staffing: 12, demand: 15, gap: -3 },
    { hour: '6pm', staffing: 14, demand: 17, gap: -3 },
    { hour: '7pm', staffing: 14, demand: 14, gap: 0 },
    { hour: '8pm', staffing: 10, demand: 8, gap: 2 },
  ],
  schedulingEfficiency: 78,
  schedulingTarget: 90,
};

// Customer cohort data
export const customerSegments = {
  segments: [
    { name: 'VIP Regulars', pct: 8, visits: 12.4, avgCheck: 24.50, ltv: 3_650, retention: 94, growth: 2.1 },
    { name: 'Loyal Fans', pct: 22, visits: 6.8, avgCheck: 20.10, ltv: 1_640, retention: 82, growth: 5.4 },
    { name: 'Occasionals', pct: 35, visits: 2.4, avgCheck: 18.75, ltv: 540, retention: 58, growth: -1.2 },
    { name: 'New Guests', pct: 18, visits: 1.2, avgCheck: 17.90, ltv: 258, retention: 34, growth: 8.7 },
    { name: 'Lapsed', pct: 17, visits: 0.3, avgCheck: 16.20, ltv: 58, retention: 12, growth: -4.3 },
  ],
  conversionFunnel: [
    { stage: 'New → Repeat', rate: 42 },
    { stage: 'Repeat → Loyal', rate: 38 },
    { stage: 'Loyal → VIP', rate: 18 },
  ],
  reactivationOpportunity: {
    lapsedCount: 24_700,
    estimatedRevenue: 712_000,
    winBackRate: 22,
  },
};

// Expanded store data with 10 stores
export const storeRankings = [
  { id: 101, name: 'Downtown', revenue: 420_000, foodCost: 27.8, laborCost: 30.1, nps: 48, mysteryShop: 92, ticketTime: 11.2, guestCount: 22_400, compSales: 12.1, status: 'top', aiRank: 1 },
  { id: 104, name: 'University', revenue: 365_000, foodCost: 28.1, laborCost: 29.8, nps: 51, mysteryShop: 90, ticketTime: 11.8, guestCount: 19_500, compSales: 9.8, status: 'top', aiRank: 2 },
  { id: 102, name: 'Airport Rd', revenue: 385_000, foodCost: 29.2, laborCost: 31.8, nps: 44, mysteryShop: 88, ticketTime: 12.1, guestCount: 20_500, compSales: 7.4, status: 'good', aiRank: 3 },
  { id: 107, name: 'Riverside', revenue: 355_000, foodCost: 28.5, laborCost: 30.4, nps: 43, mysteryShop: 86, ticketTime: 12.5, guestCount: 18_900, compSales: 6.2, status: 'good', aiRank: 4 },
  { id: 105, name: 'Suburbs', revenue: 340_000, foodCost: 28.9, laborCost: 31.0, nps: 40, mysteryShop: 84, ticketTime: 12.8, guestCount: 18_100, compSales: 4.8, status: 'good', aiRank: 5 },
  { id: 108, name: 'Tech Park', revenue: 330_000, foodCost: 29.4, laborCost: 31.5, nps: 39, mysteryShop: 82, ticketTime: 13.0, guestCount: 17_600, compSales: 3.1, status: 'good', aiRank: 6 },
  { id: 109, name: 'Waterfront', revenue: 320_000, foodCost: 29.8, laborCost: 32.0, nps: 37, mysteryShop: 80, ticketTime: 13.2, guestCount: 17_100, compSales: 1.9, status: 'watch', aiRank: 7 },
  { id: 103, name: 'Mall Location', revenue: 310_000, foodCost: 30.5, laborCost: 33.2, nps: 35, mysteryShop: 76, ticketTime: 13.8, guestCount: 16_500, compSales: -0.5, status: 'watch', aiRank: 8 },
  { id: 110, name: 'Highway Plaza', revenue: 298_000, foodCost: 30.8, laborCost: 33.8, nps: 31, mysteryShop: 74, ticketTime: 14.1, guestCount: 15_900, compSales: -2.1, status: 'watch', aiRank: 9 },
  { id: 106, name: 'Interstate', revenue: 295_000, foodCost: 31.2, laborCost: 34.5, nps: 28, mysteryShop: 71, ticketTime: 14.8, guestCount: 15_700, compSales: -3.8, status: 'critical', aiRank: 10 },
];

// Time-of-day performance
export const daypartAnalysis = {
  dayparts: [
    { name: 'Lunch (11am-2pm)', revenuePct: 38, guestPct: 42, avgCheck: 16.80, trend: 'up' },
    { name: 'Afternoon (2pm-5pm)', revenuePct: 12, guestPct: 14, avgCheck: 15.90, trend: 'stable' },
    { name: 'Dinner (5pm-9pm)', revenuePct: 44, guestPct: 38, avgCheck: 21.60, trend: 'up' },
    { name: 'Late Night (9pm-close)', revenuePct: 6, guestPct: 6, avgCheck: 18.40, trend: 'down' },
  ],
  weekdayVsWeekend: {
    weekday: { avgRevenue: 52_000, avgGuests: 2_770 },
    weekend: { avgRevenue: 78_000, avgGuests: 4_160 },
  },
};

// ============================================
// LOCAL STORE MARKETING DATA
// ============================================

// Store directory for local marketing
export const localMarketingStores = [
  { id: 1247, name: 'Pentagon City', city: 'Arlington, VA', dm: 'Sarah Chen', region: 'Mid-Atlantic' },
  { id: 1302, name: 'Georgetown', city: 'Washington, DC', dm: 'Marcus Williams', region: 'Mid-Atlantic' },
  { id: 1089, name: 'Bethesda Row', city: 'Bethesda, MD', dm: 'Jessica Park', region: 'Mid-Atlantic' },
  { id: 1456, name: 'King of Prussia', city: 'King of Prussia, PA', dm: 'David Miller', region: 'Northeast' },
  { id: 1523, name: 'Times Square', city: 'New York, NY', dm: 'Amanda Torres', region: 'Northeast' },
];

// Complete local store marketing dashboard data
export const storeLocalDashboard = {
  storeId: 1247,
  storeName: 'Pentagon City',
  city: 'Arlington, VA',
  districtManager: 'Sarah Chen',
  gm: 'Mike Thompson',

  // Trade Area Demographics
  tradeArea: {
    population1mi: 28400,
    population3mi: 142000,
    population5mi: 385000,
    medianIncome: 94200,
    medianAge: 34,
    collegeEducated: 68,
    daytimePopulation: 186000,
    topEmployers: ['Pentagon', 'Amazon HQ2', 'Deloitte', 'Booz Allen'],
    householdGrowth: 3.2,
    competitorCount: 14,
  },

  // Active Local Campaigns
  activeCampaigns: [
    { name: 'Pentagon Lunch Rush', type: 'Geo-fence', status: 'Active', budget: 2400, spent: 1680, impressions: 48200, conversions: 312, roi: 4.2, startDate: '2025-03-01', endDate: '2025-04-30' },
    { name: 'Amazon HQ2 Welcome', type: 'Corporate', status: 'Active', budget: 1800, spent: 1200, impressions: 22000, conversions: 185, roi: 5.1, startDate: '2025-03-15', endDate: '2025-05-15' },
    { name: 'Spring Youth Sports', type: 'Sponsorship', status: 'Active', budget: 3000, spent: 2100, impressions: 35400, conversions: 228, roi: 3.8, startDate: '2025-03-01', endDate: '2025-06-30' },
    { name: 'Local Google Ads', type: 'Digital', status: 'Active', budget: 1500, spent: 980, impressions: 62000, conversions: 410, roi: 6.3, startDate: '2025-02-01', endDate: '2025-04-30' },
    { name: 'Mothers Day Promo', type: 'Seasonal', status: 'Scheduled', budget: 2000, spent: 0, impressions: 0, conversions: 0, roi: 0, startDate: '2025-05-01', endDate: '2025-05-14' },
  ],

  // Community Partnerships
  partnerships: [
    { name: 'Arlington Youth Soccer League', type: 'Sports Sponsorship', investment: 1500, term: 'Annual', status: 'Active', impressions: 12000, redemptions: 340 },
    { name: 'Wakefield High School Booster', type: 'School Partnership', investment: 800, term: 'Academic Year', status: 'Active', impressions: 5200, redemptions: 180 },
    { name: 'Pentagon Federal Credit Union', type: 'Corporate', investment: 0, term: 'Ongoing', status: 'Active', impressions: 8400, redemptions: 520 },
    { name: 'Crystal City BID', type: 'Business Association', investment: 600, term: 'Annual', status: 'Active', impressions: 15000, redemptions: 210 },
  ],

  // Competitive Landscape (nearby)
  competitors: [
    { name: 'Shake Shack', distance: '0.3 mi', rating: 4.2, reviews: 820, priceRange: '$$', threat: 'High' },
    { name: 'Smashburger', distance: '0.5 mi', rating: 3.8, reviews: 340, priceRange: '$$', threat: 'Medium' },
    { name: "Wendy's", distance: '0.4 mi', rating: 3.5, reviews: 210, priceRange: '$', threat: 'Low' },
    { name: 'Burger King', distance: '0.6 mi', rating: 3.3, reviews: 180, priceRange: '$', threat: 'Low' },
    { name: 'Elevation Burger', distance: '0.8 mi', rating: 4.0, reviews: 290, priceRange: '$$', threat: 'Medium' },
    { name: 'Good Stuff Eatery', distance: '1.2 mi', rating: 4.3, reviews: 560, priceRange: '$$', threat: 'Medium' },
  ],

  // Google Business Profile & Local SEO
  localSEO: {
    googleRating: 4.4,
    googleReviews: 1240,
    yelpRating: 4.0,
    yelpReviews: 380,
    avgResponseTime: '2.4 hrs',
    responseRate: 94,
    searchImpressions30d: 18400,
    searchClicks30d: 2100,
    directionsRequests30d: 890,
    phoneCalls30d: 320,
    photoViews30d: 4200,
    topSearchTerms: ['five guys near me', 'burgers pentagon city', 'five guys arlington', 'best burger near pentagon'],
  },

  // Geo-Targeting Performance
  geoTargeting: {
    activeFences: 4,
    totalReach: 186000,
    avgCTR: 2.8,
    conversionRate: 6.5,
    fences: [
      { name: 'Pentagon Complex', radius: '0.5 mi', population: 45000, impressions: 22000, clicks: 680, conversions: 44 },
      { name: 'Crystal City Corridor', radius: '0.3 mi', population: 32000, impressions: 18500, clicks: 520, conversions: 38 },
      { name: 'Pentagon City Mall', radius: '0.2 mi', population: 15000, impressions: 8200, clicks: 310, conversions: 28 },
      { name: 'Amazon HQ2 Campus', radius: '0.4 mi', population: 28000, impressions: 14000, clicks: 440, conversions: 32 },
    ],
    conquestCampaigns: [
      { targetBrand: 'Shake Shack', impressionsNearby: 8400, redirections: 180, conversionRate: 2.1 },
      { targetBrand: 'Smashburger', impressionsNearby: 5200, redirections: 110, conversionRate: 2.1 },
    ],
  },

  // In-Store Merchandising
  merchandising: {
    overallScore: 87,
    lastAudit: '2025-03-28',
    categories: [
      { name: 'Menu Board Compliance', score: 92 },
      { name: 'Window Graphics', score: 85 },
      { name: 'Promotional Signage', score: 88 },
      { name: 'Seasonal Display', score: 78 },
      { name: 'Digital Screens', score: 90 },
    ],
  },

  // Monthly Performance Trends
  monthlyTrends: [
    { month: 'Oct', localSpend: 4200, attributedRevenue: 18400, newCustomers: 120, repeatRate: 42 },
    { month: 'Nov', localSpend: 5100, attributedRevenue: 24200, newCustomers: 145, repeatRate: 44 },
    { month: 'Dec', localSpend: 6200, attributedRevenue: 31500, newCustomers: 180, repeatRate: 46 },
    { month: 'Jan', localSpend: 3800, attributedRevenue: 16800, newCustomers: 95, repeatRate: 40 },
    { month: 'Feb', localSpend: 4500, attributedRevenue: 21400, newCustomers: 128, repeatRate: 43 },
    { month: 'Mar', localSpend: 5800, attributedRevenue: 28600, newCustomers: 165, repeatRate: 47 },
  ],

  // AI Recommendations
  aiRecommendations: [
    { priority: 'P0', insight: 'Amazon HQ2 lunch traffic underserved — geo-fence expansion could capture 400+ weekly visits', action: 'Extend HQ2 geo-fence radius to 0.6mi, increase bid 20% during 11:30am-1:30pm', estImpact: '+$8,200/mo revenue' },
    { priority: 'P1', insight: 'Google Business Profile photos are 6+ months old — refreshed photos drive 35% more direction requests', action: 'Schedule professional photo shoot, update hero images and menu photos', estImpact: '+12% foot traffic' },
    { priority: 'P1', insight: 'Seasonal display score at 78% — lowest category. Spring refresh overdue', action: 'Deploy spring promotional kit by April 10', estImpact: '+5% promo item sales' },
    { priority: 'P2', insight: 'Shake Shack conquest campaign showing strong 2.1% conversion — scale opportunity', action: 'Increase conquest budget by $500/mo, add Good Stuff Eatery as target', estImpact: '+85 conquested visits/mo' },
  ],
};
