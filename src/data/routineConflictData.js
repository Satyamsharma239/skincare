export const ROUTINE_CONFLICT_RULES = [
  {
    productA: "prod-5", // Encapsulated Retinol
    productB: "prod-3", // 2% Salicylic Acid
    status: "caution",
    badge: "Alternate PM Protocol",
    title: "Active Layering Caution",
    description: "Both Retinol and Salicylic Acid accelerate cellular exfoliation. Using them in the exact same PM session may over-strip fragile barriers. We recommend 'Skin Cycling': use 2% BHA on Night 1, and 0.3% Retinol on Night 2."
  },
  {
    productA: "prod-1", // Niacinamide
    productB: "prod-2", // 5-Ceramide Cream
    status: "synergy",
    badge: "Gold Standard Synergy",
    title: "Barrier Amplification Match",
    description: "Clinically proven lipid synergy! 10% Niacinamide triggers your skin's natural ceramide production, while the 5-Ceramide Cream directly locks in trans-epidermal moisture. Safe for AM & PM."
  },
  {
    productA: "prod-3", // Salicylic Cleanser
    productB: "prod-1", // Niacinamide Serum
    status: "synergy",
    badge: "Pore & Blemish Duo",
    title: "Complementary Mechanism",
    description: "2% Salicylic Acid deep-cleanses sebum-clogged pores, followed by Niacinamide which soothes post-cleanse erythema and regulates oil glands. Highly recommended for combination & acne-prone skin."
  },
  {
    productA: "prod-4", // Sunscreen SPF 50+
    productB: "prod-1", // Niacinamide Serum
    status: "synergy",
    badge: "Photoprotective Shield",
    title: "Antioxidant UV Defense",
    description: "Niacinamide neutralizes free radicals caused by sunlight and blue light, boosting the broad-spectrum photostability of your SPF 50+ sunscreen. Essential morning ritual."
  },
  {
    productA: "prod-6", // Hyaluronic Acid
    productB: "prod-2", // 5-Ceramide Cream
    status: "synergy",
    badge: "Humectant + Occlusive Lock",
    title: "Deep Cellular Hydration",
    description: "Multi-molecular hyaluronic acid pulls atmospheric moisture into deep epidermal layers, and the ceramide lipid barrier seals it from evaporating in dry air-conditioned rooms."
  }
];

export const checkRoutineCompatibility = (productAId, productBId) => {
  if (!productAId || !productBId || productAId === productBId) return null;

  const match = ROUTINE_CONFLICT_RULES.find(
    (rule) =>
      (rule.productA === productAId && rule.productB === productBId) ||
      (rule.productA === productBId && rule.productB === productAId)
  );

  if (match) return match;

  return {
    status: "compatible",
    badge: "100% Compatible",
    title: "Safe to Layer Synergistically",
    description: "These formulations operate at biocompatible pH levels and do not compete for cellular receptor pathways. You can safely layer them together."
  };
};
