import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  X, 
  Package, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Printer,
  Truck
} from "lucide-react";
import confetti from "canvas-confetti";

export const OrderConfirmationModal = () => {
  const { 
    confirmedOrder, 
    setConfirmedOrder, 
    settings, 
    showToast,
    setIsTrackOrderOpen,
    setTrackingOrderId
  } = useStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (confirmedOrder) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [confirmedOrder]);

  if (!confirmedOrder) return null;

  const handleCopyReceipt = () => {
    if (confirmedOrder.rawMessage) {
      navigator.clipboard.writeText(confirmedOrder.rawMessage);
      setCopied(true);
      showToast("Order receipt copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReopenWhatsApp = () => {
    if (confirmedOrder.waUrl) {
      window.open(confirmedOrder.waUrl, "_blank");
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setConfirmedOrder(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: "600px", padding: "2.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setConfirmedOrder(null)}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--bg-secondary)",
            cursor: "pointer"
          }}
        >
          <X size={17} />
        </button>

        {/* Celebration Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            backgroundColor: "#DCFCE7",
            color: "#166534",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem auto"
          }}>
            <CheckCircle2 size={38} />
          </div>

          <h3 style={{ fontSize: "1.7rem", fontWeight: 600, marginBottom: "0.3rem" }}>
            Order Initiated via WhatsApp!
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
            Order ID: <strong style={{ color: "var(--accent-forest)", letterSpacing: "0.03em" }}>#{confirmedOrder.id}</strong>
          </p>
        </div>

        {/* Receipt Box */}
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-sm)",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
            <span style={{ fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.75rem" }}>
              Recipient Details
            </span>
            <span style={{ fontWeight: 700, color: "var(--accent-forest)" }}>
              {confirmedOrder.paymentMethod}
            </span>
          </div>

          <div style={{ marginBottom: "0.75rem", lineHeight: 1.4 }}>
            <strong>{confirmedOrder.customer.name}</strong> • {confirmedOrder.customer.phone}<br />
            <span style={{ color: "var(--text-secondary)" }}>
              {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}
            </span>
          </div>

          {/* Items */}
          <div style={{ borderTop: "1px dashed var(--border-medium)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.75rem", display: "block", marginBottom: "0.4rem" }}>
              Ordered Formulations ({confirmedOrder.items.length})
            </span>
            {confirmedOrder.items.map((it, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span>{it.quantity}x {it.name} ({it.size})</span>
                <span style={{ fontWeight: 600 }}>{settings.currency}{it.quantity * it.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 700 }}>
            <span>Total Payable:</span>
            <span style={{ color: "var(--accent-forest)" }}>{settings.currency}{confirmedOrder.total}</span>
          </div>
        </div>

        {/* Steps What happens next */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={16} color="var(--accent-forest)" />
            <span>Our skincare concierge verifies formulation batch and confirms delivery timeframe in WhatsApp chat.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Package size={16} color="var(--accent-forest)" />
            <span>Tracking link dispatched as soon as the package leaves our cleanroom lab facility.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            onClick={handleReopenWhatsApp}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", padding: "0.95rem" }}
          >
            <span>Open WhatsApp to Confirm Dispatch</span>
            <ArrowRight size={17} />
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <button
              onClick={() => {
                setTrackingOrderId(confirmedOrder.id);
                setConfirmedOrder(null);
                setIsTrackOrderOpen(true);
              }}
              className="btn btn-secondary btn-sm"
              style={{ width: "100%", padding: "0.5rem 0.4rem", fontSize: "0.78rem", color: "#2563EB", fontWeight: 700 }}
              title="Live logistics status"
            >
              <Truck size={14} />
              <span>Track Live</span>
            </button>

            <button
              onClick={handleCopyReceipt}
              className="btn btn-secondary btn-sm"
              style={{ width: "100%", padding: "0.5rem 0.4rem", fontSize: "0.78rem" }}
            >
              {copied ? <Check size={14} color="#166534" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Receipt"}</span>
            </button>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="btn btn-primary btn-sm"
              style={{ width: "100%", padding: "0.5rem 0.4rem", fontSize: "0.78rem" }}
            >
              <span>Back to Store</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
