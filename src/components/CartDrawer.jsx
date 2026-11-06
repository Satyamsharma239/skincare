import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  MessageCircle, 
  ArrowRight
} from "lucide-react";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    isFreeShipping,
    settings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    openExpressCheckout,
    setIsCheckoutModalOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) setCouponInput("");
  };

  const amountNeededForFreeShipping = Math.max(
    0,
    (settings?.freeShippingThreshold || 499) - cartSubtotal
  );
  const freeShippingProgress = Math.min(
    100,
    (cartSubtotal / (settings?.freeShippingThreshold || 499)) * 100
  );

  if (!isCartOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCartOpen(false)} style={{ justifyContent: "flex-end", padding: 0 }}>
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          height: "100vh",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-modal)",
          animation: "slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          zIndex: 1001
        }}
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
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0, letterSpacing: "-0.01em" }}>
              Shopping Bag
            </h3>
            <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
              {cart.reduce((sum, it) => sum + it.quantity, 0)} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: "0.35rem",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              cursor: "pointer"
            }}
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          backgroundColor: isFreeShipping ? "#F0F7F1" : "var(--bg-secondary)",
          padding: "0.75rem 1.5rem",
          fontSize: "0.78rem",
          borderBottom: "1px solid var(--border-light)"
        }}>
          <div style={{ color: isFreeShipping ? "#166534" : "var(--text-secondary)", marginBottom: "0.35rem" }}>
            {isFreeShipping
              ? "✓ You qualify for complimentary express delivery across India"
              : `Add ${settings.currency}${amountNeededForFreeShipping} more for complimentary delivery`}
          </div>
          <div style={{ height: "3px", backgroundColor: "rgba(0,0,0,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${freeShippingProgress}%`,
                backgroundColor: isFreeShipping ? "#166534" : "var(--accent-pine)",
                transition: "width 0.4s ease"
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Your bag is currently empty.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                <span>Browse Formulations</span>
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--border-light)"
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/serum-dropper.jpg";
                    }}
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "var(--radius-xs)",
                      objectFit: "cover",
                      backgroundColor: "#F7F5F2"
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.3, maxWidth: "220px" }}>
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: "var(--text-muted)", padding: "0.2rem", cursor: "pointer" }}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ fontSize: "0.74rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", margin: "2px 0 6px 0" }}>
                      {item.product.volume || "Standard Size"}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-xs)"
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: "0.15rem 0.5rem", fontSize: "0.85rem" }}
                        >
                          -
                        </button>
                        <span style={{ padding: "0.15rem 0.5rem", fontSize: "0.82rem", fontWeight: 500 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: "0.15rem 0.5rem", fontSize: "0.85rem" }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {settings.currency}{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-primary)"
          }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: "1rem" }}>
              {appliedCoupon ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#F0F7F1",
                  color: "#166534",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "0.78rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Tag size={13} />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ color: "#166534", textDecoration: "underline", fontSize: "0.74rem", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Promo voucher (e.g. GLOW10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{
                      flexGrow: 1,
                      padding: "0.4rem 0.7rem",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--border-medium)",
                      fontSize: "0.82rem",
                      textTransform: "uppercase"
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary btn-sm"
                  >
                    Apply
                  </button>
                </form>
              )}

              {!appliedCoupon && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Quick Apply:</span>
                  {[
                    { code: "FIRST15", label: "15% Off" },
                    { code: "BARRIER20", label: "20% Off" },
                    { code: "COMBO30", label: "30% Off" }
                  ].map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => applyCoupon(c.code)}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        backgroundColor: "#FFF7ED",
                        border: "1px dashed #FDBA74",
                        color: "#C2410C",
                        padding: "0.18rem 0.5rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                      title={`Apply ${c.code}`}
                    >
                      {c.code} ({c.label})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>{settings.currency}{cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-clay)" }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{settings.currency}{discountAmount}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Express Delivery</span>
                <span>{shippingFee === 0 ? "FREE" : `${settings.currency}${shippingFee}`}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", paddingTop: "0.5rem", borderTop: "1px solid var(--border-light)" }}>
                <span>Total Payable</span>
                <span>{settings.currency}{cartTotal}</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "right" }}>
                Includes 18% GST • No extra card fees
              </div>
            </div>

            {/* Proceed to Checkout Action */}
            <button
              onClick={() => {
                openExpressCheckout(null);
              }}
              className="btn btn-whatsapp"
              style={{
                width: "100%",
                padding: "0.95rem",
                fontWeight: 600,
                fontSize: "0.94rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <MessageCircle size={18} />
              <span>Checkout via WhatsApp ({settings.currency}{cartTotal})</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              🔒 Dispatched directly to WhatsApp • COD & UPI Accepted
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
