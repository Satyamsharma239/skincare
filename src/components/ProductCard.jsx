import React from "react";
import { useStore } from "../context/StoreContext";
import { Heart, ShoppingBag, Star, MessageSquareText, Eye } from "lucide-react";

export const ProductCard = ({ product }) => {
  const {
    settings,
    addToCart,
    openExpressCheckout,
    wishlist,
    toggleWishlist,
    setSelectedProductForModal
  } = useStore();

  const isFavorite = wishlist.includes(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    openExpressCheckout(product, 1);
  };

  const handleAddBag = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const fallbackImage = product.category === "Moisturizers" 
    ? "/cream-swirl.jpg" 
    : product.category === "Bundles"
      ? "/lumera-hero.jpg"
      : "/serum-dropper.jpg";

  return (
    <div 
      className="product-card-root"
      onClick={() => setSelectedProductForModal(product)}
      style={{ cursor: "pointer" }}
    >
      {/* 1. Visual 1:1 Media Container */}
      <div className="product-card-img-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />

        {/* Top Badges */}
        <div style={{ position: "absolute", top: "0.65rem", left: "0.65rem", zIndex: 2, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {!product.inStock && (
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 800,
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              padding: "0.22rem 0.6rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}>
              Sold Out
            </span>
          )}

          {product.badge && product.inStock && (
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 700,
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              padding: "0.22rem 0.55rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}>
              {product.badge}
            </span>
          )}

          {discountPercent > 0 && (
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.64rem",
              fontWeight: 700,
              backgroundColor: "#FFF7ED",
              color: "#C2410C",
              border: "1px solid #FFEDD5",
              padding: "0.18rem 0.45rem",
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.02em"
            }}>
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          style={{
            position: "absolute",
            top: "0.65rem",
            right: "0.65rem",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(4px)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            zIndex: 2,
            transition: "transform 0.15s ease"
          }}
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} strokeWidth={2} color={isFavorite ? "#C2410C" : "var(--text-muted)"} fill={isFavorite ? "#C2410C" : "none"} />
        </button>
      </div>

      {/* 2. Product Content Body */}
      <div className="card-body" style={{ padding: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        
        {/* Category & Volume */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.3rem",
          fontSize: "0.72rem",
          fontFamily: "var(--font-sans)",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontWeight: 600
        }}>
          <span>{product.category}</span>
          <span>{product.volume}</span>
        </div>

        {/* Title */}
        <h3 
          className="card-title"
          style={{
            fontSize: "0.96rem",
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: "0.35rem",
            color: "var(--text-primary)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.name}
        </h3>

        {/* Star Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.45rem" }}>
          <div className="rating-pill">
            <Star size={10} fill="#D97706" color="#D97706" />
            <span>{product.rating || 4.9}</span>
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            ({product.reviewsCount ? `${product.reviewsCount}` : "240"})
          </span>
        </div>

        {/* Actives Snippet (Desktop) */}
        <p 
          className="card-actives"
          style={{
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            marginBottom: "0.6rem",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.keyActives}
        </p>

        {/* Price Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", flexWrap: "wrap", marginTop: "auto", marginBottom: "0.85rem" }}>
          <span className="card-price-main" style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
            {settings.currency}{product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
              {settings.currency}{product.originalPrice}
            </span>
          )}
          {discountPercent > 0 && (
            <span style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "#15803D",
              backgroundColor: "#DCFCE7",
              padding: "0.12rem 0.4rem",
              borderRadius: "var(--radius-xs)"
            }}>
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Dual Actions: Quick Buy (WhatsApp) & Bag */}
        <div className="card-actions" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.45rem" }}>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="btn btn-whatsapp"
            style={{ 
              width: "100%", 
              fontSize: "0.8rem",
              padding: "0.55rem 0.4rem",
              fontWeight: 700,
              borderRadius: "var(--radius-full)",
              opacity: product.inStock ? 1 : 0.5,
              cursor: product.inStock ? "pointer" : "not-allowed"
            }}
            title={product.inStock ? "Order directly via WhatsApp Express" : "Currently Out of Stock"}
          >
            <MessageSquareText size={13} />
            <span>{product.inStock ? "Quick Buy" : "Sold Out"}</span>
          </button>

          <button
            onClick={handleAddBag}
            disabled={!product.inStock}
            className="btn btn-secondary"
            style={{ 
              width: "100%", 
              fontSize: "0.78rem",
              padding: "0.55rem 0.35rem",
              fontWeight: 600,
              borderRadius: "var(--radius-full)",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-medium)",
              opacity: product.inStock ? 1 : 0.5,
              cursor: product.inStock ? "pointer" : "not-allowed"
            }}
            title={product.inStock ? "Add to shopping bag" : "Currently Out of Stock"}
          >
            <ShoppingBag size={13} />
            <span>{product.inStock ? "Bag" : "Out"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};