import React from "react";
import { Truck, ShieldCheck, MessageCircle, Banknote, Sparkles } from "lucide-react";

export const TrustStrip = () => {
  const trustPoints = [
    {
      icon: <Truck size={17} color="#18181B" />,
      title: "Free Express Courier",
      subtitle: "On orders above ₹499 via BlueDart/Delhivery"
    },
    {
      icon: <ShieldCheck size={17} color="#18181B" />,
      title: "Dermatologically Tested",
      subtitle: "0% synthetic perfume or drying alcohol"
    },
    {
      icon: <MessageCircle size={17} color="#18181B" />,
      title: "Direct WhatsApp Ordering",
      subtitle: "Instant confirmation & human chat support"
    },
    {
      icon: <Banknote size={17} color="#18181B" />,
      title: "Doorstep COD & UPI",
      subtitle: "Pay on delivery across 19,000+ PIN codes"
    }
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)",
        padding: "1.25rem 0"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            alignItems: "center"
          }}
        >
          {trustPoints.map((tp, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "0.25rem 0"
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "#F4F4F5",
                  border: "1px solid #E4E4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {tp.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {tp.title}
                </div>
                <div
                  style={{
                    fontSize: "0.74rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {tp.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
