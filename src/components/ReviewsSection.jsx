import React from "react";
import { useStore } from "../context/StoreContext";
import { Star, ArrowUpRight } from "lucide-react";

export const ReviewsSection = () => {
  const { products, setSelectedProductForModal } = useStore();

  const reviews = [
    {
      id: 1,
      name: "Aanya R.",
      location: "Bengaluru",
      skinType: "Combination · Hormonal Acne",
      productId: "prod-1",
      productName: "Niacinamide 10% + Zinc 1%",
      comment: "Most niacinamide serums feel sticky in Bengaluru humidity. This absorbs in 15 seconds, keeps midday T-zone oil down, and visibly faded my post-acne marks in 3 weeks.",
      verifiedLabel: "Verified Order"
    },
    {
      id: 2,
      name: "Dr. Kabir M.",
      location: "Mumbai",
      skinType: "Sensitive · Barrier Recovery",
      productId: "prod-2",
      productName: "5-Ceramide Barrier Defense Cream",
      comment: "Clean 3:1:1 lipid balance and completely unfragranced. I recommend it routinely for patients recovering from over-exfoliation or winter barrier peeling.",
      verifiedLabel: "Verified Review"
    },
    {
      id: 3,
      name: "Sneha T.",
      location: "New Delhi",
      skinType: "Medium-Deep Complexion",
      productId: "prod-4",
      productName: "Invisible Fluid Sunscreen SPF 50+",
      comment: "Finally an SPF 50+ with genuinely zero white or gray cast on deeper Indian skin. Doesn't pill under moisturizer and didn't sting my eyes during summer commute.",
      verifiedLabel: "Verified Order"
    },
    {
      id: 4,
      name: "Rhea V.",
      location: "Pune",
      skinType: "Oily · Blemish-Prone",
      productId: "prod-26",
      productName: "Oil-Free Ultra-Light Water Gel",
      comment: "Hydrating without feeling occlusive or heavy. Paired it with the BHA cleanser on Cash on Delivery—parcel reached Pune in 48 hours intact.",
      verifiedLabel: "Verified Order"
    }
  ];

  const handleOpenReviewedProduct = (productId) => {
    const prod = (products || []).find((p) => p.id === productId);
    if (prod) setSelectedProductForModal(prod);
  };

  return (
    <section className="reviews-section">
      <div className="container">
        
        {/* Clean Editorial Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div>
            <span className="section-label">Customer Feedback</span>
            <h2 className="section-heading" style={{ margin: 0 }}>
              Real Results Across Skin Types
            </h2>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.86rem" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="var(--accent-amber)" color="var(--accent-amber)" />
              ))}
            </div>
            <strong className="tabular-nums" style={{ color: "var(--text-main)" }}>4.9 / 5.0</strong>
            <span style={{ color: "var(--text-caption)" }}>· 1,480+ verified reviews</span>
          </div>
        </div>

        {/* 4-Column Reviews */}
        <div className="reviews-grid">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="var(--accent-amber)" color="var(--accent-amber)" />
                  ))}
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--accent-pine)" }}>
                  {r.verifiedLabel}
                </span>
              </div>

              <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--text-caption)", marginBottom: "0.55rem" }}>
                {r.skinType}
              </div>

              <p style={{ fontSize: "0.86rem", color: "var(--text-main)", lineHeight: 1.6, marginBottom: "1.25rem", flexGrow: 1 }}>
                "{r.comment}"
              </p>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-main)" }}>
                  {r.name} · <span style={{ fontWeight: 400, color: "var(--text-caption)" }}>{r.location}</span>
                </div>
                <button
                  onClick={() => handleOpenReviewedProduct(r.productId)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.74rem",
                    color: "var(--accent-pine)",
                    fontWeight: 600,
                    marginTop: "0.25rem",
                    padding: 0,
                    textAlign: "left"
                  }}
                >
                  <span>{r.productName}</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
