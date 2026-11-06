import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Sparkles } from "lucide-react";

const CATEGORY_ITEMS = [
  {
    id: "serums",
    name: "Face Serums",
    categoryFilter: "Serums",
    tag: "Target Actives",
    countText: "6 Formulations",
    image: "/serum-dropper.jpg",
    isBestseller: true
  },
  {
    id: "moisturizers",
    name: "Barrier Creams",
    categoryFilter: "Moisturizers",
    tag: "5 Ceramides",
    countText: "5 Formulations",
    image: "/cream-swirl.jpg",
    isBestseller: true
  },
  {
    id: "cleansers",
    name: "Gentle Cleansers",
    categoryFilter: "Cleansers",
    tag: "Soap-Free Lipids",
    countText: "3 Formulations",
    image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?auto=format&fit=crop&w=400&q=80",
    isBestseller: false
  },
  {
    id: "sunscreens",
    name: "SPF 50+ Sunscreens",
    categoryFilter: "Sunscreens",
    tag: "Zero White Cast",
    countText: "4 Formulations",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    isBestseller: true
  },
  {
    id: "bundles",
    name: "Value Combos",
    categoryFilter: "Bundles",
    tag: "Save up to 33%",
    countText: "4 Rituals",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",
    isBestseller: true
  },
  {
    id: "all",
    name: "All Formulations",
    categoryFilter: "All Products",
    tag: "Complete Vault",
    countText: "24 Products",
    image: "/lab-science.jpg",
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
    <section 
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--border-light)",
        padding: "2rem 0 2.25rem 0"
      }}
      className="category-showcase-section"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.35rem"
        }}>
          <div>
            <div style={{
              fontSize: "0.74rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#C2410C",
              fontFamily: "var(--font-sans)",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem"
            }}>
              <Sparkles size={13} color="#C2410C" />
              <span>Targeted Clinical Regimens</span>
            </div>
            <h3 style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              margin: 0,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em"
            }}>
              Shop by Formulation Category
            </h3>
          </div>

          <button
            onClick={() => handleSelect("All Products")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              cursor: "pointer",
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              backgroundColor: "#F4F4F5",
              border: "1px solid #E4E4E7",
              transition: "all 0.15s ease"
            }}
            className="view-all-categories-btn"
          >
            <span>View Full Vault ({products?.length || 24})</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 6-Column Full-Width Distributed Category Grid */}
        <div className="category-showcase-grid">
          {CATEGORY_ITEMS.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.categoryFilter;
            const actualCount = cat.id === "all" 
              ? products?.length || 24 
              : products?.filter((p) => p.category === cat.categoryFilter)?.length || cat.countText;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.categoryFilter)}
                className={`category-showcase-card ${isSelected ? "active" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1.25rem 0.75rem",
                  borderRadius: "16px",
                  backgroundColor: isSelected ? "#FAF8F5" : "#FFFFFF",
                  border: isSelected ? "2px solid #18181B" : "1.5px solid #E8E4DC",
                  boxShadow: isSelected ? "0 8px 24px rgba(24, 24, 27, 0.1)" : "0 2px 8px rgba(0, 0, 0, 0.03)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                  width: "100%"
                }}
              >
                {/* Circular Visual with Subtle Elevation */}
                <div
                  style={{
                    width: "74px",
                    height: "74px",
                    borderRadius: "50%",
                    padding: "3px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                    border: isSelected ? "2px solid #18181B" : "1px solid #E4E4E7",
                    marginBottom: "0.85rem",
                    overflow: "hidden",
                    flexShrink: 0
                  }}
                  className="cat-card-avatar"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/cream-swirl.jpg";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>

                {/* Category Name */}
                <div style={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  marginBottom: "0.2rem",
                  lineHeight: 1.2
                }}>
                  {cat.name}
                </div>

                {/* Micro Benefit Tag */}
                <div style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: cat.isBestseller ? "#C2410C" : "var(--text-muted)",
                  fontFamily: "var(--font-sans)",
                  marginBottom: "0.6rem"
                }}>
                  {cat.tag}
                </div>

                {/* Count Badge */}
                <div style={{
                  marginTop: "auto",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: isSelected ? "#FFFFFF" : "#52525B",
                  backgroundColor: isSelected ? "#18181B" : "#F4F4F5",
                  padding: "0.22rem 0.65rem",
                  borderRadius: "999px",
                  border: isSelected ? "none" : "1px solid #E4E4E7"
                }}>
                  {typeof actualCount === "number" ? `${actualCount} Products` : actualCount}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
