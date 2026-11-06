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
        backgroundColor: "#FAF8F5",
        borderTop: "1px solid #E8E4DC",
        borderBottom: "1px solid #E8E4DC",
        padding: "1.15rem 0"
      }}
      className="trust-strip-ribbon"
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
                padding: "0.2rem 0"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E4E4E7",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
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
                    fontWeight: 700,
                    color: "#18181B",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {tp.title}
                </div>
                <div
                  style={{
                    fontSize: "0.74rem",
                    color: "#71717A",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500
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
