import React, { useState, useEffect, Component, lazy, Suspense } from "react";
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
import { SkinQuizModal } from "./components/SkinQuizModal";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { CheckCircle2, AlertCircle, Info, RefreshCw } from "lucide-react";

// Lazy-load the heavy Admin Portal chunk only when visiting /admin
const AdminPortal = lazy(() =>
  import("./components/admin/AdminPortal").then((m) => ({ default: m.AdminPortal }))
);

// Robust Error Boundary to guarantee ZERO blank white screens
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LUMÈRA Runtime caught:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = "/";
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
            maxWidth: "520px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            padding: "2.5rem 2rem",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            border: "1px solid #E4E4E7"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              fontSize: "1.4rem",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto"
            }}>
              L
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#18181B" }}>
              LUMÈRA Clinical Skincare
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#71717A", lineHeight: 1.5, margin: "0 0 1.5rem 0" }}>
              The storefront encountered an initial browser initialization event. Click below to load the fresh formulation catalog.
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
                cursor: "pointer",
                marginBottom: "1rem"
              }}
            >
              <RefreshCw size={15} />
              <span>Refresh & Load Store</span>
            </button>

            {this.state.error && (
              <div style={{ marginTop: "1rem", textAlign: "left" }}>
                <button
                  type="button"
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9CA3AF",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  {this.state.showDetails ? "Hide Error Details" : "Show Error Diagnostics"}
                </button>
                {this.state.showDetails && (
                  <pre style={{
                    marginTop: "0.5rem",
                    padding: "0.75rem",
                    backgroundColor: "#FEF2F2",
                    color: "#B91C1C",
                    fontSize: "0.72rem",
                    borderRadius: "8px",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all"
                  }}>
                    {String(this.state.error?.message || this.state.error)}
                    {"\n\n"}
                    {String(this.state.error?.stack || "")}
                  </pre>
                )}
              </div>
            )}
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
      return (window.location.pathname + window.location.hash).toLowerCase();
    }
    return "/";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath((window.location.pathname + window.location.hash).toLowerCase());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const isAdminRoute = currentPath.includes("admin");

  if (isAdminRoute) {
    return (
      <div>
        <Suspense fallback={
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#141715", color: "#FAF8F5" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#27272A",
                color: "#FFFFFF",
                fontSize: "1.2rem",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem auto"
              }}>
                L
              </div>
              <div style={{ fontWeight: 700 }}>Loading Laboratory Portal...</div>
            </div>
          </div>
        }>
          <AdminPortal />
        </Suspense>
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
      <SkinQuizModal />
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
