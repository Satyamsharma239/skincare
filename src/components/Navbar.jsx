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
  Sparkles,
  ShieldCheck,
  Flame,
  ChevronRight,
  Truck
} from "lucide-react";

export const Navbar = () => {
  const {
    settings,
    products,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsTrackOrderOpen,
    searchQuery,
    setSearchQuery,
    setSelectedConcernFilter,
    setSelectedCategoryFilter,
    selectedCategoryFilter,
    setSelectedProductForModal,
    openExpressCheckout
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter live search results
  const searchResults = searchQuery.trim()
    ? (products || []).filter((p) => {
        if (!p) return false;
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name ? p.name.toLowerCase().includes(q) : false;
        const categoryMatch = p.category ? p.category.toLowerCase().includes(q) : false;
        const activesMatch = p.keyActives ? p.keyActives.toLowerCase().includes(q) : false;
        const concernsMatch = Array.isArray(p.skinConcerns)
          ? p.skinConcerns.some((c) => c && c.toLowerCase().includes(q))
          : false;
        return nameMatch || categoryMatch || activesMatch || concernsMatch;
      }).slice(0, 6)
    : [];

  const handleNavClick = (category, concern) => {
    if (category) setSelectedCategoryFilter(category);
    if (concern) setSelectedConcernFilter(concern);
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);

    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 🌿 I would like to place an order or get product guidance for my skin.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleSelectSearchResult = (product) => {
    setSelectedProductForModal(product);
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  return (
    <header className="site-header" style={{ position: "sticky", top: 0, zIndex: 900, backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      
      {/* 1. Slim Announcement Ticker */}
      <div 
        style={{
          backgroundColor: "#18181B",
          color: "#FAF8F5",
          padding: "0.45rem 1.25rem",
          fontSize: "0.76rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}
      >
        <div style={{ margin: "0 auto", textAlign: "center", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>⚡ FREE Express Courier on orders ₹499+ • Doorstep Cash on Delivery (COD) • 0% Artificial Fragrance</span>
        </div>
        <div className="announcement-right" style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.74rem" }}>
          <button 
            onClick={() => setIsTrackOrderOpen(true)}
            style={{ 
              color: "#FAF8F5", 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.35rem",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "rgba(255,255,255,0.12)",
              padding: "0.22rem 0.65rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
            title="Track shipment status"
          >
            <Truck size={12} />
            <span>Track Order</span>
          </button>

          <button 
            onClick={handleOpenWhatsAppChat}
            style={{ 
              color: "#FFFFFF", 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.35rem",
              fontWeight: 600,
              cursor: "pointer",
              opacity: 0.95
            }}
          >
            <MessageSquareText size={13} />
            <span>WhatsApp: {settings.whatsappDisplayNumber}</span>
          </button>
        </div>
      </div>

      {/* 2. Main E-Commerce Header Bar */}
      <div style={{ borderBottom: "1px solid var(--border-light)", backgroundColor: "#FFFFFF" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", gap: "1.25rem" }}>
          
          {/* Left: Mobile Hamburger & Luxury Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              style={{ display: "none", padding: "0.4rem", color: "var(--text-primary)" }}
              aria-label="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div 
              onClick={() => {
                setSelectedCategoryFilter("All Products");
                setSelectedConcernFilter("All Concerns");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
              <span style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "1.85rem", 
                fontWeight: 800, 
                letterSpacing: "0.06em",
                color: "var(--text-primary)",
                lineHeight: 1
              }}>
                LUMÈRA
              </span>
              <span style={{ 
                fontFamily: "var(--font-sans)",
                fontSize: "0.62rem", 
                fontWeight: 700,
                letterSpacing: "0.18em", 
                color: "var(--text-muted)", 
                textTransform: "uppercase",
                marginTop: "3px"
              }}>
                Clinical Skincare
              </span>
            </div>
          </div>

          {/* Center: Real Visible E-Commerce Search Bar */}
          <div className="search-bar-container" ref={searchRef}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search 
                size={16} 
                style={{ position: "absolute", left: "1rem", color: "var(--text-muted)", pointerEvents: "none" }} 
              />
              <input 
                type="text"
                placeholder='Search "Niacinamide", "5-Ceramides", "Sunscreen", "Acne"...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="search-input-field"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: "0.85rem", color: "var(--text-muted)", padding: "0.2rem" }}
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Matching Formulations ({searchResults.length})
                </div>
                {searchResults.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => handleSelectSearchResult(p)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      transition: "background 0.15s ease"
                    }}
                    className="search-result-item"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img 
                        src={p.image} 
                        alt={p.name}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/serum-dropper.jpg"; }}
                        style={{ width: "38px", height: "38px", borderRadius: "var(--radius-xs)", objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.category} • {p.volume}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>₹{p.price}</div>
                      <div style={{ fontSize: "0.7rem", color: "#C2410C", fontWeight: 600 }}>Save ₹{p.originalPrice ? p.originalPrice - p.price : 0}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isSearchFocused && searchQuery.trim() && searchResults.length === 0 && (
              <div className="search-results-dropdown" style={{ padding: "1.25rem 1rem", textAlign: "center" }}>
                <p style={{ fontSize: "0.86rem", color: "var(--text-primary)", margin: 0, fontWeight: 500 }}>
                  No formulations found for "<strong>{searchQuery}</strong>"
                </p>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Try popular searches:{" "}
                  <button type="button" style={{ background: "none", border: "none", color: "#C2410C", cursor: "pointer", fontWeight: 700, padding: 0 }} onClick={() => setSearchQuery("Niacinamide")}>Niacinamide</button>,{" "}
                  <button type="button" style={{ background: "none", border: "none", color: "#C2410C", cursor: "pointer", fontWeight: 700, padding: 0 }} onClick={() => setSearchQuery("Ceramide")}>Ceramide</button>, or{" "}
                  <button type="button" style={{ background: "none", border: "none", color: "#C2410C", cursor: "pointer", fontWeight: 700, padding: 0 }} onClick={() => setSearchQuery("Sunscreen")}>Sunscreen</button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions (WhatsApp Direct Order, Wishlist, Bag) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            
            {/* Direct WhatsApp Order Button - Luxury Obsidian Black */}
            <button
              onClick={handleOpenWhatsAppChat}
              className="btn btn-whatsapp header-whatsapp-btn"
              style={{
                padding: "0.55rem 1.15rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                border: "1.5px solid #18181B"
              }}
              title="Order directly on WhatsApp"
            >
              <MessageSquareText size={15} />
              <span>Order on WhatsApp</span>
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              style={{ 
                position: "relative", 
                padding: "0.5rem", 
                color: wishlist.length > 0 ? "#C2410C" : "var(--text-primary)", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
              title="Saved Products"
            >
              <Heart size={21} strokeWidth={1.8} fill={wishlist.length > 0 ? "#C2410C" : "none"} />
              {wishlist.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "2px",
                  right: "0px",
                  backgroundColor: "#C2410C",
                  color: "#FFFFFF",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.55rem 1.15rem",
                border: "1.5px solid var(--text-primary)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.86rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              className="bag-nav-btn"
              title="Shopping Cart"
            >
              <ShoppingBag size={17} strokeWidth={2} />
              <span>{cartCount === 0 ? "Cart" : `Cart (${cartCount})`}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. Secondary E-Commerce Category Sub-Row (Desktop) */}
      <div className="desktop-category-bar" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <nav className="cat-nav-row">
            <button 
              onClick={() => handleNavClick("All Products", "All Concerns")}
              className={`cat-nav-link ${selectedCategoryFilter === "All Products" ? "active" : ""}`}
            >
              Shop All
            </button>

            <button 
              onClick={() => handleNavClick("All Products", "Bestseller")}
              className="cat-nav-link"
              style={{ color: "#C2410C" }}
            >
              <Flame size={14} color="#C2410C" />
              <span>Bestsellers</span>
            </button>

            <button 
              onClick={() => handleNavClick("Serums", null)}
              className={`cat-nav-link ${selectedCategoryFilter === "Serums" ? "active" : ""}`}
            >
              Face Serums
            </button>

            <button 
              onClick={() => handleNavClick("Moisturizers", null)}
              className={`cat-nav-link ${selectedCategoryFilter === "Moisturizers" ? "active" : ""}`}
            >
              Barrier Creams & Moisturisers
            </button>

            <button 
              onClick={() => handleNavClick("Sunscreens", null)}
              className={`cat-nav-link ${selectedCategoryFilter === "Sunscreens" ? "active" : ""}`}
            >
              Sunscreen SPF 50+
            </button>

            <button 
              onClick={() => handleNavClick("Cleansers", null)}
              className={`cat-nav-link ${selectedCategoryFilter === "Cleansers" ? "active" : ""}`}
            >
              Gentle Cleansers
            </button>

            <a 
              href="#offers-section"
              className="cat-nav-link"
              style={{ color: "#C2410C" }}
            >
              <span>Combos & Kits</span>
              <span style={{
                fontSize: "0.64rem",
                fontWeight: 700,
                backgroundColor: "#FFF7ED",
                color: "#C2410C",
                border: "1px solid #FFEDD5",
                padding: "0.15rem 0.45rem",
                borderRadius: "var(--radius-full)"
              }}>
                SAVE 30%
              </span>
            </a>

            <button 
              onClick={() => setIsTrackOrderOpen(true)}
              className="cat-nav-link"
              style={{ color: "#2563EB", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Truck size={14} color="#2563EB" />
              <span>Track Order</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById("faq-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="cat-nav-link"
              style={{ marginLeft: "auto", color: "var(--text-muted)" }}
            >
              Help & FAQ
            </button>
          </nav>
        </div>
      </div>

      {/* 4. Mobile Sliding Menu Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1100,
          display: "flex",
          animation: "fadeIn 0.2s ease"
        }}>
          <div style={{
            width: "82%",
            maxWidth: "340px",
            backgroundColor: "#FFFFFF",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
            animation: "slideInLeft 0.25s ease"
          }}>
            {/* Drawer Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem", borderBottom: "1px solid var(--border-light)" }}>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  LUMÈRA
                </span>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                  CLINICAL SKINCARE
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ padding: "0.4rem" }}>
                <X size={22} />
              </button>
            </div>

            {/* Mobile Categories Links */}
            <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.85rem" }}>
                Categories
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <button 
                  onClick={() => handleNavClick("All Products", "All Concerns")}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 600, borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>✨ Shop All Products</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
                <button 
                  onClick={() => handleNavClick("Serums", null)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 600, borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>💧 Face Serums</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
                <button 
                  onClick={() => handleNavClick("Moisturizers", null)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 600, borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>🛡️ Barrier Creams</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
                <button 
                  onClick={() => handleNavClick("Sunscreens", null)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 600, borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>☀️ SPF 50+ Sunscreen</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
                <button 
                  onClick={() => handleNavClick("Cleansers", null)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 600, borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>🍃 Gentle Cleansers</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
                <a 
                  href="#offers-section"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 700, color: "#C2410C", borderBottom: "1px solid #F4F4F5" }}
                >
                  <span>🎁 Bundles & Offers (SAVE 30%)</span>
                  <ChevronRight size={16} color="#C2410C" />
                </a>

                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTrackOrderOpen(true);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 700, color: "#2563EB", borderBottom: "1px solid #F4F4F5", width: "100%", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Truck size={16} />
                    <span>Track Shipment</span>
                  </span>
                  <ChevronRight size={16} color="#2563EB" />
                </button>

                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", fontSize: "0.92rem", fontWeight: 700, color: "#C2410C", width: "100%", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Heart size={16} />
                    <span>Saved Wishlist ({wishlist.length})</span>
                  </span>
                  <ChevronRight size={16} color="#C2410C" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", backgroundColor: "#FAFAF9" }}>
              <button
                onClick={handleOpenWhatsAppChat}
                className="btn btn-whatsapp"
                style={{ width: "100%", padding: "0.75rem", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem" }}
              >
                <MessageSquareText size={16} />
                <span>Order on WhatsApp</span>
              </button>
              <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                ⚡ Cash on Delivery (COD) Available
              </div>
            </div>

          </div>
          <div style={{ flexGrow: 1 }} onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      <style>{`
        .search-result-item:hover {
          background-color: #F4F4F5;
        }
        .bag-nav-btn:hover {
          background-color: #18181B !important;
          color: #FFFFFF !important;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .search-bar-container {
            display: none !important;
          }
          .desktop-category-bar {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .announcement-right {
            display: none !important;
          }
          .header-whatsapp-btn {
            display: none !important;
          }
        }
      `}</style>

    </header>
  );
};