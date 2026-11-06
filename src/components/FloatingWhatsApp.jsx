import React from "react";
import { useStore } from "../context/StoreContext";
import { MessageSquareText } from "lucide-react";

export const FloatingWhatsApp = () => {
  const { settings, currentRoute } = useStore();

  if (currentRoute === "admin") return null;

  const handleOpenWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I am browsing your skincare dispensary and would like assistance with selecting a formulation or placing my order.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={handleOpenWhatsApp}
      className="floating-whatsapp-btn"
      aria-label="Direct WhatsApp Concierge"
      title="Instant WhatsApp assistance and order guidance"
    >
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        boxShadow: "0 0 6px #25D366"
      }} />
      <MessageSquareText size={17} />
      <span style={{ letterSpacing: "0.01em", fontWeight: 700 }}>WhatsApp Us</span>
    </button>
  );
};
