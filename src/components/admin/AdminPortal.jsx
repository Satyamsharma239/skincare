import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Settings, 
  Store, 
  LogOut, 
  Lock, 
  MessageCircle, 
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { AdminDashboard } from "./AdminDashboard";
import { AdminOrders } from "./AdminOrders";
import { AdminProducts } from "./AdminProducts";
import { AdminCoupons } from "./AdminCoupons";
import { AdminSettings } from "./AdminSettings";

export const AdminPortal = () => {
  const { 
    settings, 
    orders, 
    products, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin, 
    navigateTo 
  } = useStore();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const newOrdersCount = orders.filter((o) => o.status === "New Inquiry").length;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("Please enter your security PIN");
      return;
    }
    const success = loginAdmin(pinInput.trim());
    if (!success) {
      setPinError("Incorrect security PIN. Access denied.");
    } else {
      setPinError("");
      setPinInput("");
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setIsMobileNavOpen(false);
  };

  // If NOT authenticated, show the secure access gate
  if (!isAdminAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#121413",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        color: "#FAF8F5",
        fontFamily: "var(--font-sans)"
      }}>
        <div style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#181B19",
          borderRadius: "18px",
          padding: "2.5rem 2rem",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center"
        }}>
          
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            backgroundColor: "#222724",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#FAF8F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem auto"
          }}>
            <Lock size={22} />
          </div>

          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C2410C", marginBottom: "0.3rem" }}>
            Restricted Operations Access
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "0.4rem" }}>
            {settings?.storeName || "LUMÈRA"}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#9CA3AF", marginBottom: "1.75rem", lineHeight: 1.5 }}>
            Store Owner & Fulfillment Portal. Enter your administrator security PIN to manage orders and inventory.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <input
                type="password"
                placeholder="Enter Security PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  border: pinError ? "1.5px solid #EF4444" : "1.5px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#222724",
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  letterSpacing: "0.3em",
                  outline: "none"
                }}
                autoFocus
              />
              {pinError && (
                <div style={{ fontSize: "0.78rem", color: "#F87171", marginTop: "0.5rem", fontWeight: 600 }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                backgroundColor: "#FAF8F5",
                color: "#18181B",
                padding: "0.85rem",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.92rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <KeyRound size={16} />
              <span>Unlock Admin Portal</span>
            </button>

            <a
              href="/"
              style={{
                fontSize: "0.78rem",
                color: "#9CA3AF",
                marginTop: "0.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.3rem",
                textDecoration: "none"
              }}
            >
              <ArrowLeft size={13} />
              <span>Return to Customer Storefront</span>
            </a>
          </form>

        </div>
      </div>
    );
  }

  // When Authenticated: Modern Standalone SaaS Admin Portal
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F6F3" }} className="admin-portal-wrapper">
      
      {/* Mobile Top Header */}
      <header className="admin-mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            style={{
              padding: "0.4rem",
              color: "#FAF8F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
            LUMÈRA Admin
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {newOrdersCount > 0 && (
            <span style={{
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              fontSize: "0.7rem",
              padding: "0.15rem 0.5rem",
              borderRadius: "999px",
              fontWeight: 700
            }}>
              {newOrdersCount} New
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FAF8F5",
              fontSize: "0.76rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.3rem 0.6rem",
              borderRadius: "6px",
              backgroundColor: "#28302A"
            }}
          >
            <span>Live Store</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)}
          className="admin-mobile-backdrop"
        />
      )}

      {/* Left Sidebar (Dark Obsidian Executive Theme) */}
      <aside className={`admin-sidebar ${isMobileNavOpen ? "open" : ""}`}>
        
        {/* Brand Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #28302A" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>
                LUMÈRA
              </span>
              <span style={{ fontSize: "0.65rem", backgroundColor: "rgba(194, 65, 12, 0.25)", color: "#FB923C", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700 }}>
                PORTAL
              </span>
            </div>
            
            {/* Close button for mobile drawer */}
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="admin-sidebar-close-btn"
              style={{ color: "#9CA3AF", padding: "0.2rem" }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "3px" }}>
            Fulfillment & Operations Console
          </div>

          {/* Connected WhatsApp Badge */}
          <div style={{
            marginTop: "1rem",
            backgroundColor: "#202722",
            border: "1px solid #2E3932",
            borderRadius: "var(--radius-sm)",
            padding: "0.45rem 0.65rem",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.74rem"
          }}>
            <MessageCircle size={14} color="#25D366" />
            <span style={{ color: "#D1D5DB" }}>WhatsApp:</span>
            <strong style={{ color: "#FFFFFF" }}>{settings?.whatsappDisplayNumber || settings?.whatsappNumber}</strong>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", flexGrow: 1 }}>
          
          <button
            onClick={() => handleTabSwitch("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: activeTab === "dashboard" ? 700 : 500,
              backgroundColor: activeTab === "dashboard" ? "#28302A" : "transparent",
              color: activeTab === "dashboard" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              border: "none"
            }}
          >
            <LayoutDashboard size={17} color={activeTab === "dashboard" ? "#FB923C" : "currentColor"} />
            <span>Overview Dashboard</span>
          </button>

          <button
            onClick={() => handleTabSwitch("orders")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: activeTab === "orders" ? 700 : 500,
              backgroundColor: activeTab === "orders" ? "#28302A" : "transparent",
              color: activeTab === "orders" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              border: "none"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Package size={17} color={activeTab === "orders" ? "#FB923C" : "currentColor"} />
              <span>Customer Orders</span>
            </div>
            {newOrdersCount > 0 && (
              <span style={{
                backgroundColor: "#DC2626",
                color: "#fff",
                fontSize: "0.68rem",
                padding: "0.1rem 0.45rem",
                borderRadius: "var(--radius-full)",
                fontWeight: 700
              }}>
                {newOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabSwitch("products")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: activeTab === "products" ? 700 : 500,
              backgroundColor: activeTab === "products" ? "#28302A" : "transparent",
              color: activeTab === "products" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              border: "none"
            }}
          >
            <ShoppingBag size={17} color={activeTab === "products" ? "#FB923C" : "currentColor"} />
            <span>Formulations ({products.length})</span>
          </button>

          <button
            onClick={() => handleTabSwitch("coupons")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: activeTab === "coupons" ? 700 : 500,
              backgroundColor: activeTab === "coupons" ? "#28302A" : "transparent",
              color: activeTab === "coupons" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              border: "none"
            }}
          >
            <Tag size={17} color={activeTab === "coupons" ? "#FB923C" : "currentColor"} />
            <span>Vouchers & Promos</span>
          </button>

          <button
            onClick={() => handleTabSwitch("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: activeTab === "settings" ? 700 : 500,
              backgroundColor: activeTab === "settings" ? "#28302A" : "transparent",
              color: activeTab === "settings" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              border: "none"
            }}
          >
            <Settings size={17} color={activeTab === "settings" ? "#FB923C" : "currentColor"} />
            <span>WhatsApp & Security</span>
          </button>

        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: "1.25rem 1rem", borderTop: "1px solid #28302A", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.6rem 0.8rem",
              fontSize: "0.82rem",
              color: "#FAF8F5",
              backgroundColor: "#202722",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #2E3932",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Store size={15} />
              <span>Customer Store</span>
            </div>
            <ExternalLink size={13} color="#9CA3AF" />
          </a>

          <button
            onClick={logoutAdmin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.6rem 0.8rem",
              fontSize: "0.82rem",
              color: "#EF4444",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <LogOut size={15} />
            <span>Lock & Sign Out Admin</span>
          </button>
        </div>

      </aside>

      {/* Main Admin View Content */}
      <main className="admin-main-content" style={{ flexGrow: 1, padding: "2.25rem", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          {activeTab === "dashboard" && <AdminDashboard onNavigate={(tab) => handleTabSwitch(tab)} />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "coupons" && <AdminCoupons />}
          {activeTab === "settings" && <AdminSettings />}
        </div>
      </main>

    </div>
  );
};
