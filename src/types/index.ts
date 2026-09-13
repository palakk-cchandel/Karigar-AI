export type Language = 'hi' | 'en' | 'pa' | 'ta' | 'te' | 'bn';

export interface Artisan {
  id: string;
  name: string;
  location: string;
  craft: string;
  experienceYears: number;
  avatar: string;
  language: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  craftStory: string;
  verified: boolean;
  businessReadinessScore: number;
}

export interface CostBreakdown {
  rawMaterial: number;
  labour: number;
  packaging: number;
  other: number;
  totalProductionCost: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  artisanId: string;
  artisanName: string;
  location: string;
  category: string;
  material: string;
  craft: string;
  color: string;
  originalImage: string;
  enhancedImage: string;
  price: number;
  costBreakdown: CostBreakdown;
  stock: number;
  reserved: number;
  sold: number;
  demandScore: 'HIGH' | 'MEDIUM' | 'EMERGING';
  uniquenessScore: 'HIGH' | 'MEDIUM' | 'STANDARD';
  tags: string[];
  seoKeywords: string[];
  listingQualityScore: number;
  imageQualityScore: {
    visibility: number;
    lighting: number;
    background: number;
  };
  gemReady: boolean;
  hsnCode?: string;
  gstRate?: number;
  createdAt: string;
}

export interface PricingRecommendation {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  expectedProfit: number;
  expectedMargin: number;
  comparableRange: { min: number; max: number };
  demandLevel: string;
  uniqueness: string;
  materialTrend: string;
  explanation: string;
  competitiveness: 'HIGH' | 'BALANCED' | 'PREMIUM';
}

export interface B2BInquiry {
  id: string;
  buyerName: string;
  buyerCompany: string;
  buyerLocation: string;
  productId: string;
  productTitle: string;
  quantityRequested: number;
  budgetPerUnit: { min: number; max: number };
  purpose: string;
  deliveryDays: number;
  status: 'PENDING' | 'ACCEPTED' | 'COUNTERED' | 'REJECTED';
  offeredPricePerUnit?: number;
  counterOfferPerUnit?: number;
  aiMatchScore: number;
  matchReasons: string[];
  createdAt: string;
}

export interface GeMOpportunity {
  id: string;
  title: string;
  department: string;
  category: string;
  quantityNeeded: number;
  estimatedBudgetPerUnit: number;
  tenderDeadline: string;
  aiMatchScore: number;
  matchReasons: string[];
  specifications: string[];
  status: 'OPEN' | 'BID_PREPARED' | 'SUBMITTED';
}

export interface AIInsight {
  id: string;
  type: 'PRICING' | 'DEMAND' | 'INVENTORY' | 'B2B';
  title: string;
  description: string;
  actionText?: string;
  severity?: 'warning' | 'info' | 'success';
}

export interface VoiceNLPResult {
  detectedLanguage: string;
  transcript: string;
  translatedText: string;
  extractedInfo: {
    product: string;
    material: string;
    craft: string;
    productionTime: string;
    color?: string;
  };
}
