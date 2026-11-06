export const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "How does your skin feel midday (approx. 4 hours after washing)?",
    subtitle: "This helps identify your baseline sebum production and barrier permeability.",
    options: [
      {
        id: "oily",
        label: "Shiny and slick across my T-zone and cheeks",
        hint: "Oily / High Sebum",
        icon: "✨",
        suggestedType: "Oily / Combination"
      },
      {
        id: "combination",
        label: "Shiny on forehead and nose, but normal or dry on cheeks",
        hint: "Combination Skin",
        icon: "⚖️",
        suggestedType: "Oily / Combination"
      },
      {
        id: "dry",
        label: "Tight, slightly rough, or showing dry flaky patches",
        hint: "Dry / Dehydrated",
        icon: "🏜️",
        suggestedType: "Dry / Sensitive"
      },
      {
        id: "sensitive",
        label: "Prone to redness, stinging, or reacts easily to products",
        hint: "Sensitive / Reactive",
        icon: "🌸",
        suggestedType: "Dry / Sensitive"
      },
      {
        id: "normal",
        label: "Comfortable, balanced, neither overly shiny nor dry",
        hint: "Balanced / Normal",
        icon: "🌿",
        suggestedType: "All Skin Types"
      }
    ]
  },
  {
    id: 2,
    title: "What is your #1 primary skin goal or frustration right now?",
    subtitle: "We prioritize targeted clinical actives that address your main concern first.",
    options: [
      {
        id: "acne",
        label: "Clear active breakouts, clogged pores, and blackheads",
        concern: "Acne & Blemishes",
        icon: "🎯",
        productIds: ["prod-3", "prod-1"]
      },
      {
        id: "pigmentation",
        label: "Fade dark spots, post-acne marks, and uneven skin tone",
        concern: "Dullness & Spots",
        icon: "💡",
        productIds: ["prod-1", "prod-4"]
      },
      {
        id: "barrier",
        label: "Repair damaged barrier, soothe redness, and stop irritation",
        concern: "Barrier Repair",
        icon: "🛡️",
        productIds: ["prod-2", "prod-6"]
      },
      {
        id: "antiaging",
        label: "Smooth fine lines, improve firmness, and boost elasticity",
        concern: "Anti-Aging",
        icon: "⏳",
        productIds: ["prod-5", "prod-2"]
      },
      {
        id: "sunprotection",
        label: "Prevent tanning, sun damage, and premature photo-aging",
        concern: "Sun Protection",
        icon: "☀️",
        productIds: ["prod-4", "prod-1"]
      }
    ]
  },
  {
    id: 3,
    title: "What is your typical daily sun and screen exposure?",
    subtitle: "Determines photoprotection requirements and antioxidant defense.",
    options: [
      {
        id: "outdoor",
        label: "Significant outdoor commute or direct sunlight (> 2 hours)",
        icon: "🕶️",
        boost: "High UV Defense Needed"
      },
      {
        id: "screens",
        label: "Mostly indoors in AC under laptops/blue-light screens (8+ hrs)",
        icon: "💻",
        boost: "Hydration Lock & Blue Light Shield"
      },
      {
        id: "mixed",
        label: "Moderate balanced mix of indoor and outdoor activities",
        icon: "🚶",
        boost: "Balanced Daily Routine"
      }
    ]
  }
];
