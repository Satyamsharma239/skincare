import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { checkRoutineCompatibility } from "../data/routineConflictData";
import { ShieldCheck, AlertTriangle, Sparkles, CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

export const RoutineConflictChecker = () => {
  const { products, addToCart, settings } = useStore();

  const selectableProducts = products.filter((p) => p.category !== "Bundles");

  const [productAId, setProductAId] = useState(selectableProducts[0]?.id || "");
  const [productBId, setProductBId] = useState(selectableProducts[1]?.id || "");

  const productA = products.find((p) => p.id === productAId);
  const productB = products.find((p) => p.id === productBId);

  const compatibility = checkRoutineCompatibility(productAId, productBId);

  const handleAddBoth = () => {
    if (productA) addToCart(productA, 1);
    if (productB) addToCart(productB, 1);
  };

  return (
    <section style={{
      backgroundColor: "#F7F5F0",
      padding: "4.5rem 0",
      borderBottom: "1px solid var(--border-light)"
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 2.5rem auto" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-clay)",
            display: "inline-block",
            marginBottom: "0.5rem"
          }}>
            Formulation Compatibility Protocol
          </span>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            margin: "2px 0 0.6rem 0"
          }}>
            Active Synergy & Layering Checker
          </h2>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Never mix competing actives. Select any two formulations to test whether they layer safely in the same session or require morning/night skin cycling.
          </p>
        </div>

        {/* Interactive Compatibility Card */}
        <div style={{
          maxWidth: "820px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "2rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-light)"
        }}>
          {/* Selectors Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "1.25rem",
            marginBottom: "1.75rem"
          }} className="selectors-grid">
            
            {/* Formulation A */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Formulation 01
              </label>
              <select
                value={productAId}
                onChange={(e) => setProductAId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#fff",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {selectableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name.slice(0, 38)}... ({p.step})
                  </option>
                ))}
              </select>
              {productA && (
                <div style={{ fontSize: "0.76rem", color: "var(--accent-sage)", fontWeight: 600, marginTop: "4px" }}>
                  Active: {productA.keyActives}
                </div>
              )}
            </div>

            {/* Plus Indicator */}
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "var(--accent-forest)",
              marginTop: "1.25rem"
            }}>
              +
            </div>

            {/* Formulation B */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Formulation 02
              </label>
              <select
                value={productBId}
                onChange={(e) => setProductBId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#fff",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {selectableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name.slice(0, 38)}... ({p.step})
                  </option>
                ))}
              </select>
              {productB && (
                <div style={{ fontSize: "0.76rem", color: "var(--accent-sage)", fontWeight: 600, marginTop: "4px" }}>
                  Active: {productB.keyActives}
                </div>
              )}
            </div>

          </div>

          {/* Compatibility Analysis Result Box */}
          {compatibility && (
            <div style={{
              backgroundColor: compatibility.status === "caution" ? "#FEF3C7" : "#EBF5ED",
              border: compatibility.status === "caution" ? "1px solid #FCD34D" : "1px solid #A7F3D0",
              borderRadius: "var(--radius-sm)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {compatibility.status === "caution" ? (
                    <AlertTriangle size={18} color="#D97706" />
                  ) : (
                    <CheckCircle2 size={18} color="#166534" />
                  )}
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: compatibility.status === "caution" ? "#92400E" : "#065F46", margin: 0 }}>
                    {compatibility.title}
                  </h4>
                </div>

                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: compatibility.status === "caution" ? "#FDE68A" : "#BBF7D0",
                  color: compatibility.status === "caution" ? "#78350F" : "#14532D"
                }}>
                  {compatibility.badge}
                </span>
              </div>

              <p style={{ fontSize: "0.88rem", color: compatibility.status === "caution" ? "#92400E" : "#166534", lineHeight: 1.55, margin: 0 }}>
                {compatibility.description}
              </p>

              {/* Add Both Button */}
              {productA && productB && productA.id !== productB.id && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: compatibility.status === "caution" ? "1px solid #FDE68A" : "1px solid #BBF7D0" }}>
                  <button
                    onClick={handleAddBoth}
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: "var(--accent-forest)" }}
                  >
                    <ShoppingBag size={14} />
                    <span>Add Pair to Cart ({settings.currency}{productA.price + productB.price})</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .selectors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
