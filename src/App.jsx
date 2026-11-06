import React, { useState, useEffect, Component } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { Navbar } from "./components/Navbar";
import { Storefront } from "./components/Storefront";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { TrackOrderModal } from "./components/TrackOrderModal";
import { ExpressCheckoutDrawer } from "./components/ExpressCheckoutDrawer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { WhatsAppCheckoutModal } from "./components/WhatsAppCheckoutModal";
import { OrderConfirmationModal } from "./components/OrderConfirmationModal";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { AdminPortal } from "./components/admin/AdminPortal";
import { CheckCircle2, AlertCircle, Info, RefreshCw } from "lucide-react";

// Robust Error Boundary to guarantee ZERO blank white screens
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LUMÈRA Runtime caught:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem("lumera_products");
      localStorage.removeItem("lumera_orders");
      localStorage.removeItem("lumera_settings");
      localStorage.removeItem("lumera_cart");
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#FAF9F6",
          color: "#18181B",
          fontFamily: "var(--font-sans, system-ui, -apple-system, sans-serif)",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "480px",
            backgroundColor: "#FFFFFF",
            padding: "2.5rem 2rem",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            border: "1px solid #E4E4E7"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🌿</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#18181B" }}>
              LUMÈRA Clinical Skincare
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#71717A", lineHeight: 1.5, margin: "0 0 1.5rem 0" }}>
              The storefront encountered a temporary browser cache refresh. Click below to load fresh formulation catalog data.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer"
              }}
            >
              <RefreshCw size={15} />
              <span>Refresh & Load Store</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent = () => {
  const { toastMessage } = useStore();
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname.toLowerCase();
    }
    return "/";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const isAdminRoute = currentPath.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div>
        <AdminPortal />
        {toastMessage && (
          <div className="toast-container">
            <div className="toast-message">
              {toastMessage.type === "success" && <CheckCircle2 size={18} color="#4ADE80" />}
              {toastMessage.type === "warning" && <AlertCircle size={18} color="#FBBF24" />}
              {toastMessage.type === "info" && <Info size={18} color="#60A5FA" />}
              <span>{toastMessage.msg}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 100% Pure Customer Storefront */}
      <Navbar />

      <div style={{ flexGrow: 1 }}>
        <Storefront />
      </div>

      <Footer />

      {/* Customer Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <TrackOrderModal />
      <ExpressCheckoutDrawer />
      <ProductDetailModal />
      <WhatsAppCheckoutModal />
      <OrderConfirmationModal />
      <FloatingWhatsApp />

      {/* Toast Feedback Notifications */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-message">
            {toastMessage.type === "success" && <CheckCircle2 size={18} color="#4ADE80" />}
            {toastMessage.type === "warning" && <AlertCircle size={18} color="#FBBF24" />}
            {toastMessage.type === "info" && <Info size={18} color="#60A5FA" />}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}
