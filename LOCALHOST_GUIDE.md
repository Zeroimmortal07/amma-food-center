# Localhost Access Guide

## Quick Start - Run the Application Locally

You can run the application locally using any simple HTTP server. Here are the easiest methods:

### Method 1: Using Python (Recommended)

If you have Python installed, run this command in the project directory:

```bash
# For Python 3.x
python3 -m http.server 8080

# For Python 2.x
python -m SimpleHTTPServer 8080
```

Then access:
- **Home Page (Customer)**: http://localhost:8080/index.html
- **Admin Dashboard**: http://localhost:8080/admin.html

### Method 2: Using Node.js

If you have Node.js installed, you can install and use `http-server`:

```bash
# Install http-server globally (one-time setup)
npm install -g http-server

# Run the server
http-server -p 8080
```

Then access:
- **Home Page (Customer)**: http://localhost:8080/index.html
- **Admin Dashboard**: http://localhost:8080/admin.html

### Method 3: Using Live Server (VS Code)

If you use VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html` or `admin.html`
3. Select "Open with Live Server"

### Method 4: Direct File Access (Limited)

You can open the HTML files directly in your browser, but some features may not work due to CORS restrictions:
- Open `index.html` directly from your file explorer
- Open `admin.html` directly from your file explorer

## Pages Available

### 🏠 Home Page (index.html)
- **URL**: http://localhost:8080/index.html
- **Purpose**: Customer-facing menu and ordering page
- **Features**:
  - Browse menu items (20 items across 5 categories)
  - Add items to cart
  - Place orders via WhatsApp
  - Category filtering (Breakfast, Lunch, Dinner, Beverages, Desserts)

### 🔧 Admin Dashboard (admin.html)
- **URL**: http://localhost:8080/admin.html
- **Purpose**: Manage orders and menu
- **Features**:
  - View all orders
  - Update order status
  - Manage menu items
  - Upload menu data

## Important Notes

1. **Backend API**: The application tries to fetch data from `/api` endpoints. Since there's no backend server running, it falls back to mock data in `menu-data.js`.

2. **Port**: You can use any available port instead of 8080. Just replace `8080` with your desired port number.

3. **Browser Compatibility**: The application works best in modern browsers (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### Issue: "Address already in use"
If port 8080 is already taken, use a different port:
```bash
python3 -m http.server 8888
```
Then access at http://localhost:8888/

### Issue: Menu not loading
Make sure:
- The server is running
- You're accessing the page via http://localhost (not file://)
- The `menu-data.js` file exists in the project directory
