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
        backgroundColor: "var(--bg-subtle)", 
        padding: "4.5rem 0", 
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)" 
      }}
    >
      <div className="container">
        
        {/* Horizontal Editorial Section Bar */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "2.25rem"
        }}>
          <div style={{ maxWidth: "580px" }}>
            <div style={{ 
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-pine)",
              marginBottom: "0.4rem"
            }}>
              Layering Protocol
            </div>

            <h2 style={{ 
              fontSize: "clamp(1.65rem, 2.8vw, 2.2rem)", 
              fontWeight: 700, 
              marginBottom: "0.45rem",
              color: "var(--text-main)"
            }}>
              AM / PM Clinical Routine
            </h2>

            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.55, margin: 0 }}>
              Structured by molecular weight and pH compatibility so active ingredients absorb cleanly without barrier stress.
            </p>
          </div>

          {/* AM / PM Segmented Control */}
          <div style={{
            display: "inline-flex",
            backgroundColor: "#FFFFFF",
            padding: "0.25rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-light)",
            flexShrink: 0
          }}>
            <button
              onClick={() => setActiveRegimen("am")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.52rem 1.15rem",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.82rem",
                fontWeight: activeRegimen === "am" ? 600 : 500,
                backgroundColor: activeRegimen === "am" ? "var(--text-main)" : "transparent",
                color: activeRegimen === "am" ? "#FFFFFF" : "var(--text-muted)",
                transition: "all var(--transition-fast)"
              }}
            >
              <Sun size={14} />
              <span>Morning (AM)</span>
            </button>

            <button
              onClick={() => setActiveRegimen("pm")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.52rem 1.15rem",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.82rem",
                fontWeight: activeRegimen === "pm" ? 600 : 500,
                backgroundColor: activeRegimen === "pm" ? "var(--text-main)" : "transparent",
                color: activeRegimen === "pm" ? "#FFFFFF" : "var(--text-muted)",
                transition: "all var(--transition-fast)"
              }}
            >
              <Moon size={14} />
              <span>Evening (PM)</span>
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
                    aspectRatio: "1 / 1", 
                    backgroundColor: "var(--bg-studio)", 
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
                      e.currentTarget.src = "/products/serum-niacinamide.jpg";
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>

                <div style={{ fontSize: "0.7rem", color: "var(--accent-pine)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  {title}
                </div>

                <h4 
                  onClick={() => setSelectedProductForModal(product)}
                  style={{ fontSize: "0.94rem", fontWeight: 600, marginBottom: "0.3rem", lineHeight: 1.35, cursor: "pointer", color: "var(--text-main)" }}
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

        {/* Dark Architectural Bundle Bar */}
        <div style={{
          backgroundColor: "var(--bg-dark)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-sm)",
          padding: "2rem 2.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#A7F3D0", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Complete {activeRegimen === "am" ? "AM" : "PM"} Protocol
            </div>
            <h3 style={{ fontSize: "1.4rem", color: "#FFFFFF", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 0.35rem 0" }}>
              Order All {currentProducts.length} Steps Together
            </h3>
            <p style={{ color: "#A1A1AA", fontSize: "0.86rem", maxWidth: "520px", margin: 0 }}>
              Calibrated active concentrations designed to layer without irritation. Eligible for Free Express Shipping.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ textAlign: "right", marginRight: "0.5rem" }}>
              <div className="tabular-nums" style={{ fontSize: "1.55rem", fontWeight: 700, color: "#FFFFFF" }}>
                {settings.currency}{bundleTotal.toLocaleString()}
              </div>
              <div className="tabular-nums" style={{ fontSize: "0.75rem", color: "#A7F3D0" }}>
                {bundleDiscount > 0 ? `Save ${settings.currency}${bundleDiscount} vs MRP` : "Includes Free Express Delivery"}
              </div>
            </div>

            <button
              onClick={handleAddAllToBag}
              className="btn btn-secondary"
              style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "1px solid #3F3F46" }}
            >
              <ShoppingBag size={15} />
              <span>Add All to Bag</span>
            </button>

            <button
              onClick={handleOrderRoutineWhatsApp}
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#141414",
                borderColor: "#FFFFFF"
              }}
            >
              <span>Order Regimen (COD)</span>
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
