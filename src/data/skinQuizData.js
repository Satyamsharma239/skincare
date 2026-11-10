export const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "How does your skin feel 4 hours after washing?",
    subtitle: "Helps establish your baseline sebum production and lipid barrier permeability.",
    options: [
      {
        id: "oily",
        label: "Noticeably shiny across T-zone and cheeks",
        hint: "Oily / High Sebum",
        suggestedType: "Oily / Combination"
      },
      {
        id: "combination",
        label: "Shiny on forehead and nose, balanced or dry on cheeks",
        hint: "Combination Skin",
        suggestedType: "Oily / Combination"
      },
      {
        id: "dry",
        label: "Tight, slightly rough, or showing dry flaky patches",
        hint: "Dry / Dehydrated",
        suggestedType: "Dry / Sensitive"
      },
      {
        id: "sensitive",
        label: "Prone to redness, stinging, or reacts easily to actives",
        hint: "Sensitive / Reactive",
        suggestedType: "Dry / Sensitive"
      },
      {
        id: "normal",
        label: "Balanced and comfortable—neither shiny nor tight",
        hint: "Normal / Balanced",
        suggestedType: "All Skin Types"
      }
    ]
  },
  {
    id: 2,
    title: "What is your primary skin goal right now?",
    subtitle: "We match targeted clinical percentages to your main skin priority first.",
    options: [
      {
        id: "acne",
        label: "Clear active breakouts, clogged pores, and blackheads",
        concern: "Acne & Blemishes",
        productIds: ["prod-3", "prod-1", "prod-20"]
      },
      {
        id: "pigmentation",
        label: "Fade dark spots, post-acne marks, and uneven tone",
        concern: "Dullness & Spots",
        productIds: ["prod-7", "prod-1"]
      },
      {
        id: "barrier",
        label: "Repair a compromised barrier, calm redness, and hydrate",
        concern: "Barrier Repair",
        productIds: ["prod-2", "prod-6"]
      },
      {
        id: "antiaging",
        label: "Smooth fine lines, boost elasticity, and refine texture",
        concern: "Anti-Aging",
        productIds: ["prod-5", "prod-2"]
      },
      {
        id: "sunprotection",
        label: "Prevent tanning, UV damage, and photo-pigmentation",
        concern: "Sun Protection",
        productIds: ["prod-4", "prod-1"]
      }
    ]
  },
  {
    id: 3,
    title: "What is your typical daily light and climate exposure?",
    subtitle: "Determines UVA/UVB filter weight and humidity-resistant occlusive balance.",
    options: [
      {
        id: "outdoor",
        label: "Outdoor commute or direct sun exposure (> 2 hours daily)",
        boost: "High UV & Pollution Defense"
      },
      {
        id: "screens",
        label: "Primarily indoors in air-conditioning under screens (8+ hrs)",
        boost: "TEWL Moisture Lock"
      },
      {
        id: "mixed",
        label: "Balanced mix of indoor work and short outdoor errands",
        boost: "All-Weather Barrier Balance"
      }
    ]
  }
];
