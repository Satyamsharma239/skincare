import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  MessageSquareText, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export const TrackOrderModal = () => {
  const { 
    isTrackOrderOpen, 
    setIsTrackOrderOpen, 
    trackingOrderId, 
    setTrackingOrderId, 
    orders, 
    settings 
  } = useStore();

  const [inputVal, setInputVal] = useState("");
  const [matchedOrder, setMatchedOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (trackingOrderId) {
      setInputVal(trackingOrderId);
      handleSearch(trackingOrderId);
    } else if (orders.length > 0 && !matchedOrder) {
      // Default to the latest order for convenience
      setInputVal(orders[0].id);
      handleSearch(orders[0].id);
    }
  }, [trackingOrderId, isTrackOrderOpen]);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (term) => {
    const q = (term || inputVal).trim().toLowerCase();
    if (!q) return;

    setSearched(true);
    const found = orders.find((o) => {
      const matchId = o.id.toLowerCase() === q || o.id.toLowerCase().replace("lum-", "") === q.replace("lum-", "");
      const matchPhone = o.customer?.phone?.replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, ""));
      return matchId || matchPhone;
    });

    setMatchedOrder(found || null);
  };

  const handleOpenWhatsAppConcierge = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const orderRef = matchedOrder ? `Order #${matchedOrder.id}` : "my recent skincare order";
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I am inquiring about the shipping status of ${orderRef}. Could you please assist with live tracking?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const getStepProgress = (status) => {
    switch (status) {
      case "New Inquiry": return 1;
      case "Confirmed": return 2;
      case "Packed": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      default: return 2;
    }
  };

  const currentStep = matchedOrder ? getStepProgress(matchedOrder.status) : 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={() => setIsTrackOrderOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--border-medium)",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "scaleIn 0.2s ease"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#EFF6FF",
                color: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Truck size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  color: "var(--text-primary)"
                }}
              >
                Track Your Shipment
              </h3>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                Real-time express logistics via BlueDart & Delhivery
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsTrackOrderOpen(false)}
            style={{
              padding: "0.4rem",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              cursor: "pointer",
              border: "none",
              color: "var(--text-primary)"
            }}
            aria-label="Close tracking"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: "1.5rem", backgroundColor: "#FAFAF9", borderBottom: "1px solid var(--border-light)" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(inputVal);
            }}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <div style={{ position: "relative", flexGrow: 1 }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. LUM-94825) or Mobile Number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem 0.65rem 2.4rem",
                  fontSize: "0.88rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#FFFFFF",
                  outline: "none"
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: "0.65rem 1.4rem",
                fontSize: "0.86rem",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)"
              }}
            >
              Track
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Quick Test:</span>
            {orders.slice(0, 4).map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => {
                  setInputVal(ord.id);
                  handleSearch(ord.id);
                }}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-medium)",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "var(--radius-xs)",
                  color: "var(--text-secondary)",
                  cursor: "pointer"
                }}
              >
                #{ord.id} ({ord.customer?.city})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          {matchedOrder ? (
            <div>
              {/* Order Meta Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: "1.5rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Shipment Details
                  </div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "2px 0 0 0", color: "var(--text-primary)" }}>
                    Order #{matchedOrder.id}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                    Placed on {new Date(matchedOrder.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      backgroundColor:
                        matchedOrder.status === "Delivered"
                          ? "#DCFCE7"
                          : matchedOrder.status === "Shipped"
                          ? "#DBEAFE"
                          : "#FEF3C7",
                      color:
                        matchedOrder.status === "Delivered"
                          ? "#166534"
                          : matchedOrder.status === "Shipped"
                          ? "#1E40AF"
                          : "#92400E"
                    }}
                  >
                    ● {matchedOrder.status}
                  </span>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    Mode: {matchedOrder.paymentMethod}
                  </div>
                </div>
              </div>

              {/* 4-Step Animated Logistics Timeline */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative", gap: "0.5rem" }}>
                  
                  {/* Progress Line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "12%",
                      right: "12%",
                      height: "3px",
                      backgroundColor: "#E5E7EB",
                      zIndex: 1
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${((currentStep - 1) / 3) * 100}%`,
                        backgroundColor: "#16A34A",
                        transition: "width 0.4s ease"
                      }}
                    />
                  </div>

                  {/* Step 1: Placed */}
                  <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: currentStep >= 1 ? "#16A34A" : "#E5E7EB",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.5rem auto"
                      }}
                    >
                      <CheckCircle2 size={18} />
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>Placed</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Order Verified</div>
                  </div>

                  {/* Step 2: Packed */}
                  <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: currentStep >= 2 ? "#16A34A" : "#E5E7EB",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.5rem auto"
                      }}
                    >
                      <Package size={17} />
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>Cleanroom</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Packed & QC</div>
                  </div>

                  {/* Step 3: Shipped */}
                  <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: currentStep >= 3 ? "#16A34A" : "#E5E7EB",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.5rem auto"
                      }}
                    >
                      <Truck size={17} />
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>In Transit</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{matchedOrder.courier?.split(" ")[0] || "Express"}</div>
                  </div>

                  {/* Step 4: Delivered */}
                  <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: currentStep >= 4 ? "#16A34A" : "#E5E7EB",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.5rem auto"
                      }}
                    >
                      <ShieldCheck size={18} />
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>Delivered</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Doorstep Handover</div>
                  </div>
                </div>
              </div>

              {/* Delivery Destination & Courier Card */}
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "var(--radius-sm)",
                  padding: "1rem 1.25rem",
                  border: "1px solid var(--border-light)",
                  marginBottom: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Destination Address
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
                    {matchedOrder.customer?.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px", lineHeight: 1.4 }}>
                    {matchedOrder.customer?.address}, {matchedOrder.customer?.city}, {matchedOrder.customer?.state} - <strong>{matchedOrder.customer?.pincode}</strong>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Logistics Partner & AWB
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
                    {matchedOrder.courier || "Delhivery Air Express"}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#2563EB", fontWeight: 600, marginTop: "2px" }}>
                    AWB: {matchedOrder.awbTrackingNumber || "DLV-882019482"}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    Est. Delivery: {matchedOrder.estimatedDays || "2 - 3 Days"}
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Formulations in Package ({matchedOrder.items?.length || 0})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {matchedOrder.items?.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        borderBottom: "1px solid #F3F4F6",
                        fontSize: "0.85rem"
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        {it.name} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({it.size}) × {it.quantity}</span>
                      </span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                        ₹{it.price * it.quantity}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem", fontSize: "0.95rem", fontWeight: 800 }}>
                    <span>Total Amount:</span>
                    <span>₹{matchedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Concierge Help Button */}
              <button
                onClick={handleOpenWhatsAppConcierge}
                className="btn btn-whatsapp"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <MessageSquareText size={17} />
                <span>Need Help? Chat with WhatsApp Concierge</span>
              </button>
            </div>
          ) : searched ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#FEF2F2",
                  color: "#DC2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem auto"
                }}
              >
                <AlertCircle size={26} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                No order found matching "{inputVal}"
              </h4>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", maxWidth: "340px", margin: "0 auto 1.5rem auto" }}>
                Please verify your 5-digit order number (e.g. LUM-94825) or 10-digit mobile number entered during checkout.
              </p>
              <button
                onClick={handleOpenWhatsAppConcierge}
                className="btn btn-whatsapp"
                style={{
                  padding: "0.75rem 1.75rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <MessageSquareText size={16} />
                <span>Ask Shipping Desk on WhatsApp</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
