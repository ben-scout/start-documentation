// ========================================
// THEME MANAGEMENT
// ========================================
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    
    window.addEventListener("DOMContentLoaded", () => {
      this.updateThemeIcon(savedTheme);
    });
    
    this.bindToggleButton();
  },

  updateThemeIcon(theme) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  },

  toggleTheme() {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    this.updateThemeIcon(next);
  },

  bindToggleButton() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleTheme());
    }
  }
};

// ========================================
// CAROUSEL FUNCTIONALITY
// ========================================
const CarouselManager = {
  init() {
    this.track = document.querySelector(".carousel-track");
    this.prevBtn = document.querySelector(".carousel-btn.prev");
    this.nextBtn = document.querySelector(".carousel-btn.next");
    this.items = document.querySelectorAll(".carousel-item");
    
    if (!this.track || !this.items.length) return;
    
    this.itemWidth = this.items[0].getBoundingClientRect().width + 16;
    this.currentPosition = 0;
    
    this.bindEvents();
    this.positionButtons();
  },

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.movePrevious());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.moveNext());
    }
    
    window.addEventListener("load", () => this.positionButtons());
    window.addEventListener("resize", () => this.positionButtons());
  },

  movePrevious() {
    this.currentPosition += this.itemWidth;
    if (this.currentPosition > 0) this.currentPosition = 0;
    this.updateTrackPosition();
  },

  moveNext() {
    const containerWidth = document.querySelector(".carousel-track-container").offsetWidth;
    const totalWidth = this.itemWidth * this.items.length;
    const maxScroll = containerWidth - totalWidth;
    
    this.currentPosition -= this.itemWidth;
    if (this.currentPosition < maxScroll) this.currentPosition = maxScroll;
    this.updateTrackPosition();
  },

  updateTrackPosition() {
    this.track.style.transform = `translateX(${this.currentPosition}px)`;
  },

  positionButtons() {
    const reference = document.querySelector(".video-track-height");
    if (!reference || !this.prevBtn || !this.nextBtn) return;
    
    const offset = reference.offsetHeight / 2;
    this.prevBtn.style.top = `${offset}px`;
    this.nextBtn.style.top = `${offset}px`;
  }
};

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
const NavigationManager = {
  init() {
    this.bindHamburgerMenu();
    this.bindLogoReload();
  },

  bindHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const siteHeader = document.querySelector(".site-header");
    
    if (hamburger && siteHeader) {
      hamburger.addEventListener("click", () => {
        siteHeader.classList.toggle("active");
      });
    }
  },

  bindLogoReload() {
    document.addEventListener("DOMContentLoaded", () => {
      const logoLink = document.querySelector(".logo a");
      if (!logoLink) return;

      logoLink.addEventListener("click", (e) => {
        const targetHref = logoLink.getAttribute("href");
        const fullTargetURL = new URL(targetHref, window.location.origin).href;

        if (window.location.href === fullTargetURL) {
          e.preventDefault();
          location.reload();
        }
      });
    });
  },
};


// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  CarouselManager.init();
  NavigationManager.init();
});
