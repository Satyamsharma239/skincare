import React from "react";
import { useStore } from "../context/StoreContext";
import { SKIN_CONCERNS } from "../data/initialProducts";
import { X } from "lucide-react";

const CONCERN_ICONS = {
  "All Concerns": "✦",
  "Acne & Blemishes": "🌿",
  "Dullness & Spots": "✨",
  "Barrier Repair": "🛡️",
  "Dryness": "💧",
  "Anti-Aging": "⌛",
  "Sun Protection": "☀️",
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
    <div className="skin-concerns-bar-myntra">
      <div className="container">
        <div className="concern-bar-inner">
          <span className="concern-label">SHOP BY CONCERN:</span>

          <div className="concern-pills-scroll">
            {SKIN_CONCERNS.map((concern) => {
              const isActive = selectedConcernFilter === concern;
              return (
                <button
                  key={concern}
                  onClick={() => handleSelect(concern)}
                  className={`concern-pill ${isActive ? "active" : ""}`}
                >
                  <span className="concern-icon">{CONCERN_ICONS[concern] || "◆"}</span>
                  <span>{concern}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
