// localStorage ko backend ka "mirror/backup" ki tarah use karta hai
// Har cheez asal mein backend (SQL Server) se aati hai; yahan sirf copy save hoti hai

const KEYS = {
  USERS: "db_users",
  PRODUCTS: "db_products",
  CARTS: "db_carts", // { [userId]: [ cart items... ] }
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Users mirror ----------
export function getUsersMirror() {
  return read(KEYS.USERS, []);
}

export function addUserToMirror(user) {
  const users = getUsersMirror();
  const exists = users.find((u) => u.email === user.email);
  if (!exists) {
    users.push(user);
    write(KEYS.USERS, users);
  }
}

// ---------- Products mirror ----------
export function getProductsMirror() {
  return read(KEYS.PRODUCTS, []);
}

export function saveProductsMirror(products) {
  write(KEYS.PRODUCTS, products);
}

// ---------- Cart mirror (per user) ----------
export function getCartMirror(userId) {
  const carts = read(KEYS.CARTS, {});
  return carts[userId] || [];
}

export function saveCartMirror(userId, items) {
  const carts = read(KEYS.CARTS, {});
  carts[userId] = items;
  write(KEYS.CARTS, carts);
}
