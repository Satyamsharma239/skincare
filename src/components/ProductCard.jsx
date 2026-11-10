import React from "react";
import { useStore } from "../context/StoreContext";
import { Heart, Star } from "lucide-react";

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
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountDiff = hasDiscount ? product.originalPrice - product.price : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    openExpressCheckout(product, 1);
  };

  const handleAddBag = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const fallbackImage = product.category === "Moisturizers" 
    ? "/products/cream-ceramide-jar.jpg" 
    : product.category === "Bundles"
      ? "/products/routine-box-set.jpg"
      : "/products/serum-niacinamide.jpg";

  const shortVolume = (product.volume || "").split("/")[0].trim() || product.category;

  return (
    <article 
      className="product-card"
      onClick={() => setSelectedProductForModal(product)}
    >
      {/* 1. Studio Packshot Image */}
      <div className="card-thumb-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`card-thumb-img ${product.hoverImage ? "" : "no-hover-swap"}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />

        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            alt={`${product.name} texture preview`} 
            className="card-thumb-hover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {!product.inStock ? (
          <span className="card-tag-badge sold-out">Sold Out</span>
        ) : product.badge ? (
          <span className="card-tag-badge">{product.badge}</span>
        ) : null}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="card-heart-btn"
          title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
          aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart 
            size={15} 
            strokeWidth={1.7} 
            color={isFavorite ? "var(--accent-rose)" : "var(--text-main)"} 
            fill={isFavorite ? "var(--accent-rose)" : "none"} 
          />
        </button>
      </div>

      {/* 2. Aligned Details Body */}
      <div className="card-content-body">
        
        <h3 className="card-item-title" title={product.name}>
          {product.name}
        </h3>

        <p className="card-benefit-line">
          {product.subtitle}
        </p>

        <div className="card-rating-volume">
          <span className="card-inline-rating tabular-nums">
            <Star size={11} fill="var(--accent-amber)" color="var(--accent-amber)" />
            <span>{product.rating || 4.9}</span>
            <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}>
              ({product.reviewsCount || 180})
            </span>
          </span>
          <span style={{ color: "var(--border-medium)" }}>·</span>
          <span>{shortVolume}</span>
        </div>

        {/* Price + Actions Pinned Cleanly to Bottom */}
        <div className="card-footer-stack">
          <div className="card-price-row">
            <span className="card-price-current tabular-nums">
              {settings?.currency || "₹"}{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="card-price-mrp tabular-nums">
                {settings?.currency || "₹"}{product.originalPrice.toLocaleString()}
              </span>
            )}
            {hasDiscount && (
              <span className="card-price-discount tabular-nums">
                Save {settings?.currency || "₹"}{discountDiff}
              </span>
            )}
          </div>

          <button
            onClick={handleAddBag}
            disabled={!product.inStock}
            className="btn-card-add"
          >
            {product.inStock ? "Add to Bag" : "Out of Stock"}
          </button>

          {product.inStock && (
            <button
              onClick={handleBuyNow}
              className="btn-card-quick-cod"
              title="1-Step Guest Checkout (COD & UPI)"
            >
              Quick Buy (COD) →
            </button>
          )}
        </div>

      </div>
    </article>
  );
};
