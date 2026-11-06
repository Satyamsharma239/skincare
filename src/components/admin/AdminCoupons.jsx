import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { Tag, Plus, Trash2, CheckCircle2 } from "lucide-react";

export const AdminCoupons = () => {
  const { coupons, addCoupon, deleteCoupon, settings } = useStore();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    value: 10,
    minOrder: 499,
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    addCoupon({
      code: formData.code.trim().toUpperCase(),
      discountType: formData.discountType,
      value: Number(formData.value),
      minOrder: Number(formData.minOrder || 0),
      description: formData.description.trim() || `${formData.value}% off promo voucher`
    });

    setFormData({
      code: "",
      discountType: "percentage",
      value: 10,
      minOrder: 499,
      description: ""
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, margin: 0 }}>
          Coupons & Promotion Vouchers
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "2px 0 0 0" }}>
          Create special discount codes for your customers to apply in their cart before sending their WhatsApp order.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "1.75rem"
      }} className="coupons-grid">
        
        {/* Left: Active Coupons List */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-light)"
        }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
            Active Promo Codes ({coupons.length})
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {coupons.map((c) => (
              <div
                key={c.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{
                      backgroundColor: "var(--accent-forest)",
                      color: "#fff",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.05em"
                    }}>
                      {c.code}
                    </span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent-terracotta)" }}>
                      {c.discountType === "percentage" && `${c.value}% OFF`}
                      {c.discountType === "flat" && `FLAT ${settings.currency}${c.value} OFF`}
                      {c.discountType === "shipping" && "FREE SHIPPING"}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                    {c.description}
                  </p>

                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    Min Order: {settings.currency}{c.minOrder}
                  </div>
                </div>

                <button
                  onClick={() => deleteCoupon(c.code)}
                  style={{ color: "var(--text-muted)", padding: "0.4rem", cursor: "pointer" }}
                  title="Delete Coupon"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Create Coupon Form */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-light)"
        }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
            Create New Promo Code
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Promo Voucher Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DERMA20"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", textTransform: "uppercase" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Discount Type
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", backgroundColor: "#fff" }}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount ({settings.currency})</option>
                  <option value="shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Discount Value
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Minimum Order Value ({settings.currency})
              </label>
              <input
                type="number"
                min={0}
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Description
              </label>
              <input
                type="text"
                placeholder="e.g. 15% OFF on clinical routines above ₹799"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "0.5rem" }}
            >
              <Plus size={16} />
              <span>Create Coupon</span>
            </button>
          </form>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .coupons-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
