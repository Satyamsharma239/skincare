import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { lookupPincode } from "../data/pincodeData";
import { 
  X, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Tag, 
  MessageSquareText, 
  AlertCircle 
} from "lucide-react";

export const ExpressCheckoutDrawer = () => {
  const {
    isExpressCheckoutOpen,
    closeExpressCheckout,
    checkoutProduct,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
    createWhatsAppOrder,
    quickWhatsAppBuy,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [couponInput, setCouponInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    paymentMethod: "Cash on Delivery (COD)",
    notes: ""
  });
  const [pincodeInfo, setPincodeInfo] = useState(null);
  const [errors, setErrors] = useState({});

  // Sync quantity when checkoutProduct changes
  useEffect(() => {
    if (checkoutProduct) {
      setQuantity(checkoutProduct.quantity || 1);
    }
  }, [checkoutProduct]);

  if (!isExpressCheckoutOpen) return null;

  // Single Item vs Full Cart items
  const isSingleItem = Boolean(checkoutProduct?.product);
  const singleProduct = checkoutProduct?.product;

  const currentItems = isSingleItem
    ? [{ product: singleProduct, quantity }]
    : cart;

  const computedSubtotal = isSingleItem
    ? singleProduct.price * quantity
    : cartSubtotal;

  let computedDiscount = isSingleItem ? 0 : discountAmount;
  if (isSingleItem && appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      computedDiscount = Math.round((computedSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === "flat") {
      computedDiscount = Math.min(appliedCoupon.value, computedSubtotal);
    }
  }

  const isFreeShip = computedSubtotal >= settings.freeShippingThreshold;
  const computedShipping = isFreeShip ? 0 : settings.shippingFee;
  const computedTotal = Math.max(0, computedSubtotal - computedDiscount + computedShipping);
  const gstInclusiveAmount = Math.round((computedTotal * 18) / 118);

  const handlePincodeChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
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
        setPincodeInfo({
          city: "Domestic Serviceable Hub",
          state: "India",
          courier: "Delhivery Air Express",
          estimatedDays: "3 - 4 Business Days",
          codAvailable: true
        });
      }
    } else {
      setPincodeInfo(null);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      errs.phone = "Mobile number required for WhatsApp tracking";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Enter valid 10-digit mobile number";
    }

    if (!formData.address.trim()) errs.address = "Please enter delivery address";
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errs.pincode = "Enter 6-digit postal PIN";
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
        city: formData.city.trim() || pincodeInfo?.city || "Customer City",
        state: formData.state.trim() || pincodeInfo?.state || "India",
        pincode: formData.pincode.trim(),
        notes: formData.notes.trim()
      },
      items: currentItems,
      subtotal: computedSubtotal,
      discountCode: appliedCoupon ? appliedCoupon.code : "",
      discountAmount: computedDiscount,
      shippingFee: computedShipping,
      total: computedTotal,
      paymentMethod: formData.paymentMethod
    });

    closeExpressCheckout();
  };

  const handle1ClickDirect = () => {
    if (isSingleItem) {
      quickWhatsAppBuy(singleProduct, quantity);
    } else if (cart.length > 0) {
      quickWhatsAppBuy(cart[0].product, cart[0].quantity);
    }
    closeExpressCheckout();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={closeExpressCheckout}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 0,
        backgroundColor: "rgba(20, 21, 20, 0.65)"
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "520px",
          height: "100vh",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.18)",
          animation: "slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden"
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: "1.25rem 1.75rem",
          borderBottom: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--bg-primary)"
        }}>
          <div>
            <div style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent-clay)",
              marginBottom: "2px"
            }}>
              Express Direct Dispatch
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: 0
            }}>
              Confirm Order & Delivery
            </h3>
          </div>

          <button
            onClick={closeExpressCheckout}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.15s ease"
            }}
            title="Close checkout"
          >
            <X size={17} color="var(--text-primary)" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div style={{
          backgroundColor: isFreeShip ? "#EEF6EF" : "#FAF4EE",
          padding: "0.65rem 1.75rem",
          fontSize: "0.78rem",
          color: isFreeShip ? "#166534" : "#9A3412",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          borderBottom: "1px solid var(--border-light)"
        }}>
          <Truck size={15} />
          {isFreeShip ? (
            <span><strong>Complimentary Express Courier</strong> unlocked on this order</span>
          ) : (
            <span>Add {settings.currency}{settings.freeShippingThreshold - computedSubtotal} more for Free Express Delivery</span>
          )}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem 1.75rem" }}>
          
          {/* 1. Item Preview */}
          <div style={{
            backgroundColor: "var(--bg-primary)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem",
            border: "1px solid var(--border-light)",
            marginBottom: "1.5rem"
          }}>
            <div style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "0.6rem"
            }}>
              Order Items ({currentItems.length})
            </div>

            {currentItems.map((it, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: idx > 0 ? "0.6rem" : "0" }}>
                <img
                  src={it.product.image}
                  alt={it.product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/serum-dropper.jpg";
                  }}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-xs)",
                    objectFit: "cover",
                    backgroundColor: "#FAF8F5"
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)" }}>
                    {it.product.name}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                    {it.product.volume || "Standard Size"} • Qty: {it.quantity}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.94rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {settings.currency}{it.product.price * it.quantity}
                  </div>
                </div>
              </div>
            ))}

            {/* Quantity Adjuster if Single Item */}
            {isSingleItem && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-light)"
              }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Adjust Quantity:</span>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "var(--radius-xs)"
                }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: "0.2rem 0.65rem", fontSize: "0.9rem", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span style={{ padding: "0.2rem 0.6rem", fontSize: "0.84rem", fontWeight: 600 }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: "0.2rem 0.65rem", fontSize: "0.9rem", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Customer Delivery Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            
            <div style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent-clay)"
            }}>
              Delivery & Recipient Information
            </div>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ananya Sen"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: null });
                }}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-xs)",
                  border: errors.name ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                  outline: "none",
                  fontSize: "0.88rem"
                }}
              />
              {errors.name && <div style={{ fontSize: "0.72rem", color: "#DC2626", marginTop: "3px" }}>{errors.name}</div>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                WhatsApp Mobile Number *
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{
                  position: "absolute",
                  left: "0.85rem",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  color: "var(--text-muted)"
                }}>
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                    setFormData({ ...formData, phone: raw });
                    setErrors({ ...errors, phone: null });
                  }}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem 0.65rem 2.8rem",
                    borderRadius: "var(--radius-xs)",
                    border: errors.phone ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                    outline: "none",
                    fontSize: "0.88rem"
                  }}
                />
              </div>
              {errors.phone && <div style={{ fontSize: "0.72rem", color: "#DC2626", marginTop: "3px" }}>{errors.phone}</div>}
            </div>

            {/* Pincode with Auto-Resolution */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                6-Digit Postal PIN Code *
              </label>
              <input
                type="text"
                placeholder="e.g. 560038 or 400050"
                value={formData.pincode}
                onChange={handlePincodeChange}
                maxLength={6}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-xs)",
                  border: errors.pincode ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                  outline: "none",
                  fontSize: "0.88rem",
                  letterSpacing: "0.08em"
                }}
              />
              {errors.pincode && <div style={{ fontSize: "0.72rem", color: "#DC2626", marginTop: "3px" }}>{errors.pincode}</div>}

              {/* Real-time courier resolver feedback */}
              {pincodeInfo && (
                <div style={{
                  marginTop: "0.45rem",
                  padding: "0.55rem 0.75rem",
                  backgroundColor: "#F3F8F4",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "0.76rem",
                  color: "#166534",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <CheckCircle2 size={14} color="#166534" />
                  <span>
                    <strong>{pincodeInfo.city}, {pincodeInfo.state}</strong> • {pincodeInfo.courier} ({pincodeInfo.estimatedDays})
                  </span>
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                Flat / House No., Building, Street *
              </label>
              <input
                type="text"
                placeholder="e.g. Flat 304, Palm Grove, 14th Main Road"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setErrors({ ...errors, address: null });
                }}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-xs)",
                  border: errors.address ? "1px solid #DC2626" : "1px solid var(--border-medium)",
                  outline: "none",
                  fontSize: "0.88rem"
                }}
              />
              {errors.address && <div style={{ fontSize: "0.72rem", color: "#DC2626", marginTop: "3px" }}>{errors.address}</div>}
            </div>

            {/* Landmark */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                Prominent Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Behind Metro Station or Near Apollo Pharmacy"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "var(--radius-xs)",
                  border: "1px solid var(--border-medium)",
                  outline: "none",
                  fontSize: "0.88rem"
                }}
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Payment Method (Paid via WhatsApp / At Doorstep)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 0.8rem",
                  borderRadius: "var(--radius-xs)",
                  border: formData.paymentMethod === "Cash on Delivery (COD)" ? "2px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  backgroundColor: formData.paymentMethod === "Cash on Delivery (COD)" ? "var(--bg-secondary)" : "#FFFFFF",
                  cursor: "pointer",
                  fontSize: "0.82rem"
                }}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={formData.paymentMethod === "Cash on Delivery (COD)"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "Cash on Delivery (COD)" })}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>Cash on Delivery</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Pay at doorstep</div>
                  </div>
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 0.8rem",
                  borderRadius: "var(--radius-xs)",
                  border: formData.paymentMethod === "Instant UPI QR on WhatsApp" ? "2px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  backgroundColor: formData.paymentMethod === "Instant UPI QR on WhatsApp" ? "var(--bg-secondary)" : "#FFFFFF",
                  cursor: "pointer",
                  fontSize: "0.82rem"
                }}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={formData.paymentMethod === "Instant UPI QR on WhatsApp"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "Instant UPI QR on WhatsApp" })}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>UPI / QR Code</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Scan QR in chat</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* 3. Promo Voucher Drawer Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            {appliedCoupon ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.8rem",
                backgroundColor: "#F0F7F1",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.8rem",
                color: "#166534"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Tag size={13} />
                  <span>Promo <strong>{appliedCoupon.code}</strong> applied</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{ textDecoration: "underline", color: "#166534", fontSize: "0.75rem", cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WELCOME15)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  style={{
                    flexGrow: 1,
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--border-medium)",
                    fontSize: "0.82rem",
                    textTransform: "uppercase"
                  }}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: "0.5rem 0.85rem" }}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* 4. Financial Calculations Breakdown */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            padding: "1rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-xs)",
            marginBottom: "1.5rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>{settings.currency}{computedSubtotal}</span>
            </div>

            {computedDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-clay)", fontWeight: 500 }}>
                <span>Privilege Discount ({appliedCoupon?.code})</span>
                <span>-{settings.currency}{computedDiscount}</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>BlueDart Express Courier</span>
              <span>{computedShipping === 0 ? "FREE" : `${settings.currency}${computedShipping}`}</span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.12rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              paddingTop: "0.6rem",
              borderTop: "1px solid var(--border-medium)"
            }}>
              <span>Total Payable</span>
              <span>{settings.currency}{computedTotal}</span>
            </div>

            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "right" }}>
              Includes 18% GST ({settings.currency}{gstInclusiveAmount}) • Zero payment gateway fees
            </div>
          </div>

          {/* 5. Primary Action CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              type="submit"
              className="btn btn-whatsapp"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "0.96rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.55rem"
              }}
            >
              <MessageSquareText size={18} />
              <span>Confirm & Order via WhatsApp ({settings.currency}{computedTotal})</span>
              <ArrowRight size={17} />
            </button>

            {/* 1-Click Fast Alternative */}
            <button
              type="button"
              onClick={handle1ClickDirect}
              style={{
                textAlign: "center",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0.3rem"
              }}
            >
              Prefer to order in WhatsApp directly? Click to share address in chat ➔
            </button>

            <div style={{
              textAlign: "center",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              marginTop: "0.2rem"
            }}>
              <ShieldCheck size={14} color="#166534" />
              <span>Verified direct laboratory dispatch • COD & UPI Accepted</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
