import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
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
    openExpressCheckout
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
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(25, 24, 23, 0.16)",
          animation: "slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          zIndex: 1101
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: "1.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
              Shopping Bag
            </h3>
            <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
              {cart.reduce((sum, it) => sum + it.quantity, 0)} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: "0.4rem",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Close bag"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: "0.85rem 1.5rem",
          backgroundColor: isFreeShipping ? "var(--accent-forest-soft)" : "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          fontSize: "0.78rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontWeight: 600, color: isFreeShipping ? "var(--accent-forest)" : "var(--text-secondary)" }}>
            <span>
              {isFreeShipping
                ? "✓ Complimentary Express Shipping Unlocked"
                : `Add ${settings.currency}${amountNeededForFreeShipping} more for Free BlueDart Shipping`}
            </span>
          </div>
          <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(0,0,0,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: "100%",
                backgroundColor: isFreeShipping ? "var(--accent-forest)" : "var(--accent-terracotta)",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
              <ShoppingBag size={44} strokeWidth={1.5} style={{ margin: "0 auto 1rem auto", opacity: 0.4 }} />
              <h4 style={{ color: "var(--text-primary)", marginBottom: "0.4rem", fontWeight: 700 }}>Your bag is empty</h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Discover calibrated active formulations for your skin concern.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="lumera-btn-primary"
                style={{ fontSize: "0.84rem", padding: "0.75rem 1.5rem" }}
              >
                Browse Formulations
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
                    borderBottom: "1px solid var(--border-subtle)"
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = item.product.category === "Moisturizers" ? "/cream-swirl.jpg" : "/serum-dropper.jpg";
                    }}
                    style={{
                      width: "68px",
                      height: "72px",
                      borderRadius: "var(--radius-sm)",
                      objectFit: "cover",
                      backgroundColor: "var(--bg-secondary)",
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700, margin: 0, color: "var(--text-primary)", lineHeight: 1.3 }}>
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

                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px", marginBottom: "0.6rem" }}>
                      {item.product.volume}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {/* Quantity Stepper */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-light)", borderRadius: "var(--radius-full)" }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: "0.2rem 0.55rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, padding: "0 0.4rem" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: "0.2rem 0.55rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ fontWeight: 800, fontSize: "0.94rem", color: "var(--text-primary)" }}>
                        {settings.currency}{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary Area */}
        {cart.length > 0 && (
          <div style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            backgroundColor: "#FFFFFF"
          }}>
            {/* Coupon Box */}
            <div style={{ marginBottom: "1rem" }}>
              {appliedCoupon ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "var(--accent-emerald-soft)",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.78rem",
                  border: "1px solid #C6E3D3"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-pine)", fontWeight: 700 }}>
                    <Tag size={13} />
                    <span>Coupon: {appliedCoupon.code} applied</span>
                  </div>
                  <button onClick={removeCoupon} style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--text-muted)", textDecoration: "underline" }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.4rem" }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WELCOME15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{
                      flexGrow: 1,
                      padding: "0.45rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.8rem",
                      textTransform: "uppercase"
                    }}
                  />
                  <button
                    type="submit"
                    className="lumera-btn-secondary"
                    style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem" }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>{settings.currency}{cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-pine)", fontWeight: 600 }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{settings.currency}{discountAmount}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Express Courier</span>
                <span>{shippingFee === 0 ? "FREE" : `${settings.currency}${shippingFee}`}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                <span>Total Payable</span>
                <span>{settings.currency}{cartTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => openExpressCheckout(null)}
              className="lumera-btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.95rem",
                fontSize: "0.92rem"
              }}
            >
              <span>Proceed to Checkout ({settings.currency}{cartTotal})</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.6rem" }}>
              ✓ 100% Guest Checkout • Doorstep COD & UPI Available
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
