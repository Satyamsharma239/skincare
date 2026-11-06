import React from "react";
import { useStore } from "../context/StoreContext";

const CATEGORY_STORIES = [
  {
    id: "serums",
    name: "Active Serums",
    categoryFilter: "Serums",
    tag: "Target Actives",
    image: "/serum-dropper.jpg",
    isBestseller: true
  },
  {
    id: "moisturizers",
    name: "Barrier Creams",
    categoryFilter: "Moisturizers",
    tag: "5 Ceramides",
    image: "/cream-swirl.jpg",
    isBestseller: true
  },
  {
    id: "cleansers",
    name: "Gentle Cleansers",
    categoryFilter: "Cleansers",
    tag: "Soap-Free",
    image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?auto=format&fit=crop&w=400&q=80",
    isBestseller: false
  },
  {
    id: "sunscreens",
    name: "SPF 50+ Shields",
    categoryFilter: "Sunscreen",
    tag: "Zero Cast",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    isBestseller: true
  },
  {
    id: "bundles",
    name: "Value Combos",
    categoryFilter: "Bundles",
    tag: "Save 30%",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",
    isBestseller: true
  },
  {
    id: "all",
    name: "Shop All",
    categoryFilter: "All Products",
    tag: "Full Vault",
    image: "/lumera-hero.jpg",
    isBestseller: false
  }
];

export const CategoryStoryBar = () => {
  const { setSelectedCategoryFilter, setSelectedConcernFilter, selectedCategoryFilter, products } = useStore();

  const handleSelect = (categoryFilter) => {
    setSelectedCategoryFilter(categoryFilter);
    setSelectedConcernFilter("All Concerns");
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--border-light)",
        padding: "1.5rem 0 1.25rem 0"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "1.75rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "0.25rem 0.5rem"
          }}
          className="story-bar-scroll"
        >
          {CATEGORY_STORIES.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.categoryFilter;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.categoryFilter)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  flexShrink: 0,
                  transition: "transform 0.2s ease"
                }}
                className="story-item"
              >
                {/* Visual Ring & Circle Image */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    padding: "3px",
                    background: isSelected 
                      ? "#18181B" 
                      : cat.isBestseller 
                        ? "linear-gradient(135deg, #F59E0B 0%, #C2410C 100%)" 
                        : "var(--border-light)",
                    boxShadow: isSelected ? "0 4px 14px rgba(24, 24, 27, 0.25)" : "0 2px 6px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease"
                  }}
                  className="story-ring"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/serum-dropper.jpg";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      backgroundColor: "#F3F1EC"
                    }}
                  />
                </div>

                {/* Name & Micro-tag */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: isSelected ? 700 : 600,
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                      fontFamily: "var(--font-display)",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {cat.id === "all" ? `${cat.name} (${products.length})` : cat.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: cat.isBestseller ? "var(--accent-clay)" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)"
                    }}
                  >
                    {cat.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .story-item:hover {
          transform: translateY(-2px);
        }
        .story-item:hover .story-ring {
          box-shadow: 0 6px 16px rgba(17, 24, 39, 0.15);
        }
      `}</style>
    </div>
  );
};
