// Mock menu data for fallback when backend is unavailable
const MOCK_MENU_DATA = [
    {
        id: 1,
        name: "Idli (2 pcs)",
        price: 40,
        category: "Breakfast",
        description: "Soft steamed rice cakes with sambar & chutney",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 2,
        name: "Masala Dosa",
        price: 60,
        category: "Breakfast",
        description: "Crispy dosa with potato masala filling",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 3,
        name: "Vada (2 pcs)",
        price: 35,
        category: "Breakfast",
        description: "Crispy fried lentil donuts",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 4,
        name: "Upma",
        price: 45,
        category: "Breakfast",
        description: "Savory semolina with vegetables",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 5,
        name: "Pongal",
        price: 50,
        category: "Breakfast",
        description: "Comforting rice & lentil dish",
        image: "https://images.unsplash.com/photo-1645696261268-d2d9f2fd2a93?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 6,
        name: "Sambar Rice",
        price: 70,
        category: "Lunch",
        description: "Rice mixed with tangy sambar",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 7,
        name: "Curd Rice",
        price: 60,
        category: "Lunch",
        description: "Cooling yogurt rice with tempering",
        image: "https://images.unsplash.com/photo-1626309185426-c1e6c0b9c45f?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 8,
        name: "Puliyodarai",
        price: 65,
        category: "Lunch",
        description: "Tangy tamarind rice",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 9,
        name: "Veg Meals",
        price: 100,
        category: "Lunch",
        description: "Full south Indian thali with rice, sambar, rasam, 2 curries",
        image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 10,
        name: "Lemon Rice",
        price: 60,
        category: "Lunch",
        description: "Tangy rice with peanuts and curry leaves",
        image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 11,
        name: "Chapati (3 pcs)",
        price: 45,
        category: "Dinner",
        description: "Soft wheat flatbreads with curry",
        image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 12,
        name: "Parotta (2 pcs)",
        price: 50,
        category: "Dinner",
        description: "Flaky layered flatbread with kurma",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 13,
        name: "Poori (3 pcs)",
        price: 50,
        category: "Dinner",
        description: "Puffed fried bread with potato curry",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 14,
        name: "Fried Rice",
        price: 80,
        category: "Dinner",
        description: "Vegetable fried rice with manchurian",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 15,
        name: "Noodles",
        price: 80,
        category: "Dinner",
        description: "Hakka noodles with vegetables",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 16,
        name: "Filter Coffee",
        price: 25,
        category: "Beverages",
        description: "Strong south Indian filter coffee",
        image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 17,
        name: "Tea",
        price: 20,
        category: "Beverages",
        description: "Hot masala chai",
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 18,
        name: "Buttermilk",
        price: 15,
        category: "Beverages",
        description: "Refreshing spiced buttermilk",
        image: "https://images.unsplash.com/photo-1623399024029-f040d37e6326?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 19,
        name: "Sweet Lassi",
        price: 30,
        category: "Beverages",
        description: "Creamy yogurt drink",
        image: "https://images.unsplash.com/photo-1622116311199-6e62d9e69d15?w=400&h=300&fit=crop",
        availability: true
    },
    {
        id: 20,
        name: "Payasam",
        price: 40,
        category: "Desserts",
        description: "Traditional sweet pudding",
        image: "https://images.unsplash.com/photo-1642462908995-cc9edb3e7089?w=400&h=300&fit=crop",
        availability: true
    }
];
