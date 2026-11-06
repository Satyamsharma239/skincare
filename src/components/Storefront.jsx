import React, { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import { HeroSection } from "./HeroSection";
import { CategoryStoryBar } from "./CategoryStoryBar";
import { TrustStrip } from "./TrustStrip";
import { OffersSection } from "./OffersSection";
import { SkinConcernsBar } from "./SkinConcernsBar";
import { ReviewsSection } from "./ReviewsSection";
import { FaqSection } from "./FaqSection";
import { ProductCard } from "./ProductCard";
import { CATEGORIES } from "../data/initialProducts";
import { X, Search } from "lucide-react";

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
      if (
        selectedConcernFilter !== "All Concerns" &&
        (!Array.isArray(p.skinConcerns) || !p.skinConcerns.includes(selectedConcernFilter))
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name ? p.name.toLowerCase().includes(q) : false;
        const matchesActives = p.keyActives?.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle?.toLowerCase().includes(q);
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
      {/* 1. High-Impact D2C Hero Section */}
      <HeroSection />

      {/* Visual Category Story Shortcuts (Plum + Vilvah Signature) */}
      <CategoryStoryBar />

      {/* Trust & Assurance Banner */}
      <TrustStrip />

      {/* 2. Curated Offers & Value Bundles */}
      <OffersSection />

      {/* 3. Concern Filter Bar */}
      <SkinConcernsBar />

      {/* 4. Catalog Section */}
      <section id="catalog-section" style={{ padding: "5rem 0", backgroundColor: "var(--bg-primary)" }}>
        <div className="container">
          
          {/* Header & Controls */}
          <div style={{ marginBottom: "2.75rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
              <div>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#C2410C",
                  display: "inline-block",
                  marginBottom: "0.4rem"
                }}>
                  Proven Active Ingredients • 0% Fragrance
                </span>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: 0,
                  color: "var(--text-primary)"
                }}>
                  Targeted Skincare Formulations
                </h2>
              </div>

              {/* Sort By Dropdown */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "0.5rem 0.95rem",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--text-primary)",
                    fontSize: "0.84rem",
                    cursor: "pointer",
                    outline: "none"
                  }}
                >
                  <option value="featured">Featured Formulations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Category Navigation Tabs */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              scrollbarWidth: "none"
            }}>
              {CATEGORIES.map((cat) => {
                const count = cat === "All Products" ? products.length : products.filter((p) => p.category === cat).length;
                const isSelected = selectedCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    style={{
                      padding: "0.55rem 1.15rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.84rem",
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? "var(--text-primary)" : "#FFFFFF",
                      color: isSelected ? "#FAF8F5" : "var(--text-secondary)",
                      border: isSelected ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{
                      fontSize: "0.72rem",
                      opacity: isSelected ? 0.9 : 0.55
                    }}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Filters Bar if any */}
            {hasActiveFilters && (
              <div style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "1.25rem",
                padding: "0.65rem 1rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.82rem"
              }}>
                <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Active:</span>
                
                {selectedCategoryFilter !== "All Products" && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", backgroundColor: "#fff", padding: "0.25rem 0.6rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)" }}>
                    Category: {selectedCategoryFilter}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setSelectedCategoryFilter("All Products")} />
                  </span>
                )}

                {selectedConcernFilter !== "All Concerns" && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", backgroundColor: "#fff", padding: "0.25rem 0.6rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)" }}>
                    Target: {selectedConcernFilter}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setSelectedConcernFilter("All Concerns")} />
                  </span>
                )}

                {searchQuery.trim() && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", backgroundColor: "#fff", padding: "0.25rem 0.6rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)" }}>
                    Query: "{searchQuery}"
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setSearchQuery("")} />
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  style={{
                    marginLeft: "auto",
                    color: "var(--accent-clay)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer"
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}

          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "4.5rem 1rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              border: "1px dashed var(--border-medium)"
            }}>
              <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.4rem" }}>
                No formulations found
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Try adjusting your search criteria or resetting active filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn btn-secondary btn-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid-products">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Real Customer Reviews & Glow Stories (Social Proof) */}
      <ReviewsSection />

      {/* 6. Frequently Asked Questions (Frictionless Commerce) */}
      <FaqSection />

    </main>
  );
};
