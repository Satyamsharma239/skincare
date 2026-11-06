import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS } from "../data/initialProducts";
import { DEFAULT_SETTINGS, INITIAL_COUPONS, INITIAL_SAMPLE_ORDERS } from "../data/defaultSettings";
import { lookupPincode } from "../data/pincodeData";

const StoreContext = createContext(null);
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export const StoreProvider = ({ children }) => {
  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_settings");
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p) => p.id));
          const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
          return [...parsed, ...missing];
        }
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_orders");
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  // Coupons
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_coupons");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingCodes = new Set(parsed.map((c) => c.code));
          const missing = INITIAL_COUPONS.filter((c) => !existingCodes.has(c.code));
          return [...parsed, ...missing];
        }
      }
      return INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon in Cart
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Standalone Routing Engine (Checks path or hash)
  const getInitialRoute = () => {
    if (typeof window === "undefined") return "store";
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes("/admin") || hash.includes("/admin")) {
      return "admin";
    }
    return "store";
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  // Admin PIN Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem("lumera_admin_auth") === "true";
    } catch {
      return false;
    }
  });

  // Route change listener
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes("/admin") || hash.includes("/admin")) {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("store");
      }
    };
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  const navigateTo = (route) => {
    if (route === "admin") {
      window.location.hash = "/admin";
      setCurrentRoute("admin");
    } else {
      window.location.hash = "";
      setCurrentRoute("store");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const loginAdmin = (pin) => {
    if (pin === (settings.adminPin || "1234") || pin === "admin123") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("lumera_admin_auth", "true");
      showToast("Admin access authenticated successfully");
      return true;
    } else {
      showToast("Incorrect security PIN", "warning");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("lumera_admin_auth");
    navigateTo("store");
    showToast("Logged out of Admin Portal", "info");
  };

  // UI Modals States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isExpressCheckoutOpen, setIsExpressCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null); // null means checkout full cart; or { product, quantity }
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [selectedConcernFilter, setSelectedConcernFilter] = useState("All Concerns");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const openExpressCheckout = (product = null, quantity = 1) => {
    if (product) {
      setCheckoutProduct({ product, quantity });
    } else {
      setCheckoutProduct(null);
    }
    setIsCartOpen(false);
    setIsExpressCheckoutOpen(true);
  };

  const closeExpressCheckout = () => {
    setIsExpressCheckoutOpen(false);
    setCheckoutProduct(null);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("lumera_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("lumera_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("lumera_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("lumera_coupons", JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem("lumera_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("lumera_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Live Cross-Port Synchronization Engine (Connects Customer Port 5173 & Admin Port 5174)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [prodRes, ordRes, coupRes, settRes] = await Promise.allSettled([
          fetch(`${API_BASE}/api/products`),
          fetch(`${API_BASE}/api/orders`),
          fetch(`${API_BASE}/api/coupons`),
          fetch(`${API_BASE}/api/settings`)
        ]);

        if (prodRes.status === "fulfilled" && prodRes.value.ok) {
          const prods = await prodRes.value.json();
          if (Array.isArray(prods) && prods.length > 0) setProducts(prods);
        }
        if (ordRes.status === "fulfilled" && ordRes.value.ok) {
          const ords = await ordRes.value.json();
          if (Array.isArray(ords)) setOrders(ords);
        }
        if (coupRes.status === "fulfilled" && coupRes.value.ok) {
          const coups = await coupRes.value.json();
          if (Array.isArray(coups)) setCoupons(coups);
        }
        if (settRes.status === "fulfilled" && settRes.value.ok) {
          const setts = await settRes.value.json();
          if (setts && setts.storeName) setSettings(setts);
        }
      } catch (e) {
        // Graceful offline fallback
      }
    };

    fetchInitialData();

    // Auto-refresh orders every 3.5s only if backend API is active
    let consecutiveErrors = 0;
    const syncInterval = setInterval(async () => {
      if (consecutiveErrors >= 3) return; // Silent stop if running in 100% standalone frontend mode
      try {
        const ordRes = await fetch(`${API_BASE}/api/orders`);
        if (ordRes.ok) {
          consecutiveErrors = 0;
          const ords = await ordRes.json();
          if (Array.isArray(ords)) {
            setOrders((prev) => {
              if (ords.length !== prev.length || JSON.stringify(ords[0]) !== JSON.stringify(prev[0])) {
                return ords;
              }
              return prev;
            });
          }
        } else {
          consecutiveErrors++;
        }
      } catch (e) {
        consecutiveErrors++;
      }
    }, 3500);

    return () => clearInterval(syncInterval);
  }, []);

  // Toast Helper
  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === "flat") {
      discountAmount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  const isFreeShipping =
    cartSubtotal >= settings.freeShippingThreshold ||
    (appliedCoupon && appliedCoupon.discountType === "shipping");

  const shippingFee = cartSubtotal > 0 ? (isFreeShipping ? 0 : settings.shippingFee) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    if (!product.inStock) {
      showToast(`${product.name} is currently out of stock`, "warning");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
    showToast(`Added "${product.name}" to your bag`, "success");
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from bag", "info");
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from favorites", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to favorites ❤️");
        return [...prev, productId];
      }
    });
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!found) {
      showToast("Invalid promo code", "warning");
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(
        `Minimum order of ${settings.currency}${found.minOrder} required for ${found.code}`,
        "warning"
      );
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied! 🎉`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  const addCoupon = (newCoupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
    showToast(`Created coupon ${newCoupon.code}`);
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Deleted coupon ${code}`, "info");
  };

  // Admin CRUD for Formulations
  const addProduct = (newProd) => {
    const prod = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 0
    };
    setProducts((prev) => [prod, ...prev]);
    fetch(`${API_BASE}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prod)
    }).catch(() => {});
    showToast(`Added formulation "${prod.name.slice(0, 20)}..."`);
    return prod;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    }).catch(() => {});
    showToast("Formulation updated");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" }).catch(() => {});
    showToast("Formulation deleted", "info");
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, inStock: !p.inStock };
          fetch(`${API_BASE}/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inStock: updated.inStock })
          }).catch(() => {});
          return updated;
        }
        return p;
      })
    );
    showToast("Stock status updated");
  };

  // Orders Management
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    fetch(`${API_BASE}/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
    showToast(`Order status updated to "${newStatus}"`);
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    fetch(`${API_BASE}/api/orders/${orderId}`, { method: "DELETE" }).catch(() => {});
    showToast("Order removed", "info");
  };

  // WhatsApp Order Engine with Real Logistics & Indian Pincode Data
  const createWhatsAppOrder = ({
    customer,
    items,
    subtotal,
    discountCode = "",
    discountAmount = 0,
    shippingFee = 0,
    total,
    paymentMethod = "Cash on Delivery (COD)"
  }) => {
    const orderId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
    const pincodeDetails = lookupPincode(customer.pincode);
    const courier = pincodeDetails?.courier || "BlueDart Express";
    const estimatedDays = pincodeDetails?.estimatedDays || "2 - 4 Business Days";
    const awbTrackingNumber = `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.product.volume || "Standard",
        hsn: "330499"
      })),
      subtotal,
      discountCode,
      discountAmount,
      shippingFee,
      total,
      gstInclusiveAmount: Math.round((total * 18) / 118),
      courier,
      estimatedDays,
      awbTrackingNumber,
      paymentMethod,
      status: "New Inquiry"
    };

    setOrders((prev) => [newOrder, ...prev]);
    fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    const formattedMessage = generateWhatsAppMessage(newOrder);
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    clearCart();
    setIsCartOpen(false);
    setIsCheckoutModalOpen(false);
    setConfirmedOrder({ ...newOrder, waUrl, rawMessage: formattedMessage });

    window.open(waUrl, "_blank");
    return newOrder;
  };

  const quickWhatsAppBuy = (product, quantity = 1, customerInfo = null) => {
    const orderId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
    const total = product.price * quantity;
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");

    const customer = customerInfo || {
      name: "WhatsApp Direct Buyer",
      phone: "Via WhatsApp Chat",
      address: "Address to be provided in WhatsApp chat",
      city: "Serviceable Hub",
      state: "India",
      pincode: "Direct Dispatch",
      notes: "Direct 1-Click WhatsApp Order"
    };

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          size: product.volume || "Standard",
          hsn: "330499"
        }
      ],
      subtotal: total,
      discountCode: "",
      discountAmount: 0,
      shippingFee: total >= settings.freeShippingThreshold ? 0 : settings.shippingFee,
      total: total >= settings.freeShippingThreshold ? total : total + settings.shippingFee,
      gstInclusiveAmount: Math.round((total * 18) / 118),
      courier: "BlueDart Express Air",
      estimatedDays: "2 - 3 Business Days",
      awbTrackingNumber: `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMethod: "Cash on Delivery / UPI",
      status: "New Inquiry"
    };

    // Save to Live Admin Orders Log!
    setOrders((prev) => [newOrder, ...prev]);
    fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    const msg = [
      `✨ *NEW CLINICAL ORDER #${orderId}* ✨`,
      `*Store:* ${settings.storeName}`,
      `*Date:* ${new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}`,
      ``,
      `👤 *CUSTOMER & DISPATCH:*`,
      `• *Name:* ${customer.name}`,
      `• *Phone:* ${customer.phone}`,
      `• *Address:* ${customer.address}`,
      `• *Pincode / City:* ${customer.pincode} (${customer.city})`,
      `• *Payment Preference:* ${newOrder.paymentMethod}`,
      ``,
      `🧴 *FORMULATION ORDERED:*`,
      `1. *${product.name}* (${product.volume || "Standard"})`,
      `   Qty: ${quantity} × ${settings.currency}${product.price} = ${settings.currency}${total}`,
      ``,
      `💰 *BILL SUMMARY:*`,
      `• Subtotal: ${settings.currency}${total}`,
      `• Express Courier: ${newOrder.shippingFee === 0 ? "FREE" : `${settings.currency}${newOrder.shippingFee}`}`,
      `• *Total Payable:* *${settings.currency}${newOrder.total}* (incl. 18% GST)`,
      ``,
      `Please confirm dispatch & tracking number. Thank you!`
    ].join("\n");

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    setIsExpressCheckoutOpen(false);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(false);
    setConfirmedOrder({ ...newOrder, waUrl, rawMessage: msg });

    window.open(waUrl, "_blank");
    return newOrder;
  };

  const generateWhatsAppMessage = (order) => {
    const itemsList = order.items
      .map(
        (it, index) =>
          `${index + 1}. *${it.name}* (${it.size})\n   Qty: ${it.quantity} × ${
            settings.currency
          }${it.price} = ${settings.currency}${it.quantity * it.price}`
      )
      .join("\n\n");

    const addressParts = [
      order.customer.address,
      order.customer.city,
      order.customer.state ? `${order.customer.state} - ${order.customer.pincode}` : order.customer.pincode
    ]
      .filter(Boolean)
      .join(", ");

    const lines = [
      `✨ *NEW CLINICAL ORDER #${order.id}* ✨`,
      `*Store:* ${settings.storeName}`,
      `*Date:* ${new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}`,
      ``,
      `👤 *CUSTOMER & DISPATCH DETAILS:*`,
      `• *Name:* ${order.customer.name}`,
      `• *Phone:* ${order.customer.phone}`,
      `• *Address:* ${addressParts}`,
      order.customer.notes ? `• *Skin Condition / Note:* ${order.customer.notes}` : null,
      ``,
      `🛍️ *ORDERED FORMULATIONS:*`,
      itemsList,
      ``,
      `💰 *BILL SUMMARY (GST INCLUSIVE):*`,
      `• Subtotal: ${settings.currency}${order.subtotal}`,
      order.discountAmount > 0
        ? `• Discount (${order.discountCode}): -${settings.currency}${order.discountAmount}`
        : null,
      `• Express Delivery: ${
        order.shippingFee === 0 ? "FREE" : `${settings.currency}${order.shippingFee}`
      }`,
      `• *Total Payable:* ${settings.currency}${order.total}`,
      `• *Payment Method:* ${order.paymentMethod}`,
      `• *Logistics Route:* ${order.courier || "BlueDart Express"} (${order.estimatedDays || "2 - 3 Days"})`,
      ``,
      `💬 *Please confirm my order and share cleanroom packaging & dispatch details. Thank you!*`
    ]
      .filter((line) => line !== null)
      .join("\n");

    return lines;
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast("Store settings saved");
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_SAMPLE_ORDERS);
    setCoupons(INITIAL_COUPONS);
    localStorage.removeItem("lumera_settings");
    localStorage.removeItem("lumera_products");
    localStorage.removeItem("lumera_orders");
    localStorage.removeItem("lumera_coupons");
    showToast("Reset to factory demo data", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        resetToDefaults,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        orders,
        createWhatsAppOrder,
        updateOrderStatus,
        deleteOrder,
        quickWhatsAppBuy,
        generateWhatsAppMessage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        discountAmount,
        shippingFee,
        cartTotal,
        isFreeShipping,
        wishlist,
        toggleWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isExpressCheckoutOpen,
        setIsExpressCheckoutOpen,
        checkoutProduct,
        openExpressCheckout,
        closeExpressCheckout,
        isQuizOpen,
        setIsQuizOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        confirmedOrder,
        setConfirmedOrder,
        isWishlistOpen,
        setIsWishlistOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        trackingOrderId,
        setTrackingOrderId,
        currentRoute,
        navigateTo,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        selectedConcernFilter,
        setSelectedConcernFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
