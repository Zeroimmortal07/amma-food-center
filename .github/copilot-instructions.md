# Copilot Instructions for Amma Food Center

## Project Overview

Mumbai-based food ordering web app with customer-facing storefront and admin dashboard. Pure vanilla JavaScript frontend with a Node.js backend—no frameworks.

## Architecture

### Core Components
- **Frontend**: Static HTML pages (`index.html`, `admin.html`, `cart.html`, `checkout.html`) using Tailwind CSS via CDN
- **Backend**: Single-file Node.js server ([server.js](../server.js)) handling API routes and static file serving
- **Data**: JSON file storage (`menu.json`, `orders.json`)—no database

### Data Flow
```
Customer: index.html → API → orders.json → admin.html (live view)
Admin: admin.html → API → menu.json → index.html (sync via localStorage)
```

### Key Files
| File | Purpose |
|------|---------|
| [server.js](../server.js) | HTTP server with REST API and static file serving |
| [config.js](../config.js) | Frontend configuration (API URL, WhatsApp number) |
| [sync.js](../sync.js) | Admin-to-frontend menu sync via localStorage |
| [customer-phone.js](../customer-phone.js) | Checkout enhancement for WhatsApp integration |
| [modal.js](../modal.js) | Reusable accessible modal component (ES module) |

## API Endpoints

All endpoints at `/api/*` (CORS enabled):

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Fetch menu items |
| POST | `/api/menu` | Add menu item (name, price required) |
| PATCH | `/api/menu/:id` | Update menu item |
| DELETE | `/api/menu/:id` | Delete menu item |
| GET | `/api/orders` | Fetch orders (newest first) |
| POST | `/api/orders` | Create order |
| PATCH | `/api/orders/:id/status` | Update order status |
| PATCH | `/api/orders/:id/payment` | Update payment status |
| POST | `/api/upload` | Image upload (multipart/form-data) |

## Development Commands

```bash
npm start         # Run Node.js server on port 5500
npm run dev       # Webpack dev server on port 8080 (HMR)
npm run build     # Production webpack build to dist/
```

## Conventions

### Currency & Locale
- All prices in Indian Rupees (₹)
- Use `₹` prefix, no decimals: `₹120`, not `Rs. 120.00`

### Order Status Values
- `pending`, `preparing`, `out-for-delivery`, `delivered`
- Payment: `pending`, `done`

### Image Handling
- Uploaded images go to `/uploads/` directory
- URL format: `/uploads/{timestamp}-{random}.{ext}`
- External URLs (Unsplash) also supported for menu items

### Frontend Patterns
- Cart stored in `localStorage` as object: `{ itemId: quantity }`
- WhatsApp integration via `CONFIG.WHATSAPP_NUMBER` in config.js
- Menu sync flag: `localStorage.menuUpdated`

### Code Style
- No build step required for frontend—scripts loaded directly in HTML
- Tailwind utility classes for styling (CDN, no config)
- Inline `<style>` blocks for custom CSS variables and animations
- Console logging with emoji prefixes: `🍛`, `📦`, `✅`, `❌`

## Testing

No test framework configured. Manual testing:
1. Start server: `npm start`
2. Customer flow: `http://localhost:5500/`
3. Admin flow: `http://localhost:5500/admin.html`

## Common Tasks

### Adding a new API endpoint
Add route in [server.js](../server.js) inside the `http.createServer` callback, following pattern:
```javascript
if (pathname === '/api/endpoint' && method === 'GET') {
    return sendJSON(res, data);
}
```

### Modifying menu categories
Update both:
- Default menu in [server.js](../server.js) line ~16
- Category dropdown in [admin.html](../admin.html) `#new-category` select
