import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Aanya R.",
      location: "Bengaluru (Indiranagar)",
      skinType: "Combination • Hormonal Chin Acne",
      product: "Radiance 10% Niacinamide + Zinc PCA",
      comment: "I've tried so many niacinamide serums that felt either sticky like glue or broke me out. This is water-light and absorbs in 15 seconds. My chin inflammation calmed down in literally 10 days. Ordering on WhatsApp was so fast—confirmed in 5 minutes.",
      date: "Verified WhatsApp Buyer • 12 days ago"
    },
    {
      id: 2,
      name: "Dr. Kabir M.",
      location: "Mumbai (Bandra West)",
      skinType: "Aesthetic Physician • Sensitive Barrier",
      product: "Barrier Defense 5-Ceramide Lipid Cream",
      comment: "As a doctor, I analyze formulation lipid ratios. LUMÈRA’s 5-Ceramide cream follows the physiological 3:1:1 lipid balance without clogging pore follicles in Mumbai humidity. Zero synthetic perfume or essential oils. Excellent patient feedback.",
      date: "Verified WhatsApp Buyer • 3 weeks ago"
    },
    {
      id: 3,
      name: "Sneha T.",
      location: "New Delhi (Greater Kailash)",
      skinType: "Warm Dusky Tone • Dark Spots",
      product: "Invisible Fluid Sunscreen SPF 50+ PA++++",
      comment: "Finding a high SPF sunscreen in India with genuinely ZERO white cast on dusky skin is nearly impossible. This one dries completely clear in 10 seconds and doesn’t pill under BB cream or make my T-zone greasy. Highly recommend!",
      date: "Verified WhatsApp Buyer • 2 weeks ago"
    },
    {
      id: 4,
      name: "Rhea V.",
      location: "Pune (Koregaon Park)",
      skinType: "Dry • Damaged from Chemical Peels",
      product: "The 3-Step Clear Skin Barrier Regimen",
      comment: "I destroyed my barrier with glycolic acid peels. The cleanser didn't sting at all, and the ceramide cream stopped the dry flaking overnight. Cash on delivery on WhatsApp made it super easy to try the full bundle.",
      date: "Verified WhatsApp Buyer • 1 month ago"
    }
  ];

  return (
    <section style={{
      backgroundColor: "#FFFFFF",
      padding: "5rem 0",
      borderBottom: "1px solid var(--border-light)"
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 3rem auto" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#C2410C",
            display: "inline-block",
            marginBottom: "0.4rem"
          }}>
            Customer Love & Real Reviews
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.4vw, 2.7rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0.2rem 0 0.8rem 0"
          }}>
            Loved by 15,000+ Real Customers
          </h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#D97706" color="#D97706" />
              ))}
            </div>
            <span><strong>4.94 / 5.0</strong> verified average across 1,480+ Indian deliveries</span>
          </div>
        </div>

        {/* 4-Card Reviews Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.25rem"
        }} className="reviews-grid">
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "var(--radius-md)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              {/* Star rating & Skin Type */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#EAB308" color="#EAB308" />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#166534", fontSize: "0.72rem", fontWeight: 700 }}>
                  <CheckCircle2 size={13} />
                  <span>Verified</span>
                </div>
              </div>

              <div style={{ fontSize: "0.75rem", color: "var(--accent-sage)", fontWeight: 700, marginBottom: "0.6rem" }}>
                {r.skinType}
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem", flexGrow: 1 }}>
                "{r.comment}"
              </p>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.85rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                  {r.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {r.location}
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--accent-terracotta)", fontWeight: 600, marginTop: "0.25rem" }}>
                  {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
