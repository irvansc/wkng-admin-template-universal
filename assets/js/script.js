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