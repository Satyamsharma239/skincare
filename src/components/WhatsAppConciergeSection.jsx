import React from "react";
import { useStore } from "../context/StoreContext";
import { MessageCircle, Shield, Clock, ArrowRight } from "lucide-react";

export const WhatsAppConciergeSection = () => {
  const { settings } = useStore();

  const handleOpenPrompt = (promptType) => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    let query = "";

    if (promptType === "acne") {
      query = `Hello ${settings.storeName}! I have active breakouts and stubborn dark marks. Could your team recommend the right clinical actives for my skin?`;
    } else if (promptType === "barrier") {
      query = `Hello ${settings.storeName}! My skin barrier is red, stinging, and dehydrated from over-exfoliation. What restorative ceramide regimen should I start?`;
    } else if (promptType === "retinol") {
      query = `Hello ${settings.storeName}! I want to start using retinol for fine lines and skin texture. Could you guide me on slow-release introduction?`;
    } else {
      query = `Hello ${settings.storeName}! I would like to get a personalized skincare consultation.`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <section style={{
      backgroundColor: "#FBFBFA",
      color: "var(--text-primary)",
      padding: "5rem 0",
      borderTop: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)"
    }}>
      <div className="container">
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: "4rem"
        }} className="concierge-grid">
          
          {/* Left Column */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#F4F4F5",
              color: "#27272A",
              border: "1px solid #E4E4E7",
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.25rem"
            }}>
              <MessageCircle size={14} color="#18181B" />
              <span>Dermatological Prescriptive Desk</span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.4vw, 2.9rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "1rem"
            }}>
              Need guidance choosing <br />
              <span style={{ color: "#C2410C" }}>
                the right product for your skin?
              </span>
            </h2>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.65, maxWidth: "520px", marginBottom: "2rem", fontFamily: "var(--font-sans)" }}>
              No automated bots. Message our formulation advisory team directly on WhatsApp to discuss your skin type, climate conditions, and active ingredient compatibility.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={15} color="#18181B" />
                <span>Formulator response in &lt; 15 mins</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Shield size={15} color="#18181B" />
                <span>Zero gateway fees • COD eligible</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Ready-to-Send Consultation Prompts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            
            <div
              onClick={() => handleOpenPrompt("acne")}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
              className="prompt-card-light"
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "3px" }}>
                  "I have active breakouts & stubborn acne marks"
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Ask our team about 2% BHA Cleanser & 10% Niacinamide dosage
                </div>
              </div>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <ArrowRight size={15} />
              </div>
            </div>

            <div
              onClick={() => handleOpenPrompt("barrier")}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
              className="prompt-card-light"
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "3px" }}>
                  "My skin barrier is stinging, red, and flaking"
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Ask for emergency 5-Ceramide & Centella Calming protocol
                </div>
              </div>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <ArrowRight size={15} />
              </div>
            </div>

            <div
              onClick={() => handleOpenPrompt("retinol")}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
              className="prompt-card-light"
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "3px" }}>
                  "I want to start Retinol without purging or peeling"
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Learn how our 0.3% Encapsulated lipid elixir works
                </div>
              </div>
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <ArrowRight size={15} />
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .prompt-card-light:hover {
          border-color: #18181B !important;
          transform: translateX(4px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 900px) {
          .concierge-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};