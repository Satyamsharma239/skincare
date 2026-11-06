import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { 
  Package, 
  MessageCircle, 
  Trash2, 
  Search, 
  MapPin, 
  Phone, 
  Printer, 
  CheckCircle2, 
  Clock, 
  FileText,
  User,
  Truck,
  Download,
  Copy,
  Table as TableIcon,
  LayoutGrid,
  CheckSquare,
  Square,
  DollarSign,
  AlertCircle
} from "lucide-react";

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder, settings, showToast } = useStore();
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // Compute key metrics
  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const newInquiries = orders.filter((o) => o.status === "New Inquiry").length;
    const confirmed = orders.filter((o) => o.status === "Confirmed").length;
    const shipped = orders.filter((o) => o.status === "Shipped" || o.status === "Packed").length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;
    return { totalRevenue, newInquiries, confirmed, shipped, delivered, totalOrders: orders.length };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (paymentFilter === "COD" && !o.paymentMethod?.includes("COD")) return false;
      if (paymentFilter === "UPI" && !o.paymentMethod?.includes("UPI")) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = o.id?.toLowerCase().includes(q);
        const matchName = o.customer?.name?.toLowerCase().includes(q);
        const matchPhone = o.customer?.phone?.includes(q);
        const matchCity = o.customer?.city?.toLowerCase().includes(q);
        const matchPincode = o.customer?.pincode?.includes(q);
        if (!matchId && !matchName && !matchPhone && !matchCity && !matchPincode) return false;
      }
      return true;
    });
  }, [orders, statusFilter, paymentFilter, searchQuery]);

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

  // 1-Click WhatsApp Direct Actions with specialized templates
  const sendWhatsAppUpdate = (order, type = "general") => {
    const cleanPhone = order.customer?.phone?.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      showToast("No valid phone number for customer", "warning");
      return;
    }

    let text = "";
    if (type === "confirm") {
      text = encodeURIComponent(
        `Hello ${order.customer.name}! 🌿 Your skincare order #${order.id} for ${settings.currency}${order.total} has been *CONFIRMED* by ${settings.storeName}.\n\nOur cleanroom lab is now packing your fresh formulation batch. Estimated delivery to ${order.customer.city}: ${order.estimatedDays || "2 - 3 Days"}. Thank you!`
      );
    } else if (type === "ship") {
      const awb = order.awbTrackingNumber || `BLUEDART-${Math.floor(10000000 + Math.random() * 90000000)}`;
      text = encodeURIComponent(
        `📦 *DISPATCH UPDATE #${order.id}*\nHello ${order.customer.name}! Your package has been dispatched via *${order.courier || "BlueDart Express"}*.\n\n• Tracking / AWB: *${awb}*\n• Courier: ${order.courier || "Delhivery Air"}\n• Mode: ${order.paymentMethod}\n\nFeel free to message here for any formulation guidance!`
      );
    } else {
      text = encodeURIComponent(
        `Hello ${order.customer.name}! 🌿 This is ${settings.storeName} regarding your order #${order.id}...`
      );
    }

    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const handleCopyReceipt = (order) => {
    const lines = [
      `🌿 *${settings.storeName.toUpperCase()} — ORDER #${order.id}*`,
      `Customer: ${order.customer?.name} (${order.customer?.phone})`,
      `Address: ${order.customer?.address}, ${order.customer?.city}, ${order.customer?.state} - ${order.customer?.pincode}`,
      `Payment: ${order.paymentMethod}`,
      `Status: ${order.status}`,
      `Total: ${settings.currency}${order.total}`,
      `Items:`,
      ...(order.items?.map((it) => `• ${it.quantity}x ${it.name} (${settings.currency}${it.price * it.quantity})`) || [])
    ];
    navigator.clipboard?.writeText(lines.join("\n"));
    showToast(`Order #${order.id} summary copied! Ready to paste in WhatsApp.`, "success");
  };

  const handlePrintSlip = (order) => {
    setSelectedOrderForInvoice(order);
  };

  // Bulk selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const toggleSelectOrder = (id) => {
    setSelectedOrderIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedOrderIds.length === 0) return;
    selectedOrderIds.forEach((id) => {
      updateOrderStatus(id, newStatus);
    });
    showToast(`Updated ${selectedOrderIds.length} orders to '${newStatus}'`, "success");
    setSelectedOrderIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedOrderIds.length === 0) return;
    if (window.confirm(`Delete ${selectedOrderIds.length} selected orders permanently?`)) {
      selectedOrderIds.forEach((id) => {
        deleteOrder(id);
      });
      showToast(`Deleted ${selectedOrderIds.length} orders`, "info");
      setSelectedOrderIds([]);
    }
  };

  // CSV Export Feature
  const handleExportCSV = () => {
    if (orders.length === 0) {
      showToast("No orders available to export", "warning");
      return;
    }

    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Phone",
      "Address",
      "City",
      "State",
      "Pincode",
      "Items Count",
      "Items Detail",
      "Subtotal",
      "Discount",
      "Shipping",
      "Total Amount",
      "Payment Mode",
      "Courier",
      "Status",
      "Customer Note"
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleDateString("en-IN")}"`,
      `"${(o.customer?.name || "").replace(/"/g, '""')}"`,
      `"${o.customer?.phone || ""}"`,
      `"${(o.customer?.address || "").replace(/"/g, '""')}"`,
      `"${o.customer?.city || ""}"`,
      `"${o.customer?.state || ""}"`,
      `"${o.customer?.pincode || ""}"`,
      o.items?.length || 0,
      `"${(o.items?.map((it) => `${it.quantity}x ${it.name}`).join("; ") || "").replace(/"/g, '""')}"`,
      o.subtotal || 0,
      o.discountAmount || 0,
      o.shippingFee || 0,
      o.total || 0,
      `"${o.paymentMethod || ""}"`,
      `"${o.courier || "BlueDart Express"}"`,
      `"${o.status}"`,
      `"${(o.customer?.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `lumera_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Orders exported successfully as CSV!", "success");
  };

  return (
    <div>
      {/* 1. Metric Overview Cards (Shopify / Amazon Seller Style) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "1.75rem"
      }}>
        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>
              Total Orders
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
              {metrics.totalOrders}
            </div>
          </div>
          <Package size={28} color="var(--accent-clay)" />
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>
              Gross Revenue
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
              {settings.currency}{metrics.totalRevenue.toLocaleString("en-IN")}
            </div>
          </div>
          <DollarSign size={28} color="#15803D" />
        </div>

        <div className="admin-stat-card" style={{ borderLeft: "4px solid #D97706" }}>
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#92400E", fontWeight: 600 }}>
              New Inquiries (Action Req.)
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#92400E", marginTop: "2px" }}>
              {metrics.newInquiries}
            </div>
          </div>
          <AlertCircle size={28} color="#D97706" />
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>
              Dispatched / In Transit
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
              {metrics.shipped}
            </div>
          </div>
          <Truck size={28} color="#2563EB" />
        </div>
      </div>

      {/* 2. Top Controls Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "1.25rem",
        backgroundColor: "#FFFFFF",
        padding: "1rem 1.25rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-light)"
      }}>
        {/* Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-sm)",
          padding: "0.45rem 0.85rem",
          width: "300px"
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Order ID, name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "0.85rem", width: "100%", backgroundColor: "transparent" }}
          />
        </div>

        {/* View Switcher & Export */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* View Mode Toggle */}
          <div style={{
            display: "inline-flex",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-sm)",
            padding: "2px",
            border: "1px solid var(--border-medium)"
          }}>
            <button
              onClick={() => setViewMode("table")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.8rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: viewMode === "table" ? "#FFFFFF" : "transparent",
                color: viewMode === "table" ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: viewMode === "table" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}
            >
              <TableIcon size={14} />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.8rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                backgroundColor: viewMode === "cards" ? "#FFFFFF" : "transparent",
                color: viewMode === "cards" ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: viewMode === "cards" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}
            >
              <LayoutGrid size={14} />
              <span>Cards</span>
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            title="Download full orders spreadsheet"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3. Status & Payment Filter Tabs */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
        marginBottom: "1.25rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          overflowX: "auto",
          scrollbarWidth: "none"
        }}>
          {["All", "New Inquiry", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"].map((st) => {
            const count = st === "All" ? orders.length : orders.filter((o) => o.status === st).length;
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: "0.45rem 0.95rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? "var(--text-primary)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                  border: isSelected ? "1px solid var(--text-primary)" : "1px solid var(--border-medium)",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                <span>{st}</span>
                <span style={{
                  marginLeft: "0.4rem",
                  fontSize: "0.75rem",
                  opacity: isSelected ? 0.9 : 0.6
                }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Payment Filter Segmented Toggle */}
        <div style={{
          display: "inline-flex",
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-sm)",
          padding: "2px"
        }}>
          {[
            { id: "All", label: "All Payment" },
            { id: "COD", label: `COD (${orders.filter(o => o.paymentMethod?.includes("COD")).length})` },
            { id: "UPI", label: `UPI (${orders.filter(o => o.paymentMethod?.includes("UPI")).length})` }
          ].map((pm) => (
            <button
              key={pm.id}
              onClick={() => setPaymentFilter(pm.id)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.76rem",
                fontWeight: paymentFilter === pm.id ? 700 : 500,
                backgroundColor: paymentFilter === pm.id ? "#18181B" : "transparent",
                color: paymentFilter === pm.id ? "#FFFFFF" : "var(--text-secondary)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {pm.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Bulk Action Bar (when orders are checked) */}
      {selectedOrderIds.length > 0 && (
        <div style={{
          backgroundColor: "#F0FDF4",
          border: "1px solid #BBF7D0",
          borderRadius: "var(--radius-sm)",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          animation: "fadeIn 0.2s ease"
        }}>
          <div style={{ fontSize: "0.86rem", fontWeight: 600, color: "#166534" }}>
            {selectedOrderIds.length} order(s) selected:
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              onClick={() => handleBulkStatusChange("Confirmed")}
              className="btn btn-whatsapp-outline btn-sm"
            >
              Mark as Confirmed
            </button>
            <button
              onClick={() => handleBulkStatusChange("Shipped")}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Mark as Shipped
            </button>
            <button
              onClick={() => handleBulkStatusChange("Delivered")}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Mark as Delivered
            </button>
            <button
              onClick={handleBulkDelete}
              className="btn btn-secondary btn-sm"
              style={{ color: "#DC2626", borderColor: "#FCA5A5", backgroundColor: "#FFFFFF" }}
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* 5. Main Orders Feed / Table */}
      {filteredOrders.length === 0 ? (
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "3.5rem 1rem",
          textAlign: "center",
          border: "1px dashed var(--border-medium)"
        }}>
          <Package size={40} color="var(--text-muted)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.3rem" }}>
            No orders found
          </h4>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Try selecting a different filter status or clearing the search query.
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW (Shopify / Amazon Seller Style) */
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "36px" }}>
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>WhatsApp Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => {
                const isSelected = selectedOrderIds.includes(ord.id);
                return (
                  <tr key={ord.id} style={{ backgroundColor: isSelected ? "#F0FDF4" : "inherit" }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOrder(ord.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <strong style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        #{ord.id}
                      </strong>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {ord.courier || "BlueDart Air"}
                      </div>
                    </td>
                    <td style={{ whiteSpace: "nowrap", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short"
                      })}
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {new Date(ord.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        {ord.customer?.name}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                        {ord.customer?.phone} • {ord.customer?.city || "India"}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", maxWidth: "240px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {ord.items?.map((it) => `${it.quantity}x ${it.name}`).join(", ")}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {ord.items?.length || 0} formulation(s)
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>
                        {settings.currency}{ord.total}
                      </strong>
                      {ord.discountAmount > 0 && (
                        <div style={{ fontSize: "0.7rem", color: "var(--accent-clay)", fontWeight: 600 }}>
                          Save {settings.currency}{ord.discountAmount}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                        {ord.paymentMethod?.includes("COD") ? "COD" : "UPI"}
                      </span>
                    </td>
                    <td>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className={`admin-badge ${getStatusBadgeClass(ord.status)}`}
                        style={{
                          border: "none",
                          fontWeight: 700,
                          fontSize: "0.76rem",
                          borderRadius: "var(--radius-xs)",
                          cursor: "pointer",
                          padding: "0.3rem 0.5rem",
                          outline: "none"
                        }}
                      >
                        <option value="New Inquiry">New Inquiry</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                        <button
                          onClick={() => sendWhatsAppUpdate(ord, "confirm")}
                          className="btn btn-whatsapp-outline btn-sm"
                          style={{ padding: "0.3rem 0.55rem", fontSize: "0.74rem" }}
                          title="Send Order Confirmation on WhatsApp"
                        >
                          <CheckCircle2 size={12} />
                          <span>Confirm</span>
                        </button>

                        <button
                          onClick={() => sendWhatsAppUpdate(ord, "ship")}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.3rem 0.55rem", fontSize: "0.74rem" }}
                          title="Send Courier AWB on WhatsApp"
                        >
                          <Truck size={12} />
                          <span>AWB</span>
                        </button>

                        <button
                          onClick={() => handleCopyReceipt(ord)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.3rem 0.45rem" }}
                          title="Copy WhatsApp Receipt to Clipboard"
                        >
                          <Copy size={12} />
                        </button>

                        <button
                          onClick={() => handlePrintSlip(ord)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.3rem 0.45rem" }}
                          title="Print GST Tax Invoice"
                        >
                          <Printer size={12} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete order #${ord.id}?`)) {
                              deleteOrder(ord.id);
                            }
                          }}
                          style={{ color: "var(--text-muted)", padding: "0.3rem", cursor: "pointer" }}
                          title="Delete order"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* DETAILED CARDS VIEW */
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-card)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}
            >
              {/* Order Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                borderBottom: "1px solid var(--border-light)",
                paddingBottom: "1rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      #{ord.id}
                    </span>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Placed: {new Date(ord.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })} • Route: <strong>{ord.courier || "BlueDart Express"}</strong>
                    </div>
                  </div>

                  <span className={`admin-badge ${getStatusBadgeClass(ord.status)}`}>
                    {ord.status}
                  </span>
                </div>

                {/* Status Switcher & WhatsApp Customer Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      style={{
                        padding: "0.35rem 0.65rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-medium)",
                        backgroundColor: "#fff",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => sendWhatsAppUpdate(ord, "confirm")}
                    className="btn btn-whatsapp-outline btn-sm"
                    title="Send Order Confirmation WhatsApp"
                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.6rem" }}
                  >
                    <CheckCircle2 size={13} color="#166534" />
                    <span>Send Confirm</span>
                  </button>

                  <button
                    onClick={() => sendWhatsAppUpdate(ord, "ship")}
                    className="btn btn-whatsapp-outline btn-sm"
                    title="Send Courier AWB Tracking Link"
                    style={{ fontSize: "0.76rem", padding: "0.35rem 0.6rem" }}
                  >
                    <Truck size={13} color="#166534" />
                    <span>Send AWB</span>
                  </button>

                  <button
                    onClick={() => handleCopyReceipt(ord)}
                    className="btn btn-secondary btn-sm"
                    title="Copy WhatsApp Message"
                  >
                    <Copy size={13} />
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={() => handlePrintSlip(ord)}
                    className="btn btn-secondary btn-sm"
                    title="Print Dispatch Slip & GST Invoice"
                  >
                    <Printer size={14} />
                    <span>Print Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete order record #${ord.id}?`)) {
                        deleteOrder(ord.id);
                      }
                    }}
                    style={{ color: "var(--text-muted)", padding: "0.4rem", cursor: "pointer" }}
                    title="Delete order"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Order Details Body: 2 Columns */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "1.5rem"
              }}>
                {/* Left: Customer & Delivery Address */}
                <div style={{
                  backgroundColor: "var(--bg-primary)",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem"
                }}>
                  <div style={{ fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                    Customer & Shipping Details
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <User size={15} color="var(--accent-clay)" />
                    <strong>{ord.customer?.name}</strong>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <Phone size={15} color="var(--accent-clay)" />
                    <span>{ord.customer?.phone}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    <MapPin size={15} color="var(--accent-clay)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>
                      {ord.customer?.address}, {ord.customer?.city}, {ord.customer?.state} - <strong>{ord.customer?.pincode}</strong>
                    </span>
                  </div>

                  {ord.customer?.notes && (
                    <div style={{ borderTop: "1px dashed var(--border-medium)", paddingTop: "0.4rem", marginTop: "0.4rem", fontSize: "0.8rem", color: "var(--accent-clay)" }}>
                      <strong>Skin Condition / Note:</strong> {ord.customer.notes}
                    </div>
                  )}

                  <div style={{ marginTop: "0.6rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Payment Method: <strong style={{ color: "var(--text-primary)" }}>{ord.paymentMethod}</strong>
                  </div>
                </div>

                {/* Right: Items Ordered & Financial Total */}
                <div style={{ fontSize: "0.85rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                    Items Ordered ({ord.items?.length})
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.75rem" }}>
                    {ord.items?.map((it, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong>{it.quantity}x</strong> {it.name} <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>({it.size})</span>
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {settings.currency}{it.quantity * it.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary row */}
                  <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.25rem", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Subtotal</span>
                      <span>{settings.currency}{ord.subtotal}</span>
                    </div>

                    {ord.discountAmount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-clay)", fontWeight: 600 }}>
                        <span>Discount ({ord.discountCode})</span>
                        <span>-{settings.currency}{ord.discountAmount}</span>
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Express Shipping ({ord.courier || "BlueDart"})</span>
                      <span>{ord.shippingFee === 0 ? "FREE" : `${settings.currency}${ord.shippingFee}`}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", borderTop: "1px solid var(--border-light)", paddingTop: "0.4rem", marginTop: "0.2rem" }}>
                      <span>Total (Inclusive of 18% GST):</span>
                      <span>{settings.currency}{ord.total}</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Printable Invoice & Packing Slip Modal */}
      {selectedOrderForInvoice && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
          }}
          onClick={() => setSelectedOrderForInvoice(null)}
          className="invoice-modal-backdrop"
        >
          <div 
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
              border: "1px solid var(--border-medium)"
            }}
            onClick={(e) => e.stopPropagation()}
            className="printable-invoice"
          >
            {/* Modal Actions Bar (hidden during print) */}
            <div 
              className="no-print"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--border-light)",
                backgroundColor: "#F9FAFB"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={18} color="#C2410C" />
                <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                  GST Tax Invoice & Shipping Slip — #{selectedOrderForInvoice.id}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => window.print()}
                  className="btn btn-primary btn-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 1rem",
                    fontSize: "0.82rem"
                  }}
                >
                  <Printer size={15} />
                  <span>Print Thermal Slip / PDF</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForInvoice(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem",
                    color: "var(--text-muted)"
                  }}
                  aria-label="Close invoice"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Actual Printable Invoice Content */}
            <div style={{ padding: "2rem", fontFamily: "var(--font-sans)", color: "#111" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #18181B", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: "1.7rem", fontFamily: "var(--font-display)", fontWeight: 800 }}>{settings.storeName}</h1>
                  <p style={{ margin: "3px 0 0 0", fontSize: "0.86rem", color: "#4B5563" }}>Clinical Dermatological Formulations • Cleanroom Dispatch</p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem", color: "#6B7280" }}>GSTIN: 29AABCU9603R1ZM • HSN Category: 330499</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#18181B" }}>TAX INVOICE & DISPATCH SLIP</h2>
                  <p style={{ margin: "3px 0 0 0", fontSize: "0.86rem" }}>Invoice: <strong>INV-{selectedOrderForInvoice.id}</strong></p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem" }}>Date: {new Date(selectedOrderForInvoice.createdAt).toLocaleDateString("en-IN")}</p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem" }}>AWB: <strong>{selectedOrderForInvoice.awbTrackingNumber || "PENDING"}</strong></p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.75rem" }}>
                <div style={{ border: "1px solid #E5E7EB", padding: "1rem", borderRadius: "6px", backgroundColor: "#F9FAFB" }}>
                  <h4 style={{ margin: "0 0 0.5rem 0", textTransform: "uppercase", fontSize: "0.76rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.05em" }}>Consignee / Deliver To:</h4>
                  <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>{selectedOrderForInvoice.customer?.name}</p>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.84rem", color: "#374151" }}>Phone: <strong>{selectedOrderForInvoice.customer?.phone}</strong></p>
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "#4B5563", lineHeight: 1.4 }}>
                    {selectedOrderForInvoice.customer?.address}, {selectedOrderForInvoice.customer?.city}, {selectedOrderForInvoice.customer?.state} - <strong>{selectedOrderForInvoice.customer?.pincode}</strong>
                  </p>
                </div>

                <div style={{ border: "1px solid #E5E7EB", padding: "1rem", borderRadius: "6px", backgroundColor: "#F9FAFB" }}>
                  <h4 style={{ margin: "0 0 0.5rem 0", textTransform: "uppercase", fontSize: "0.76rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.05em" }}>Fulfillment & Logistics:</h4>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.84rem" }}>Courier: <strong>{selectedOrderForInvoice.courier || "Delhivery Express"}</strong></p>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.84rem" }}>Payment Mode: <strong style={{ color: selectedOrderForInvoice.paymentMethod?.includes("COD") ? "#C2410C" : "#16A34A" }}>{selectedOrderForInvoice.paymentMethod}</strong></p>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.84rem" }}>Order Status: <strong>{selectedOrderForInvoice.status}</strong></p>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#6B7280" }}>Note: {selectedOrderForInvoice.customer?.notes || "Fragile cosmetic bottles, handle with care"}</p>
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #E5E7EB", textAlign: "left" }}>
                    <th style={{ padding: "0.6rem 0.75rem", fontWeight: 700 }}>Item Description</th>
                    <th style={{ padding: "0.6rem 0.75rem", fontWeight: 700 }}>HSN</th>
                    <th style={{ padding: "0.6rem 0.75rem", fontWeight: 700, textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "0.6rem 0.75rem", fontWeight: 700, textAlign: "right" }}>Unit Price</th>
                    <th style={{ padding: "0.6rem 0.75rem", fontWeight: 700, textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderForInvoice.items?.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "0.65rem 0.75rem", fontWeight: 600 }}>{it.name} <span style={{ color: "#6B7280", fontWeight: 400 }}>({it.size})</span></td>
                      <td style={{ padding: "0.65rem 0.75rem", color: "#6B7280" }}>330499</td>
                      <td style={{ padding: "0.65rem 0.75rem", textAlign: "center" }}>{it.quantity}</td>
                      <td style={{ padding: "0.65rem 0.75rem", textAlign: "right" }}>{settings.currency}{it.price}</td>
                      <td style={{ padding: "0.65rem 0.75rem", textAlign: "right", fontWeight: 600 }}>{settings.currency}{it.quantity * it.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "320px", lineHeight: "1.8", fontSize: "0.88rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#4B5563" }}>
                    <span>Subtotal:</span>
                    <span>{settings.currency}{selectedOrderForInvoice.subtotal}</span>
                  </div>
                  {selectedOrderForInvoice.discountAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#C2410C", fontWeight: 600 }}>
                      <span>Discount ({selectedOrderForInvoice.discountCode}):</span>
                      <span>-{settings.currency}{selectedOrderForInvoice.discountAmount}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#4B5563" }}>
                    <span>Courier Delivery:</span>
                    <span>{selectedOrderForInvoice.shippingFee === 0 ? "FREE" : `${settings.currency}${selectedOrderForInvoice.shippingFee}`}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.15rem", borderTop: "2px solid #18181B", paddingTop: "6px", marginTop: "4px" }}>
                    <span>Total Amount:</span>
                    <span>{settings.currency}{selectedOrderForInvoice.total}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280", textAlign: "right" }}>
                    (Includes 18% IGST ₹{Math.round((selectedOrderForInvoice.total * 18) / 118)})
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2.5rem", borderTop: "1px dashed #D1D5DB", paddingTop: "1rem", fontSize: "0.78rem", color: "#6B7280", textAlign: "center" }}>
                Thank you for ordering with LUMÈRA Clinical Skincare. Direct WhatsApp Support: {settings.whatsappDisplayNumber}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
