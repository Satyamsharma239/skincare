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

const TAB_TITLES = {
  dashboard: { title: "Overview", subtitle: "Store metrics, pending inquiries, and formulation inventory" },
  orders: { title: "Customer Orders", subtitle: "Process WhatsApp, COD, and UPI shipments with tracking links" },
  products: { title: "Formulations Catalog", subtitle: "Manage SKUs, pricing, active percentages, and stock toggles" },
  coupons: { title: "Promotions & Vouchers", subtitle: "Configure cart discount codes and minimum order thresholds" },
  settings: { title: "Store & WhatsApp Settings", subtitle: "WhatsApp receiver number, shipping rates, and security PIN" }
};

export const AdminPortal = () => {
  const { 
    settings, 
    orders, 
    products, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin 
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

  if (!isAdminAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F6F6F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "var(--font-sans)"
      }}>
        <div style={{
          maxWidth: "390px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          padding: "2.25rem 2rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          border: "1px solid #E5E5E0",
          textAlign: "center"
        }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "8px",
            backgroundColor: "#141414",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem auto"
          }}>
            <Lock size={19} />
          </div>

          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-pine)", marginBottom: "0.3rem" }}>
            Operations Console
          </div>

          <h2 style={{ fontSize: "1.45rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#141414", marginBottom: "0.4rem" }}>
            LUMÈRA Staff Portal
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#666660", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            Enter your security PIN to access orders, formulations, and store settings.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
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
                  padding: "0.8rem 1rem",
                  borderRadius: "6px",
                  border: pinError ? "1.5px solid #DC2626" : "1px solid #D4D2CA",
                  backgroundColor: "#FFFFFF",
                  color: "#141414",
                  fontSize: "1rem",
                  textAlign: "center",
                  letterSpacing: "0.28em",
                  outline: "none"
                }}
                autoFocus
              />
              {pinError && (
                <div style={{ fontSize: "0.76rem", color: "#DC2626", marginTop: "0.45rem", fontWeight: 600 }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.82rem" }}
            >
              <KeyRound size={15} />
              <span>Unlock Console</span>
            </button>

            <a
              href="/"
              style={{
                fontSize: "0.78rem",
                color: "#666660",
                marginTop: "0.35rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem"
              }}
            >
              <ArrowLeft size={13} />
              <span>Back to Storefront</span>
            </a>
          </form>
        </div>
      </div>
    );
  }

  const activeMeta = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className="admin-portal-wrapper">
      
      {/* Mobile Header Bar */}
      <header className="admin-mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            style={{ padding: "0.35rem", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Toggle Navigation"
          >
            {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span style={{ fontWeight: 700, fontSize: "0.98rem", letterSpacing: "0.1em" }}>
            LUMÈRA
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {newOrdersCount > 0 && (
            <span style={{ backgroundColor: "#DC2626", color: "#FFFFFF", fontSize: "0.68rem", padding: "0.15rem 0.5rem", borderRadius: "99px", fontWeight: 700 }}>
              {newOrdersCount} New
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E5E5E5", fontSize: "0.74rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.3rem 0.6rem", borderRadius: "4px", backgroundColor: "#262626" }}
          >
            <span>Storefront</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {isMobileNavOpen && (
        <div onClick={() => setIsMobileNavOpen(false)} className="admin-mobile-backdrop" />
      )}

      {/* Executive Monochrome Sidebar */}
      <aside className={`admin-sidebar ${isMobileNavOpen ? "open" : ""}`}>
        
        <div style={{ padding: "1.35rem 1.25rem", borderBottom: "1px solid #222222" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.15rem", fontWeight: 700, letterSpacing: "0.14em", color: "#FFFFFF" }}>
                LUMÈRA
              </span>
              <span style={{ fontSize: "0.62rem", backgroundColor: "#262626", color: "#A1A1AA", padding: "0.14rem 0.4rem", borderRadius: "3px", fontWeight: 600, letterSpacing: "0.06em" }}>
                ADMIN
              </span>
            </div>

            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="admin-sidebar-close-btn"
              style={{ color: "#A1A1AA", padding: "0.2rem" }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{
            marginTop: "1rem",
            backgroundColor: "#1A1A1A",
            border: "1px solid #262626",
            borderRadius: "5px",
            padding: "0.45rem 0.65rem",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.72rem"
          }}>
            <MessageCircle size={13} color="#4ADE80" />
            <span style={{ color: "#A1A1AA" }}>WhatsApp:</span>
            <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>
              {settings?.whatsappDisplayNumber || settings?.whatsappNumber}
            </strong>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: "0.85rem 0.65rem", display: "flex", flexDirection: "column", gap: "0.2rem", flexGrow: 1 }}>
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: Package, badge: newOrdersCount },
            { id: "products", label: `Catalog (${products.length})`, icon: ShoppingBag },
            { id: "coupons", label: "Promotions", icon: Tag },
            { id: "settings", label: "Settings", icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSwitch(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.62rem 0.8rem",
                  borderRadius: "5px",
                  fontSize: "0.84rem",
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? "#262626" : "transparent",
                  color: isActive ? "#FFFFFF" : "#A1A1AA",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease, color 0.15s ease"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <Icon size={16} color={isActive ? "#FFFFFF" : "#71717A"} />
                  <span>{item.label}</span>
                </span>
                {item.badge > 0 && (
                  <span style={{
                    backgroundColor: "#DC2626",
                    color: "#FFFFFF",
                    fontSize: "0.66rem",
                    padding: "0.1rem 0.42rem",
                    borderRadius: "99px",
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid #222222", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.55rem 0.75rem",
              fontSize: "0.8rem",
              color: "#E4E4E7",
              backgroundColor: "#1A1A1A",
              borderRadius: "5px",
              border: "1px solid #262626",
              fontWeight: 500
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Store size={14} color="#A1A1AA" />
              <span>View Storefront</span>
            </span>
            <ExternalLink size={12} color="#71717A" />
          </a>

          <button
            onClick={logoutAdmin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 0.75rem",
              fontSize: "0.8rem",
              color: "#A1A1AA",
              borderRadius: "5px",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            <LogOut size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Operations Content Area */}
      <main className="admin-main-content" style={{ padding: "1.75rem 2.25rem", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: "1260px", margin: "0 auto" }}>
          
          {/* Executive Section Header Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingBottom: "1.25rem",
            marginBottom: "1.75rem",
            borderBottom: "1px solid var(--border-light)"
          }}>
            <div>
              <h1 style={{ fontSize: "1.45rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, color: "#141414" }}>
                {activeMeta.title}
              </h1>
              <p style={{ fontSize: "0.82rem", color: "#666660", margin: "0.2rem 0 0 0" }}>
                {activeMeta.subtitle}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.74rem",
                fontWeight: 600,
                color: "#166534",
                backgroundColor: "#EEF5F1",
                border: "1px solid #C6E3D3",
                padding: "0.3rem 0.65rem",
                borderRadius: "4px"
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16A34A" }} />
                Store Online
              </span>
            </div>
          </div>

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
