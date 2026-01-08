const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5500;

// Data files - Use /data for Render persistent disk, fallback to local for dev
const DATA_DIR = process.env.NODE_ENV === 'production' && process.env.RENDER ? '/data' : __dirname;
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure data directory exists (for Render persistent disk)
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure data files exist
if (!fs.existsSync(MENU_FILE)) {
    fs.writeFileSync(MENU_FILE, JSON.stringify([
        { id: 1, name: "Masala Dosa", price: 70, category: "Breakfast", image: "https://images.unsplash.com/photo-1589301760574-0a6f91d25815?auto=format&fit=crop&w=300&q=80", availability: true },
        { id: 2, name: "Idli Sambar", price: 50, category: "Breakfast", image: "https://images.unsplash.com/photo-1589301760574-0a6f91d25815?auto=format&fit=crop&w=300&q=80", availability: true },
        { id: 3, name: "Veg Meals", price: 120, category: "Lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80", availability: true },
        { id: 4, name: "Chicken Curry", price: 150, category: "Dinner", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80", availability: true }
    ], null, 2));
}

if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper functions
function readJSON(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        return [];
    }
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

// Parse multipart form data for file uploads
function parseMultipart(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            try {
                const buffer = Buffer.concat(chunks);
                const contentType = req.headers['content-type'] || '';
                const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
                const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null;
                
                if (!boundary) {
                    console.log('No boundary found in:', contentType);
                    resolve({ fileName: null, fileType: null, fileData: null });
                    return;
                }

                const boundaryBuffer = Buffer.from('--' + boundary);
                const bufferStr = buffer.toString('binary');
                const parts = bufferStr.split('--' + boundary);
                
                let fileData = null;
                let fileName = null;
                let fileType = null;

                for (const part of parts) {
                    if (part.includes('filename="') && part.includes('Content-Type')) {
                        // Extract filename
                        const filenameMatch = part.match(/filename="([^"]+)"/);
                        if (filenameMatch) {
                            fileName = filenameMatch[1];
                        }

                        // Extract content type
                        const contentTypeMatch = part.match(/Content-Type:\s*([^\r\n]+)/i);
                        if (contentTypeMatch) {
                            fileType = contentTypeMatch[1].trim();
                        }

                        // Extract file data (after double CRLF)
                        const headerEnd = part.indexOf('\r\n\r\n');
                        if (headerEnd !== -1) {
                            const dataStart = headerEnd + 4;
                            let dataEnd = part.length;
                            // Remove trailing CRLF before boundary
                            if (part.endsWith('\r\n--') || part.endsWith('\r\n')) {
                                dataEnd = part.lastIndexOf('\r\n');
                            }
                            if (dataStart < dataEnd) {
                                fileData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');
                            }
                        }
                    }
                }

                console.log('📤 Parsed upload:', fileName, fileType, fileData ? fileData.length + ' bytes' : 'no data');
                resolve({ fileName, fileType, fileData });
            } catch (e) {
                console.error('Parse error:', e);
                resolve({ fileName: null, fileType: null, fileData: null });
            }
        });
        req.on('error', reject);
    });
}

function sendJSON(res, data, status = 200) {
    res.writeHead(status, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // === API ROUTES ===

    // GET /api/health - Health check endpoint for Render
    if (pathname === '/api/health' && method === 'GET') {
        return sendJSON(res, { 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    }

    // GET /api/menu - Get all menu items
    if (pathname === '/api/menu' && method === 'GET') {
        const menu = readJSON(MENU_FILE);
        return sendJSON(res, menu);
    }

    // POST /api/menu - Add new menu item
    if (pathname === '/api/menu' && method === 'POST') {
        try {
            const body = await parseBody(req);
            console.log('📥 Adding menu item:', body);
            
            if (!body.name || !body.price) {
                return sendJSON(res, { success: false, error: 'Name and price are required' }, 400);
            }
            
            const menu = readJSON(MENU_FILE);
            const newItem = {
                id: Date.now(),
                name: body.name,
                price: Number(body.price),
                category: body.category || 'Snacks',
                description: body.description || '',
                image: body.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
                availability: body.availability !== false
            };
            menu.push(newItem);
            writeJSON(MENU_FILE, menu);
            console.log('✅ New menu item added:', newItem.name, '- ₹' + newItem.price);
            return sendJSON(res, { success: true, item: newItem }, 201);
        } catch (error) {
            console.error('❌ Error adding menu item:', error);
            return sendJSON(res, { success: false, error: error.message }, 500);
        }
    }

    // PATCH /api/menu/:id - Update menu item
    if (pathname.match(/^\/api\/menu\/\d+$/) && method === 'PATCH') {
        const id = parseInt(pathname.split('/').pop());
        const body = await parseBody(req);
        const menu = readJSON(MENU_FILE);
        const index = menu.findIndex(item => item.id === id);
        if (index !== -1) {
            menu[index] = { ...menu[index], ...body };
            writeJSON(MENU_FILE, menu);
            console.log('✅ Menu item updated:', menu[index].name);
            return sendJSON(res, { success: true, item: menu[index] });
        }
        return sendJSON(res, { error: 'Item not found' }, 404);
    }

    // DELETE /api/menu/:id - Delete menu item
    if (pathname.match(/^\/api\/menu\/\d+$/) && method === 'DELETE') {
        const id = parseInt(pathname.split('/').pop());
        let menu = readJSON(MENU_FILE);
        const item = menu.find(i => i.id === id);
        menu = menu.filter(item => item.id !== id);
        writeJSON(MENU_FILE, menu);
        console.log('🗑️ Menu item deleted:', item?.name || id);
        return sendJSON(res, { success: true });
    }

    // GET /api/orders - Get all orders
    if (pathname === '/api/orders' && method === 'GET') {
        const orders = readJSON(ORDERS_FILE);
        return sendJSON(res, orders.reverse()); // Newest first
    }

    // POST /api/orders - Create new order
    if (pathname === '/api/orders' && method === 'POST') {
        const body = await parseBody(req);
        const orders = readJSON(ORDERS_FILE);
        const newOrder = {
            id: Date.now().toString(),
            name: body.name,
            phone: body.phone || '',
            address: body.address,
            items: body.items,
            totalPrice: body.totalPrice,
            status: 'pending',
            paymentStatus: 'pending',
            timestamp: new Date().toISOString()
        };
        orders.push(newOrder);
        writeJSON(ORDERS_FILE, orders);
        console.log('🍛 New order received from:', newOrder.name, '- ₹' + newOrder.totalPrice);
        return sendJSON(res, { success: true, order: newOrder }, 201);
    }

    // PATCH /api/orders/:id/status - Update order status
    if (pathname.match(/^\/api\/orders\/\d+\/status$/) && method === 'PATCH') {
        const id = pathname.split('/')[3];
        const body = await parseBody(req);
        const orders = readJSON(ORDERS_FILE);
        const index = orders.findIndex(order => order.id === id);
        if (index !== -1) {
            orders[index].status = body.status;
            writeJSON(ORDERS_FILE, orders);
            console.log('📦 Order status updated:', id, '->', body.status);
            return sendJSON(res, { success: true });
        }
        return sendJSON(res, { error: 'Order not found' }, 404);
    }

    // PATCH /api/orders/:id/payment - Update payment status
    if (pathname.match(/^\/api\/orders\/\d+\/payment$/) && method === 'PATCH') {
        const id = pathname.split('/')[3];
        const body = await parseBody(req);
        const orders = readJSON(ORDERS_FILE);
        const index = orders.findIndex(order => order.id === id);
        if (index !== -1) {
            orders[index].paymentStatus = body.paymentStatus;
            writeJSON(ORDERS_FILE, orders);
            console.log('💳 Payment status updated:', id, '->', body.paymentStatus);
            return sendJSON(res, { success: true });
        }
        return sendJSON(res, { error: 'Order not found' }, 404);
    }

    // DELETE /api/orders/:id - Delete order
    if (pathname.match(/^\/api\/orders\/\d+$/) && method === 'DELETE') {
        const id = pathname.split('/').pop();
        let orders = readJSON(ORDERS_FILE);
        orders = orders.filter(order => order.id !== id);
        writeJSON(ORDERS_FILE, orders);
        console.log('🗑️ Order deleted:', id);
        return sendJSON(res, { success: true });
    }

    // POST /api/upload - Handle image upload
    if (pathname === '/api/upload' && method === 'POST') {
        try {
            console.log('📤 Upload request received');
            const { fileName, fileType, fileData } = await parseMultipart(req);
            
            if (!fileData || !fileName) {
                console.log('❌ No file data received');
                return sendJSON(res, { success: false, error: 'No file received' }, 400);
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (fileType && !allowedTypes.includes(fileType)) {
                console.log('❌ Invalid file type:', fileType);
                return sendJSON(res, { success: false, error: 'Invalid file type. Use JPG, PNG, GIF, or WebP' }, 400);
            }

            // Generate unique filename
            const ext = path.extname(fileName) || '.jpg';
            const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
            const uploadPath = path.join(UPLOADS_DIR, uniqueName);

            // Ensure uploads directory exists
            if (!fs.existsSync(UPLOADS_DIR)) {
                fs.mkdirSync(UPLOADS_DIR, { recursive: true });
            }

            // Save file
            fs.writeFileSync(uploadPath, fileData);
            
            // Return the URL path to access the image
            const imageUrl = `/uploads/${uniqueName}`;
            console.log('✅ Image saved:', uniqueName, '(' + fileData.length + ' bytes)');
            
            return sendJSON(res, { success: true, imageUrl });
        } catch (error) {
            console.error('❌ Upload error:', error);
            return sendJSON(res, { success: false, error: 'Upload failed: ' + error.message }, 500);
        }
    }

    // Catch-all for unhandled API routes
    if (pathname.startsWith('/api/')) {
        console.log('⚠️ Unhandled API route:', method, pathname);
        return sendJSON(res, { success: false, error: 'API endpoint not found: ' + pathname }, 404);
    }

    // === STATIC FILE SERVING ===
    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Serve uploaded files from uploads directory
    if (pathname.startsWith('/uploads/')) {
        const uploadPath = path.join(UPLOADS_DIR, pathname.replace('/uploads/', ''));
        if (fs.existsSync(uploadPath)) {
            const ext = path.extname(uploadPath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const content = fs.readFileSync(uploadPath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
            return;
        }
    }

    // Remove query string
    filePath = filePath.split('?')[0];

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('🍛 ═══════════════════════════════════════════════');
    console.log('   AMMA FOOD CENTER - Server Running!');
    console.log('═══════════════════════════════════════════════════');
    if (process.env.RENDER) {
        console.log(`☁️  Running on Render (Production)`);
        console.log(`📁 Data directory: ${DATA_DIR}`);
    } else {
        console.log(`📱 Home Page:  http://localhost:${PORT}/`);
        console.log(`⚙️  Admin Page: http://localhost:${PORT}/admin.html`);
    }
    console.log(`📡 API:        /api/menu, /api/orders`);
    console.log(`❤️  Health:     /api/health`);
    console.log('═══════════════════════════════════════════════════');
    console.log('');
});
