import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    id: "serums",
    name: "Face Serums",
    categoryFilter: "Serums",
    image: "/products/serum-niacinamide.jpg"
  },
  {
    id: "moisturizers",
    name: "Barrier Creams",
    categoryFilter: "Moisturizers",
    image: "/products/cream-ceramide-jar.jpg"
  },
  {
    id: "cleansers",
    name: "Cleansers",
    categoryFilter: "Cleansers",
    image: "/products/cleanser-pump.jpg"
  },
  {
    id: "sunscreens",
    name: "Sun Protection",
    categoryFilter: "Sunscreens",
    image: "/products/sunscreen-tube.jpg"
  },
  {
    id: "eye-lip",
    name: "Eye & Lip Care",
    categoryFilter: "Eye & Lip",
    image: "/products/eye-peptide-tube.jpg"
  },
  {
    id: "bundles",
    name: "Routines & Kits",
    categoryFilter: "Bundles",
    image: "/products/routine-box-set.jpg"
  }
];

export const CategoryStoryBar = () => {
  const { products, setSelectedCategoryFilter, setSelectedConcernFilter, selectedCategoryFilter } = useStore();

  const handleSelect = (categoryFilter) => {
    setSelectedCategoryFilter(categoryFilter);
    setSelectedConcernFilter("All Concerns");
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="category-shortcuts-section">
      <div className="container">
        
        <div className="category-section-head">
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
            Shop by Category
          </h2>
          <button
            onClick={() => handleSelect("All Products")}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-main)" }}
          >
            <span>View All ({(products || []).length})</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="category-grid">
          {CATEGORY_CARDS.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.categoryFilter;
            const liveCount = (products || []).filter((p) => p.category === cat.categoryFilter).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.categoryFilter)}
                className={`category-tile ${isSelected ? "active" : ""}`}
              >
                <div className="category-tile-thumb">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/products/cream-ceramide-jar.jpg";
                    }}
                  />
                </div>

                <span className="category-tile-name">
                  {cat.name}
                </span>

                <span className="category-tile-count">
                  {liveCount} {liveCount === 1 ? "Formulation" : "Formulations"}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
