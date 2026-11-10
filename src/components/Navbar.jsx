import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquareText, 
  Truck
} from "lucide-react";

export const Navbar = () => {
  const {
    settings,
    products,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsTrackOrderOpen,
    setIsQuizOpen,
    searchQuery,
    setSearchQuery,
    setSelectedConcernFilter,
    setSelectedCategoryFilter,
    selectedCategoryFilter,
    setSelectedProductForModal
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? (products || []).filter((p) => {
        if (!p) return false;
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name ? p.name.toLowerCase().includes(q) : false;
        const categoryMatch = p.category ? p.category.toLowerCase().includes(q) : false;
        const activesMatch = p.keyActives ? p.keyActives.toLowerCase().includes(q) : false;
        return nameMatch || categoryMatch || activesMatch;
      }).slice(0, 6)
    : [];

  const handleNavClick = (category, concern) => {
    setSelectedCategoryFilter(category || "All Products");
    setSelectedConcernFilter(concern || "All Concerns");
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);

    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = (settings?.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings?.storeName || "LUMÈRA"}, I am browsing your skincare formulations and would like assistance selecting a routine.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleSelectSearchResult = (product) => {
    setSelectedProductForModal(product);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="site-header">
      
      {/* 1. Slim Utility Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <div className="announcement-inner">
            <div className="announcement-center">
              <span>Complimentary Express Shipping on orders ₹499+</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Cash on Delivery & UPI across India</span>
            </div>

            <div className="announcement-actions">
              <button 
                onClick={() => setIsTrackOrderOpen(true)}
                className="announcement-link"
              >
                <Truck size={12} />
                <span>Track Order</span>
              </button>
              <span style={{ opacity: 0.3 }}>|</span>
              <button 
                onClick={handleOpenWhatsAppChat}
                className="announcement-link"
              >
                <MessageSquareText size={12} />
                <span>WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Architectural Header */}
      <div className="container">
        <div className="main-navbar">
          
          {/* Brand Logo & Mobile Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-icon-button mobile-toggle"
              style={{ display: "none" }}
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div 
              onClick={() => {
                setSelectedCategoryFilter("All Products");
                setSelectedConcernFilter("All Concerns");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="brand-logo"
            >
              <span className="brand-title">LUMÈRA</span>
              <span className="brand-badge desktop-only-badge">SKINCARE LAB</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="nav-links-bar desktop-nav">
            <button 
              onClick={() => handleNavClick("All Products", "All Concerns")}
              className={`nav-item-btn ${selectedCategoryFilter === "All Products" ? "active" : ""}`}
            >
              Shop All
            </button>
            <button 
              onClick={() => handleNavClick("Serums", null)}
              className={`nav-item-btn ${selectedCategoryFilter === "Serums" ? "active" : ""}`}
            >
              Serums
            </button>
            <button 
              onClick={() => handleNavClick("Moisturizers", null)}
              className={`nav-item-btn ${selectedCategoryFilter === "Moisturizers" ? "active" : ""}`}
            >
              Moisturizers
            </button>
            <button 
              onClick={() => handleNavClick("Cleansers", null)}
              className={`nav-item-btn ${selectedCategoryFilter === "Cleansers" ? "active" : ""}`}
            >
              Cleansers
            </button>
            <button 
              onClick={() => handleNavClick("Sunscreens", null)}
              className={`nav-item-btn ${selectedCategoryFilter === "Sunscreens" ? "active" : ""}`}
            >
              Sunscreens
            </button>
            <button 
              onClick={() => handleNavClick("Bundles", null)}
              className={`nav-item-btn ${selectedCategoryFilter === "Bundles" ? "active" : ""}`}
            >
              Routines
            </button>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="nav-item-btn"
              style={{ color: "var(--accent-pine)", fontWeight: 600 }}
            >
              Skin Quiz
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="nav-actions-stack">
            
            {/* Desktop Search Box */}
            <div style={{ position: "relative" }} ref={searchRef} className="desktop-search">
              <div className="search-input-wrap">
                <Search size={14} color="var(--text-caption)" style={{ flexShrink: 0 }} />
                <input 
                  type="text"
                  placeholder="Search niacinamide, SPF..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="search-input-field"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} style={{ color: "var(--text-subtle)", padding: "0 0.2rem" }} aria-label="Clear search">
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Search Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  width: "340px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "0.5rem",
                  zIndex: 1000
                }}>
                  {searchResults.length === 0 ? (
                    <div style={{ padding: "1rem", fontSize: "0.82rem", color: "var(--text-caption)", textAlign: "center" }}>
                      No formulations match "{searchQuery}".
                    </div>
                  ) : (
                    searchResults.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => handleSelectSearchResult(p)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.55rem 0.65rem",
                          borderRadius: "var(--radius-xs)",
                          cursor: "pointer",
                          transition: "background-color 0.15s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/products/serum-niacinamide.jpg"; }}
                          style={{ width: "40px", height: "40px", borderRadius: "2px", objectFit: "cover", backgroundColor: "var(--bg-studio)" }}
                        />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-caption)" }}>
                            {p.category} · {settings?.currency || "₹"}{p.price}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="nav-icon-button mobile-toggle"
              style={{ display: "none" }}
              aria-label="Search products"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="nav-icon-button"
              title="Saved Wishlist"
              aria-label="Saved Wishlist"
            >
              <Heart 
                size={18} 
                strokeWidth={1.8}
                color={wishlist.length > 0 ? "var(--accent-rose)" : "var(--text-main)"} 
                fill={wishlist.length > 0 ? "var(--accent-rose)" : "none"} 
              />
              {wishlist.length > 0 && (
                <span className="nav-count-badge" style={{ backgroundColor: "var(--accent-rose)" }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="nav-bag-pill"
              title="Shopping Bag"
            >
              <ShoppingBag size={16} strokeWidth={1.8} />
              <span>Bag</span>
              <span className="tabular-nums" style={{ color: "var(--text-caption)", fontWeight: 600 }}>
                ({cartCount})
              </span>
            </button>

          </div>

        </div>

        {/* Expandable Mobile Search Strip */}
        {isMobileSearchOpen && (
          <div style={{ paddingBottom: "0.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
            <div className="search-input-wrap" style={{ width: "100%" }}>
              <Search size={15} color="var(--text-caption)" />
              <input 
                type="text"
                placeholder="Search serums, ceramides, SPF 50+..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input-field"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} aria-label="Clear search">
                  <X size={14} color="var(--text-caption)" />
                </button>
              )}
            </div>
            {searchQuery.trim() && searchResults.length > 0 && (
              <div style={{ marginTop: "0.5rem", backgroundColor: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", padding: "0.35rem" }}>
                {searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectSearchResult(p)}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", cursor: "pointer" }}
                  >
                    <img src={p.image} alt={p.name} style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "2px" }} />
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-caption)" }}>{p.category} · ₹{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ justifyContent: "flex-start", padding: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "84%",
              maxWidth: "320px",
              height: "100vh",
              backgroundColor: "#FFFFFF",
              boxShadow: "10px 0 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-light)" }}>
              <div className="brand-logo">
                <span className="brand-title">LUMÈRA</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu">
                <X size={20} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column" }}>
              {[
                { name: "All Formulations", cat: "All Products" },
                { name: "Face Serums", cat: "Serums" },
                { name: "Barrier Creams & Gels", cat: "Moisturizers" },
                { name: "Gentle Cleansers", cat: "Cleansers" },
                { name: "Sun Protection SPF 50+", cat: "Sunscreens" },
                { name: "Toners & Exfoliants", cat: "Toners" },
                { name: "Routines & Kits", cat: "Bundles" }
              ].map((item) => (
                <button
                  key={item.cat}
                  onClick={() => handleNavClick(item.cat, null)}
                  style={{
                    padding: "0.85rem 0",
                    textAlign: "left",
                    fontSize: "0.94rem",
                    fontWeight: selectedCategoryFilter === item.cat ? 700 : 500,
                    color: selectedCategoryFilter === item.cat ? "var(--text-main)" : "var(--text-muted)",
                    borderBottom: "1px solid var(--border-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span>{item.name}</span>
                  <ArrowRight size={14} color="var(--text-subtle)" />
                </button>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuizOpen(true);
                }}
                style={{
                  padding: "0.95rem 0",
                  textAlign: "left",
                  fontSize: "0.94rem",
                  fontWeight: 700,
                  color: "var(--accent-pine)",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <span>Take 30s Skin Diagnostic Quiz</span>
                <ArrowRight size={14} />
              </button>
            </nav>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsTrackOrderOpen(true);
                }}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                <Truck size={15} />
                <span>Track Order</span>
              </button>

              <button
                onClick={handleOpenWhatsAppChat}
                className="btn btn-whatsapp"
                style={{ width: "100%" }}
              >
                <MessageSquareText size={15} />
                <span>WhatsApp Support (COD)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-search, .desktop-only-badge {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
