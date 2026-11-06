import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, MessageSquareText, Truck } from "lucide-react";

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
    const cleanPhone = (settings?.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings?.storeName || "LUMÈRA"}! 🌿 I am browsing your skincare collection and would like advice on selecting the right formulation for my skin.`
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
        backgroundColor: "#FFFFFF", 
        borderBottom: "1px solid var(--border-light)",
        padding: "1.75rem 0 2rem 0"
      }}
    >
      <div className="container">
        
        {/* Unified Luxury Framed Banner */}
        <div 
          style={{
            backgroundColor: "#FAF8F5",
            borderRadius: "20px",
            border: "1px solid #E8E4DC",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)"
          }}
          className="hero-banner-card"
        >
          <div className="hero-grid" style={{ alignItems: "stretch" }}>
            
            {/* Left Column: Bold Editorial Copy & Dual Minimal Buttons */}
            <div 
              style={{ 
                padding: "clamp(2rem, 3.8vw, 3.25rem)", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center" 
              }}
            >
              {/* Clean Clinical Pill */}
              <div 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E4E4E7",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "999px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#18181B",
                  marginBottom: "1rem",
                  width: "fit-content",
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-sans)"
                }}
              >
                <ShieldCheck size={14} color="#18181B" />
                <span>CLINICAL LIPID SCIENCE • 100% UNFRAGRANCED</span>
              </div>

              {/* Main Punchy D2C Headline */}
              <h1 
                style={{
                  fontSize: "clamp(1.95rem, 3.6vw, 3rem)",
                  lineHeight: 1.15,
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  marginBottom: "0.85rem",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em"
                }}
              >
                Targeted Active Formulations. <br />
                <span style={{ color: "#C2410C", fontWeight: 800 }}>Calibrated for Indian Skin.</span>
              </h1>

              {/* Crisp Subtitle */}
              <p 
                style={{
                  fontSize: "0.96rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  maxWidth: "520px",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500
                }}
              >
                Biomimetic 5-ceramides, niacinamide & pure barrier lipids formulated without drying alcohols or artificial fragrance. Developed specifically for heat, humidity & sensitive skin barriers.
              </p>

              {/* Micro Trust Proof Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", padding: "0.25rem 0.7rem", borderRadius: "999px", fontSize: "0.76rem", fontWeight: 600, color: "#18181B" }}>
                  <CheckCircle2 size={13} color="#16A34A" /> 5 Ceramides (3:1:1 Ratio)
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", padding: "0.25rem 0.7rem", borderRadius: "999px", fontSize: "0.76rem", fontWeight: 600, color: "#18181B" }}>
                  <CheckCircle2 size={13} color="#16A34A" /> 72-Hour Moisture Seal
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", padding: "0.25rem 0.7rem", borderRadius: "999px", fontSize: "0.76rem", fontWeight: 600, color: "#18181B" }}>
                  <Truck size={13} color="#2563EB" /> Free Express Courier (₹499+)
                </span>
              </div>

              {/* Launch Voucher Card */}
              <div style={{
                backgroundColor: "#FFFBEB",
                border: "1px solid #FDE68A",
                color: "#92400E",
                padding: "0.4rem 0.85rem",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                width: "fit-content"
              }}>
                <span>⚡ Launch Voucher:</span>
                <span style={{ backgroundColor: "#92400E", color: "#FFFFFF", padding: "0.15rem 0.45rem", borderRadius: "4px", fontSize: "0.74rem", fontWeight: 700 }}>
                  FIRST15
                </span>
                <span>Extra 15% OFF your first order!</span>
              </div>

              {/* High-Impact Luxury Buttons - ZERO GREEN */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <a 
                  href="#catalog-section"
                  onClick={handleScrollToCatalog}
                  style={{
                    backgroundColor: "#18181B",
                    color: "#FFFFFF",
                    padding: "0.85rem 2rem",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 14px rgba(24, 24, 27, 0.2)",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                  className="hero-primary-btn"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight size={16} />
                </a>

                <button 
                  onClick={handleOpenWhatsAppChat}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#18181B",
                    border: "1.5px solid #18181B",
                    padding: "0.85rem 1.85rem",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                  }}
                  className="hero-secondary-btn"
                >
                  <div style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#22C55E",
                    boxShadow: "0 0 6px #22C55E"
                  }} />
                  <MessageSquareText size={16} />
                  <span>Order via WhatsApp (COD)</span>
                </button>
              </div>

              {/* Social Proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#D97706" color="#D97706" />
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                  4.96 / 5 Rating
                </span>
                <span>•</span>
                <span>15,000+ Happy Customers across India</span>
              </div>

            </div>

            {/* Right Column: Full-Height Integrated Visual Showcase */}
            <div style={{ position: "relative", minHeight: "440px", display: "flex", flexDirection: "column" }} className="hero-visual-col">
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
                  minHeight: "440px",
                  objectFit: "cover",
                  display: "block" 
                }}
              />

              {/* Top Floating Badge */}
              <div style={{
                position: "absolute",
                top: "1.25rem",
                left: "1.25rem",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem"
              }}>
                <span style={{
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase"
                }}>
                  ★ Cult Bestseller • Clinical Defense
                </span>
              </div>

              {/* Bottom Floating Glassmorphic Showcase Card */}
              <div 
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  padding: "1rem 1.25rem",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#C2410C", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Physiological 3:1:1 Lipids
                  </div>
                  <h4 style={{ fontSize: "0.96rem", fontWeight: 700, color: "var(--text-primary)", margin: "2px 0 0 0" }}>
                    {featuredProduct.name}
                  </h4>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    {featuredProduct.volume || "50 g"} • Rated ★ {featuredProduct.rating || 4.96}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      {settings?.currency || "₹"}{featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                        {settings?.currency || "₹"}{featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => openExpressCheckout(featuredProduct, 1)}
                    style={{
                      backgroundColor: "#18181B",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "0.45rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      borderRadius: "999px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem"
                    }}
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
