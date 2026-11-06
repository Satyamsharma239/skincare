import React from "react";
import { useStore } from "../../context/StoreContext";
import { 
  DollarSign, 
  Package, 
  MessageCircle, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink,
  Clock,
  CheckCircle2,
  IndianRupee,
  Layers,
  ShoppingBag
} from "lucide-react";

export const AdminDashboard = ({ onNavigate }) => {
  const { orders, products, settings, toggleStock } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const newInquiriesCount = orders.filter((o) => o.status === "New Inquiry").length;

  const outOfStockProducts = products.filter((p) => !p.inStock);
  const recentOrders = orders.slice(0, 5);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New Inquiry": return "admin-badge-new";
      case "Confirmed": return "admin-badge-confirmed";
      case "Dispatched": return "admin-badge-dispatched";
      case "Delivered": return "admin-badge-delivered";
      case "Cancelled": return "admin-badge-cancelled";
      default: return "admin-badge-new";
    }
  };

  const handleOpenCustomerWhatsApp = (order) => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${order.customer.name}! This is from ${settings.storeName}. Regarding your skincare order #${order.id}...`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div>
      {/* Operational Control Bar (Shopify & Shiprocket Standard) */}
      <div style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "1rem 1.5rem",
        marginBottom: "1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#22C55E",
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.2)"
          }} />
          <div>
            <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {settings.storeName} — Live Store Operations
            </div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
              Storefront active on Port 5173 • Admin isolated on Port 5174 • Auto-syncing real-time
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => onNavigate("orders")}
            className="btn btn-primary btn-sm"
            style={{
              padding: "0.5rem 1.1rem",
              fontSize: "0.82rem",
              borderRadius: "var(--radius-sm)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <Package size={14} />
            <span>Process Orders ({orders.filter(o => o.status === "New Inquiry").length} New)</span>
          </button>

          <button
            onClick={() => onNavigate("settings")}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.82rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            Store Settings
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2rem"
      }} className="stats-grid">
        
        {/* Metric 1: Total Revenue */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
            <span>Total Revenue</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IndianRupee size={16} color="#C2410C" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: "0.25rem" }}>
            {settings.currency}{totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.76rem", color: "#166534", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 600 }}>
            <TrendingUp size={13} />
            <span>Across all direct checkouts</span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
            <span>Total Orders</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Package size={16} color="#2563EB" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: "0.25rem" }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: "0.76rem", color: newInquiriesCount > 0 ? "#DC2626" : "var(--text-muted)", fontWeight: 600 }}>
            {newInquiriesCount} requiring action
          </div>
        </div>

        {/* Metric 3: AOV */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
            <span>Avg Order Value (AOV)</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={16} color="#16A34A" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: "0.25rem" }}>
            {settings.currency}{averageOrderValue}
          </div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Boosted by value bundles
          </div>
        </div>

        {/* Metric 4: Formulations in Catalog */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
            <span>Active Formulations</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={16} color="#7C3AED" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: "0.25rem" }}>
            {products.length}
          </div>
          <div style={{ fontSize: "0.76rem", color: outOfStockProducts.length > 0 ? "#DC2626" : "#166534", fontWeight: 600 }}>
            {outOfStockProducts.length > 0 ? `${outOfStockProducts.length} Out of stock` : "● All formulations available"}
          </div>
        </div>

      </div>

      {/* Main 2-Column Section: Recent WhatsApp Orders & Stock Watch */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 0.6fr",
        gap: "1.75rem"
      }} className="dashboard-content-grid">
        
        {/* Left: Recent WhatsApp Orders */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: 0 }}>
                Recent WhatsApp Orders
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                Latest orders received from storefront customers
              </p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.82rem",
                color: "var(--accent-forest)",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              <span>Manage all ({orders.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              No orders placed yet. Place an order on the storefront to test!
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)" }}>
                    <th style={{ padding: "0.6rem 0.5rem" }}>Order</th>
                    <th style={{ padding: "0.6rem 0.5rem" }}>Customer</th>
                    <th style={{ padding: "0.6rem 0.5rem" }}>Items</th>
                    <th style={{ padding: "0.6rem 0.5rem" }}>Total</th>
                    <th style={{ padding: "0.6rem 0.5rem" }}>Status</th>
                    <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.85rem 0.5rem", fontWeight: 700, color: "var(--accent-forest)" }}>
                        #{ord.id}
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>
                        <div style={{ fontWeight: 600 }}>{ord.customer?.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ord.customer?.city}</div>
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>
                        {ord.items?.length} formulations
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem", fontWeight: 700 }}>
                        {settings.currency}{ord.total}
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>
                        <span className={`admin-badge ${getStatusBadgeClass(ord.status)}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem", textAlign: "right" }}>
                        <button
                          onClick={() => handleOpenCustomerWhatsApp(ord)}
                          className="btn btn-whatsapp-outline btn-sm"
                          title="Open WhatsApp chat with customer"
                        >
                          <MessageCircle size={14} />
                          <span>Chat</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Formulation Inventory Watch & Fast Stock Toggles */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
              Formulation Stock Watch
            </h3>
            <button
              onClick={() => onNavigate("products")}
              style={{ fontSize: "0.8rem", color: "var(--accent-forest)", fontWeight: 600, cursor: "pointer" }}
            >
              Catalog View
            </button>
          </div>

          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            1-Click toggle to mark stock availability live on the customer storefront.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto", maxHeight: "380px" }}>
            {products.slice(0, 6).map((prod) => (
              <div
                key={prod.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/serum-dropper.jpg"; }}
                    style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", objectFit: "cover", backgroundColor: "#F4F4F5" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {prod.name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {settings.currency}{prod.price} • {prod.volume}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleStock(prod.id)}
                  style={{
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: prod.inStock ? "#DCFCE7" : "#FEE2E2",
                    color: prod.inStock ? "#166534" : "#991B1B",
                    border: "none"
                  }}
                  title="Click to toggle availability"
                >
                  {prod.inStock ? "In Stock" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dashboard-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
