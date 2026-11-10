import React, { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import { HeroSection } from "./HeroSection";
import { CategoryStoryBar } from "./CategoryStoryBar";
import { RoutineBuilder } from "./RoutineBuilder";
import { TrustSection } from "./TrustSection";
import { RoutineConflictChecker } from "./RoutineConflictChecker";
import { ReviewsSection } from "./ReviewsSection";
import { FaqSection } from "./FaqSection";
import { ProductCard } from "./ProductCard";
import { CATEGORIES, SKIN_CONCERNS } from "../data/initialProducts";
import { X, ArrowUpDown } from "lucide-react";

export const Storefront = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedConcernFilter,
    setSelectedConcernFilter,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return (products || []).filter((p) => {
      if (!p) return false;
      if (selectedCategoryFilter !== "All Products" && p.category !== selectedCategoryFilter) {
        return false;
      }
      if (selectedConcernFilter !== "All Concerns") {
        if (!Array.isArray(p.skinConcerns)) return false;
        const concernMatches = p.skinConcerns.some((c) => {
          if (c === selectedConcernFilter) return true;
          if (selectedConcernFilter === "Acne & Blemishes" && (c === "Excess Oil" || c === "Blackheads")) return true;
          if (selectedConcernFilter === "Barrier Repair" && c === "Redness & Sensitivity") return true;
          if (selectedConcernFilter === "Anti-Aging" && c === "Fine Lines") return true;
          if (selectedConcernFilter === "Dullness & Spots" && c === "Uneven Texture") return true;
          if (selectedConcernFilter === "Dark Circles" && c === "Eye Puffiness") return true;
          return false;
        });
        if (!concernMatches) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name ? p.name.toLowerCase().includes(q) : false;
        const matchesActives = p.keyActives ? p.keyActives.toLowerCase().includes(q) : false;
        const matchesSubtitle = p.subtitle ? p.subtitle.toLowerCase().includes(q) : false;
        const matchesCategory = p.category ? p.category.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesActives && !matchesSubtitle && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [products, selectedCategoryFilter, selectedConcernFilter, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategoryFilter !== "All Products" ||
    selectedConcernFilter !== "All Concerns" ||
    searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setSelectedCategoryFilter("All Products");
    setSelectedConcernFilter("All Concerns");
    setSearchQuery("");
  };

  return (
    <main>
      {/* 1. Editorial Campaign Hero */}
      <HeroSection />

      {/* 2. Shop by Category Studio Tiles */}
      <CategoryStoryBar />

      {/* 3. Main Formulations Catalog */}
      <section id="catalog-section" className="catalog-section">
        <div className="container">
          
          {/* Catalog Heading */}
          <div style={{ marginBottom: "1rem" }}>
            <span className="section-label" style={{ marginBottom: "0.25rem" }}>
              Core Formulations
            </span>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 className="section-heading" style={{ margin: 0 }}>
                Shop All Skincare
              </h2>
              <span className="tabular-nums" style={{ fontSize: "0.82rem", color: "var(--text-caption)", fontWeight: 500 }}>
                Showing {filteredProducts.length} of {(products || []).length} formulations
              </span>
            </div>
          </div>

          {/* Primary Category Tabs (hide zero-count categories dynamically) */}
          <div className="category-tabs-row">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategoryFilter === category;
              const count = category === "All Products"
                ? (products || []).length
                : (products || []).filter((p) => p.category === category).length;

              if (category !== "All Products" && count === 0) return null;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategoryFilter(category)}
                  className={`category-tab-btn ${isSelected ? "active" : ""}`}
                >
                  <span>{category === "All Products" ? "All" : category}</span>
                  <span className="tabular-nums" style={{ marginLeft: "0.3rem", fontSize: "0.72rem", opacity: 0.6 }}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Concern Filter Pills & Sort Controls */}
          <div className="catalog-header-bar">
            <div className="concern-filter-scroll">
              <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-main)", whiteSpace: "nowrap", marginRight: "0.25rem" }}>
                Concern:
              </span>
              {SKIN_CONCERNS.map((concern) => {
                const isActive = selectedConcernFilter === concern;
                return (
                  <button
                    key={concern}
                    onClick={() => setSelectedConcernFilter(concern)}
                    className={`concern-chip ${isActive ? "active" : ""}`}
                  >
                    {concern}
                  </button>
                );
              })}
            </div>

            <div className="sort-select-wrap">
              <ArrowUpDown size={13} color="var(--text-caption)" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select-input"
              >
                <option value="featured">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--text-caption)" }}>Active:</span>
              
              {selectedCategoryFilter !== "All Products" && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.22rem 0.65rem", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 600 }}>
                  <span>{selectedCategoryFilter}</span>
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setSelectedCategoryFilter("All Products")} />
                </div>
              )}

              {selectedConcernFilter !== "All Concerns" && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.22rem 0.65rem", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 600 }}>
                  <span>{selectedConcernFilter}</span>
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setSelectedConcernFilter("All Concerns")} />
                </div>
              )}

              {searchQuery.trim() && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.22rem 0.65rem", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 600 }}>
                  <span>"{searchQuery}"</span>
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setSearchQuery("")} />
                </div>
              )}

              <button
                onClick={handleClearFilters}
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-rose)", marginLeft: "0.35rem", textDecoration: "underline" }}
              >
                Reset all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border-medium)" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>No matching formulations found</h3>
              <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>Try clearing active category, concern, or search filters to view all {(products || []).length} formulations.</p>
              <button onClick={handleClearFilters} className="btn btn-primary">
                View All Formulations
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. AM / PM Step-by-Step Layering Protocol */}
      <RoutineBuilder />

      {/* 5. Lab Formulation Transparency */}
      <TrustSection />

      {/* 6. Active Ingredient Layering Compatibility Check */}
      <RoutineConflictChecker />

      {/* 7. Customer Reviews */}
      <ReviewsSection />

      {/* 8. Ordering & Shipping FAQ */}
      <FaqSection />
    </main>
  );
};
