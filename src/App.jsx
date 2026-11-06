import React from "react";
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
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const AppContent = () => {
  const { toastMessage } = useStore();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 100% Pure Customer Experience */}
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
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}