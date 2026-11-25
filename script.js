const products = [
  {
    id: 1,
    title: "SaaS Landing Page Pro",
    cat: "Templates",
    price: 19,
    color: "linear-gradient(135deg,#4f46e5,#06b6d4)",
    icon: "🚀",
    desc: "High-converting responsive SaaS landing page with pricing toggles and smooth scroll animations."
  },
  {
    id: 2,
    title: "Minimalist Design System",
    cat: "UI Kits",
    price: 24,
    color: "linear-gradient(135deg,#ec4899,#8b5cf6)",
    icon: "🎨",
    desc: "40+ accessible buttons, cards, modals, and form components ready for React and vanilla JS."
  },
  {
    id: 3,
    title: "Smart Study & Habit Tracker",
    cat: "Productivity",
    price: 12,
    color: "linear-gradient(135deg,#10b981,#059669)",
    icon: "📅",
    desc: "Interactive daily goal planner with progress bars and local browser storage."
  },
  {
    id: 4,
    title: "Creative Portfolio Grid",
    cat: "Templates",
    price: 15,
    color: "linear-gradient(135deg,#f59e0b,#ef4444)",
    icon: "💼",
    desc: "Filterable project showcase designed for freelancers, writers, and developers."
  },
  {
    id: 5,
    title: "Analytics Dashboard UI",
    cat: "UI Kits",
    price: 29,
    color: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
    icon: "📊",
    desc: "Clean KPI cards, responsive data tables, and dark-mode chart layouts."
  },
  {
    id: 6,
    title: "Book & Reading Log App",
    cat: "Productivity",
    price: 10,
    color: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
    icon: "📚",
    desc: "Track reading lists, favorite quotes, and completion goals across any device."
  }
];

let activeCategory = "All";
let searchQuery = "";
let cart = [];
let selectedProduct = null;

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderProducts() {
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.cat === activeCategory;
    const matchText =
      p.title.toLowerCase().includes(searchQuery) ||
      p.desc.toLowerCase().includes(searchQuery);
    return matchCat && matchText;
  });

  grid.innerHTML = filtered.length
    ? filtered
        .map(
          (p) => `
        <article class="card">
          <div class="card-banner" style="background:${p.color}">${p.icon}</div>
          <div class="card-body">
            <span class="badge">${p.cat}</span>
            <h3>${p.title}</h3>
            <p>${p.desc}</p> <div class="card-footer"> <span class="price">$${p.price}</span>
              <div class="btn-group">
                <button class="btn-outline" onclick="openPreview(${p.id})">Preview</button>
                <button class="btn-add" onclick="addToCart(${p.id})">+ Add</button>
              </div>
            </div>
          </div>
        </article>
      `
        )
        .join("")
    : `<p class="no-results">No matching items found.</p>`;
}

function addToCart(id) {
  const item = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCartUI();
  showToast(`Added "${item.title}"`); }  function removeFromCart(id) { cart = cart.filter((c) => c.id !== id); updateCartUI(); }  function updateCartUI() { const totalQty = cart.reduce((sum, item) => sum + item.qty, 0); const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0); cartCount.textContent = totalQty; cartTotal.textContent = `$${totalPrice}`;
  cartItems.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.title}</strong> <div class="cart-item-meta">$${item.price} ×${item.qty}</div>
          </div>
          <button class="btn-outline" onclick="removeFromCart(${item.id})">Remove</button> </div> ` ) .join("") : `<p class="empty-msg">Your cart is currently empty.</p>`; }  function openPreview(id) { selectedProduct = products.find((p) => p.id === id); document.getElementById("modalCat").textContent = selectedProduct.cat; document.getElementById("modalTitle").textContent = selectedProduct.title; document.getElementById("modalDesc").textContent = selectedProduct.desc; document.getElementById("modalPrice").textContent = `$${selectedProduct.price}`;
  document.getElementById("modalOverlay").classList.add("open");
}

// Event Listeners
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderProducts();
});

document.getElementById("filterGroup").addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
  activeCategory = e.target.dataset.cat;
  renderProducts();
});

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark") ? "☀️ Light" : "🌙 Dark";
});

document.getElementById("openCart").addEventListener("click", () => {
  document.getElementById("cartDrawer").classList.add("open");
});

document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartDrawer").classList.remove("open");
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modalOverlay").classList.remove("open");
});

document.getElementById("modalAddBtn").addEventListener("click", () => {
  if (selectedProduct) addToCart(selectedProduct.id);
  document.getElementById("modalOverlay").classList.remove("open");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) return showToast("Cart is empty!");
  cart = [];
  updateCartUI();
  document.getElementById("cartDrawer").classList.remove("open");
  showToast("Demo order placed successfully!");
});

renderProducts();
updateCartUI();
            
