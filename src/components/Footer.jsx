import React from "react";
import { useStore } from "../context/StoreContext";
import { MessageCircle, Mail, Clock, Shield, Lock } from "lucide-react";

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
      `Hello ${settings.storeName}! I am contacting your customer support team.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleNav = (cat, con) => {
    setSelectedCategoryFilter(cat || "All Products");
    setSelectedConcernFilter(con || "All Concerns");
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        
        <div className="footer-main-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-column">
            <div style={{ marginBottom: "1rem" }}>
              <div className="brand-title" style={{ color: "#FFFFFF" }}>LUMÈRA</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "#A1A1AA", marginTop: "6px", fontWeight: 600 }}>
                CLINICAL SKINCARE LAB
              </div>
            </div>

            <p style={{ color: "#9CA3AF", fontSize: "0.86rem", lineHeight: 1.6, maxWidth: "340px", marginBottom: "1.25rem" }}>
              Targeted, evidence-based skincare calibrated for Indian climate and skin types. 100% fragrance-free, non-comedogenic, and transparently formulated.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", backgroundColor: "#1F2937", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", fontSize: "0.74rem", color: "#D1D5DB" }}>
              <Shield size={14} color="var(--accent-emerald)" />
              <span>GMP & ISO 22716 Cleanroom Certified</span>
            </div>
          </div>

          {/* Column 2: Formulations */}
          <div className="footer-column">
            <h4>Formulations</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleNav("Serums", null)}>
                  Face Serums
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Moisturizers", null)}>
                  Barrier Creams & Gels
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Cleansers", null)}>
                  Gentle Cleansers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Sunscreens", null)}>
                  Sun Protection SPF 50+
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Toners", null)}>
                  Exfoliants & Toners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("Bundles", null)}>
                  Curated Regimen Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Concerns */}
          <div className="footer-column">
            <h4>Shop by Concern</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleNav(null, "Acne & Blemishes")}>
                  Acne & Active Breakouts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Dullness & Spots")}>
                  Dark Spots & Pigmentation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Barrier Repair")}>
                  Damaged Skin Barrier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Dryness")}>
                  Dehydration & Flaking
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(null, "Sun Protection")}>
                  UV & Blue Light Defense
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Support */}
          <div className="footer-column">
            <h4>WhatsApp & Support</h4>
            
            <p style={{ fontSize: "0.84rem", color: "#9CA3AF", marginBottom: "0.85rem", lineHeight: 1.5 }}>
              100% Guest Checkout. Direct WhatsApp order assistance with doorstep COD & UPI across India.
            </p>

            <button
              onClick={handleOpenWhatsApp}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "var(--accent-whatsapp)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.86rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "0.85rem",
                cursor: "pointer"
              }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp: {settings.whatsappDisplayNumber}</span>
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.76rem", color: "#9CA3AF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={13} color="#D1D5DB" />
                <span>{settings.supportHours}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Mail size={13} color="#D1D5DB" />
                <span>{settings.businessEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span>Doorstep Cash on Delivery (COD)</span>
            <span>•</span>
            <span>Instant UPI</span>
            <span>•</span>
            <span>100% Guest Checkout</span>
            <span>•</span>
            <button
              onClick={() => navigateTo("admin")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#9CA3AF",
                cursor: "pointer",
                fontSize: "0.76rem"
              }}
              title="Secure Staff Portal (PIN 1234)"
            >
              <Lock size={12} />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
