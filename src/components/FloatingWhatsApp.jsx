import React from "react";
import { useStore } from "../context/StoreContext";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  const { settings, currentRoute } = useStore();

  if (currentRoute === "admin") return null;

  const handleOpenWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! I am browsing your skincare collection and would like advice on selecting a formulation or placing my order.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <aside 
      className="floating-whatsapp-container"
      aria-label="Customer Support WhatsApp Hotline"
    >
      <button
        onClick={handleOpenWhatsApp}
        className="floating-whatsapp-pill"
        title={`Chat with ${settings.storeName} on WhatsApp: ${settings.whatsappDisplayNumber}`}
      >
        <div className="wa-icon-circle">
          <MessageCircle size={20} color="#FFFFFF" strokeWidth={2.2} />
        </div>
        <div className="wa-label-group">
          <span className="wa-help-text">Order on WhatsApp</span>
          <span className="wa-phone-text">{settings.whatsappDisplayNumber}</span>
        </div>
      </button>
    </aside>
  );
};
