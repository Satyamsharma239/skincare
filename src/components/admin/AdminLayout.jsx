import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Settings, 
  Store, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { AdminDashboard } from "./AdminDashboard";
import { AdminOrders } from "./AdminOrders";
import { AdminProducts } from "./AdminProducts";
import { AdminCoupons } from "./AdminCoupons";
import { AdminSettings } from "./AdminSettings";

export const AdminLayout = () => {
  const { setActiveView, settings, orders, products } = useStore();
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "orders" | "products" | "coupons" | "settings"

  const newOrdersCount = orders.filter((o) => o.status === "New Inquiry").length;

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Admin Top App Bar */}
      <header style={{
        backgroundColor: "var(--accent-forest)",
        color: "#fff",
        padding: "0.85rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                {settings.storeName}
              </span>
              <span style={{ fontSize: "0.68rem", backgroundColor: "#A7F3D0", color: "#064E3B", padding: "0.15rem 0.5rem", borderRadius: "3px", fontWeight: 700, textTransform: "uppercase" }}>
                Admin Hub
              </span>
            </div>
            <div style={{ fontSize: "0.74rem", color: "#D1D5DB" }}>
              Dermatological Store Management & WhatsApp Order Dispatch
            </div>
          </div>
        </div>

        {/* WhatsApp Status Badge & Storefront Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            backgroundColor: "rgba(37, 211, 102, 0.15)",
            border: "1px solid rgba(37, 211, 102, 0.4)",
            color: "#6EE7B7",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.78rem",
            fontWeight: 600
          }}>
            <MessageCircle size={15} color="#25D366" />
            <span>Target WhatsApp: <strong>{settings.whatsappDisplayNumber}</strong></span>
          </div>

          <button
            onClick={() => setActiveView("storefront")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#fff",
              color: "var(--accent-forest)",
              padding: "0.45rem 0.95rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            <Store size={15} />
            <span>Switch to Customer Storefront</span>
          </button>
        </div>
      </header>

      {/* Admin Subnav Tabs */}
      <div style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid var(--border-medium)",
        padding: "0 1.5rem"
      }}>
        <div className="container" style={{ padding: 0 }}>
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            scrollbarWidth: "none"
          }}>
            
            <button
              onClick={() => setActiveTab("dashboard")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.95rem 1rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: activeTab === "dashboard" ? "var(--accent-forest)" : "var(--text-secondary)",
                borderBottom: activeTab === "dashboard" ? "2px solid var(--accent-forest)" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <LayoutDashboard size={16} />
              <span>Overview Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.95rem 1rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: activeTab === "orders" ? "var(--accent-forest)" : "var(--text-secondary)",
                borderBottom: activeTab === "orders" ? "2px solid var(--accent-forest)" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                position: "relative"
              }}
            >
              <Package size={16} />
              <span>WhatsApp Orders</span>
              {newOrdersCount > 0 && (
                <span style={{
                  backgroundColor: "#DC2626",
                  color: "#fff",
                  fontSize: "0.68rem",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 700
                }}>
                  {newOrdersCount} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("products")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.95rem 1rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: activeTab === "products" ? "var(--accent-forest)" : "var(--text-secondary)",
                borderBottom: activeTab === "products" ? "2px solid var(--accent-forest)" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <ShoppingBag size={16} />
              <span>Formulations Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("coupons")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.95rem 1rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: activeTab === "coupons" ? "var(--accent-forest)" : "var(--text-secondary)",
                borderBottom: activeTab === "coupons" ? "2px solid var(--accent-forest)" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <Tag size={16} />
              <span>Coupons & Promos</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.95rem 1rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: activeTab === "settings" ? "var(--accent-forest)" : "var(--text-secondary)",
                borderBottom: activeTab === "settings" ? "2px solid var(--accent-forest)" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <Settings size={16} />
              <span>WhatsApp & Store Settings</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Tab View Canvas */}
      <main style={{ flexGrow: 1, padding: "2rem 0" }}>
        <div className="container">
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
