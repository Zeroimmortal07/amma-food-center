# AMMA Food Center - Mumbai Local Grocery App

A modern, localized grocery shopping experience for Mumbai residents. This web application provides a seamless shopping experience with support for multiple languages and local cultural preferences.

## 🌐 Free Website Hosting

This website is designed to work as a **free static website** using GitHub Pages. No backend server required!

### Quick Deploy to GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. The website will automatically deploy when you push to the `main` branch
4. Your free website URL will be: `https://[your-username].github.io/amma-food-center/`

### Website Pages

- **🏠 Home Page** (`index.html`) - Customer-facing menu and ordering page
- **⚙️ Admin Dashboard** (`admin.html`) - Manage orders and menu items

## Features

- **Multilingual Support**: English and Hindi interface
- **Location-Based Services**: 
  - Personalized greetings
  - Local deals and offers
  - Delivery time estimates based on traffic
- **Voice Search**: Support for multiple languages
- **Local Cultural Integration**:
  - Mumbai-specific products and deals
  - Festive offers and seasonal promotions
- **User-Friendly Interface**:
  - Intuitive category navigation
  - Quick access to favorite items
  - Easy checkout process
- **WhatsApp Integration**: Orders sent directly to WhatsApp

## Project Structure

```
/amma-food-center/
├── index.html           # Home Screen (Public)
├── admin.html           # Admin Dashboard
├── cart.html           # Cart Screen
├── checkout.html       # Checkout Screen
├── config.js           # Configuration (API URL, WhatsApp number)
├── style.css           # Main stylesheet
├── modal.js            # Modal functionality
└── README.md           # Project documentation
```

## Setup Instructions

### Option 1: Free Static Hosting (GitHub Pages)

Simply push to the `main` branch and GitHub Actions will automatically deploy your site. The website will work with demo data.

### Option 2: With Backend Server

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd amma-food-center
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the necessary API keys and configuration

4. Run the development server:
   ```bash
   npm start
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com)
- Images sourced from [Unsplash](https://unsplash.com)
- Localization support powered by custom translation engine