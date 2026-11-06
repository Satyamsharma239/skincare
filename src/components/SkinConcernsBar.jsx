import React from "react";
import { useStore } from "../context/StoreContext";
import { SKIN_CONCERNS } from "../data/initialProducts";
import { X, SlidersHorizontal } from "lucide-react";

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
    <div 
      style={{
        backgroundColor: "#FAF9F6",
        borderBottom: "1px solid var(--border-light)",
        padding: "0.85rem 0"
      }}
      className="skin-concerns-bar"
    >
      <div className="container">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "0.2rem 0"
        }}>
          <div style={{
            fontSize: "0.74rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#18181B",
            marginRight: "0.25rem",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem"
          }}>
            <SlidersHorizontal size={13} color="#C2410C" />
            <span>Target Concern:</span>
          </div>

          {SKIN_CONCERNS.map((concern) => {
            const isActive = selectedConcernFilter === concern;
            return (
              <button
                key={concern}
                onClick={() => handleSelect(concern)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.45rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 700 : 600,
                  whiteSpace: "nowrap",
                  backgroundColor: isActive ? "#18181B" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#3F3F46",
                  border: isActive ? "1.5px solid #18181B" : "1px solid #E4E4E7",
                  boxShadow: isActive ? "0 2px 8px rgba(24, 24, 27, 0.15)" : "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.15s ease",
                  cursor: "pointer"
                }}
                className="concern-pill-btn"
              >
                {isActive && (
                  <span style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#C2410C"
                  }} />
                )}
                <span>{concern}</span>
              </button>
            );
          })}

          {selectedConcernFilter !== "All Concerns" && (
            <button
              onClick={() => setSelectedConcernFilter("All Concerns")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.45rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#C2410C",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FFEDD5",
                whiteSpace: "nowrap",
                cursor: "pointer"
              }}
              title="Reset skin concern filter"
            >
              <X size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
