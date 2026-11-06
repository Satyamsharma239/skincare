import React from "react";
import { useStore } from "../context/StoreContext";
import { 
  Heart, 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  MessageSquareText, 
  CheckCircle2 
} from "lucide-react";

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    openExpressCheckout,
    setSelectedProductForModal,
    showToast
  } = useStore();

  const handleMoveAllToBag = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((prod) => {
      if (prod.inStock) {
        addToCart(prod, 1);
      }
    });
    showToast(`Moved ${wishlistProducts.length} items to your shopping bag! 🎉`, "success");
    setIsWishlistOpen(false);
  };

  const getFallbackImage = (category) => {
    if (category === "Moisturizers") return "/cream-swirl.jpg";
    if (category === "Bundles") return "/lumera-hero.jpg";
    return "/serum-dropper.jpg";
  };

  if (!isWishlistOpen) return null;

  const wishlistProducts = (products || []).filter((p) => p && wishlist.includes(p.id));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1200,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 36px rgba(0, 0, 0, 0.16)",
          animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header */}
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
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#FFF7ED",
                color: "#C2410C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Heart size={16} fill="#C2410C" />
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
                Saved Wishlist
              </h3>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                {wishlistProducts.length} {wishlistProducts.length === 1 ? "formulation" : "formulations"} saved
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{
              padding: "0.4rem",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              cursor: "pointer",
              border: "none",
              color: "var(--text-primary)"
            }}
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2. Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4.5rem 1rem" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  backgroundColor: "#FFF7ED",
                  color: "#C2410C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <Heart size={30} strokeWidth={1.5} />
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  marginBottom: "0.4rem",
                  color: "var(--text-primary)"
                }}
              >
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", maxWidth: "280px", margin: "0 auto 1.5rem auto", lineHeight: 1.5 }}>
                Save your favorite clinical serums, barrier creams, and SPF shields by tapping the heart icon on any product card!
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary"
                style={{
                  padding: "0.75rem 1.75rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)"
                }}
              >
                Explore Formulations
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--border-light)",
                    alignItems: "flex-start"
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedProductForModal(prod);
                      setIsWishlistOpen(false);
                    }}
                    style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackImage(prod.category);
                      }}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "var(--radius-sm)",
                        objectFit: "cover",
                        backgroundColor: "#F4F4F5",
                        border: "1px solid var(--border-light)"
                      }}
                    />
                    {prod.badge && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "3px",
                          left: "3px",
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          backgroundColor: "#18181B",
                          color: "#FFFFFF",
                          padding: "0.1rem 0.35rem",
                          borderRadius: "2px",
                          textTransform: "uppercase"
                        }}
                      >
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {prod.category} • {prod.volume}
                        </div>
                        <h4
                          onClick={() => {
                            setSelectedProductForModal(prod);
                            setIsWishlistOpen(false);
                          }}
                          style={{
                            fontSize: "0.92rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            margin: "2px 0 4px 0",
                            cursor: "pointer",
                            lineHeight: 1.3
                          }}
                        >
                          {prod.name}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        style={{
                          color: "var(--text-muted)",
                          padding: "0.2rem",
                          cursor: "pointer",
                          border: "none",
                          background: "none"
                        }}
                        title="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: "0.76rem", color: "#4B5563", marginBottom: "0.6rem" }}>
                      {prod.keyActives?.split("+")[0] || "Declared Lab Actives"}
                    </div>

                    {/* Price & Actions Row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                          ₹{prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                            ₹{prod.originalPrice}
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <button
                          onClick={() => {
                            addToCart(prod, 1);
                          }}
                          className="btn btn-primary"
                          style={{
                            padding: "0.4rem 0.85rem",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem"
                          }}
                        >
                          <ShoppingBag size={13} />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openExpressCheckout(prod, 1);
                          }}
                          className="btn btn-whatsapp"
                          style={{
                            padding: "0.4rem 0.75rem",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                            backgroundColor: "#25D366",
                            color: "#FFFFFF",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem"
                          }}
                          title="Instant WhatsApp Checkout"
                        >
                          <MessageSquareText size={13} />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Bottom Action Bar */}
        {wishlistProducts.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--border-light)",
              backgroundColor: "#FAFAF9",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}
          >
            <button
              onClick={handleMoveAllToBag}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                fontWeight: 700,
                fontSize: "0.92rem",
                borderRadius: "var(--radius-full)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <ShoppingBag size={17} />
              <span>Move All to Bag ({wishlistProducts.length} Items)</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(false)}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                cursor: "pointer",
                background: "none",
                border: "none",
                fontWeight: 600
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
