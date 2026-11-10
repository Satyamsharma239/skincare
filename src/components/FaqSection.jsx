import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    q: "Do I need to create an account or password to place an order?",
    a: "No, never. We believe in 100% guest checkout. You don't need to sign up, remember a password, or download an app. Simply select your products, enter your delivery address, and confirm your order with doorstep Cash on Delivery (COD) or UPI."
  },
  {
    q: "How does ordering on WhatsApp work?",
    a: "When you click 'Quick Buy (COD)' or proceed from your bag, enter your delivery address and select Cash on Delivery or UPI. Your order is logged immediately with an Express courier tracking ID, and WhatsApp opens with your confirmed order summary."
  },
  {
    q: "Is Cash on Delivery (COD) available for my pincode?",
    a: "Yes! Doorstep Cash on Delivery (COD) and doorstep UPI QR payments are supported across 19,000+ PIN codes in India. You can inspect the package upon arrival and pay cash or scan the courier's UPI QR code."
  },
  {
    q: "Are LUMÈRA formulations 100% fragrance-free?",
    a: "Yes, 100%. We never add artificial perfumes, essential oils, or synthetic masking agents. Any subtle natural scent comes purely from therapeutic botanicals like green tea, cica, or colloidal oat. Our products are formulated non-comedogenic and hypoallergenic."
  },
  {
    q: "How long does delivery take?",
    a: "Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata) receive their shipments within 2 to 3 business days via BlueDart Air Express. Rest of India arrives within 3 to 5 business days with live tracking links sent via SMS and WhatsApp."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="faq-section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-label">
            Orders & Care
          </span>
          <h2 className="section-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-card-item">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="faq-question-btn"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="var(--text-main)" /> : <ChevronDown size={18} color="var(--text-caption)" />}
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
