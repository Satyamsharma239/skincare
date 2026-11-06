# 🌿 LUMÈRA — Clinical Skincare Platform & Operations Portal

A modern, high-converting, full-stack D2C skincare e-commerce platform and dedicated operations admin portal built for the Indian market.

Inspired by industry leaders like **Plum Goodness**, **Simple Skincare**, **Vilvah Store**, and **Kimirica**.

---

## 🚀 Architecture Overview

This project consists of three dedicated, decoupled layers:

```
┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│     Customer Storefront         │      │      Admin Operations Portal    │
│    (Port 5173 / React + Vite)   │      │    (Port 5174 / React + Vite)   │
└────────────────┬────────────────┘      └────────────────┬────────────────┘
                 │                                        │
                 │             REST API Requests          │
                 └────────────────► ┌───────────────────┐ ◄┘
                                    │    Backend API    │
                                    │   (Port 5001)     │
                                    │  Node.js+Express  │
                                    └─────────┬─────────┘
                                              │ Atomic Read/Write
                                    ┌─────────▼─────────┐
                                    │   Store Database  │
                                    │ data/store-db.json│
                                    └───────────────────┘
```

1. **Customer Storefront (`http://localhost:5173`)**
   - High-converting, zero-academic-essay D2C shopping experience.
   - Live formulation search with autocomplete and empty-state smart suggestions.
   - Shopping bag drawer with 1-click coupon application (`FIRST15`, `BARRIER20`, `COMBO30`).
   - Wishlist drawer with direct "Move All to Bag" & WhatsApp 1-click buy.
   - Real-time Order Tracking modal (`LUM-XXXXX` or 10-digit mobile) with BlueDart / Delhivery AWB timelines.
   - Indian 6-digit PIN code auto-detection (City, State, Courier ETA, Doorstep Cash on Delivery).
   - WhatsApp 1-click ordering with pre-formatted message payloads.
   - *Strictly isolated:* Zero administrative links or controls on this customer port.

2. **Operations Admin Portal (`http://localhost:5174`)**
   - Dedicated management application running on its own isolated port.
   - Security PIN authentication gate (`1234`).
   - Real-time order fulfillment pipeline (Pending ➔ Confirmed ➔ Packed ➔ Shipped ➔ Delivered).
   - On-screen printable GST Tax Invoices & Thermal Packaging Slips (HSN Code `330499`, 18% IGST, seller GSTIN, barcode).
   - Inventory manager: 1-click formulation stock toggling (in-stock / out-of-stock syncs live to storefront).
   - Coupon management & WhatsApp customer concierge routing configuration.
   - Real-time 3.5s background polling synchronization with the backend API.

3. **Backend API & Persistent DB (`http://localhost:5001`)**
   - Node.js & Express REST API server (`server/index.js`).
   - Atomic read/write disk persistence in `data/store-db.json`.
   - Comprehensive CRUD endpoints:
     - `GET/POST/PUT/DELETE /api/products`
     - `GET/POST/PATCH/DELETE /api/orders`
     - `GET/POST/DELETE /api/coupons`
     - `GET/PUT /api/settings`
     - `GET /api/health`

---

## 🛠️ Local Development Quickstart

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/Satyamsharma239/skincare.git
cd skincare
npm install
```

### Running the Services
You can run all three services concurrently in separate terminal tabs:

**Terminal 1 — Backend API Server (Port 5001):**
```bash
npm run dev:api
```

**Terminal 2 — Customer Storefront (Port 5173):**
```bash
npm run dev:customer
```

**Terminal 3 — Dedicated Admin Portal (Port 5174):**
```bash
npm run dev:admin
```

- Open Customer Storefront: [http://localhost:5173](http://localhost:5173)
- Open Operations Admin: [http://localhost:5174](http://localhost:5174) *(PIN: `1234`)*

---

## 🌐 How to Make It Live (Production Deployment)

### Option A: Free Cloud Deployment (Recommended)

#### 1. Deploy the Backend API (Render / Railway)
1. Go to [Render.com](https://render.com) or [Railway.app](https://railway.app) and link your GitHub repository (`Satyamsharma239/skincare`).
2. Create a new **Web Service**.
3. Set the build & start configurations:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Environment Variable:** `PORT=5001`
4. Copy your backend live URL (e.g. `https://lumera-api.onrender.com`).

#### 2. Deploy Customer Storefront (Vercel / Netlify)
1. Go to [Vercel.com](https://vercel.com) and import `Satyamsharma239/skincare`.
2. Configure settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL=https://lumera-api.onrender.com/api`
3. Click **Deploy**. Your customer store will be live with a free custom SSL domain (e.g., `lumera-store.vercel.app`)!

#### 3. Deploy Admin Portal (Vercel)
1. In Vercel, import the same repository as a new project (e.g., `lumera-admin`).
2. Configure build settings:
   - **Build Command:** `npm run build:admin`
   - **Output Directory:** `dist-admin`
   - **Environment Variable:** `VITE_API_URL=https://lumera-api.onrender.com/api`
3. Click **Deploy**. Your isolated admin portal is now accessible only via your private admin URL!

---

### Option B: Single Ubuntu VPS Deployment (Hostinger / DigitalOcean / AWS EC2)

1. SSH into your VPS and install Node.js + PM2 + Nginx.
2. Clone and build the projects:
   ```bash
   git clone https://github.com/Satyamsharma239/skincare.git
   cd skincare
   npm install
   npm run build
   npm run build:admin
   ```
3. Run the backend API with PM2:
   ```bash
   pm2 start server/index.js --name "lumera-api"
   pm2 startup
   pm2 save
   ```
4. Point Nginx to serve:
   - `yourdomain.com` ➔ `/dist` (Customer Storefront)
   - `admin.yourdomain.com` ➔ `/dist-admin` (Admin Portal)
   - `/api` ➔ Reverse proxy to `http://localhost:5001`

---

## 🔒 Security & Credentials
- **Admin Access PIN:** `1234` (configurable in `src/components/admin/AdminPortal.jsx` or via settings).
- **Storefront Isolation:** Customer frontend contains zero references or access paths to the administrative controls.

---

## 📄 License
ISC
