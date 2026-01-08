// Customer Phone Number Enhancement for Frontend
// Add WhatsApp number field to checkout modal

window.addEventListener('DOMContentLoaded', () => {
    // Find the checkout form and add phone field
    const customerNameDiv = document.querySelector('[id="customer-name"]')?.parentElement;

    if (customerNameDiv) {
        // Create phone number field
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
            <label class="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
            <input type="tel" id="customer-phone" 
                class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Enter WhatsApp number (e.g., 9876543210)" 
                required>
        `;

        // Insert after name field
        customerNameDiv.parentElement.insertBefore(phoneDiv, customerNameDiv.nextSibling);
    }

    // Override processCheckout to include phone
    const originalProcessCheckout = window.processCheckout;

    window.processCheckout = async function () {
        const name = document.getElementById('customer-name').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        const address = document.getElementById('customer-address').value.trim();

        if (!name || !phone || !address) {
            alert("⚠️ Please enter your name, WhatsApp number, and address.");
            return;
        }

        // Access cart and menuItems from window scope (set by index.html module)
        const cartData = window.cart || {};
        const menuItemsData = window.menuItems || [];

        // Prepare Order Data
        let totalPrice = 0;
        const items = [];

        Object.entries(cartData).forEach(([id, qty]) => {
            const item = menuItemsData.find(i => i.id == id);
            if (item) {
                const itemTotal = item.price * qty;
                totalPrice += itemTotal;
                items.push({
                    name: item.name,
                    quantity: qty,
                    price: item.price,
                    total: itemTotal
                });
            }
        });

        const orderData = {
            name,
            phone,
            address,
            items,
            totalPrice
        };

        // Submit to Backend
        try {
            const response = await fetch(`${CONFIG.API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const result = await response.json();
            console.log("✅ Backend Response:", result);
        } catch (error) {
            console.error("❌ Error submitting order:", error);
            alert("Could not save order to backend. Proceeding to WhatsApp...");
        }

        // Redirect to WhatsApp
        let orderText = `*🍛 New Order from ${name}*\n\n`;
        items.forEach(item => {
            orderText += `${item.quantity} × ${item.name} - ₹${item.total}\n`;
        });
        orderText += `\n*Total: ₹${totalPrice}*`;
        orderText += `\n\n📍 *Delivery Address:*\n${address}`;
        orderText += `\n\n📱 *WhatsApp:* ${phone}`;

        const encodedText = encodeURIComponent(orderText);
        const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedText}`;

        window.open(waUrl, '_blank');
        closeCheckoutModal();

        // Clear cart by removing all keys from the shared object
        // This preserves the object reference so both window.cart and the module's cart stay in sync
        Object.keys(window.cart).forEach(key => delete window.cart[key]);
        
        if (typeof window.updateCartUI === 'function') {
            window.updateCartUI();
        }
        if (typeof window.renderMenu === 'function') {
            window.renderMenu();
        }
    };

    console.log('📱 WhatsApp number field added to checkout');
});
