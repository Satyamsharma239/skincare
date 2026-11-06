import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { PincodeChecker } from "./PincodeChecker";
import { 
  X, 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Droplets,
  Activity,
  Layers,
  ArrowRight
} from "lucide-react";

export const ProductDetailModal = () => {
  const {
    settings,
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    openExpressCheckout,
    quickWhatsAppBuy,
    wishlist,
    toggleWishlist,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [showFullIngredients, setShowFullIngredients] = useState(false);

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;
  const isFavorite = wishlist.includes(product.id);

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
            border: "1px solid var(--border-medium)",
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
          <div style={{ backgroundColor: "#F6F4F0", position: "relative", minHeight: "380px" }}>
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.category === "Moisturizers" 
                  ? "/cream-swirl.jpg" 
                  : product.category === "Bundles" 
                    ? "/lumera-hero.jpg" 
                    : "/serum-dropper.jpg";
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {product.badge && <span className="badge badge-terracotta">{product.badge}</span>}
              {product.phLevel && <span className="badge badge-forest">{product.phLevel}</span>}
            </div>
          </div>

          {/* Right Product Details Column */}
          <div style={{ padding: "2rem", overflowY: "auto", maxHeight: "85vh" }}>
            
            {/* Category & Rating */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {product.category} • {product.volume}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--accent-forest)", fontWeight: 600, fontSize: "0.85rem" }}>
                <Star size={14} fill="#EAB308" color="#EAB308" />
                <span>{product.rating}</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 style={{ fontSize: "1.45rem", lineHeight: 1.25, marginBottom: "0.35rem", fontWeight: 600 }}>
              {product.name}
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--accent-terracotta)", fontWeight: 600, marginBottom: "1rem" }}>
              {product.subtitle}
            </p>

            {/* Pricing Section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid var(--border-light)", borderTop: "1px solid var(--border-light)", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {settings.currency}{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: "1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                    {settings.currency}{product.originalPrice}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-terracotta)", backgroundColor: "var(--accent-terracotta-light)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)" }}>
                    {discountPercent}% OFF
                  </span>
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: product.inStock ? "#166534" : "#991B1B", fontWeight: 700 }}>
                {product.inStock ? `● In Stock (${product.stockCount} units)` : "● Out of Stock"}
              </span>
            </div>

            {/* Active Ingredients Box */}
            <div style={{ backgroundColor: "var(--accent-forest-light)", padding: "0.85rem 1rem", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent-forest)", marginBottom: "0.25rem" }}>
                Targeted Bio-Compatible Actives
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent-forest)" }}>
                {product.keyActives}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {product.description}
            </p>

            {/* Clinical Technical Specs: pH, Texture, Scent */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", padding: "0.85rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Physiological pH
                </span>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", marginTop: "2px" }}>
                  {product.phLevel || "pH 5.5 (Acid-Mantle Calibrated)"}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Sensory Aroma
                </span>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", marginTop: "2px" }}>
                  {product.scent || "100% Unfragranced"}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Routine Sequence
                </span>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", marginTop: "2px" }}>
                  {product.amPm} ({product.step})
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Texture
                </span>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", marginTop: "2px" }}>
                  {product.texture?.split("•")[0] || "Lightweight"}
                </div>
              </div>
            </div>

            {/* Pincode Serviceability & Delivery Checker */}
            <PincodeChecker />

            {/* Clinical Study Highlights */}
            {product.clinicalHighlights && product.clinicalHighlights.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <h5 style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Clinical Evaluation Data
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

            {/* How to use */}
            <div style={{ marginBottom: "1.25rem" }}>
              <h5 style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                How to Apply
              </h5>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {product.howToUse}
              </p>
            </div>

            {/* Full INCI Ingredients Collapsible */}
            <div style={{ marginBottom: "1.5rem" }}>
              <button 
                onClick={() => setShowFullIngredients(!showFullIngredients)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  width: "100%",
                  padding: "0.5rem 0",
                  borderTop: "1px solid var(--border-light)",
                  borderBottom: "1px solid var(--border-light)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)"
                }}
              >
                <span>Full Clean Science INCI Ingredients List</span>
                {showFullIngredients ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showFullIngredients && (
                <div style={{ padding: "0.75rem 0", fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {product.fullIngredients}
                </div>
              )}
            </div>

            {/* Quantity Stepper & WhatsApp Buy CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-sm)" }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: "0.5rem 0.85rem", fontSize: "1rem", fontWeight: 600 }}
                  >
                    -
                  </button>
                  <span style={{ padding: "0.5rem 0.85rem", fontSize: "0.9rem", fontWeight: 600 }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: "0.5rem 0.85rem", fontSize: "1rem", fontWeight: 600 }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={!product.inStock}
                  className="btn btn-secondary"
                  style={{ 
                    flexGrow: 1, 
                    padding: "0.8rem 1rem",
                    opacity: product.inStock ? 1 : 0.6,
                    cursor: product.inStock ? "pointer" : "not-allowed"
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>{product.inStock ? `Add to Bag (${settings.currency}${product.price * quantity})` : "Out of Stock"}</span>
                </button>
              </div>

              {/* Direct Buy Now (Opens Express Drawer) */}
              <button
                onClick={() => {
                  if (!product.inStock) return;
                  openExpressCheckout(product, quantity);
                  setSelectedProductForModal(null);
                }}
                disabled={!product.inStock}
                className="btn btn-whatsapp"
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  opacity: product.inStock ? 1 : 0.6,
                  cursor: product.inStock ? "pointer" : "not-allowed"
                }}
              >
                <MessageCircle size={17} />
                <span>{product.inStock ? "Quick Buy via WhatsApp (COD)" : "Currently Sold Out"}</span>
                <ArrowRight size={15} />
              </button>

              <div style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "-0.2rem" }}>
                ✓ Instant redirect to WhatsApp • Verified BlueDart/Delhivery tracking • COD Available
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "0.4rem",
                  fontSize: "0.82rem",
                  color: isFavorite ? "var(--accent-terracotta)" : "var(--text-secondary)",
                  marginTop: "0.25rem",
                  cursor: "pointer"
                }}
              >
                <Heart size={15} fill={isFavorite ? "var(--accent-terracotta)" : "none"} />
                <span>{isFavorite ? "Saved to your Skincare Favorites" : "Save to Favorites"}</span>
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
