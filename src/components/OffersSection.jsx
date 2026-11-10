import React from "react";
import { useStore } from "../context/StoreContext";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";

export const OffersSection = () => {
  const { openExpressCheckout, addToCart, products, settings } = useStore();

  const barrierKit = products.find((p) => p.id === "prod-11") || products[0];
  const acneKit = products.find((p) => p.id === "prod-30") || products[1];

  const getSavings = (kit) => {
    if (!kit || !kit.originalPrice || kit.originalPrice <= kit.price) return null;
    const diff = kit.originalPrice - kit.price;
    const pct = Math.round((diff / kit.originalPrice) * 100);
    return { diff, pct };
  };
  const barrierSavings = getSavings(barrierKit);
  const acneSavings = getSavings(acneKit);

  return (
    <section id="offers-section" className="routines-section">
      <div className="container">
        
        {/* Section Heading */}
        <div className="section-title-wrap">
          <span className="section-label">
            Curated Regimen Protocols
          </span>
          <h2 className="section-heading">
            Complete 3-Step Treatment Systems
          </h2>
          <p className="section-description">
            Scientifically paired formulations to clean pores, deliver targeted actives, and seal the skin barrier.
          </p>
        </div>

        {/* 2-Column Bundles Grid */}
        <div className="routines-grid">
          
          {/* Bundle 1: Barrier Reset */}
          <div className="routine-bundle-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                <span style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "var(--accent-emerald)",
                  backgroundColor: "var(--accent-emerald-soft)",
                  border: "1px solid rgba(5, 150, 105, 0.2)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--radius-sm)"
                }}>
                  3-Step Barrier System
                </span>
                <span style={{ fontSize: "0.76rem", color: "var(--text-caption)", fontWeight: 600 }}>
                  Cleanser + Serum + Barrier Cream
                </span>
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-main)" }}>
                The Core Barrier Reset Trio
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Full-size 2% BHA Cleanser (150ml) + 10% Niacinamide Serum (30ml) + 5-Ceramide Barrier Cream (50g). Rebuilds stripped intercellular lipids and fades redness.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>Clears active breakouts without epidermal peeling</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>Free express BlueDart air courier included</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span className="tabular-nums" style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)" }}>
                  {settings.currency}{(barrierKit?.price || 1399).toLocaleString()}
                </span>
                {barrierKit?.originalPrice && (
                  <span className="tabular-nums" style={{ fontSize: "0.92rem", textDecoration: "line-through", color: "var(--text-subtle)" }}>
                    {settings.currency}{barrierKit.originalPrice.toLocaleString()}
                  </span>
                )}
                {barrierSavings && (
                  <span className="tabular-nums" style={{ fontSize: "0.78rem", color: "var(--accent-pine)", fontWeight: 700 }}>
                    Save {settings.currency}{barrierSavings.diff} ({barrierSavings.pct}% off)
                  </span>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.6rem" }}>
                <button
                  onClick={() => openExpressCheckout(barrierKit, 1)}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.75rem 0.5rem", fontSize: "0.82rem" }}
                >
                  <span>Quick Buy (COD)</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => addToCart(barrierKit)}
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.75rem 0.5rem", fontSize: "0.82rem" }}
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bundle 2: Acne Defense */}
          <div className="routine-bundle-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                <span style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "var(--accent-emerald)",
                  backgroundColor: "var(--accent-emerald-soft)",
                  border: "1px solid rgba(5, 150, 105, 0.2)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--radius-sm)"
                }}>
                  3-Step Acne Protocol
                </span>
                <span style={{ fontSize: "0.76rem", color: "var(--text-caption)", fontWeight: 600 }}>
                  Wash + BHA Serum + Water Gel
                </span>
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-main)" }}>
                The Acne Defense 3-Step Protocol
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                BHA Cleanser (150ml) + 2% Salicylic Acid Serum (30ml) + Oil-Free Hydrating Water Gel (50g). Dissolves micro-comedones, flattens breakouts, and controls oil.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>Clinically reduces active acne lesions by 76% in 4 weeks</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>Doorstep COD & instant UPI checkout</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span className="tabular-nums" style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)" }}>
                  {settings.currency}{(acneKit?.price || 1299).toLocaleString()}
                </span>
                {acneKit?.originalPrice && (
                  <span className="tabular-nums" style={{ fontSize: "0.92rem", textDecoration: "line-through", color: "var(--text-subtle)" }}>
                    {settings.currency}{acneKit.originalPrice.toLocaleString()}
                  </span>
                )}
                {acneSavings && (
                  <span className="tabular-nums" style={{ fontSize: "0.78rem", color: "var(--accent-pine)", fontWeight: 700 }}>
                    Save {settings.currency}{acneSavings.diff} ({acneSavings.pct}% off)
                  </span>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.6rem" }}>
                <button
                  onClick={() => openExpressCheckout(acneKit, 1)}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.75rem 0.5rem", fontSize: "0.82rem" }}
                >
                  <span>Quick Buy (COD)</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => addToCart(acneKit)}
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.75rem 0.5rem", fontSize: "0.82rem" }}
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
