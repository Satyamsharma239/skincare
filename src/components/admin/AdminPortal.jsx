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
  KeyRound
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

  const newOrdersCount = orders.filter((o) => o.status === "New Inquiry").length;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("Please enter PIN");
      return;
    }
    const success = loginAdmin(pinInput.trim());
    if (!success) {
      setPinError("Incorrect security PIN. Default is 1234");
    } else {
      setPinError("");
      setPinInput("");
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin(settings.adminPin || "1234");
  };

  // If NOT authenticated, show the secure access gate
  if (!isAdminAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#141715",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        color: "#FAF8F5",
        fontFamily: "var(--font-sans)"
      }}>
        <div style={{
          maxWidth: "420px",
          width: "100%",
          backgroundColor: "#1E2320",
          borderRadius: "var(--radius-md)",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center"
        }}>
          
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(37, 211, 102, 0.15)",
            color: "#4ADE80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem auto"
          }}>
            <Lock size={26} />
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: "0.4rem" }}>
            {settings.storeName}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#9CA3AF", marginBottom: "1.75rem", lineHeight: 1.5 }}>
            Staff & Fulfillment Portal. Enter your administrator security PIN to manage orders and formulation inventory.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <input
                type="password"
                placeholder="Enter Staff Security PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: pinError ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#272E2A",
                  color: "#fff",
                  fontSize: "1rem",
                  textAlign: "center",
                  letterSpacing: "0.2em",
                  outline: "none"
                }}
                autoFocus
              />
              {pinError && (
                <div style={{ fontSize: "0.75rem", color: "#F87171", marginTop: "0.4rem" }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", backgroundColor: "var(--accent-sage)", color: "#fff", padding: "0.85rem" }}
            >
              <KeyRound size={17} />
              <span>Unlock Admin Dashboard</span>
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              style={{
                fontSize: "0.78rem",
                color: "#6EE7B7",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.2rem",
                textDecoration: "underline"
              }}
            >
              1-Click Unlock (PIN: 1234)
            </button>
          </form>

        </div>
      </div>
    );
  }

  // When Authenticated: Modern Standalone SaaS Admin Portal
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F6F3" }}>
      
      {/* Left Sidebar (Dark Obsidian Executive Theme) */}
      <aside style={{
        width: "270px",
        backgroundColor: "#161A17",
        color: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #28302A",
        flexShrink: 0
      }} className="admin-sidebar">
        
        {/* Brand Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #28302A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>
              LUMÈRA
            </span>
            <span style={{ fontSize: "0.65rem", backgroundColor: "rgba(74, 222, 128, 0.2)", color: "#86EFAC", padding: "0.15rem 0.45rem", borderRadius: "3px", fontWeight: 700 }}>
              PORTAL
            </span>
          </div>
          <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "3px" }}>
            WhatsApp Fulfillment & Inventory
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
            <span style={{ color: "#D1D5DB" }}>Order Target:</span>
            <strong style={{ color: "#6EE7B7" }}>{settings.whatsappDisplayNumber}</strong>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", flexGrow: 1 }}>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.86rem",
              fontWeight: activeTab === "dashboard" ? 700 : 500,
              backgroundColor: activeTab === "dashboard" ? "#263028" : "transparent",
              color: activeTab === "dashboard" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            <LayoutDashboard size={17} color={activeTab === "dashboard" ? "#4ADE80" : "currentColor"} />
            <span>Overview Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.7rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.86rem",
              fontWeight: activeTab === "orders" ? 700 : 500,
              backgroundColor: activeTab === "orders" ? "#263028" : "transparent",
              color: activeTab === "orders" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Package size={17} color={activeTab === "orders" ? "#4ADE80" : "currentColor"} />
              <span>WhatsApp Orders</span>
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
            onClick={() => setActiveTab("products")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.86rem",
              fontWeight: activeTab === "products" ? 700 : 500,
              backgroundColor: activeTab === "products" ? "#263028" : "transparent",
              color: activeTab === "products" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            <ShoppingBag size={17} color={activeTab === "products" ? "#4ADE80" : "currentColor"} />
            <span>Formulations ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("coupons")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.86rem",
              fontWeight: activeTab === "coupons" ? 700 : 500,
              backgroundColor: activeTab === "coupons" ? "#263028" : "transparent",
              color: activeTab === "coupons" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            <Tag size={17} color={activeTab === "coupons" ? "#4ADE80" : "currentColor"} />
            <span>Coupons & Promos</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.86rem",
              fontWeight: activeTab === "settings" ? 700 : 500,
              backgroundColor: activeTab === "settings" ? "#263028" : "transparent",
              color: activeTab === "settings" ? "#fff" : "#9CA3AF",
              textAlign: "left",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
          >
            <Settings size={17} color={activeTab === "settings" ? "#4ADE80" : "currentColor"} />
            <span>WhatsApp Settings</span>
          </button>

        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: "1.25rem 1rem", borderTop: "1px solid #28302A", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          
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
      <main style={{ flexGrow: 1, padding: "2.5rem", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          {activeTab === "dashboard" && <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "coupons" && <AdminCoupons />}
          {activeTab === "settings" && <AdminSettings />}
        </div>
      </main>

    </div>
  );
};
