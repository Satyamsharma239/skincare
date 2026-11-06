import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, MessageSquareText, Sparkles, Truck } from "lucide-react";

export const HeroSection = () => {
  const { settings, setSelectedProductForModal, openExpressCheckout, products } = useStore();
  const featuredProduct = products.find((p) => p.id === "prod-2") || products[0];

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I am browsing your skincare collection and would like advice on selecting the right formulation for my skin.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <section 
      style={{ 
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)", 
        borderBottom: "1px solid var(--border-light)",
        position: "relative",
        overflow: "hidden",
        padding: "4.5rem 0 4rem 0"
      }}
    >
      <div className="container">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            alignItems: "center",
            gap: "3.5rem"
          }} 
          className="hero-grid"
        >
          {/* Left Column: Bold, High-Converting D2C Copy */}
          <div>
            {/* Clean Luxury Clinical Pill */}
            <div 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#F4F4F5",
                border: "1px solid #E4E4E7",
                padding: "0.35rem 0.9rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "#27272A",
                marginBottom: "1.35rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-sans)"
              }}
            >
              <ShieldCheck size={14} color="#18181B" />
              <span>DERMATOLOGICALLY TESTED • CLINICAL LIPID SCIENCE</span>
            </div>

            {/* Main Punchy D2C Headline */}
            <h1 
              style={{
                fontSize: "clamp(2.5rem, 4.6vw, 4rem)",
                lineHeight: 1.08,
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: "1.1rem",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em"
              }}
            >
              India's Favorite Gentle Skincare. <br />
              <span style={{ color: "#C2410C", fontWeight: 800 }}>Real Actives. Visible Glow.</span>
            </h1>

            {/* Crisp Subtitle */}
            <p 
              style={{
                fontSize: "1.08rem",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                maxWidth: "540px",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500
              }}
            >
              Pure ceramides, niacinamide & gentle clinical actives with zero artificial fragrance. Formulated for Indian heat, humidity & sensitive skin.
            </p>

            {/* Quick Proof Badges */}
            <div 
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "1.75rem"
              }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: "#F4F4F5",
                border: "1px solid #E4E4E7",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#18181B"
              }}>
                <CheckCircle2 size={14} color="#16A34A" />
                <span>0% Artificial Perfume</span>
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: "#F4F4F5",
                border: "1px solid #E4E4E7",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#18181B"
              }}>
                <CheckCircle2 size={14} color="#16A34A" />
                <span>Dermatologically Tested</span>
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: "#F4F4F5",
                border: "1px solid #E4E4E7",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#18181B"
              }}>
                <Truck size={14} color="#2563EB" />
                <span>Cash on Delivery (COD)</span>
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FFEDD5",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#C2410C"
              }}>
                <Sparkles size={14} color="#EA580C" />
                <span>FREE Courier on ₹499+</span>
              </span>
            </div>

            {/* Special Promo Callout Pill */}
            <div style={{
              backgroundColor: "#FEF3C7",
              border: "1px solid #FCD34D",
              color: "#92400E",
              padding: "0.55rem 1rem",
              borderRadius: "var(--radius-sm)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.84rem",
              fontWeight: 600,
              marginBottom: "1.75rem"
            }}>
              <span>⚡ Special Launch Offer:</span>
              <span style={{ backgroundColor: "#92400E", color: "#FFFFFF", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                FIRST15
              </span>
              <span>Extra 15% OFF your first order!</span>
            </div>

            {/* High-Impact CTA Buttons */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.85rem", marginBottom: "2rem" }}>
              <a 
                href="#catalog-section"
                className="btn btn-primary"
                style={{
                  padding: "0.95rem 2.4rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
                }}
              >
                <span>Shop All Formulations</span>
                <ArrowRight size={16} />
              </a>

              <button 
                onClick={handleOpenWhatsAppChat}
                className="btn btn-whatsapp"
                style={{
                  padding: "0.95rem 2.2rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)"
                }}
              >
                <MessageSquareText size={18} />
                <span>Order via WhatsApp (COD)</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#D97706" color="#D97706" />
                ))}
              </div>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                4.9 / 5 Rating
              </span>
              <span>•</span>
              <span>15,000+ Happy Customers across India</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Display */}
          <div style={{ position: "relative" }}>
            <div 
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                boxShadow: "0 20px 48px -12px rgba(17, 24, 39, 0.12)",
                border: "1px solid var(--border-light)",
                position: "relative"
              }}
            >
              {/* Top Banner Tag */}
              <div style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem"
              }}>
                <span style={{
                  backgroundColor: "#111827",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase"
                }}>
                  ★ Cult Bestseller
                </span>
                <span style={{
                  backgroundColor: "#F4F4F5",
                  color: "#27272A",
                  border: "1px solid #E4E4E7",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--radius-full)"
                }}>
                  0% Perfume • Barrier Safe
                </span>
              </div>

              {/* Product Image */}
              <img 
                src="/lumera-hero.jpg" 
                alt="LUMÈRA Clinical Skincare Dispensary" 
                className="hero-product-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/serum-dropper.jpg";
                }}
                style={{ 
                  width: "100%", 
                  height: "440px", 
                  objectFit: "cover",
                  display: "block" 
                }}
              />

              {/* Bottom Interactive Product Card Overlay */}
              <div 
                style={{
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#FFFFFF",
                  borderTop: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Physiological 3:1:1 Lipids
                  </div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "2px 0 0 0" }}>
                    {featuredProduct.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {featuredProduct.volume} • Rated ★ {featuredProduct.rating || 4.9}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      {settings.currency}{featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                        {settings.currency}{featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => openExpressCheckout(featuredProduct, 1)}
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", fontWeight: 700, borderRadius: "var(--radius-full)" }}
                  >
                    <span>Quick Buy</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-product-img {
            height: 300px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            gap: 1.5rem !important;
          }
          .hero-product-img {
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
};
