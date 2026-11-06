import React from "react";
import { useStore } from "../context/StoreContext";
import { Tag, Sparkles, ArrowRight, ShieldCheck, Check, ShoppingBag, MessageSquareText } from "lucide-react";

export const OffersSection = () => {
  const { applyCoupon, openExpressCheckout, quickWhatsAppBuy, addToCart, products, settings, showToast } = useStore();

  const handleCopyAndApply = (code) => {
    applyCoupon(code);
    navigator.clipboard?.writeText(code);
    showToast(`Coupon "${code}" copied & applied to your bag! 🎉`, "success");
  };

  const trioProduct = products.find((p) => p.id === "prod-11") || products[0];
  const vaultProduct = products.find((p) => p.id === "prod-18") || products[1];

  return (
    <section id="offers-section" style={{
      padding: "3.5rem 0",
      backgroundColor: "#FAFAF9",
      borderTop: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)"
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem auto" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#C2410C",
            display: "inline-block",
            marginBottom: "0.5rem"
          }}>
            Curated Regimens • Save Up to 33%
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "var(--text-primary)",
            marginBottom: "0.75rem"
          }}>
            Targeted Combos for Faster Results
          </h2>
          <p style={{
            fontSize: "0.96rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)"
          }}>
            Scientifically paired clinical actives formulated to work synergistically without skin friction. Direct WhatsApp dispatch with doorstep Cash on Delivery across India.
          </p>
        </div>

        {/* Highlighted Bundles & Voucher Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.75rem",
          marginBottom: "3rem"
        }}>
          
          {/* Offer Card 1: 3-Step Core Barrier Trio */}
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-medium)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: "0 2px 12px rgba(24, 25, 23, 0.04)"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  backgroundColor: "var(--accent-clay-soft)",
                  color: "var(--accent-clay)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--radius-xs)"
                }}>
                  Special Bundle • Save ₹598
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Step 1 + 2 + 3
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: "0.45rem",
                color: "var(--text-primary)"
              }}>
                The Core Barrier Reset Trio
              </h3>

              <p style={{
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "1.25rem"
              }}>
                Full-size 2% BHA Cleanser (150ml) + 10% Niacinamide Serum (30ml) + 5-Ceramide Barrier Cream (50g). The definitive protocol to clear congestion and seal lipids.
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                marginBottom: "1.5rem",
                fontSize: "0.82rem",
                color: "var(--text-secondary)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Check size={14} color="#166534" />
                  <span>Clears active breakouts without epidermal peeling</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Check size={14} color="#166534" />
                  <span>Free express BlueDart courier included</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {settings.currency}1,449
                </span>
                <span style={{ fontSize: "0.95rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                  {settings.currency}2,047
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--accent-clay)", fontWeight: 600 }}>
                  (29% OFF)
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "0.6rem" }}>
                <button
                  onClick={() => openExpressCheckout(trioProduct, 1)}
                  className="btn btn-whatsapp"
                  style={{ width: "100%", padding: "0.75rem 0.6rem", fontSize: "0.84rem" }}
                  title="Order bundle directly via WhatsApp"
                >
                  <MessageSquareText size={14} />
                  <span>Quick Buy</span>
                </button>

                <button
                  onClick={() => addToCart(trioProduct)}
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.75rem 0.6rem", fontSize: "0.84rem" }}
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>

          {/* Offer Card 2: 5-Piece Vault Complete Ritual */}
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-medium)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: "0 2px 12px rgba(24, 25, 23, 0.04)"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  backgroundColor: "var(--accent-pine-soft)",
                  color: "var(--accent-pine)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--radius-xs)"
                }}>
                  The Vault • Save ₹1,196
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  5-Piece Master System
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: "0.45rem",
                color: "var(--text-primary)"
              }}>
                The Barrier Vault Regimen
              </h3>

              <p style={{
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "1.25rem"
              }}>
                Cleanser, Centella Calming Essence, Niacinamide Serum, 5-Ceramide Barrier Cream, and Peptide Lip Glaze. Housed in a complimentary linen travel pouch.
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                marginBottom: "1.5rem",
                fontSize: "0.82rem",
                color: "var(--text-secondary)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Check size={14} color="#166534" />
                  <span>Comprehensive AM & PM biocompatible regimen</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Check size={14} color="#166534" />
                  <span>Cash on Delivery (COD) & UPI payment on WhatsApp</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {settings.currency}2,499
                </span>
                <span style={{ fontSize: "0.95rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                  {settings.currency}3,695
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--accent-pine)", fontWeight: 600 }}>
                  (33% OFF)
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "0.6rem" }}>
                <button
                  onClick={() => openExpressCheckout(vaultProduct, 1)}
                  className="btn btn-whatsapp"
                  style={{ width: "100%", padding: "0.75rem 0.6rem", fontSize: "0.84rem" }}
                  title="Order bundle directly via WhatsApp"
                >
                  <MessageSquareText size={14} />
                  <span>Quick Buy</span>
                </button>

                <button
                  onClick={() => addToCart(vaultProduct)}
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.75rem 0.6rem", fontSize: "0.84rem" }}
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>

          {/* Offer Card 3: Interactive Promo Vouchers Desk */}
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-medium)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 2px 12px rgba(24, 25, 23, 0.04)"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--radius-xs)"
                }}>
                  Instant Promo Vouchers
                </span>
                <Tag size={15} color="var(--text-muted)" />
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: "0.45rem",
                color: "var(--text-primary)"
              }}>
                Exclusive Vouchers
              </h3>

              <p style={{
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "1.25rem"
              }}>
                Apply directly to your bag before checkout. All codes auto-verified upon WhatsApp order dispatch.
              </p>

              {/* Promo Code Snippets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  borderRadius: "var(--radius-xs)",
                  border: "1px dashed var(--border-medium)"
                }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.05em" }}>WELCOME15</span>
                    <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>15% off first order over ₹799</div>
                  </div>
                  <button
                    onClick={() => handleCopyAndApply("WELCOME15")}
                    style={{
                      padding: "0.3rem 0.65rem",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      backgroundColor: "var(--text-primary)",
                      color: "#FAF8F5",
                      borderRadius: "var(--radius-xs)",
                      cursor: "pointer"
                    }}
                  >
                    Apply
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  borderRadius: "var(--radius-xs)",
                  border: "1px dashed var(--border-medium)"
                }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.05em" }}>DUOGLOW</span>
                    <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>Flat ₹200 off on 2+ serums (orders &gt; ₹1,199)</div>
                  </div>
                  <button
                    onClick={() => handleCopyAndApply("DUOGLOW")}
                    style={{
                      padding: "0.3rem 0.65rem",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      backgroundColor: "var(--text-primary)",
                      color: "#FAF8F5",
                      borderRadius: "var(--radius-xs)",
                      cursor: "pointer"
                    }}
                  >
                    Apply
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  borderRadius: "var(--radius-xs)",
                  border: "1px dashed var(--border-medium)"
                }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.05em" }}>LUMERA400</span>
                    <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>Flat ₹400 off on orders &gt; ₹1,799</div>
                  </div>
                  <button
                    onClick={() => handleCopyAndApply("LUMERA400")}
                    style={{
                      padding: "0.3rem 0.65rem",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      backgroundColor: "var(--text-primary)",
                      color: "#FAF8F5",
                      borderRadius: "var(--radius-xs)",
                      cursor: "pointer"
                    }}
                  >
                    Apply
                  </button>
                </div>

              </div>
            </div>

            <div style={{
              fontSize: "0.76rem",
              color: "var(--text-muted)",
              borderTop: "1px solid var(--border-light)",
              paddingTop: "0.85rem"
            }}>
              ✓ Automatic free delivery on orders above {settings.currency}{settings.freeShippingThreshold}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
