import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquareText } from "lucide-react";
import { useStore } from "../context/StoreContext";

const FAQS = [
  {
    q: "How does ordering on WhatsApp work?",
    a: "It's simple and fast! When you click 'Quick Buy' or 'Order on WhatsApp', your chosen products and delivery address are formatted into a clean message. WhatsApp opens directly with our verified business number. You confirm with 1 tap, and we dispatch via BlueDart/Delhivery with live tracking."
  },
  {
    q: "Is Cash on Delivery (COD) available?",
    a: "Yes! Doorstep Cash on Delivery (COD) is available across 19,000+ PIN codes in India. You can pay cash at your doorstep, or scan the courier's UPI QR code upon arrival."
  },
  {
    q: "Are LUMÈRA formulations 100% fragrance-free?",
    a: "Yes, 100%. We never add artificial perfumes, essential oils, or synthetic masking agents. Any subtle scent you notice comes strictly from pure therapeutic botanicals like colloidal oat, green tea, or cica extract."
  },
  {
    q: "How long will my delivery take?",
    a: "Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Pune, Kolkata) receive their orders within 2 to 3 business days. Rest of India typically arrives within 3 to 5 business days via BlueDart Air Express."
  },
  {
    q: "Can I consult with a formulator before purchasing?",
    a: "Absolutely! Tap the 'Order on WhatsApp' or 'WhatsApp Us' button anywhere on our website to chat directly with our cosmetic formulation team. We'll analyze your skin concerns, climate conditions, and recommend the exact routine for you."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { settings } = useStore();

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I have a question about your formulations and delivery.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <section 
      id="faq-section" 
      style={{ 
        backgroundColor: "#FFFFFF", 
        padding: "5rem 0", 
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)" 
      }}
    >
      <div className="container" style={{ maxWidth: "860px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#C2410C",
            display: "inline-block",
            marginBottom: "0.5rem"
          }}>
            Got Questions? We Have Answers
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.4vw, 2.7rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "0.75rem"
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: "0.96rem", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            Everything you need to know about our active formulations, WhatsApp commerce, and express delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isOpen ? "#FAFAF9" : "#FFFFFF",
                  overflow: "hidden",
                  transition: "all 0.2s ease"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                    cursor: "pointer",
                    gap: "1rem"
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={18} 
                    color="var(--text-muted)" 
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0
                    }} 
                  />
                </button>

                {isOpen && (
                  <div style={{
                    padding: "0 1.5rem 1.25rem 1.5rem",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-sans)",
                    borderTop: "1px solid #F4F4F5",
                    paddingTop: "0.85rem"
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions WhatsApp prompt */}
        <div style={{
          marginTop: "3rem",
          padding: "1.5rem 2rem",
          backgroundColor: "#F4F4F5",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem"
        }}>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.25rem 0" }}>
              Still have a specific question about your skin?
            </h4>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", margin: 0 }}>
              Our cosmetic formulation experts are live on WhatsApp right now.
            </p>
          </div>
          <button
            onClick={handleOpenWhatsAppChat}
            className="btn btn-whatsapp"
            style={{ padding: "0.65rem 1.25rem", fontSize: "0.84rem", fontWeight: 700 }}
          >
            <MessageSquareText size={15} />
            <span>Ask on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};