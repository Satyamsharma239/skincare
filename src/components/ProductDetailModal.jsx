import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { PincodeChecker } from "./PincodeChecker";
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const ProductDetailModal = () => {
  const {
    settings,
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    openExpressCheckout,
    wishlist,
    toggleWishlist
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    setActiveMediaIndex(0);
    setQuantity(1);
    setShowFullIngredients(false);
  }, [selectedProductForModal?.id]);

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;
  const isFavorite = wishlist.includes(product.id);
  const mediaGallery = [product.image, product.hoverImage].filter(Boolean);
  const activeImgSrc = mediaGallery[activeMediaIndex] || product.image;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="modal-overlay" onClick={() => setSelectedProductForModal(null)}>
      <div 
        className="modal-content"
        style={{ maxWidth: "880px", padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-sm)",
            cursor: "pointer"
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr" }} className="modal-grid">
          
          {/* Left Media Column */}
          <div style={{ backgroundColor: "var(--bg-studio)", position: "relative", minHeight: "380px", display: "flex", flexDirection: "column" }}>
            <img 
              src={activeImgSrc} 
              alt={product.name} 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.category === "Moisturizers" 
                  ? "/products/cream-ceramide-jar.jpg" 
                  : product.category === "Bundles" 
                    ? "/products/routine-box-set.jpg" 
                    : "/products/serum-niacinamide.jpg";
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover", flexGrow: 1 }}
            />
            <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {product.badge && (
                <span className="lumera-card-badge">
                  {product.badge}
                </span>
              )}
              {product.phLevel && (
                <span style={{ backgroundColor: "var(--accent-pine)", color: "#fff", fontSize: "0.64rem", fontWeight: 700, padding: "0.22rem 0.55rem", borderRadius: "var(--radius-xs)" }}>
                  {product.phLevel}
                </span>
              )}
            </div>

            {mediaGallery.length > 1 && (
              <div style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                display: "flex",
                gap: "0.45rem",
                backgroundColor: "rgba(255,255,255,0.92)",
                padding: "0.3rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-light)"
              }}>
                {mediaGallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    style={{
                      width: "44px",
                      height: "44px",
                      padding: 0,
                      borderRadius: "2px",
                      overflow: "hidden",
                      border: activeMediaIndex === idx ? "2px solid var(--text-main)" : "1px solid var(--border-light)",
                      cursor: "pointer"
                    }}
                    title={idx === 0 ? "Product Bottle" : "Formula Texture"}
                  >
                    <img src={imgUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details Column */}
          <div style={{ padding: "2rem", overflowY: "auto", maxHeight: "85vh" }}>
            
            {/* Category & Rating */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-pine)" }}>
                {product.category} • {product.volume}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                <Star size={14} fill="var(--accent-amber)" color="var(--accent-amber)" />
                <span>{product.rating}</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 style={{ fontSize: "1.45rem", lineHeight: 1.25, marginBottom: "0.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {product.name}
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "1.25rem" }}>
              {product.subtitle}
            </p>

            {/* Pricing Section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", padding: "0.85rem 0", borderBottom: "1px solid var(--border-subtle)", borderTop: "1px solid var(--border-subtle)", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {settings.currency}{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: "1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                    {settings.currency}{product.originalPrice}
                  </span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-terracotta)" }}>
                    (Save {discountPercent}%)
                  </span>
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: product.inStock ? "var(--accent-forest)" : "#DC2626", fontWeight: 700 }}>
                {product.inStock ? `● In Stock (${product.stockCount} units)` : "● Out of Stock"}
              </span>
            </div>

            {/* Active Ingredients Box */}
            <div style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", padding: "0.85rem 1rem", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent-terracotta)", marginBottom: "0.25rem" }}>
                Target Formulation
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {product.keyActives}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {product.description}
            </p>

            {/* Technical Specs: pH, Texture, Scent */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.85rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Physiological pH
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginTop: "2px", color: "var(--text-primary)" }}>
                  {product.phLevel || "pH 5.5 (Acid-Mantle Calibrated)"}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Sensory Aroma
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginTop: "2px", color: "var(--text-primary)" }}>
                  {product.scent || "100% Unfragranced"}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Routine Step
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginTop: "2px", color: "var(--text-primary)" }}>
                  {product.amPm} ({product.step})
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Texture
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginTop: "2px", color: "var(--text-primary)" }}>
                  {product.texture?.split("•")[0] || "Lightweight Fast-Absorb"}
                </div>
              </div>
            </div>

            {/* Pincode Serviceability & Delivery Checker */}
            <PincodeChecker />

            {/* Clinical Study Highlights */}
            {product.clinicalHighlights && product.clinicalHighlights.length > 0 && (
              <div style={{ margin: "1.25rem 0" }}>
                <h5 style={{ fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Clinical Evaluation Highlights
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {product.clinicalHighlights.map((point, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                      <Check size={15} color="var(--accent-forest)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full INCI Ingredients Collapsible */}
            <div style={{ marginBottom: "1.5rem" }}>
              <button 
                onClick={() => setShowFullIngredients(!showFullIngredients)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  width: "100%",
                  padding: "0.65rem 0",
                  borderTop: "1px solid var(--border-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)"
                }}
              >
                <span>Full INCI Ingredients Disclosure</span>
                {showFullIngredients ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showFullIngredients && (
                <div style={{ padding: "0.75rem 0", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {product.fullIngredients}
                </div>
              )}
            </div>

            {/* Quantity Stepper & Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border-light)", borderRadius: "var(--radius-full)", backgroundColor: "#FFFFFF" }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: "0.5rem 0.95rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}
                  >
                    -
                  </button>
                  <span style={{ padding: "0.5rem 0.5rem", fontSize: "0.9rem", fontWeight: 700, minWidth: "24px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: "0.5rem 0.95rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={!product.inStock}
                  className="lumera-btn-secondary"
                  style={{ 
                    flexGrow: 1, 
                    justifyContent: "center",
                    opacity: product.inStock ? 1 : 0.6,
                    cursor: product.inStock ? "pointer" : "not-allowed"
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>{product.inStock ? `Add to Bag (${settings.currency}${product.price * quantity})` : "Out of Stock"}</span>
                </button>
              </div>

              {/* Direct Buy Now */}
              <button
                onClick={() => {
                  if (!product.inStock) return;
                  openExpressCheckout(product, quantity);
                  setSelectedProductForModal(null);
                }}
                disabled={!product.inStock}
                className="lumera-btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "1rem",
                  fontSize: "0.94rem",
                  opacity: product.inStock ? 1 : 0.6,
                  cursor: product.inStock ? "pointer" : "not-allowed"
                }}
              >
                <span>{product.inStock ? "Buy Now (Cash on Delivery / UPI)" : "Currently Sold Out"}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: "center", fontSize: "0.76rem", color: "var(--text-muted)" }}>
                ✓ 100% Guest Checkout • Doorstep COD & UPI • Dispatch within 24 Hours
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "0.4rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: isFavorite ? "var(--accent-terracotta)" : "var(--text-secondary)",
                  marginTop: "0.25rem",
                  cursor: "pointer"
                }}
              >
                <Heart size={15} fill={isFavorite ? "var(--accent-terracotta)" : "none"} color={isFavorite ? "var(--accent-terracotta)" : "var(--text-secondary)"} />
                <span>{isFavorite ? "Saved in your Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
