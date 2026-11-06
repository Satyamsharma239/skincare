# 🌿 LUMÈRA — Clinical Skincare Platform & Operations Portal

A modern, high-converting D2C skincare e-commerce platform and operations portal built for the Indian market.

Inspired by industry leaders like **Plum Goodness**, **Simple Skincare**, **Vilvah Store**, and **Kimirica**.

---

## ⚡ 1-Click Free Live Deployment (NO Backend Server Needed!)

You can deploy this entire store **100% free** on **Vercel** or **Netlify** in under 60 seconds with **zero server setup and zero monthly costs**:

### Deploy on Vercel:
1. Sign in to [Vercel.com](https://vercel.com/) with your GitHub account.
2. Click **Add New…** ➔ **Project**.
3. Select your repository: `Satyamsharma239/skincare`.
4. Leave settings as default:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**!
   - 🎉 **Customer Storefront:** `https://your-project.vercel.app`
   - 🛡️ **Admin Portal:** `https://your-project.vercel.app/admin` *(Security PIN: `1234`)*

---

## 💡 How It Works Without a Backend

1. **Direct WhatsApp Ordering:**
   - When a customer clicks "Place Order" or "Quick Buy", the site generates a complete order breakdown (customer name, delivery address, phone, PIN code, products, discounts, and total) and opens **WhatsApp directly with the store owner's number**.
   - No database server or payment gateway setup is required to start taking orders immediately!

2. **Indian PIN Code Intelligence:**
   - 6-digit PIN code lookup is embedded client-side. Automatically validates delivery timelines and Cash on Delivery (COD) eligibility across 19,000+ Indian PIN codes.

3. **Persistent Local Storage:**
   - Shopping bag, wishlist, coupons, and orders are safely stored in browser `localStorage`.
   - The `/admin` portal reads and manages the orders and inventory directly from the browser.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation
```bash
git clone https://github.com/Satyamsharma239/skincare.git
cd skincare
npm install
```

### Running Locally (Standalone Frontend Mode)
```bash
npm run dev
```
- Customer Store: [http://localhost:5173](http://localhost:5173)
- Admin Portal: [http://localhost:5173/admin](http://localhost:5173/admin) *(PIN: `1234`)*

---

## 🔌 Optional: Full-Stack Mode (With Node.js Backend)

If you ever wish to run the Node.js Express REST API server alongside the frontend:

```bash
# Terminal 1: Backend API (Port 5001)
npm run dev:api

# Terminal 2: Customer Storefront (Port 5173)
npm run dev:customer

# Terminal 3: Dedicated Admin Portal (Port 5174)
npm run dev:admin
```

---

## 🔒 Security
- **Admin Access PIN:** `1234` (configurable in `src/components/admin/AdminPortal.jsx`).
- **Storefront Isolation:** The customer storefront contains zero navigation links to the `/admin` route.

---

## 📄 License
ISC
