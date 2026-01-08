// Demo data for static site hosting (GitHub Pages)
// Used when backend API is not available

const DEMO_MENU = [
    { id: 1, name: "Masala Dosa", price: 60, category: "Breakfast", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 2, name: "Idli Sambar", price: 40, category: "Breakfast", image: "https://images.unsplash.com/photo-1589301760574-0a6f91d25815?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 3, name: "Veg Thali", price: 120, category: "Lunch", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 4, name: "Rice & Dal", price: 80, category: "Lunch", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 5, name: "Chapati Curry", price: 70, category: "Dinner", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 6, name: "Veg Biryani", price: 100, category: "Dinner", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 7, name: "Samosa", price: 20, category: "Snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80", availability: true },
    { id: 8, name: "Tea", price: 15, category: "Snacks", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=300&q=80", availability: true }
];

const DEMO_ORDERS = [
    { id: "demo-1", name: "Demo Customer", address: "123 Demo Street", phone: "9876543210", items: [{ name: "Masala Dosa", quantity: 2, price: 60 }], totalPrice: 120, status: "pending", timestamp: new Date().toISOString() }
];
