import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, MessageSquareText, Sparkles, Truck } from "lucide-react";

export const HeroSection = () => {
  const { settings, openExpressCheckout, products } = useStore();
  const featuredProduct = products.find((p) => p.id === "prod-2") || products[0] || {
    id: "prod-2",
    name: "Barrier Defense 5-Ceramide Cream",
    volume: "50 g / 1.7 oz",
    price: 649,
    originalPrice: 849,
    rating: 4.96
  };

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = (settings.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName || "LUMÈRA"}! 🌿 I am browsing your skincare collection and would like advice on selecting the right formulation for my skin.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleScrollToCatalog = (e) => {
    e.preventDefault();
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      style={{ 
        background: "linear-gradient(180deg, #FAF9F6 0%, #FFFFFF 100%)", 
        borderBottom: "1px solid var(--border-light)",
        position: "relative",
        padding: "2.75rem 0 2.25rem 0"
      }}
    >
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Bold, High-Converting D2C Copy */}
          <div>
            {/* Clean Luxury Clinical Pill */}
            <div 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                backgroundColor: "#F4F4F5",
                border: "1px solid #E4E4E7",
                padding: "0.3rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.74rem",
                fontWeight: 700,
                color: "#18181B",
                marginBottom: "1rem",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-sans)"
              }}
            >
              <ShieldCheck size={14} color="#18181B" />
              <span>CLINICAL LIPID SCIENCE • 0% ARTIFICIAL FRAGRANCE</span>
            </div>

            {/* Main Punchy D2C Headline */}
            <h1 
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                lineHeight: 1.15,
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: "0.85rem",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em"
              }}
            >
              Targeted Skincare for Indian Skin. <br />
              <span style={{ color: "#C2410C", fontWeight: 800 }}>Real Actives. Visible Glow.</span>
            </h1>

            {/* Crisp Subtitle */}
            <p 
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                maxWidth: "520px",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500
              }}
            >
              Biomimetic 5-ceramides, niacinamide & gentle clinical actives with zero artificial fragrance. Calibrated for Indian heat, humidity & sensitive skin barriers.
            </p>

            {/* Launch Voucher Pill */}
            <div style={{
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              color: "#92400E",
              padding: "0.4rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "1.35rem"
            }}>
              <span>⚡ Launch Code:</span>
              <span style={{ backgroundColor: "#92400E", color: "#FFFFFF", padding: "0.15rem 0.45rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                FIRST15
              </span>
              <span>Extra 15% OFF your first order!</span>
            </div>

            {/* High-Impact CTA Buttons */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <a 
                href="#catalog-section"
                onClick={handleScrollToCatalog}
                className="btn btn-primary"
                style={{
                  padding: "0.85rem 2rem",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.12)"
                }}
              >
                <span>Shop Formulations</span>
                <ArrowRight size={16} />
              </a>

              <button 
                onClick={handleOpenWhatsAppChat}
                className="btn btn-whatsapp"
                style={{
                  padding: "0.85rem 1.85rem",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.25)"
                }}
              >
                <MessageSquareText size={17} />
                <span>Order on WhatsApp (COD)</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D97706" color="#D97706" />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                4.9 / 5 Rating
              </span>
              <span>•</span>
              <span>15,000+ Happy Customers across India</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Display */}
          <div>
            <div 
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 16px 36px -8px rgba(0, 0, 0, 0.08)",
                border: "1px solid var(--border-light)",
                position: "relative"
              }}
            >
              {/* Product Image Container */}
              <div style={{ position: "relative", width: "100%", height: "260px", backgroundColor: "#F5F3EF", overflow: "hidden" }}>
                {/* Top Badges */}
                <div style={{
                  position: "absolute",
                  top: "0.85rem",
                  left: "0.85rem",
                  zIndex: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem"
                }}>
                  <span style={{
                    backgroundColor: "#18181B",
                    color: "#FFFFFF",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase"
                  }}>
                    ★ Cult Bestseller
                  </span>
                  <span style={{
                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                    color: "#18181B",
                    border: "1px solid #E4E4E7",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.22rem 0.55rem",
                    borderRadius: "var(--radius-full)"
                  }}>
                    0% Perfume • Barrier Safe
                  </span>
                </div>

                <img 
                  src={featuredProduct.image || "/cream-swirl.jpg"} 
                  alt={featuredProduct.name} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/cream-swirl.jpg";
                  }}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    display: "block" 
                  }}
                />
              </div>

              {/* Bottom Interactive Product Card Overlay */}
              <div 
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: "#FFFFFF",
                  borderTop: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-terracotta)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Physiological 3:1:1 Lipids
                  </div>
                  <h4 style={{ fontSize: "0.96rem", fontWeight: 700, color: "var(--text-primary)", margin: "2px 0 0 0" }}>
                    {featuredProduct.name}
                  </h4>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    {featuredProduct.volume || "50 g"} • Rated ★ {featuredProduct.rating || 4.9}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      {settings.currency || "₹"}{featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                        {settings.currency || "₹"}{featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => openExpressCheckout(featuredProduct, 1)}
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: "0.45rem 1rem", fontSize: "0.78rem", fontWeight: 700, borderRadius: "var(--radius-full)" }}
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
    </section>
  );
};
