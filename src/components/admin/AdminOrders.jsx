import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { lookupPincode } from "../../data/pincodeData";
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
  AlertCircle,
  Edit,
  Plus,
  X,
  Save,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Check
} from "lucide-react";

const COURIER_OPTIONS = [
  "BlueDart Express Air",
  "Delhivery Surface Express",
  "Delhivery Air Express",
  "DTDC Priority Express",
  "India Post Speed Post",
  "Shadowfax E-Commerce",
  "Xpressbees Air"
];

const ORDER_STATUS_STEPS = [
  { id: "New Inquiry", label: "1. New Inquiry", color: "#D97706", bg: "#FEF3C7" },
  { id: "Confirmed", label: "2. Confirmed", color: "#2563EB", bg: "#EFF6FF" },
  { id: "Packed", label: "3. Cleanroom Packed", color: "#7C3AED", bg: "#F5F3FF" },
  { id: "Shipped", label: "4. Shipped / In Transit", color: "#C2410C", bg: "#FFF7ED" },
  { id: "Delivered", label: "5. Delivered", color: "#16A34A", bg: "#F0FDF4" },
  { id: "Cancelled", label: "Cancelled / Returned", color: "#DC2626", bg: "#FEF2F2" }
];

export const AdminOrders = () => {
  const { 
    orders, 
    updateOrderStatus, 
    updateOrder, 
    createManualOrder, 
    deleteOrder, 
    products, 
    settings, 
    showToast 
  } = useStore();

  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // Order Details & Edit Modal State
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // Manual Order Creation Modal State
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [manualCustomer, setManualCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
    paymentMethod: "Cash on Delivery (COD)",
    paymentStatus: "Pending on Delivery",
    courier: "BlueDart Express Air"
  });
  const [manualItems, setManualItems] = useState([]);
  const [selectedManualProdId, setSelectedManualProdId] = useState("");
  const [manualProdQty, setManualProdQty] = useState(1);
  const [manualDiscount, setManualDiscount] = useState(0);

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
    } else if (type === "delivered") {
      text = encodeURIComponent(
        `✨ *DELIVERY COMPLETED #${order.id}*\nHello ${order.customer.name}! Your ${settings.storeName} order has been successfully delivered. We hope you enjoy your active skincare routine! Please message us here if you have any questions regarding your AM/PM regimen.`
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

  // Open Edit Order Modal
  const handleOpenEditOrder = (order) => {
    setSelectedOrderForEdit(order);
    setEditFormData({
      status: order.status || "New Inquiry",
      courier: order.courier || "BlueDart Express Air",
      awbTrackingNumber: order.awbTrackingNumber || "",
      estimatedDays: order.estimatedDays || "2 - 3 Business Days",
      trackingUrl: order.trackingUrl || "",
      paymentMethod: order.paymentMethod || "Cash on Delivery / UPI",
      paymentStatus: order.paymentStatus || (order.paymentMethod?.includes("Prepaid") ? "Paid & Verified" : "Pending on Delivery"),
      customerName: order.customer?.name || "",
      customerPhone: order.customer?.phone || "",
      customerAddress: order.customer?.address || "",
      customerCity: order.customer?.city || "",
      customerState: order.customer?.state || "",
      customerPincode: order.customer?.pincode || "",
      customerNotes: order.customer?.notes || "",
      adminNotes: order.adminNotes || ""
    });
  };

  // Handle Edit Pincode auto-lookup
  const handleEditPincodeChange = (pin) => {
    setEditFormData((prev) => {
      const updated = { ...prev, customerPincode: pin };
      if (pin.trim().length === 6) {
        const info = lookupPincode(pin);
        if (info.serviceable) {
          updated.customerCity = info.city;
          updated.customerState = info.state;
          if (info.courier) updated.courier = info.courier;
          if (info.estimatedDays) updated.estimatedDays = info.estimatedDays;
        }
      }
      return updated;
    });
  };

  // Save Order Updates
  const handleSaveOrderEdit = (e) => {
    e.preventDefault();
    if (!selectedOrderForEdit || !editFormData) return;

    const updatedFields = {
      status: editFormData.status,
      courier: editFormData.courier,
      awbTrackingNumber: editFormData.awbTrackingNumber,
      estimatedDays: editFormData.estimatedDays,
      trackingUrl: editFormData.trackingUrl,
      paymentMethod: editFormData.paymentMethod,
      paymentStatus: editFormData.paymentStatus,
      adminNotes: editFormData.adminNotes,
      customer: {
        ...selectedOrderForEdit.customer,
        name: editFormData.customerName,
        phone: editFormData.customerPhone,
        address: editFormData.customerAddress,
        city: editFormData.customerCity,
        state: editFormData.customerState,
        pincode: editFormData.customerPincode,
        notes: editFormData.customerNotes
      }
    };

    updateOrder(selectedOrderForEdit.id, updatedFields);
    setSelectedOrderForEdit(null);
    setEditFormData(null);
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
      "AWB Number",
      "Status",
      "Admin Notes"
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
      `"${o.awbTrackingNumber || ""}"`,
      `"${o.status}"`,
      `"${(o.adminNotes || "").replace(/"/g, '""')}"`
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

  // Manual Order Management Handlers
  const handleOpenCreateOrder = () => {
    setManualCustomer({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
      paymentMethod: "Cash on Delivery (COD)",
      paymentStatus: "Pending on Delivery",
      courier: "BlueDart Express Air"
    });
    setManualItems(products.slice(0, 1).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: 1,
      size: p.volume || "30ml",
      hsn: "330499"
    })));
    setSelectedManualProdId(products[0]?.id || "");
    setManualProdQty(1);
    setManualDiscount(0);
    setIsCreateOrderOpen(true);
  };

  const handleManualPincodeChange = (pin) => {
    setManualCustomer((prev) => {
      const updated = { ...prev, pincode: pin };
      if (pin.trim().length === 6) {
        const info = lookupPincode(pin);
        if (info.serviceable) {
          updated.city = info.city;
          updated.state = info.state;
          if (info.courier) updated.courier = info.courier;
        }
      }
      return updated;
    });
  };

  const handleAddManualItem = () => {
    const prod = products.find((p) => p.id === selectedManualProdId);
    if (!prod) return;

    setManualItems((prev) => {
      const exists = prev.find((it) => it.id === prod.id);
      if (exists) {
        return prev.map((it) => it.id === prod.id ? { ...it, quantity: it.quantity + Number(manualProdQty) } : it);
      }
      return [
        ...prev,
        {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          quantity: Number(manualProdQty) || 1,
          size: prod.volume || "Standard",
          hsn: "330499"
        }
      ];
    });
  };

  const handleRemoveManualItem = (prodId) => {
    setManualItems((prev) => prev.filter((it) => it.id !== prodId));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCustomer.name.trim() || !manualCustomer.phone.trim()) {
      showToast("Please enter customer name and phone", "warning");
      return;
    }
    if (manualItems.length === 0) {
      showToast("Please add at least 1 product formulation", "warning");
      return;
    }

    const subtotal = manualItems.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const disc = Number(manualDiscount) || 0;
    const discountedSubtotal = Math.max(0, subtotal - disc);
    const shippingFee = discountedSubtotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
    const total = discountedSubtotal + shippingFee;

    const newOrderData = {
      customer: {
        name: manualCustomer.name.trim(),
        phone: manualCustomer.phone.trim(),
        address: manualCustomer.address.trim(),
        city: manualCustomer.city.trim() || "India",
        state: manualCustomer.state.trim() || "India",
        pincode: manualCustomer.pincode.trim(),
        notes: manualCustomer.notes.trim()
      },
      items: manualItems,
      subtotal,
      discountCode: disc > 0 ? "MANUAL_DISCOUNT" : "",
      discountAmount: disc,
      shippingFee,
      total,
      gstInclusiveAmount: Math.round((total * 18) / 118),
      courier: manualCustomer.courier || "BlueDart Express Air",
      estimatedDays: "2 - 3 Business Days",
      paymentMethod: manualCustomer.paymentMethod,
      paymentStatus: manualCustomer.paymentStatus,
      status: "Confirmed",
      adminNotes: "Manually entered order via Admin Operations Portal"
    };

    createManualOrder(newOrderData);
    setIsCreateOrderOpen(false);
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
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#D97706", fontWeight: 700 }}>
              Pending Inquiries
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#D97706", marginTop: "2px" }}>
              {metrics.newInquiries}
            </div>
          </div>
          <Clock size={28} color="#D97706" />
        </div>

        <div className="admin-stat-card" style={{ borderLeft: "4px solid #2563EB" }}>
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#2563EB", fontWeight: 700 }}>
              Confirmed & Packed
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#2563EB", marginTop: "2px" }}>
              {metrics.confirmed}
            </div>
          </div>
          <CheckCircle2 size={28} color="#2563EB" />
        </div>

        <div className="admin-stat-card" style={{ borderLeft: "4px solid #16A34A" }}>
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#16A34A", fontWeight: 700 }}>
              Delivered
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#16A34A", marginTop: "2px" }}>
              {metrics.delivered}
            </div>
          </div>
          <Truck size={28} color="#16A34A" />
        </div>
      </div>

      {/* 2. Top Controls & Action Bar */}
      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        padding: "1rem 1.25rem",
        marginBottom: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid var(--border-light)"
      }}>
        {/* Live Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          backgroundColor: "var(--bg-secondary)",
          padding: "0.55rem 0.95rem",
          borderRadius: "var(--radius-sm)",
          width: "320px",
          border: "1px solid var(--border-medium)"
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Order ID, name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "0.85rem", width: "100%", backgroundColor: "transparent" }}
          />
          {searchQuery && (
            <X size={14} style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => setSearchQuery("")} />
          )}
        </div>

        {/* View Switcher, Create Order, Export */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Create Manual Order Button */}
          <button
            onClick={handleOpenCreateOrder}
            className="btn btn-primary btn-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              backgroundColor: "#15803D",
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700
            }}
            title="Create new manual order from WhatsApp, call or walk-in"
          >
            <Plus size={15} />
            <span>+ Create Order</span>
          </button>

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
              onClick={() => handleBulkStatusChange("Packed")}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              Mark as Packed
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
        /* TABLE VIEW */
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
                <th style={{ textAlign: "right" }}>Management & Actions</th>
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
                      <span 
                        onClick={() => handleOpenEditOrder(ord)}
                        style={{ 
                          color: "var(--text-primary)", 
                          fontSize: "0.9rem", 
                          fontWeight: 700, 
                          cursor: "pointer", 
                          textDecoration: "underline",
                          display: "inline-block" 
                        }}
                        title="Click to view & edit full order details"
                      >
                        #{ord.id}
                      </span>
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
                      <div 
                        onClick={() => handleOpenEditOrder(ord)} 
                        style={{ fontWeight: 600, color: "var(--text-primary)", cursor: "pointer" }}
                        title="Click to manage order"
                      >
                        {ord.customer?.name}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                        {ord.customer?.phone} • {ord.customer?.city || "India"}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", maxWidth: "220px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
                        {/* Manage / Edit Button */}
                        <button
                          onClick={() => handleOpenEditOrder(ord)}
                          className="btn btn-primary btn-sm"
                          style={{
                            padding: "0.3rem 0.65rem",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem"
                          }}
                          title="Manage Order, Address, Courier & Status"
                        >
                          <Edit size={12} />
                          <span>Manage</span>
                        </button>

                        <button
                          onClick={() => sendWhatsAppUpdate(ord, "confirm")}
                          className="btn btn-whatsapp-outline btn-sm"
                          style={{ padding: "0.3rem 0.5rem", fontSize: "0.74rem" }}
                          title="Send Order Confirmation on WhatsApp"
                        >
                          <CheckCircle2 size={12} />
                          <span>Confirm</span>
                        </button>

                        <button
                          onClick={() => sendWhatsAppUpdate(ord, "ship")}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.3rem 0.5rem", fontSize: "0.74rem" }}
                          title="Send Courier AWB on WhatsApp"
                        >
                          <Truck size={12} />
                          <span>AWB</span>
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
                    <span 
                      onClick={() => handleOpenEditOrder(ord)}
                      style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", cursor: "pointer", textDecoration: "underline" }}
                    >
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
                  <button
                    onClick={() => handleOpenEditOrder(ord)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "0.78rem", padding: "0.4rem 0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <Edit size={13} />
                    <span>Manage Order</span>
                  </button>

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
                      <strong>Customer Note:</strong> {ord.customer?.notes}
                    </div>
                  )}

                  {ord.adminNotes && (
                    <div style={{ backgroundColor: "#FEF3C7", padding: "0.4rem 0.6rem", borderRadius: "4px", marginTop: "0.5rem", fontSize: "0.78rem", color: "#92400E" }}>
                      <strong>Internal Staff Note:</strong> {ord.adminNotes}
                    </div>
                  )}
                </div>

                {/* Right: Items & Order Totals */}
                <div style={{
                  backgroundColor: "var(--bg-primary)",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                      Items & Payment ({ord.paymentMethod})
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.75rem" }}>
                      {ord.items?.map((it, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                          <span>{it.quantity}x {it.name} <span style={{ color: "var(--text-muted)" }}>({it.size})</span></span>
                          <strong>{settings.currency}{it.price * it.quantity}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-medium)", paddingTop: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <span>Subtotal:</span>
                      <span>{settings.currency}{ord.subtotal}</span>
                    </div>
                    {ord.discountAmount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--accent-clay)", fontWeight: 600 }}>
                        <span>Discount ({ord.discountCode}):</span>
                        <span>-{settings.currency}{ord.discountAmount}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <span>Delivery Fee:</span>
                      <span>{ord.shippingFee === 0 ? "FREE" : `${settings.currency}${ord.shippingFee}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "3px" }}>
                      <span>Total Amount:</span>
                      <span>{settings.currency}{ord.total}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. Comprehensive Order Management & Edit Drawer/Modal                     */}
      {/* ========================================================================= */}
      {selectedOrderForEdit && editFormData && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            animation: "fadeIn 0.2s ease"
          }}
          onClick={() => setSelectedOrderForEdit(null)}
        >
          <div 
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              maxWidth: "840px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              border: "1px solid var(--border-medium)",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#F9FAFB"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                    Manage Order #{selectedOrderForEdit.id}
                  </h3>
                  <span className={`admin-badge ${getStatusBadgeClass(editFormData.status)}`}>
                    {editFormData.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Placed on {new Date(selectedOrderForEdit.createdAt).toLocaleString("en-IN")} • Customer: <strong>{editFormData.customerName}</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => handlePrintSlip(selectedOrderForEdit)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.4rem 0.75rem" }}
                  title="Print GST Invoice & Shipping Slip"
                >
                  <Printer size={14} />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForEdit(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", color: "var(--text-muted)" }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveOrderEdit} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Order Status Stepper Selector */}
              <div style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "var(--radius-sm)",
                padding: "1rem"
              }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem", letterSpacing: "0.05em" }}>
                  Order Fulfillment Status Pipeline:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {ORDER_STATUS_STEPS.map((step) => {
                    const isCurrent = editFormData.status === step.id;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, status: step.id })}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.8rem",
                          fontWeight: isCurrent ? 700 : 500,
                          cursor: "pointer",
                          backgroundColor: isCurrent ? step.color : "#FFFFFF",
                          color: isCurrent ? "#FFFFFF" : "var(--text-primary)",
                          border: isCurrent ? `1px solid ${step.color}` : "1px solid var(--border-medium)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          boxShadow: isCurrent ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {isCurrent && <Check size={13} strokeWidth={3} />}
                        <span>{step.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2-Column Split: Logistics & Shipping */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="admin-order-modal-grid">
                
                {/* Logistics & Courier Box */}
                <div style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  backgroundColor: "#FFFFFF"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#1D4ED8" }}>
                    <Truck size={17} />
                    <strong style={{ fontSize: "0.9rem" }}>Courier & Logistics Details</strong>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Assigned Courier Partner
                      </label>
                      <select
                        value={editFormData.courier}
                        onChange={(e) => setEditFormData({ ...editFormData, courier: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      >
                        {COURIER_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        AWB / Tracking Number
                      </label>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <input
                          type="text"
                          value={editFormData.awbTrackingNumber}
                          onChange={(e) => setEditFormData({ ...editFormData, awbTrackingNumber: e.target.value })}
                          placeholder="e.g. BLUEDART-88273619"
                          style={{ flexGrow: 1, padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditFormData({ ...editFormData, awbTrackingNumber: `AWB-${Math.floor(10000000 + Math.random() * 90000000)}` })}
                          className="btn btn-secondary btn-sm"
                          style={{ whiteSpace: "nowrap", fontSize: "0.76rem" }}
                          title="Generate unique AWB"
                        >
                          Auto AWB
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Estimated Delivery Days
                      </label>
                      <input
                        type="text"
                        value={editFormData.estimatedDays}
                        onChange={(e) => setEditFormData({ ...editFormData, estimatedDays: e.target.value })}
                        placeholder="e.g. 2 - 3 Business Days"
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Live Tracking Link URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={editFormData.trackingUrl}
                        onChange={(e) => setEditFormData({ ...editFormData, trackingUrl: e.target.value })}
                        placeholder="https://www.delhivery.com/track/package/..."
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Customer Shipping Info Box */}
                <div style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  backgroundColor: "#FFFFFF"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#C2410C" }}>
                    <MapPin size={17} />
                    <strong style={{ fontSize: "0.9rem" }}>Customer & Delivery Address</strong>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.6rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={editFormData.customerName}
                          onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                          Mobile Phone *
                        </label>
                        <input
                          type="text"
                          required
                          value={editFormData.customerPhone}
                          onChange={(e) => setEditFormData({ ...editFormData, customerPhone: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Street / Flat Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.customerAddress}
                        onChange={(e) => setEditFormData({ ...editFormData, customerAddress: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={editFormData.customerPincode}
                          onChange={(e) => handleEditPincodeChange(e.target.value)}
                          placeholder="6 Digits"
                          style={{ width: "100%", padding: "0.55rem 0.65rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={editFormData.customerCity}
                          onChange={(e) => setEditFormData({ ...editFormData, customerCity: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem 0.65rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={editFormData.customerState}
                          onChange={(e) => setEditFormData({ ...editFormData, customerState: e.target.value })}
                          style={{ width: "100%", padding: "0.55rem 0.65rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Customer Delivery Instruction
                      </label>
                      <input
                        type="text"
                        value={editFormData.customerNotes}
                        onChange={(e) => setEditFormData({ ...editFormData, customerNotes: e.target.value })}
                        placeholder="e.g. Leave with security, call before arrival"
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Payment Details & Internal Staff Notes */}
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1.5rem" }} className="admin-order-modal-grid">
                
                {/* Payment Configuration */}
                <div style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  backgroundColor: "#FFFFFF"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem", color: "#166534" }}>
                    <DollarSign size={17} />
                    <strong style={{ fontSize: "0.9rem" }}>Payment & Settlement</strong>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Payment Method
                      </label>
                      <select
                        value={editFormData.paymentMethod}
                        onChange={(e) => setEditFormData({ ...editFormData, paymentMethod: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      >
                        <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                        <option value="Prepaid UPI / QR">Prepaid UPI / QR</option>
                        <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        Payment Status
                      </label>
                      <select
                        value={editFormData.paymentStatus}
                        onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                      >
                        <option value="Pending on Delivery">Pending on Delivery (COD)</option>
                        <option value="Paid & Verified">Paid & Verified</option>
                        <option value="Refunded / Cancelled">Refunded / Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items Summary Table */}
                  <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Order Items Breakdown:
                    </div>
                    {selectedOrderForEdit.items?.map((it, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.25rem 0" }}>
                        <span>{it.quantity}x {it.name} <span style={{ color: "var(--text-muted)" }}>({it.size})</span></span>
                        <strong>{settings.currency}{it.price * it.quantity}</strong>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 800, borderTop: "1px dashed var(--border-medium)", paddingTop: "0.4rem", marginTop: "0.4rem" }}>
                      <span>Grand Total:</span>
                      <span style={{ color: "#C2410C" }}>{settings.currency}{selectedOrderForEdit.total}</span>
                    </div>
                  </div>
                </div>

                {/* Internal Admin Notes & Direct WhatsApp Triggers */}
                <div style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", color: "#B45309" }}>
                      <FileText size={17} />
                      <strong style={{ fontSize: "0.9rem" }}>Internal Staff / Warehouse Notes</strong>
                    </div>

                    <textarea
                      rows={4}
                      value={editFormData.adminNotes}
                      onChange={(e) => setEditFormData({ ...editFormData, adminNotes: e.target.value })}
                      placeholder="e.g. Customer requested evening delivery. Verified address on WhatsApp call."
                      style={{ width: "100%", padding: "0.65rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem", resize: "none" }}
                    />
                  </div>

                  {/* Quick WhatsApp Notification Shortcuts */}
                  <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      1-Click WhatsApp Notification:
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => sendWhatsAppUpdate({ ...selectedOrderForEdit, ...editFormData, customer: { name: editFormData.customerName, phone: editFormData.customerPhone, city: editFormData.customerCity } }, "confirm")}
                        className="btn btn-whatsapp-outline btn-sm"
                        style={{ fontSize: "0.76rem" }}
                      >
                        <CheckCircle2 size={13} />
                        <span>Send Confirm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => sendWhatsAppUpdate({ ...selectedOrderForEdit, ...editFormData, customer: { name: editFormData.customerName, phone: editFormData.customerPhone } }, "ship")}
                        className="btn btn-whatsapp-outline btn-sm"
                        style={{ fontSize: "0.76rem" }}
                      >
                        <Truck size={13} />
                        <span>Send AWB</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => sendWhatsAppUpdate({ ...selectedOrderForEdit, ...editFormData, customer: { name: editFormData.customerName, phone: editFormData.customerPhone } }, "delivered")}
                        className="btn btn-whatsapp-outline btn-sm"
                        style={{ fontSize: "0.76rem" }}
                      >
                        <Check size={13} />
                        <span>Send Delivered</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Action Buttons */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border-light)"
              }}>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete order #${selectedOrderForEdit.id} permanently?`)) {
                      deleteOrder(selectedOrderForEdit.id);
                      setSelectedOrderForEdit(null);
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
                >
                  <Trash2 size={14} />
                  <span>Delete Order</span>
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForEdit(null)}
                    className="btn btn-secondary"
                    style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: "0.6rem 1.6rem",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      backgroundColor: "#15803D"
                    }}
                  >
                    <Save size={16} />
                    <span>Save Order Changes</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. Create New Manual Order Modal (WhatsApp / Phone Orders)                */}
      {/* ========================================================================= */}
      {isCreateOrderOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            animation: "fadeIn 0.2s ease"
          }}
          onClick={() => setIsCreateOrderOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              border: "1px solid var(--border-medium)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#F9FAFB"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Create New Manual Order
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Manually book orders received on WhatsApp chat, phone calls, or direct inquiries.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOrderOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", color: "var(--text-muted)" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleManualSubmit} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Customer Information */}
              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "1.25rem", borderRadius: "var(--radius-sm)" }}>
                <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <User size={15} />
                  <span>1. Customer & Shipping Details</span>
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={manualCustomer.name}
                      onChange={(e) => setManualCustomer({ ...manualCustomer, name: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Mobile Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765 43210"
                      value={manualCustomer.phone}
                      onChange={(e) => setManualCustomer({ ...manualCustomer, phone: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Street / Flat / House Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House No, Apartment, Street, Landmark"
                    value={manualCustomer.address}
                    onChange={(e) => setManualCustomer({ ...manualCustomer, address: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 560001"
                      value={manualCustomer.pincode}
                      onChange={(e) => handleManualPincodeChange(e.target.value)}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru"
                      value={manualCustomer.city}
                      onChange={(e) => setManualCustomer({ ...manualCustomer, city: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karnataka"
                      value={manualCustomer.state}
                      onChange={(e) => setManualCustomer({ ...manualCustomer, state: e.target.value })}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>
                </div>
              </div>

              {/* Formulation Items Selector */}
              <div style={{ border: "1px solid var(--border-light)", padding: "1.25rem", borderRadius: "var(--radius-sm)" }}>
                <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Package size={15} />
                  <span>2. Add Products to Order</span>
                </h4>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", marginBottom: "1rem" }}>
                  <div style={{ flexGrow: 1 }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Select Formulation from Catalog:
                    </label>
                    <select
                      value={selectedManualProdId}
                      onChange={(e) => setSelectedManualProdId(e.target.value)}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.volume}) — ₹{p.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ width: "90px" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Qty:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={manualProdQty}
                      onChange={(e) => setManualProdQty(Number(e.target.value) || 1)}
                      style={{ width: "100%", padding: "0.55rem 0.65rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddManualItem}
                    className="btn btn-primary btn-sm"
                    style={{ padding: "0.6rem 1rem", fontSize: "0.84rem" }}
                  >
                    + Add Item
                  </button>
                </div>

                {/* Items List */}
                <div style={{ backgroundColor: "#F9FAFB", borderRadius: "var(--radius-xs)", border: "1px solid #E5E7EB", padding: "0.75rem" }}>
                  <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Order Items ({manualItems.length}):
                  </div>
                  {manualItems.map((it, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.35rem 0", borderBottom: idx !== manualItems.length - 1 ? "1px solid #E5E7EB" : "none", fontSize: "0.84rem" }}>
                      <span>{it.quantity}x <strong>{it.name}</strong> ({it.size})</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span>₹{it.price * it.quantity}</span>
                        <X 
                          size={14} 
                          color="#DC2626" 
                          style={{ cursor: "pointer" }} 
                          onClick={() => handleRemoveManualItem(it.id)} 
                          title="Remove item"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Logistics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Payment Mode
                  </label>
                  <select
                    value={manualCustomer.paymentMethod}
                    onChange={(e) => setManualCustomer({ ...manualCustomer, paymentMethod: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                  >
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                    <option value="Prepaid UPI / QR">Prepaid UPI / QR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Manual Discount (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={manualDiscount}
                    onChange={(e) => setManualDiscount(e.target.value)}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontSize: "0.84rem" }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsCreateOrderOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: "0.6rem 1.25rem" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.6rem", fontWeight: 700, backgroundColor: "#15803D" }}
                >
                  Create & Save Order
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. Printable GST Tax Invoice & Thermal Packing Slip Modal                 */}
      {/* ========================================================================= */}
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
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem", color: "#6B7280" }}>GSTIN: {settings.gstin || "29AABCU9603R1ZM"} • HSN Category: 330499</p>
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
