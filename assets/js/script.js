/* 
  WKNG TEMPLATE UNIVERSAL - ADMIN DASHBOARD
  © 2025 Irvanscx (Irvansc)

  Developer GitHub : https://github.com/irvansc
  Template GitHub  : https://github.com/irvansc/wkng-admin-template-universal
  Instagram        : @irvansc

  Dibuat menggunakan:
  - HTML, CSS, JavaScript
  - Bootstrap 5 & Bootstrap Icons
  - Serta beberapa library open-source lainnya

  Catatan:
  Semua komponen dalam template ini berasal dari internet 
  dan dikustomisasi ulang. Mohon tetap cantumkan kredit ini 
  apabila menggunakan ulang atau memodifikasi template. */

/* ======================================================================
              GLOBAL JS (SIDEBAR, THEME, MOBILE MENU)
====================================================================== */
const body = document.body;
const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuThemeSwitch = document.getElementById("menuThemeSwitch"); // New Switch in Dropdown
const mobileBtn = document.getElementById("mobileMenuBtn"); // [FIX] Grab element
const overlay = document.getElementById("sidebarOverlay"); // [FIX] Grab overlay

// Function to handle Theme Change
function toggleTheme() {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");

    // Update Icons
    if (themeIcon) themeIcon.classList.replace(isLight ? "bi-moon-fill" : "bi-sun-fill", isLight ? "bi-sun-fill" : "bi-moon-fill");

    // Update Local Storage
    localStorage.setItem("wkng_theme", isLight ? "light" : "dark");

    // Sync Checkbox state (if toggled via floating btn)
    if (menuThemeSwitch) menuThemeSwitch.checked = !isLight; // Dark mode = checked

    // Update Revenue Chart Color if exists (DASHBOARD ONLY)
    if (window.revenueChartInstance) {
        window.revenueChartInstance.options.scales.x.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        window.revenueChartInstance.options.scales.y.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        window.revenueChartInstance.update();
    }
}

// Initial Theme Load
if (localStorage.getItem("wkng_theme") === "light") {
    body.classList.add("light-mode");
    if (themeIcon) themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    if (menuThemeSwitch) menuThemeSwitch.checked = false;
} else {
    if (menuThemeSwitch) menuThemeSwitch.checked = true; // Default Dark
}

// Event Listeners
themeToggle?.addEventListener("click", toggleTheme);

// Listener for the new switch inside profile menu
menuThemeSwitch?.addEventListener("change", () => {
    // If checked, we want DARK mode. If unchecked, LIGHT mode.
    // Current logic: light-mode class means Light. No class means Dark.

    if (menuThemeSwitch.checked) {
        // User wants Dark
        if (body.classList.contains("light-mode")) {
            toggleTheme();
        }
    } else {
        // User wants Light
        if (!body.classList.contains("light-mode")) {
            toggleTheme();
        }
    }
});


// [MODIFIED] Sidebar & Mobile Logic
function closeMobileMenu() {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("show");
}

function toggleMobileMenu() {
    sidebar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("show");
}

// Collapse Button Logic (Modified for Mobile Close)
if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
        // Jika layar kecil (mobile), tombol ini jadi tombol CLOSE
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        } else {
            // Desktop: Collapse sidebar biasa
            sidebar.classList.toggle("collapsed");
            body.classList.toggle("sidebar-collapsed");
        }
    });
}

// Mobile Hamburger Button
if (mobileBtn) {
    mobileBtn.addEventListener("click", toggleMobileMenu);
}

// Overlay Click to Close
if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
}


/* ======================================================================
               POS LOGIC SYSTEM
        ====================================================================== */
const productsArray = [
    { id: 1, name: "Salad Bowl Mix", price: 8.50, category: "food", stock: 24, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Pepperoni Pizza", price: 12.00, category: "food", stock: 10, isPromo: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Fruit Cake Slice", price: 4.20, category: "dessert", stock: 15, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Avocado Toast", price: 6.50, category: "food", stock: 8, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Pancakes", price: 7.00, category: "dessert", stock: 12, image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=300&q=80" },
    { id: 9, name: "Iced Coffee", price: 3.50, category: "drink", stock: 50, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80" },
    { id: 10, name: "Berry Smoothie", price: 4.50, category: "drink", stock: 30, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=300&q=80" },
    { id: 11, name: "Burger King", price: 9.50, category: "food", stock: 30, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },

    // Produk Tambahan untuk Demo Style Bawah
    { id: 101, name: "Drill Set Pro", price: 85.00, category: "other", image: "" },
    { id: 103, name: "Luxury Watch", price: 250.00, category: "other", image: "" },
    { id: 105, name: "Latte Art", price: 4.50, category: "drink", image: "" },
    { id: 106, name: "Beef Burger", price: 6.50, category: "food", image: "" },
    { id: 107, name: "French Fries", price: 3.00, category: "food", image: "" },
];

let cart = [];
let currentCategory = 'all';
let searchQuery = '';
let viewMode = 'grid'; // 'grid' or 'list'

function setViewMode(mode) {
    viewMode = mode;
    document.getElementById('btnViewGrid').classList.toggle('active', mode === 'grid');
    document.getElementById('btnViewList').classList.toggle('active', mode === 'list');
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = productsArray.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory || (currentCategory === 'promo' && p.isPromo);
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch && p.id < 100; // Only main items
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="bi bi-search fs-1 mb-3 d-block opacity-25"></i>Produk tidak ditemukan</div>';
        return;
    }

    filtered.forEach(p => {
        const badge = p.isPromo ? `<div class="pos-qty-badge bg-danger">Promo</div>` : `<div class="pos-qty-badge">Stok: ${p.stock}</div>`;

        let html = '';

        if (viewMode === 'grid') {
            // --- GRID VIEW ---
            html = `
                    <div class="col-xl-3 col-lg-4 col-md-6 col-6">
                        <div class="pos-card-gradient" onclick="addToCart(${p.id})">
                            ${badge}
                            <div class="pos-img-wrapper">
                                <img src="${p.image}" alt="${p.name}" loading="lazy">
                                <div class="pos-overlay-grad"></div>
                            </div>
                            <div class="pos-content-grad">
                                <div class="pos-title">${p.name}</div>
                                <div class="d-flex justify-content-between align-items-end mt-2">
                                    <div class="pos-price">$${p.price.toFixed(2)}</div>
                                    <button class="btn btn-sm btn-primary rounded-circle" style="width:32px; height:32px; padding:0;"><i class="bi bi-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        } else {
            // --- LIST VIEW ---
            html = `
                    <div class="col-12">
                        <div class="pos-list-item" onclick="addToCart(${p.id})">
                            <img src="${p.image}" class="list-img" alt="${p.name}">
                            <div class="list-info">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="fw-bold">${p.name}</div>
                                    ${p.isPromo ? '<span class="badge bg-danger" style="font-size:0.6rem">PROMO</span>' : ''}
                                </div>
                                <div class="text-muted small">Stok: ${p.stock} porsi</div>
                            </div>
                            <div class="fw-bold text-accent-purple me-3">$${p.price.toFixed(2)}</div>
                            <div class="list-action"><i class="bi bi-plus-lg"></i></div>
                        </div>
                    </div>`;
        }

        grid.innerHTML += html;
    });
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
                    <div class="empty-cart-state">
                        <i class="bi bi-basket fs-1 mb-2 opacity-25"></i>
                        <p>Keranjang Kosong</p>
                    </div>`;
    } else {
        cart.forEach(item => {
            const product = productsArray.find(p => p.id === item.id);
            // Default image fallback if gallery item has no image
            const imgUrl = product.image || 'https://placehold.co/60?text=Item';

            const html = `
                        <div class="cart-item">
                            <img src="${imgUrl}" class="cart-item-img" alt="img">
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="fw-bold small text-truncate" style="max-width: 120px;">${product.name}</span>
                                    <span class="fw-bold small">$${(product.price * item.qty).toFixed(2)}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-end">
                                    <div class="qty-control">
                                        <div class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="bi bi-dash"></i></div>
                                        <span class="px-2 small fw-bold" style="min-width:20px; text-align:center;">${item.qty}</span>
                                        <div class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="bi bi-plus"></i></div>
                                    </div>
                                    <button class="btn btn-link text-danger p-0 text-decoration-none" style="font-size: 0.8rem;" onclick="removeItem(${item.id})">Hapus</button>
                                </div>
                            </div>
                        </div>
                    `;
            container.innerHTML += html;
        });
    }
    calculateTotals();
}

function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        const product = productsArray.find(p => p.id === item.id);
        subtotal += product.price * item.qty;
    });
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').innerText = '$' + subtotal.toFixed(2);
    document.getElementById('cart-tax').innerText = '$' + tax.toFixed(2);
    document.getElementById('cart-total').innerText = '$' + total.toFixed(2);
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }
    renderCart();
}

function updateQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeItem(id);
        else renderCart();
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function clearCart() {
    if (confirm('Kosongkan keranjang?')) {
        cart = [];
        renderCart();
    }
}

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.category === cat) pill.classList.add('active');
    });
    renderProducts();
}

function filterProducts() {
    searchQuery = document.getElementById('searchInput').value;
    renderProducts();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    const btn = document.querySelector('.btn-checkout');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
    btn.disabled = true;

    setTimeout(() => {
        alert("Pembayaran Berhasil! Struk telah dicetak.");
        cart = [];
        renderCart();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

// Init
renderProducts();
renderCart();

/* ======================================================================
END  POS LOGIC SYSTEM
====================================================================== */