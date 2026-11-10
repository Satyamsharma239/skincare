import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight } from "lucide-react";

export const TrustSection = () => {
  const { settings } = useStore();

  const handleWhatsAppConsult = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! I have a question about the active percentages in your formulations.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <section style={{
      backgroundColor: "#fff",
      padding: "6rem 0",
      borderBottom: "1px solid var(--border-light)"
    }}>
      <div className="container">
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          alignItems: "center",
          gap: "4.5rem"
        }} className="trust-grid">
          
          {/* Left Media Graphic */}
          <div style={{ position: "relative" }}>
            <div style={{
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              border: "1px solid var(--border-light)",
              backgroundColor: "var(--bg-studio)"
            }}>
              <img 
                src="/lab-science.jpg" 
                alt="Cosmetic chemist testing active formulation in ISO cleanroom"
                className="trust-lab-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/lumera-hero.jpg";
                }}
                style={{ width: "100%", height: "460px", objectFit: "cover" }}
              />
            </div>

            {/* Subtle Laboratory Origin Seal */}
            <div style={{
              position: "absolute",
              bottom: "1.25rem",
              left: "1.25rem",
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              padding: "0.75rem 1.1rem",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-light)"
            }}>
              <div style={{ fontSize: "0.74rem", color: "var(--text-main)", fontWeight: 700, letterSpacing: "0.02em" }}>
                ISO 22716 Cleanroom Facility
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-caption)" }}>
                Batch calibrated & stability tested in inert nitrogen
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div>
            <div style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-pine)",
              marginBottom: "0.75rem"
            }}>
              Formulation Transparency
            </div>

            <h2 style={{ 
              fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)", 
              fontWeight: 700, 
              lineHeight: 1.15, 
              marginBottom: "1.15rem",
              color: "var(--text-main)"
            }}>
              Clinical Active Science. <br />
              <span style={{ color: "var(--text-caption)", fontWeight: 600 }}>
                Zero compromise on barrier health.
              </span>
            </h2>

            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Traditional commercial skincare often relies on fairy-dust concentrations disguised by heavy artificial perfumes that disrupt the acid mantle. We formulate with bio-identical actives at transparent clinical percentages, balanced in biomimetic plant lipids.
            </p>

            {/* 3 Pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              <div style={{ borderLeft: "2px solid var(--accent-pine)", paddingLeft: "1rem" }}>
                <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>
                  100% Declared Active Concentrations
                </strong>
                <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", margin: 0 }}>
                  Every active percentage is explicitly printed on the front label. No proprietary blends, no hidden low-potency shortcuts.
                </p>
              </div>

              <div style={{ borderLeft: "2px solid var(--accent-pine)", paddingLeft: "1rem" }}>
                <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>
                  3:1:1 Biomimetic Barrier Ratios
                </strong>
                <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", margin: 0 }}>
                  5 essential ceramides, plant cholesterol, and free fatty acids matching human intercellular lipids to prevent trans-epidermal moisture loss.
                </p>
              </div>

              <div style={{ borderLeft: "2px solid var(--accent-pine)", paddingLeft: "1rem" }}>
                <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>
                  Zero Synthetic Fragrance or Essential Oils
                </strong>
                <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", margin: 0 }}>
                  Zero sensitizing linalool, limonene, or synthetic dyes. Hypoallergenic and safe for reactive, inflamed, or acne-prone skin.
                </p>
              </div>
            </div>

            <button
              onClick={handleWhatsAppConsult}
              className="btn btn-secondary"
              style={{ fontSize: "0.84rem" }}
            >
              <span>Consult with our Formulation Chemist</span>
              <ArrowRight size={14} />
            </button>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .trust-lab-img {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
};
