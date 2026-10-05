# 🛒 HARISH MART - Premium E-Commerce Shopping Experience

A modern, high-performance, and responsive e-commerce web platform designed for **HARISH MART**, featuring an expansive catalog across groceries, flagship electronics, trending fashion, home & kitchen appliances, and luxury wellness essentials.

---

## 🌟 Key Features

### 🛍️ Comprehensive Product Catalog
- **Diverse Categories**:
  - 🥬 **Daily Groceries**: Chakki fresh Atta, Refined Sunflower Oil, Aged Basmati Rice, California Almonds, Premium Tea.
  - 📱 **Electronics & Gadgets**: iPhone 16 Pro Max, Sony WH-1000XM5 ANC Headphones, Samsung Galaxy Watch Ultra, Apple MacBook Air M3, Anker 100W GaN Fast Charger.
  - 👕 **Fashion & Apparel**: 100% Supima Cotton Oversized T-Shirts, Levi's 511 Slim Stretch Denim, Nike Air Max Pulse Sneakers, Ray-Ban Polarized Aviators, Fossil Chronograph Watches.
  - 🍳 **Home & Kitchen**: Philips Digital Air Fryers, Prestige Tri-ply Cookware, Dyson V12 Detect Slim Cordless Vacuum, Nespresso Vertuo Coffee Machines.
  - ✨ **Beauty & Wellness**: Minimalist Niacinamide Serums, CeraVe Hydrating Cleansers, Forest Essentials Ayurvedic Hair Oils, Versace Eros Eau De Toilette.

### 🔍 Search & Filtering Experience
- **Instant Live Search**: Real-time debounce auto-complete search with dropdown suggestions as you type.
- **Category Filtering**: Seamless category switching chips with product counters.
- **Sorting Options**:
  - ✨ Featured
  - 💵 Price: Low to High
  - 💎 Price: High to Low
  - ⭐ Highest Customer Rating
  - 🔥 Highest Discount Percentage
- **Dual Display Modes**: Toggle effortlessly between 4-column **Grid View** and compact **List View**.

### ⚡ Interactive Shopping Cart & Free Shipping Meter
- **Slide-over Cart Drawer**: Smooth slide-over animation with frosted glass backdrop blur.
- **Free Shipping Gamification**: Dynamic progress meter showing how much more to add to unlock Free Express Delivery (goal ₹499).
- **Quantity Stepper**: Increment or decrement quantities directly within the cart with real-time total recalculation.
- **Coupon System**:
  - `HARISH25` - 25% OFF on orders over ₹999 (Max ₹500)
  - `WELCOME50` - Flat ₹50 OFF on any order over ₹299
  - `FREESHIP` - Free Delivery with zero minimum threshold
  - `FESTIVE15` - 15% OFF (Max ₹1000)

### 💳 Complete Multi-Step Checkout Flow
- **Step 1 - Shipping Address**: Validation for full name, phone number, street address, city, and 6-digit PIN code.
- **Step 2 - Delivery Speed**: Choose between Standard Free Delivery (1-2 Days) or Instant 2-Hour Express Delivery.
- **Step 3 - Multi-Payment Gateway**:
  - **UPI / QR Code**: Interactive scannable UPI QR code and virtual ID (`harishmart@upi`).
  - **Credit/Debit Card**: Realistic live credit card preview that formats card numbers in real-time as you type!
  - **Cash on Delivery (COD)**: Option to pay cash or UPI at your doorstep.
- **Step 4 - Order Confirmation & Timeline Tracker**:
  - Unique Order ID generation (e.g. `#HM-729481`).
  - Visual order tracking stages: `Order Placed` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`.
  - Printable receipt / invoice button.

### 💖 Wishlist & Quick View
- **One-click Wishlist**: Save favorite items with animated heart toggles; view or transfer them directly to your cart anytime.
- **Product Quick View Modal**: Deep-dive into item specifications, selectable sizes/packs, stock availability, customer ratings, and instant PIN code delivery checker.

### 🤖 Live AI Assistant Widget
- Built-in floating chat assistant ("Harish Mart Assistant") providing instant guidance on:
  - Active discount codes & festive promotions
  - Order tracking by order ID
  - Return & refund guarantees (7-day hassle-free policy)
  - Shipping rates and delivery timeframes

### 🌗 Dark & Light Theme
- One-click toggle between crisp, clean Light theme and sleek OLED Dark theme with full color harmony and shadow depth.

### 🛠️ Store Manager / Admin Portal
- Accessible directly via the **Account > Store Manager** tab:
  - Add new products dynamically with title, category, pricing, MRP, image URL, and description.
  - Persistent browser storage (`localStorage`) so changes remain saved across sessions.
  - Reset to default catalog at any time.

---

## 🚀 How to Run the Website

### Method 1: Instant Direct Launch (Recommended)
Simply double-click the included batch launcher:
```bat
start-harish-mart.bat
```
Or right-click `index.html` and choose **Open with > Google Chrome** or **Microsoft Edge**.

### Method 2: Local HTTP Server (Optional)
If you wish to run on a local HTTP port (e.g., `http://localhost:8080`):
1. Open PowerShell in `c:\HARISH_MART`
2. Run:
```powershell
.\server.ps1
```
The server will start and automatically launch your browser!

---

## 📁 Project Structure

```
c:\HARISH_MART\
├── index.html              # Main HTML5 application shell & components
├── css\
│   └── styles.css          # Modern responsive stylesheet & dark/light themes
├── js\
│   ├── data.js             # Initial product catalog, promo codes, storage helpers
│   ├── app.js              # Business logic, state management, cart calculation
│   └── ui.js               # DOM controller, modals, checkout stepper, chatbot
├── start-harish-mart.bat   # 1-click double-clickable browser launcher
├── server.ps1              # Lightweight local PowerShell HTTP server
└── README.md               # Documentation and feature guide
```

---

## 🏷️ Brand Identity
- **Name**: HARISH MART
- **Tagline**: Daily Essentials & Beyond
- **Helpline**: +91 98765 43210
- **Location**: Plot 42, MG Road, Bengaluru, KA 560001
## 🏷️ Brand Identity

- **Name**: HARISH MART
- **Tagline**: Daily Essentials & Beyond
- **Helpline**: +91 98765 43210
- **Location**: Plot 42, MG Road, Bengaluru, KA 560001
# HARISH_MART