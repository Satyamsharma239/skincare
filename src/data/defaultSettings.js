export const DEFAULT_SETTINGS = {
  storeName: "LUMÈRA Clinical Skincare",
  tagline: "Dermatological Actives & Lipid Barrier Science",
  whatsappNumber: "+919876543210", // Owner's WhatsApp number (e.g. +91 98765 43210)
  whatsappDisplayNumber: "+91 98765 43210",
  currency: "₹",
  currencyCode: "INR",
  freeShippingThreshold: 499,
  shippingFee: 79,
  announcementText: "⚡ Complimentary Express Courier on orders above ₹499 • Same-day dispatch via BlueDart & Delhivery • Direct WhatsApp purchase & tracking",
  supportHours: "Mon - Sat: 9:30 AM – 8:00 PM IST",
  businessEmail: "concierge@lumeraskincare.com",
  adminPin: "1234", // Default PIN to access /admin
};

export const INITIAL_COUPONS = [
  {
    code: "WELCOME15",
    discountType: "percentage",
    value: 15,
    minOrder: 799,
    description: "15% OFF your first clinical order above ₹799"
  },
  {
    code: "DUOGLOW",
    discountType: "flat",
    value: 200,
    minOrder: 1199,
    description: "Flat ₹200 OFF on any two active serums above ₹1,199"
  },
  {
    code: "LUMERA400",
    discountType: "flat",
    value: 400,
    minOrder: 1799,
    description: "Flat ₹400 OFF on full routine bundles above ₹1,799"
  },
  {
    code: "GLOW10",
    discountType: "percentage",
    value: 10,
    minOrder: 499,
    description: "10% OFF on all skincare orders above ₹499"
  },
  {
    code: "BARRIER150",
    discountType: "flat",
    value: 150,
    minOrder: 999,
    description: "Flat ₹150 OFF on full barrier routine orders above ₹999"
  },
  {
    code: "DERMAFREE",
    discountType: "shipping",
    value: 0,
    minOrder: 399,
    description: "Free express courier voucher on any order"
  }
];

export const INITIAL_SAMPLE_ORDERS = [
  {
    id: "LUM-94812",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    customer: {
      name: "Rhea Malhotra",
      phone: "+919811234567",
      address: "Apt 502, Orchid Heights, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      notes: "Please pack with extra cushioning, combination skin."
    },
    items: [
      {
        id: "prod-1",
        name: "Radiance 10% Niacinamide + 1% Zinc PCA Serum",
        price: 599,
        quantity: 1,
        size: "30ml"
      },
      {
        id: "prod-2",
        name: "Barrier Defense 5-Ceramide Deep Hydrating Cream",
        price: 649,
        quantity: 1,
        size: "50g"
      }
    ],
    subtotal: 1248,
    discountCode: "GLOW10",
    discountAmount: 125,
    shippingFee: 0,
    total: 1123,
    paymentMethod: "COD (Cash on Delivery)",
    status: "New Inquiry" // New Inquiry | Confirmed | Dispatched | Delivered | Cancelled
  },
  {
    id: "LUM-94780",
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    customer: {
      name: "Aditya Verma",
      phone: "+919876512340",
      address: "Plot 42, Jubilee Hills Road No. 10",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      notes: "Call before dispatch."
    },
    items: [
      {
        id: "prod-3",
        name: "Clarifying 2% Salicylic Acid Pore Cleanser",
        price: 449,
        quantity: 2,
        size: "150ml"
      },
      {
        id: "prod-4",
        name: "Invisible Shield Water Gel Sunscreen SPF 50+ PA++++",
        price: 699,
        quantity: 1,
        size: "50g"
      }
    ],
    subtotal: 1597,
    discountCode: "",
    discountAmount: 0,
    shippingFee: 0,
    total: 1597,
    paymentMethod: "UPI on WhatsApp",
    status: "Confirmed"
  },
  {
    id: "LUM-94625",
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    customer: {
      name: "Meera Sen",
      phone: "+919920198765",
      address: "B-14, Green Park Extension",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110016",
      notes: "First time trying retinol."
    },
    items: [
      {
        id: "prod-5",
        name: "Youth Renewal 0.3% Encapsulated Retinol & Bakuchiol",
        price: 799,
        quantity: 1,
        size: "30ml"
      }
    ],
    subtotal: 799,
    discountCode: "",
    discountAmount: 0,
    shippingFee: 0,
    total: 799,
    paymentMethod: "UPI on WhatsApp",
    status: "Dispatched"
  }
];
