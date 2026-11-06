import React from "react";
import { useStore } from "../context/StoreContext";
import { SKIN_CONCERNS } from "../data/initialProducts";

const CONCERN_ICONS = {
  "All Concerns": "🌟",
  "Acne & Blemishes": "🌿",
  "Dullness & Spots": "✨",
  "Barrier Repair": "🛡️",
  "Dryness": "💧",
  "Anti-Aging": "⏳",
  "Sun Protection": "☀️",
  "Dark Circles": "👁️"
};

export const SkinConcernsBar = () => {
  const { selectedConcernFilter, setSelectedConcernFilter } = useStore();

  const handleSelect = (concern) => {
    setSelectedConcernFilter(concern);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid var(--border-light)",
      padding: "1rem 0",
      position: "relative"
    }}>
      <div className="container">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "0.2rem 0"
        }}>
          <span style={{
            fontSize: "0.76rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-secondary)",
            marginRight: "0.4rem",
            whiteSpace: "nowrap"
          }}>
            Shop by Concern:
          </span>

          {SKIN_CONCERNS.map((concern) => {
            const isActive = selectedConcernFilter === concern;
            const icon = CONCERN_ICONS[concern] || "•";
            return (
              <button
                key={concern}
                onClick={() => handleSelect(concern)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.84rem",
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  backgroundColor: isActive ? "var(--text-primary)" : "var(--bg-secondary)",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  border: isActive ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  transition: "all var(--transition-fast)",
                  cursor: "pointer"
                }}
              >
                <span>{icon}</span>
                <span>{concern}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
