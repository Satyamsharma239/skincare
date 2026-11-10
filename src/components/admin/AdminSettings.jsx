import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { Settings, Save, MessageCircle, RotateCcw, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

export const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaults, showToast } = useStore();

  const [formData, setFormData] = useState({
    storeName: settings.storeName || "",
    tagline: settings.tagline || "",
    whatsappNumber: settings.whatsappNumber || "",
    whatsappDisplayNumber: settings.whatsappDisplayNumber || "",
    currency: settings.currency || "₹",
    freeShippingThreshold: settings.freeShippingThreshold || 499,
    shippingFee: settings.shippingFee || 79,
    announcementText: settings.announcementText || "",
    supportHours: settings.supportHours || "",
    businessEmail: settings.businessEmail || "",
    gstin: settings.gstin || "29AABCU9603R1ZM",
    adminPin: settings.adminPin || "1234"
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      shippingFee: Number(formData.shippingFee)
    });
  };

  const handleTestWhatsApp = () => {
    const cleanPhone = formData.whatsappNumber.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      showToast("Please enter a valid WhatsApp number first", "warning");
      return;
    }
    const testMsg = encodeURIComponent(
      `🌿 *TEST MESSAGE FROM ${formData.storeName}*\nWhatsApp order connectivity is configured correctly! You will receive incoming customer orders on this number.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${testMsg}`, "_blank");
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "1.75rem"
        }} className="settings-grid">
          
          {/* Left Column: WhatsApp & Delivery Configuration */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* WhatsApp Integration Card */}
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-light)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageCircle size={16} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: 0 }}>
                  WhatsApp Destination Number
                </h3>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                This is the phone number where all customer orders, delivery addresses, and inquiries will be sent directly.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    WhatsApp Phone Number (with Country Code, e.g. +919876543210) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+919876543210"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px", display: "block" }}>
                    Tip: Enter your real phone number here to receive test orders on your actual phone!
                  </span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Formatted Display Number (shown to customer)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={formData.whatsappDisplayNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappDisplayNumber: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTestWhatsApp}
                  className="btn btn-whatsapp-outline btn-sm"
                  style={{ alignSelf: "flex-start" }}
                >
                  <MessageCircle size={15} />
                  <span>Send Test Ping to this Number</span>
                </button>
              </div>
            </div>

            {/* Delivery & Shipping Policy Card */}
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-light)"
            }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
                Delivery & Free Shipping Threshold
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Free Shipping Above ({formData.currency})
                  </label>
                  <input
                    type="number"
                    value={formData.freeShippingThreshold}
                    onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Standard Fee ({formData.currency})
                  </label>
                  <input
                    type="number"
                    value={formData.shippingFee}
                    onChange={(e) => setFormData({ ...formData, shippingFee: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Store Brand Profile & Announcement Bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-light)"
            }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
                Store Brand Identity
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Top Announcement Bar Text
                  </label>
                  <textarea
                    rows={2}
                    value={formData.announcementText}
                    onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Registered GSTIN (for Invoices)
                    </label>
                    <input
                      type="text"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      placeholder="e.g. 29AABCU9603R1ZM"
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Admin Security PIN
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      value={formData.adminPin}
                      onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
                      placeholder="Default: 1234"
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Support Hours
                    </label>
                    <input
                      type="text"
                      value={formData.supportHours}
                      onChange={(e) => setFormData({ ...formData, supportHours: e.target.value })}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save & Reset Action Card */}
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-light)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
              >
                <Save size={18} />
                <span>Save All Store Changes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all store data to default clinical formulations, sample WhatsApp orders, and settings?")) {
                    resetToDefaults();
                  }
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: "100%", color: "#991B1B", borderColor: "#FCA5A5" }}
              >
                <RotateCcw size={15} />
                <span>Reset to Factory Demo Data</span>
              </button>
            </div>

          </div>

        </div>
      </form>

      <style>{`
        @media (max-width: 850px) {
          .settings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
