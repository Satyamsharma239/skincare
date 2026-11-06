import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Sun, Moon, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";

export const RoutineBuilder = () => {
  const { products, settings, addToCart, openExpressCheckout, setSelectedProductForModal } = useStore();
  const [activeRegimen, setActiveRegimen] = useState("am");

  const amSteps = [
    {
      stepNumber: 1,
      title: "Cleanse",
      tagline: "Dissolve overnight sebum without stripping acid mantle",
      productId: "prod-3",
      timing: "60 seconds"
    },
    {
      stepNumber: 2,
      title: "Target",
      tagline: "Antioxidant blemish control & sebum normalization",
      productId: "prod-1",
      timing: "2 - 3 drops"
    },
    {
      stepNumber: 3,
      title: "Lock",
      tagline: "Physiological 5-ceramide barrier replenishment",
      productId: "prod-2",
      timing: "Dime size"
    },
    {
      stepNumber: 4,
      title: "Protect",
      tagline: "Broad-spectrum photostable UV & blue-light shield",
      productId: "prod-4",
      timing: "2 finger lengths"
    }
  ];

  const pmSteps = [
    {
      stepNumber: 1,
      title: "Deep Cleanse",
      tagline: "Melt sunscreen, pollution particles, and pore oil",
      productId: "prod-3",
      timing: "Lukewarm water"
    },
    {
      stepNumber: 2,
      title: "Renew",
      tagline: "Slow-release encapsulated retinol & bakuchiol",
      productId: "prod-5",
      timing: "2 drops"
    },
    {
      stepNumber: 3,
      title: "Repair",
      tagline: "Deep trans-epidermal lipid cushion barrier seal",
      productId: "prod-2",
      timing: "Warm between palms"
    }
  ];

  const currentSteps = activeRegimen === "am" ? amSteps : pmSteps;

  const currentProducts = currentSteps
    .map((s) => ({
      ...s,
      product: products.find((p) => p.id === s.productId)
    }))
    .filter((s) => s.product);

  const bundleTotal = currentProducts.reduce((sum, s) => sum + s.product.price, 0);
  const bundleOriginal = currentProducts.reduce((sum, s) => sum + (s.product.originalPrice || s.product.price), 0);
  const bundleDiscount = bundleOriginal - bundleTotal;

  const handleAddAllToBag = () => {
    currentProducts.forEach((s) => {
      addToCart(s.product, 1);
    });
  };

  const handleOrderRoutineWhatsApp = () => {
    currentProducts.forEach((s) => {
      addToCart(s.product, 1);
    });
    openExpressCheckout(null);
  };

  return (
    <section 
      id="routine-builder-section"
      style={{ 
        backgroundColor: "#FAFAF9", 
        padding: "5.5rem 0", 
        borderBottom: "1px solid var(--border-light)" 
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 3.5rem auto" }}>
          <div style={{ 
            fontFamily: "var(--font-sans)",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#C2410C",
            marginBottom: "0.5rem"
          }}>
            Clinical Regimen Protocol
          </div>

          <h2 style={{ 
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.5vw, 2.7rem)", 
            fontWeight: 800, 
            marginBottom: "0.75rem",
            color: "var(--text-primary)"
          }}>
            Build Your Daily Routine
          </h2>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.96rem", lineHeight: 1.6, fontFamily: "var(--font-sans)" }}>
            Active molecules layered by molecular weight. Follow our morning and evening steps to protect your skin barrier and boost glow with instant bundle savings.
          </p>

          {/* Minimalist AM/PM Toggle */}
          <div style={{
            display: "inline-flex",
            backgroundColor: "#fff",
            padding: "0.25rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-medium)",
            marginTop: "1.75rem"
          }}>
            <button
              onClick={() => setActiveRegimen("am")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.35rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.84rem",
                fontWeight: activeRegimen === "am" ? 500 : 400,
                backgroundColor: activeRegimen === "am" ? "var(--accent-pine)" : "transparent",
                color: activeRegimen === "am" ? "#fff" : "var(--text-secondary)",
                transition: "all var(--transition-fast)"
              }}
            >
              <Sun size={15} />
              <span>Morning Ritual</span>
            </button>

            <button
              onClick={() => setActiveRegimen("pm")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.35rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.84rem",
                fontWeight: activeRegimen === "pm" ? 500 : 400,
                backgroundColor: activeRegimen === "pm" ? "var(--accent-pine)" : "transparent",
                color: activeRegimen === "pm" ? "#fff" : "var(--text-secondary)",
                transition: "all var(--transition-fast)"
              }}
            >
              <Moon size={15} />
              <span>Evening Ritual</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${currentProducts.length}, 1fr)`,
          gap: "1.5rem",
          marginBottom: "3rem"
        }} className="routine-steps-grid">
          {currentProducts.map((stepItem) => {
            const { stepNumber, title, tagline, timing, product } = stepItem;
            return (
              <div 
                key={stepNumber}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                {/* Step header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                  <span style={{ 
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem", 
                    color: "var(--text-muted)", 
                    letterSpacing: "0.1em"
                  }}>
                    STEP 0{stepNumber}
                  </span>
                  <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                    {timing}
                  </span>
                </div>

                {/* Product Thumbnail */}
                <div 
                  style={{ 
                    height: "170px", 
                    backgroundColor: "#F4F0E8", 
                    borderRadius: "var(--radius-xs)", 
                    overflow: "hidden", 
                    marginBottom: "1rem",
                    cursor: "pointer" 
                  }}
                  onClick={() => setSelectedProductForModal(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/serum-dropper.jpg";
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>

                <div style={{ fontSize: "0.74rem", color: "var(--accent-clay)", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  {title}
                </div>

                <h4 
                  onClick={() => setSelectedProductForModal(product)}
                  style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.35rem", lineHeight: 1.35, cursor: "pointer" }}
                >
                  {product.name}
                </h4>

                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.4 }}>
                  {tagline}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)" }}>
                  <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)" }}>
                    {settings.currency}{product.price}
                  </span>
                  <button 
                    onClick={() => addToCart(product, 1)}
                    style={{ 
                      marginLeft: "auto", 
                      fontSize: "0.76rem", 
                      fontWeight: 500, 
                      color: "var(--text-primary)", 
                      textDecoration: "underline",
                      cursor: "pointer" 
                    }}
                  >
                    + Add Step
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Bundle Bar */}
        <div style={{
          backgroundColor: "#1D241E",
          color: "#FAF8F5",
          borderRadius: "var(--radius-md)",
          padding: "2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--accent-clay-soft)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              Complete Regimen Bundle
            </div>
            <h3 style={{ fontSize: "1.45rem", color: "#FAF8F5", fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.02em", margin: "2px 0 0.4rem 0" }}>
              Order All {currentProducts.length} Steps Together
            </h3>
            <p style={{ color: "#B8B5AE", fontSize: "0.86rem", maxWidth: "520px" }}>
              Formulations calibrated to amplify each other's cellular efficacy. Includes free express delivery across India.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 600, color: "#FAF8F5" }}>
                {settings.currency}{bundleTotal}
              </div>
              {bundleDiscount > 0 && (
                <div style={{ fontSize: "0.75rem", color: "var(--accent-clay-soft)" }}>
                  Save {settings.currency}{bundleDiscount} compared to singles
                </div>
              )}
            </div>

            <button
              onClick={handleAddAllToBag}
              className="btn btn-secondary"
              style={{ backgroundColor: "#FAF8F5", color: "#181917", border: "none" }}
            >
              <ShoppingBag size={15} />
              <span>Add All to Cart</span>
            </button>

            <button
              onClick={handleOrderRoutineWhatsApp}
              className="btn btn-primary"
              style={{
                backgroundColor: "#FAF8F5",
                color: "#181917",
                border: "1px solid #FAF8F5",
                padding: "0.8rem 1.4rem"
              }}
            >
              <span>Buy Regimen Now</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .routine-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .routine-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
