import React from "react";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Award, Users, Droplets, Leaf } from "lucide-react";

export const ClinicalResultsSection = () => {
  const clinicalMetrics = [
    {
      percentage: "96%",
      metric: "Barrier Recovery",
      description: "Agreed skin barrier felt calmer, less reactive, and deeply hydrated without heaviness."
    },
    {
      percentage: "92%",
      metric: "Acne & Clog Reduction",
      description: "Reported visible reduction in stubborn breakouts and enlarged pore congestion within 14 days."
    },
    {
      percentage: "89%",
      metric: "Dark Spot Lightening",
      description: "Noticed faded post-acne pigmentation and a brighter, even tone across facial contours."
    },
    {
      percentage: "100%",
      metric: "Kind & Non-Irritating",
      description: "Confirmed zero burning, zero redness, and 100% free of synthetic fragrances or ethyl alcohol."
    }
  ];

  const brandPillars = [
    {
      icon: <Droplets size={22} color="#18181B" />,
      title: "Kind to Skin Science",
      description: "Inspired by gentle dermatological principles. Zero harsh sulphates, zero artificial fragrances, zero drying alcohol."
    },
    {
      icon: <Leaf size={22} color="#18181B" />,
      title: "Vegan & Cruelty-Free",
      description: "Ethical formulation standards. Only biocompatible plant extracts and biomimetic skin-identical lipids."
    },
    {
      icon: <ShieldCheck size={22} color="#18181B" />,
      title: "Indian Climate Calibrated",
      description: "Engineered specifically to resist humidity breakdown, high heat oxidation, and urban air pollution."
    },
    {
      icon: <Users size={22} color="#18181B" />,
      title: "Real People. Real Results.",
      description: "Every concentration declared with complete honesty. Over 15,000+ verified customer dispatches across India."
    }
  ];

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        padding: "5rem 0",
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)"
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem auto" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#C2410C",
              display: "inline-block",
              marginBottom: "0.5rem"
            }}
          >
            Clinical Efficacy & Consumer Studies
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: "0.75rem"
            }}
          >
            Real People. Clinically Proven Results.
          </h2>
          <p
            style={{
              fontSize: "0.96rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              fontFamily: "var(--font-sans)"
            }}
          >
            Independent 4-week consumer perception study across 120 Indian men and women navigating high humidity, AC drying, and sensitive barriers.
          </p>
        </div>

        {/* 4 Stat Boxes (Plum & Simple Efficacy Proof) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4.5rem"
          }}
        >
          {clinicalMetrics.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FAFAF9",
                borderRadius: "var(--radius-md)",
                padding: "2.25rem 1.5rem",
                border: "1px solid var(--border-light)",
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              className="stat-box"
            >
              <div
                style={{
                  fontSize: "3.2rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  color: "#18181B",
                  lineHeight: 1,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.03em"
                }}
              >
                {item.percentage}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.45rem",
                  fontFamily: "var(--font-sans)"
                }}
              >
                {item.metric}
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "var(--font-sans)"
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            paddingTop: "3rem",
            borderTop: "1px solid var(--border-light)"
          }}
        >
          {brandPillars.map((pillar, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#F4F4F5",
                  border: "1px solid #E4E4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {pillar.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                    margin: 0,
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .stat-box:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-card);
        }
      `}</style>
    </section>
  );
};
