import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { lookupPincode } from "../data/pincodeData";
import { 
  X, 
  MessageCircle, 
  MapPin, 
  Phone, 
  CreditCard, 
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export const WhatsAppCheckoutModal = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    settings,
    createWhatsAppOrder
  } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery (COD)",
    notes: ""
  });

  const [pincodeInfo, setPincodeInfo] = useState(null);
  const [errors, setErrors] = useState({});

  if (!isCheckoutModalOpen) return null;

  // Real-time Pincode Auto-Fill Logic
  const handlePincodeChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, pincode: rawVal }));

    if (rawVal.length === 6) {
      const match = lookupPincode(rawVal);
      if (match) {
        setPincodeInfo(match);
        setFormData((prev) => ({
          ...prev,
          pincode: rawVal,
          city: match.city !== "Domestic Serviceable Hub" ? match.city : prev.city,
          state: match.state !== "India" ? match.state : prev.state
        }));
        setErrors((prev) => ({ ...prev, pincode: null }));
      } else {
        setPincodeInfo(null);
      }
    } else {
      setPincodeInfo(null);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name";
    
    // Strict Indian 10-digit mobile phone validation
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      errs.phone = "WhatsApp number is required";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Enter a valid 10-digit mobile number";
    } else if (cleanPhone.length === 10 && !/^[6-9]/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
    }

    if (!formData.address.trim()) errs.address = "Please enter complete street / flat address";
    if (!formData.city.trim()) errs.city = "Please enter city";
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errs.pincode = "Enter a valid 6-digit postal PIN code";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    createWhatsAppOrder({
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.landmark.trim()
          ? `${formData.address.trim()} (Near ${formData.landmark.trim()})`
          : formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        notes: formData.notes.trim()
      },
      items: cart,
      subtotal: cartSubtotal,
      discountCode: appliedCoupon ? appliedCoupon.code : "",
      discountAmount,
      shippingFee,
      total: cartTotal,
      paymentMethod: formData.paymentMethod
    });
  };

  // Calculate inclusive GST 18% (standard cosmetics HSN 330499)
  const gstAmount = Math.round((cartTotal * 18) / 118);

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutModalOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: "620px", padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--bg-primary)"
        }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-clay)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <span>Express Delivery & Dispatch</span>
            </div>
            <h3 style={{ fontSize: "1.35rem", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em", margin: "2px 0 0 0", color: "var(--text-primary)" }}>
              Complete Delivery Details
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            style={{
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
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
          
          {/* Order Mini-Summary Banner */}
          <div style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-sm)",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.88rem"
          }}>
            <div>
              <span style={{ color: "var(--text-muted)" }}>Order Summary: </span>
              <strong>{cart.reduce((sum, it) => sum + it.quantity, 0)} Formulations</strong>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--accent-forest)" }}>
                Total: {settings.currency}{cartTotal}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Incl. 18% GST ({settings.currency}{gstAmount})
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Customer Name & WhatsApp Mobile */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: errors.name ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                    outline: "none"
                  }}
                />
                {errors.name && <span style={{ fontSize: "0.72rem", color: "#DC2626" }}>{errors.name}</span>}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile (e.g. 9876543210)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: errors.phone ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                    outline: "none"
                  }}
                />
                {errors.phone && <span style={{ fontSize: "0.72rem", color: "#DC2626" }}>{errors.phone}</span>}
              </div>
            </div>

            {/* Pincode with Auto-fill */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1.1fr", gap: "0.75rem" }} className="form-three-col">
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  6-Digit PIN *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 560038"
                  value={formData.pincode}
                  onChange={handlePincodeChange}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: errors.pincode ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                    outline: "none",
                    fontWeight: 600
                  }}
                />
                {errors.pincode && <span style={{ fontSize: "0.72rem", color: "#DC2626" }}>{errors.pincode}</span>}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  City *
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: errors.city ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  State
                </label>
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-medium)",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Pincode Auto-detect indicator */}
            {pincodeInfo && (
              <div style={{
                backgroundColor: "#DCFCE7",
                color: "#166534",
                padding: "0.45rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.76rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}>
                <CheckCircle2 size={13} />
                <span>Verified: {pincodeInfo.city}, {pincodeInfo.state} • Estimated Delivery: <strong>{pincodeInfo.estimatedDays}</strong></span>
              </div>
            )}

            {/* Street Address & Landmark */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Delivery Address (Flat / House No., Building, Street) *
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flat 402, Green Glen Layout, Bellandur"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "var(--radius-sm)",
                  border: errors.address ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                  outline: "none",
                  resize: "vertical"
                }}
              />
              {errors.address && <span style={{ fontSize: "0.72rem", color: "#DC2626" }}>{errors.address}</span>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Nearby Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Opposite Central Mall / Near Metro Pillar 42"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-medium)",
                  outline: "none"
                }}
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Payment Method (Paid via WhatsApp / Doorstep)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.75rem 0.95rem",
                    borderRadius: "var(--radius-sm)",
                    border: formData.paymentMethod === "Cash on Delivery (COD)" ? "2px solid var(--accent-forest)" : "1px solid var(--border-medium)",
                    backgroundColor: formData.paymentMethod === "Cash on Delivery (COD)" ? "var(--accent-forest-light)" : "#fff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "Cash on Delivery (COD)"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "Cash on Delivery (COD)" })}
                  />
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 600 }}>Cash on Delivery</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Pay cash upon courier arrival</div>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.75rem 0.95rem",
                    borderRadius: "var(--radius-sm)",
                    border: formData.paymentMethod === "Instant UPI QR on WhatsApp" ? "2px solid var(--accent-forest)" : "1px solid var(--border-medium)",
                    backgroundColor: formData.paymentMethod === "Instant UPI QR on WhatsApp" ? "var(--accent-forest-light)" : "#fff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "Instant UPI QR on WhatsApp"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "Instant UPI QR on WhatsApp" })}
                  />
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 600 }}>UPI / QR Code</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Scan QR in WhatsApp chat</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Skin Note */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Skin Type / Consultation Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sensitive combination skin, please include dosage guide"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-medium)",
                  outline: "none"
                }}
              />
            </div>

          </div>

          {/* Action CTAs */}
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "0.94rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <span>Complete Order — Proceed to WhatsApp</span>
              <ArrowRight size={17} />
            </button>

            <div style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)" }}>
              ✓ Auto-generates your official order receipt and redirects directly to WhatsApp to confirm dispatch.
            </div>
          </div>

        </form>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .form-two-col, .form-three-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
