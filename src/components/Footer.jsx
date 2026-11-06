import React from "react";
import { useStore } from "../context/StoreContext";
import { MessageCircle, Mail, Clock, Shield, Sparkles, Lock } from "lucide-react";

export const Footer = () => {
  const {
    settings,
    navigateTo,
    setSelectedConcernFilter,
    setSelectedCategoryFilter
  } = useStore();

  const handleOpenWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I am contacting your advisory team.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleNav = (cat, con) => {
    if (cat) setSelectedCategoryFilter(cat);
    if (con) setSelectedConcernFilter(con);
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      backgroundColor: "#161917",
      color: "#FAF8F5",
      padding: "5rem 0 2.5rem 0",
      borderTop: "1px solid #282E29"
    }}>
      <div className="container">
        
        {/* 4-Column Editorial Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: "3rem",
          marginBottom: "4rem"
        }} className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.85rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#FFFFFF",
                display: "block",
                lineHeight: 1
              }}>
                LUMÈRA
              </span>
              <span style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                fontWeight: 600,
                color: "#88978B",
                textTransform: "uppercase"
              }}>
                Biocompatible Lipid Science
              </span>
            </div>

            <p style={{ color: "#B3BFB6", fontSize: "0.88rem", lineHeight: 1.65, maxWidth: "340px", marginBottom: "1.5rem" }}>
              Active clinical dermatology meeting biocompatible plant lipids. Zero harsh fillers, zero artificial fragrances. Every active concentration is declared on the bottle.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(255,255,255,0.06)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-sm)", fontSize: "0.76rem", color: "#A7F3D0" }}>
              <Shield size={14} />
              <span>Certified GMP & ISO 22716 Cleanroom Production</span>
            </div>
          </div>

          {/* Column 2: Formulations */}
          <div>
            <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#88978B", marginBottom: "1.25rem", fontWeight: 700 }}>
              Formulations
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "#D1DCD3" }}>
              <li>
                <button onClick={() => handleNav("Serums", null)} style={{ color: "inherit", cursor: "pointer" }}>
                  Clinical Active Serums
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Moisturizers", null)} style={{ color: "inherit", cursor: "pointer" }}>
                  5-Ceramide Barrier Creams
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Cleansers", null)} style={{ color: "inherit", cursor: "pointer" }}>
                  2% BHA Pore Cleansers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Sunscreens", null)} style={{ color: "inherit", cursor: "pointer" }}>
                  Invisible Fluid SPF 50+
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Bundles", null)} style={{ color: "inherit", cursor: "pointer" }}>
                  Full Regimen Bundles (30% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Skin Concerns Navigation */}
          <div>
            <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#88978B", marginBottom: "1.25rem", fontWeight: 700 }}>
              Skin Concerns
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "#D1DCD3" }}>
              <li>
                <button onClick={() => handleNav(null, "Acne & Blemishes")} style={{ color: "inherit", cursor: "pointer" }}>
                  Acne & Congested Pores
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Dullness & Spots")} style={{ color: "inherit", cursor: "pointer" }}>
                  Hyperpigmentation & Dark Marks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Barrier Repair")} style={{ color: "inherit", cursor: "pointer" }}>
                  Compromised Acid Mantle
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Anti-Aging")} style={{ color: "inherit", cursor: "pointer" }}>
                  Cellular Turnover & Retinoids
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Concierge */}
          <div>
            <h4 style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#88978B", marginBottom: "1.25rem", fontWeight: 700 }}>
              Direct WhatsApp Orders
            </h4>
            
            <p style={{ fontSize: "0.86rem", color: "#B3BFB6", marginBottom: "1rem", lineHeight: 1.5 }}>
              Skip payment gateway fees and cart dropouts. Order directly on WhatsApp with cash on delivery or instant UPI.
            </p>

            <button
              onClick={handleOpenWhatsApp}
              className="btn btn-whatsapp"
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              <MessageCircle size={18} />
              <span>{settings.whatsappDisplayNumber}</span>
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.78rem", color: "#88978B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={14} />
                <span>{settings.supportHours}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Mail size={14} />
                <span>{settings.businessEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright and quiet discreet staff portal link */}
        <div style={{
          paddingTop: "2rem",
          borderTop: "1px solid #282E29",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.78rem",
          color: "#88978B"
        }}>
          <div>
            © {new Date().getFullYear()} {settings.storeName}. All rights reserved. Cleanroom formulated.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>Cash on Delivery & Instant UPI Available</span>
            <span>•</span>
            <span>100% Secure WhatsApp Direct Commerce</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
