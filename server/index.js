import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'store-db.json');

// Import initial data for bootstrapping
import { INITIAL_PRODUCTS } from '../src/data/initialProducts.js';
import { DEFAULT_SETTINGS, INITIAL_COUPONS, INITIAL_SAMPLE_ORDERS } from '../src/data/defaultSettings.js';

// Load or initialize DB
function getDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading DB, re-initializing:', err);
  }

  const initialDb = {
    products: INITIAL_PRODUCTS,
    orders: INITIAL_SAMPLE_ORDERS,
    coupons: INITIAL_COUPONS,
    settings: DEFAULT_SETTINGS
  };
  saveDb(initialDb);
  return initialDb;
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB:', err);
  }
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const db = getDb();

  res.setHeader('Content-Type', 'application/json');

  // HEALTH
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // PRODUCTS
  if (pathname === '/api/products') {
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(db.products));
      return;
    }
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const newProd = {
        id: `prod-${Date.now()}`,
        inStock: true,
        rating: 4.9,
        reviewsCount: 1,
        ...body
      };
      db.products.unshift(newProd);
      saveDb(db);
      res.writeHead(201);
      res.end(JSON.stringify(newProd));
      return;
    }
  }

  if (pathname.startsWith('/api/products/')) {
    const id = pathname.replace('/api/products/', '');
    const index = db.products.findIndex(p => p.id === id);

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      if (index !== -1) {
        db.products[index] = { ...db.products[index], ...body };
        saveDb(db);
        res.writeHead(200);
        res.end(JSON.stringify(db.products[index]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Product not found' }));
      }
      return;
    }

    if (req.method === 'DELETE') {
      if (index !== -1) {
        const deleted = db.products.splice(index, 1);
        saveDb(db);
        res.writeHead(200);
        res.end(JSON.stringify(deleted[0]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Product not found' }));
      }
      return;
    }
  }

  // ORDERS
  if (pathname === '/api/orders') {
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(db.orders));
      return;
    }
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const newOrder = {
        id: `LUM-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        status: 'New Inquiry',
        ...body
      };
      db.orders.unshift(newOrder);
      saveDb(db);
      res.writeHead(201);
      res.end(JSON.stringify(newOrder));
      return;
    }
  }

  if (pathname.startsWith('/api/orders/')) {
    const id = pathname.replace('/api/orders/', '');
    const index = db.orders.findIndex(o => o.id === id);

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      if (index !== -1) {
        db.orders[index] = { ...db.orders[index], ...body };
        saveDb(db);
        res.writeHead(200);
        res.end(JSON.stringify(db.orders[index]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Order not found' }));
      }
      return;
    }

    if (req.method === 'DELETE') {
      if (index !== -1) {
        const deleted = db.orders.splice(index, 1);
        saveDb(db);
        res.writeHead(200);
        res.end(JSON.stringify(deleted[0]));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Order not found' }));
      }
      return;
    }
  }

  // COUPONS
  if (pathname === '/api/coupons') {
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(db.coupons));
      return;
    }
    if (req.method === 'POST') {
      const body = await parseBody(req);
      db.coupons.push(body);
      saveDb(db);
      res.writeHead(201);
      res.end(JSON.stringify(body));
      return;
    }
  }

  // SETTINGS
  if (pathname === '/api/settings') {
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(db.settings));
      return;
    }
    if (req.method === 'PUT') {
      const body = await parseBody(req);
      db.settings = { ...db.settings, ...body };
      saveDb(db);
      res.writeHead(200);
      res.end(JSON.stringify(db.settings));
      return;
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

const PORT = 5001;
// Bootstrap DB at startup
getDb();

server.listen(PORT, () => {
  console.log(`LUMÈRA Store API running on http://localhost:${PORT}`);
});