import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { CATEGORIES, SKIN_CONCERNS } from "../../data/initialProducts";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Sparkles, 
  Image as ImageIcon,
  DollarSign,
  PackageCheck
} from "lucide-react";

// Curated high quality aesthetic skincare image presets for store owners
const PRESET_IMAGES = [
  { label: "Amber Dropper Serum", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
  { label: "Frosted Cream Jar", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" },
  { label: "Minimalist Pump Bottle", url: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?auto=format&fit=crop&w=800&q=80" },
  { label: "Matte Sunscreen Tube", url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" },
  { label: "Apothecary Retinol Dropper", url: "https://images.unsplash.com/photo-1608248597359-5613531b4028?auto=format&fit=crop&w=800&q=80" },
  { label: "Glass Essence Bottle", url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80" },
  { label: "Eye Contour Vial", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
  { label: "Melting Cleansing Balm", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" },
  { label: "Peptide Lip Cushion", url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80" },
  { label: "Clarifying AHA Toner", url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" },
  { label: "Hydrating Body Elixir", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
  { label: "The Vault 5-Piece Box", url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80" }
];

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Form State
  const initialFormState = {
    name: "",
    subtitle: "",
    category: "Serums",
    step: "Step 3: Treat",
    skinConcerns: ["Acne & Blemishes"],
    skinTypes: ["All Skin Types"],
    price: 599,
    originalPrice: 799,
    volume: "30 ml / 1.0 fl oz",
    badge: "New Launch",
    inStock: true,
    stockCount: 50,
    image: PRESET_IMAGES[0].url,
    keyActives: "",
    texture: "Lightweight fluid",
    amPm: "AM & PM",
    description: "",
    clinicalHighlights: ["Dermatologist formulated", "Visible improvement in 14 days"],
    howToUse: "",
    fullIngredients: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchActives = p.keyActives?.toLowerCase().includes(q);
      if (!matchName && !matchActives) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProductId(prod.id);
    setFormData({
      ...initialFormState,
      ...prod
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        stockCount: Number(formData.stockCount || 0)
      });
    } else {
      addProduct({
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        stockCount: Number(formData.stockCount || 0)
      });
    }

    setIsModalOpen(false);
  };

  const handleToggleConcern = (concern) => {
    const exists = formData.skinConcerns.includes(concern);
    if (exists) {
      setFormData({
        ...formData,
        skinConcerns: formData.skinConcerns.filter((c) => c !== concern)
      });
    } else {
      setFormData({
        ...formData,
        skinConcerns: [...formData.skinConcerns, concern]
      });
    }
  };

  return (
    <div>
      {/* Top Header & Add Button */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, margin: 0 }}>
            Formulations & Skincare Catalog
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "2px 0 0 0" }}>
            Add, edit, or adjust clinical formulations, active percentages, and prices live in the store.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn btn-primary"
        >
          <Plus size={18} />
          <span>Add New Formulation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "var(--radius-md)",
        padding: "1rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        border: "1px solid var(--border-light)"
      }}>
        {/* Search Input */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-sm)", padding: "0.45rem 0.75rem", width: "260px" }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search formulation name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "0.85rem", width: "100%" }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", overflowX: "auto" }}>
          {["All", ...CATEGORIES.filter((c) => c !== "All Products")].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                fontWeight: categoryFilter === cat ? 700 : 500,
                backgroundColor: categoryFilter === cat ? "var(--accent-forest)" : "var(--bg-secondary)",
                color: categoryFilter === cat ? "#fff" : "var(--text-primary)",
                border: "none",
                cursor: "pointer"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-sm)",
        overflowX: "auto"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", backgroundColor: "var(--bg-primary)" }}>
              <th style={{ padding: "0.85rem 1rem" }}>Product</th>
              <th style={{ padding: "0.85rem 1rem" }}>Category & Step</th>
              <th style={{ padding: "0.85rem 1rem" }}>Key Actives</th>
              <th style={{ padding: "0.85rem 1rem" }}>Price</th>
              <th style={{ padding: "0.85rem 1rem" }}>Stock Status</th>
              <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                {/* Media & Title */}
                <td style={{ padding: "0.85rem 1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/serum-dropper.jpg"; }}
                      style={{ width: "46px", height: "46px", borderRadius: "var(--radius-sm)", objectFit: "cover", backgroundColor: "#F4F4F5" }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", maxWidth: "200px" }}>
                        {prod.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {prod.volume} {prod.badge && `• ${prod.badge}`}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category & Step */}
                <td style={{ padding: "0.85rem 1rem" }}>
                  <span className="badge badge-subtle">{prod.category}</span>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {prod.step}
                  </div>
                </td>

                {/* Key Actives */}
                <td style={{ padding: "0.85rem 1rem", maxWidth: "220px" }}>
                  <span style={{ color: "var(--accent-sage)", fontWeight: 600, fontSize: "0.82rem" }}>
                    {prod.keyActives}
                  </span>
                </td>

                {/* Price */}
                <td style={{ padding: "0.85rem 1rem", fontWeight: 700, fontSize: "0.95rem" }}>
                  {settings.currency}{prod.price}
                  {prod.originalPrice && prod.originalPrice > prod.price && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textDecoration: "line-through", fontWeight: 400 }}>
                      {settings.currency}{prod.originalPrice}
                    </div>
                  )}
                </td>

                {/* Stock Toggle */}
                <td style={{ padding: "0.85rem 1rem" }}>
                  <button
                    onClick={() => toggleStock(prod.id)}
                    style={{
                      padding: "0.3rem 0.65rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: prod.inStock ? "#DCFCE7" : "#FEE2E2",
                      color: prod.inStock ? "#166534" : "#991B1B",
                      border: "none"
                    }}
                  >
                    {prod.inStock ? "● In Stock" : "● Out of Stock"}
                  </button>
                </td>

                {/* Edit & Delete */}
                <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: "0.35rem 0.6rem" }}
                      title="Edit Formulation"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${prod.name}" from catalog?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      style={{ color: "var(--text-muted)", padding: "0.35rem", cursor: "pointer" }}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: "680px", padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "var(--bg-primary)"
            }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                {editingProductId ? "Edit Formulation" : "Create New Formulation"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--bg-secondary)",
                  cursor: "pointer"
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              {/* Name & Subtitle */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Formulation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radiance 10% Niacinamide + 1% Zinc PCA Clarifying Serum"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Clinical Subtitle / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinical Dark Spot Reducer & Sebum Balancer"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                />
              </div>

              {/* Category & Routine Step */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", backgroundColor: "#fff" }}
                  >
                    {CATEGORIES.filter((c) => c !== "All Products").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Regimen Step
                  </label>
                  <select
                    value={formData.step}
                    onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", backgroundColor: "#fff" }}
                  >
                    <option value="Step 1: Cleanse">Step 1: Cleanse</option>
                    <option value="Step 2: Tone">Step 2: Tone</option>
                    <option value="Step 3: Treat">Step 3: Treat</option>
                    <option value="Step 4: Moisturize">Step 4: Moisturize</option>
                    <option value="Step 5: Protect">Step 5: Protect</option>
                    <option value="Complete Routine">Complete Routine</option>
                  </select>
                </div>
              </div>

              {/* Price, Original Price, Volume */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Selling Price ({settings.currency}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Original Price ({settings.currency})
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Volume / Size
                  </label>
                  <input
                    type="text"
                    placeholder="30 ml / 1.0 fl oz"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>
              </div>

              {/* Key Actives & Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Key Actives & Concentrations
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10% Pure Niacinamide + 1% Zinc PCA"
                    value={formData.keyActives}
                    onChange={(e) => setFormData({ ...formData, keyActives: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Highlight Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, Derm Favorite"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                  />
                </div>
              </div>

              {/* Skin Concerns Multi-Select Tags */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Target Skin Concerns
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {SKIN_CONCERNS.filter((c) => c !== "All Concerns").map((con) => {
                    const isChecked = formData.skinConcerns.includes(con);
                    return (
                      <button
                        type="button"
                        key={con}
                        onClick={() => handleToggleConcern(con)}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.75rem",
                          fontWeight: isChecked ? 700 : 500,
                          backgroundColor: isChecked ? "var(--accent-forest)" : "var(--bg-secondary)",
                          color: isChecked ? "#fff" : "var(--text-primary)",
                          border: "1px solid var(--border-light)",
                          cursor: "pointer"
                        }}
                      >
                        {isChecked ? `✓ ${con}` : `+ ${con}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Product Photo (Custom URL or Select Preset)
                </label>
                <input
                  type="url"
                  placeholder="Paste direct image URL..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", marginBottom: "0.5rem" }}
                />

                {/* Preset image thumbnails */}
                <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
                  {PRESET_IMAGES.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      style={{
                        flexShrink: 0,
                        border: formData.image === img.url ? "2px solid var(--accent-forest)" : "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        width: "52px",
                        height: "52px",
                        cursor: "pointer"
                      }}
                      title={img.label}
                    >
                      <img src={img.url} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Clinical Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe active benefits, target results..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                />
              </div>

              {/* How to use */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  How to Use / Application Protocol
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apply 2-3 drops morning and evening before moisturizer..."
                  value={formData.howToUse}
                  onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)" }}
                />
              </div>

              {/* Stock toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0" }}>
                <input
                  type="checkbox"
                  id="stockToggle"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="stockToggle" style={{ fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                  Mark Formulation as In Stock & Active for Purchase
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  {editingProductId ? "Save Changes" : "Publish Formulation"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};
