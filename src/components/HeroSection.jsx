import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Check, SlidersHorizontal } from "lucide-react";

export const HeroSection = () => {
  const { settings, openExpressCheckout, setSelectedProductForModal, setIsQuizOpen, products } = useStore();
  const featuredProduct = products.find((p) => p.id === "prod-2") || products[0] || {
    id: "prod-2",
    name: "Barrier Defense 5-Ceramide Cream",
    volume: "50 g",
    price: 649
  };

  const handleScrollToCatalog = (e) => {
    e.preventDefault();
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="editorial-hero">
      <div className="container">
        <div className="editorial-hero-grid">
          
          {/* Left Editorial Column */}
          <div className="editorial-hero-copy">
            <div className="hero-eyebrow">
              Dermatological Skincare · Formulated in India
            </div>

            <h1 className="hero-headline">
              Barrier-first skincare, calibrated to real percentages.
            </h1>

            <p className="hero-subheadline">
              Clinically proven actives at transparent dosages. 100% free of synthetic fragrance, drying alcohol, and silicones—built for Indian heat and humidity.
            </p>

            <div className="hero-cta-row">
              <a 
                href="#catalog-section"
                onClick={handleScrollToCatalog}
                className="btn btn-primary btn-lg"
              >
                <span>Shop All Formulations</span>
                <ArrowRight size={16} />
              </a>

              <button 
                onClick={() => setIsQuizOpen(true)}
                className="btn btn-secondary btn-lg"
              >
                <SlidersHorizontal size={15} />
                <span>Find Your Routine</span>
              </button>
            </div>

            <div className="hero-meta-strip">
              <div className="hero-meta-item">
                <Check size={14} color="var(--accent-pine)" strokeWidth={2.5} />
                <span>3:1:1 Biomimetic Lipids</span>
              </div>
              <div className="hero-meta-item">
                <Check size={14} color="var(--accent-pine)" strokeWidth={2.5} />
                <span>0% Fragrance & Essential Oils</span>
              </div>
              <div className="hero-meta-item">
                <Check size={14} color="var(--accent-pine)" strokeWidth={2.5} />
                <span>Cash on Delivery & UPI</span>
              </div>
            </div>
          </div>

          {/* Right Campaign Studio Visual */}
          <div className="editorial-hero-media">
            <img 
              src="/lumera-hero.jpg" 
              alt="LUMÈRA Lipid Science Serum and 5-Ceramide Barrier Cream on travertine stone"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/products/routine-box-set.jpg";
              }}
            />

            <div className="hero-featured-caption">
              <div 
                onClick={() => setSelectedProductForModal(featuredProduct)}
                style={{ cursor: "pointer", minWidth: 0 }}
              >
                <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-pine)" }}>
                  #1 Best Seller
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {featuredProduct.name}
                </div>
                <div className="tabular-nums" style={{ fontSize: "0.78rem", color: "var(--text-caption)" }}>
                  {featuredProduct.volume || "50 g"} · {settings?.currency || "₹"}{featuredProduct.price}
                </div>
              </div>

              <button
                onClick={() => openExpressCheckout(featuredProduct, 1)}
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0 }}
              >
                <span>Quick Buy</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
