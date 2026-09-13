import type { CostBreakdown, PricingRecommendation } from '../types';

export function calculateSmartPrice(
  cost: CostBreakdown,
  _category: string = 'Handbags',
  uniqueness: 'HIGH' | 'MEDIUM' | 'STANDARD' = 'HIGH',
  demand: 'HIGH' | 'MEDIUM' | 'EMERGING' = 'HIGH'
): PricingRecommendation {
  const totalCost = cost.rawMaterial + cost.labour + cost.packaging + (cost.other || 0);

  // Market reference multipliers based on craft uniqueness and current market demand
  let targetMarginPercent = 0.25; // Default 25% desired margin

  if (uniqueness === 'HIGH') targetMarginPercent += 0.05;
  if (demand === 'HIGH') targetMarginPercent += 0.04;

  // Base price based on target cost-plus margin
  const costPlusPrice = Math.round(totalCost / (1 - targetMarginPercent));

  // Market benchmark range for similar products
  const minComparable = Math.round(totalCost * 1.2); // 20% margin lower bound
  const maxComparable = Math.round(totalCost * 1.6); // 60% margin upper bound

  // AI Recommended Price sits in the balanced sweet spot (e.g. ₹999 for ₹750 cost)
  let suggestedPrice = costPlusPrice;
  // Round to psychological pricing ending in 9 or 99
  if (suggestedPrice > 200 && suggestedPrice < 2000) {
    suggestedPrice = Math.round(suggestedPrice / 10) * 10 - 1;
    if (suggestedPrice % 100 !== 99 && suggestedPrice > 500) {
      suggestedPrice = Math.floor(suggestedPrice / 100) * 100 + 99;
    }
  }

  const expectedProfit = Math.max(0, suggestedPrice - totalCost);
  const expectedMargin = Number(((expectedProfit / suggestedPrice) * 100).toFixed(1));

  let competitiveness: 'HIGH' | 'BALANCED' | 'PREMIUM' = 'BALANCED';
  if (suggestedPrice <= totalCost * 1.25) competitiveness = 'HIGH';
  else if (suggestedPrice >= totalCost * 1.5) competitiveness = 'PREMIUM';

  const explanation = `₹${suggestedPrice.toLocaleString()} balances your production cost (₹${totalCost}), comparable market range (₹${minComparable} – ₹${maxComparable}), product uniqueness (${uniqueness}) and current market demand (${demand}) while delivering a healthy ${expectedMargin}% profit margin.`;

  return {
    suggestedPrice,
    minPrice: Math.round(totalCost * 1.15),
    maxPrice: Math.round(totalCost * 1.55),
    expectedProfit,
    expectedMargin,
    comparableRange: { min: minComparable, max: maxComparable },
    demandLevel: demand,
    uniqueness,
    materialTrend: '+4%',
    explanation,
    competitiveness,
  };
}
