import React from "react";
import { ShieldCheck, Truck, Banknote, FlaskConical } from "lucide-react";

export const TrustStrip = () => {
  return (
    <div className="trust-pillars-strip">
      <div className="container">
        <div className="trust-pillars-grid">
          
          <div className="trust-pillar-item">
            <div className="trust-pillar-icon">
              <FlaskConical size={20} strokeWidth={1.6} color="var(--accent-pine)" />
            </div>
            <div>
              <div className="trust-pillar-title">Declared Clinical Dosages</div>
              <div className="trust-pillar-desc">Exact active percentages printed on every label with zero filler claims</div>
            </div>
          </div>

          <div className="trust-pillar-item">
            <div className="trust-pillar-icon">
              <ShieldCheck size={20} strokeWidth={1.6} color="var(--text-main)" />
            </div>
            <div>
              <div className="trust-pillar-title">100% Fragrance & Dye Free</div>
              <div className="trust-pillar-desc">Zero artificial perfume, zero drying alcohol, non-comedogenic formulas</div>
            </div>
          </div>

          <div className="trust-pillar-item">
            <div className="trust-pillar-icon">
              <Banknote size={20} strokeWidth={1.6} color="var(--accent-pine)" />
            </div>
            <div>
              <div className="trust-pillar-title">Doorstep Cash on Delivery</div>
              <div className="trust-pillar-desc">Pay cash or scan UPI at delivery across 19,000+ Indian PIN codes</div>
            </div>
          </div>

          <div className="trust-pillar-item">
            <div className="trust-pillar-icon">
              <Truck size={20} strokeWidth={1.6} color="var(--text-main)" />
            </div>
            <div>
              <div className="trust-pillar-title">BlueDart Air Express</div>
              <div className="trust-pillar-desc">Free express courier above ₹499 with live AWB tracking</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
