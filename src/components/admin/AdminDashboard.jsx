import React from "react";
import { useStore } from "../../context/StoreContext";
import { 
  Package, 
  MessageCircle, 
  TrendingUp, 
  ArrowRight, 
  IndianRupee,
  Layers
} from "lucide-react";

export const AdminDashboard = ({ onNavigate }) => {
  const { orders, products, settings, toggleStock } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const newInquiriesCount = orders.filter((o) => o.status === "New Inquiry").length;

  const outOfStockProducts = products.filter((p) => !p.inStock);
  const recentOrders = orders.slice(0, 6);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New Inquiry": return "admin-badge-new";
      case "Confirmed": return "admin-badge-confirmed";
      case "Packed": return "admin-badge-dispatched";
      case "Shipped": return "admin-badge-dispatched";
      case "Delivered": return "admin-badge-delivered";
      case "Cancelled": return "admin-badge-cancelled";
      default: return "admin-badge-new";
    }
  };

  const handleOpenCustomerWhatsApp = (e, order) => {
    e.stopPropagation();
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello ${order.customer.name}, updating you on your ${settings.storeName} order #${order.id}.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div>
      {/* Executive Quick Action Strip */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        <div style={{ fontSize: "0.84rem", color: "#52524E" }}>
          <strong style={{ color: "#141414" }}>{newInquiriesCount}</strong> pending inquiry orders waiting confirmation
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <button
            onClick={() => onNavigate("orders")}
            className="btn btn-primary btn-sm"
          >
            <Package size={14} />
            <span>Manage Orders ({totalOrdersCount})</span>
          </button>

          <button
            onClick={() => onNavigate("products")}
            className="btn btn-secondary btn-sm"
          >
            <span>Edit Catalog</span>
          </button>
        </div>
      </div>

      {/* 4 Clean Shopify/Stripe-Style KPI Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        marginBottom: "1.75rem"
      }} className="stats-grid">
        
        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#78756E", marginBottom: "0.45rem" }}>
              Gross Sales
            </div>
            <div className="tabular-nums" style={{ fontSize: "1.65rem", fontWeight: 700, color: "#141414" }}>
              {settings.currency}{totalRevenue.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.74rem", color: "#1E4D3B", marginTop: "0.25rem", fontWeight: 500 }}>
              COD & UPI checkouts
            </div>
          </div>
          <IndianRupee size={18} color="#78756E" />
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#78756E", marginBottom: "0.45rem" }}>
              Total Orders
            </div>
            <div className="tabular-nums" style={{ fontSize: "1.65rem", fontWeight: 700, color: "#141414" }}>
              {totalOrdersCount}
            </div>
            <div style={{ fontSize: "0.74rem", color: newInquiriesCount > 0 ? "#B45309" : "#78756E", marginTop: "0.25rem", fontWeight: 600 }}>
              {newInquiriesCount} awaiting action
            </div>
          </div>
          <Package size={18} color="#78756E" />
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#78756E", marginBottom: "0.45rem" }}>
              Avg. Order Value
            </div>
            <div className="tabular-nums" style={{ fontSize: "1.65rem", fontWeight: 700, color: "#141414" }}>
              {settings.currency}{averageOrderValue.toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "0.74rem", color: "#78756E", marginTop: "0.25rem" }}>
              Per verified checkout
            </div>
          </div>
          <TrendingUp size={18} color="#78756E" />
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#78756E", marginBottom: "0.45rem" }}>
              Active Formulations
            </div>
            <div className="tabular-nums" style={{ fontSize: "1.65rem", fontWeight: 700, color: "#141414" }}>
              {products.length}
            </div>
            <div style={{ fontSize: "0.74rem", color: outOfStockProducts.length > 0 ? "#DC2626" : "#1E4D3B", marginTop: "0.25rem", fontWeight: 500 }}>
              {outOfStockProducts.length > 0 ? `${outOfStockProducts.length} out of stock` : "All SKUs active"}
            </div>
          </div>
          <Layers size={18} color="#78756E" />
        </div>

      </div>

      {/* Main 2-Column Split: Recent Orders + Inventory Quick Toggles */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.45fr 0.65fr",
        gap: "1.5rem"
      }} className="dashboard-content-grid">
        
        {/* Left: Recent Orders Table */}
        <div className="admin-table-container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.15rem 1.25rem",
            borderBottom: "1px solid var(--border-light)"
          }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#141414" }}>
                Recent Orders
              </h3>
              <p style={{ fontSize: "0.76rem", color: "#78756E", margin: "2px 0 0 0" }}>
                Click any order to review address & tracking
              </p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.8rem",
                color: "#141414",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              <span>View all</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#78756E", fontSize: "0.86rem" }}>
              No orders placed yet. Storefront orders appear here immediately.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    onClick={() => onNavigate("orders")}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="tabular-nums" style={{ fontWeight: 700, color: "#141414" }}>
                      #{ord.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#141414" }}>{ord.customer?.name}</div>
                      <div style={{ fontSize: "0.74rem", color: "#78756E" }}>
                        {ord.customer?.city || "India"} · {ord.items?.length} item{ord.items?.length === 1 ? "" : "s"}
                      </div>
                    </td>
                    <td className="tabular-nums" style={{ fontWeight: 600, color: "#141414" }}>
                      {settings.currency}{(ord.total || 0).toLocaleString()}
                    </td>
                    <td>
                      <span className={`admin-badge ${getStatusBadgeClass(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={(e) => handleOpenCustomerWhatsApp(e, ord)}
                        className="btn btn-whatsapp-outline btn-sm"
                        title="Message customer on WhatsApp"
                      >
                        <MessageCircle size={13} />
                        <span>Chat</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right: Inventory Stock Watch */}
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.15rem 1.25rem",
            borderBottom: "1px solid var(--border-light)"
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#141414" }}>
              Stock Watch
            </h3>
            <button
              onClick={() => onNavigate("products")}
              style={{ fontSize: "0.78rem", color: "#52524E", fontWeight: 600, cursor: "pointer" }}
            >
              All SKUs
            </button>
          </div>

          <div style={{ padding: "0.85rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.65rem", overflowY: "auto", maxHeight: "420px" }}>
            {products.slice(0, 7).map((prod) => (
              <div
                key={prod.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.55rem 0.65rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#FAFAF8"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/products/serum-niacinamide.jpg"; }}
                    style={{ width: "36px", height: "36px", borderRadius: "3px", objectFit: "cover", backgroundColor: "#F5F4F0", flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#141414", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {prod.name}
                    </div>
                    <div className="tabular-nums" style={{ fontSize: "0.72rem", color: "#78756E" }}>
                      {settings.currency}{prod.price} · {prod.volume}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleStock(prod.id)}
                  style={{
                    padding: "0.25rem 0.55rem",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    flexShrink: 0,
                    backgroundColor: prod.inStock ? "#EEF5F1" : "#FEE2E2",
                    color: prod.inStock ? "#1E4D3B" : "#991B1B"
                  }}
                >
                  {prod.inStock ? "In Stock" : "Out"}
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
