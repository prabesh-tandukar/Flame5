// ================================
// FLAME 5 - INTERACTIVE FEATURES
// ================================

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initScrollNavbar();
  initParallaxEffect();
  initCardHoverEffects();
  initMobileQuickNav();
});

// ================================
// MOBILE MENU
// ================================
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !menuToggle.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  }
}

// ================================
// QUICK NAVIGATION (MOBILE & DESKTOP)
// ================================
function initMobileQuickNav() {
  const quickNavItems = document.querySelectorAll(".quick-nav-item");
  const sections = document.querySelectorAll(".menu-category");

  // Highlight active section on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.pageYOffset + 250;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Update active state
    quickNavItems.forEach((item) => {
      item.classList.remove("active");
      const href = item.getAttribute("href").substring(1);
      if (href === current) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll on click with animations
  quickNavItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = document.querySelector(".floating-nav").offsetHeight;
        const quickNavSection = document.querySelector(".quick-nav-section");
        const quickNavHeight = quickNavSection
          ? quickNavSection.offsetHeight
          : 0;
        const targetPosition =
          targetSection.offsetTop - navHeight - quickNavHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add active state immediately with animation
        quickNavItems.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");

        // Add pulse effect
        this.style.animation = "none";
        setTimeout(() => {
          this.style.animation = "";
        }, 10);
      }
    });
  });
}

// ================================
// SCROLL ANIMATIONS
// ================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation for menu cards
        if (entry.target.classList.contains("menu-card")) {
          const cards =
            entry.target.parentElement.querySelectorAll(".menu-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, index * 100);
          });
        }

        // Add staggered animation for drink cards
        if (entry.target.classList.contains("drink-card-special")) {
          const drinks = entry.target.parentElement.querySelectorAll(
            ".drink-card-special",
          );
          drinks.forEach((drink, index) => {
            setTimeout(() => {
              drink.classList.add("visible");
            }, index * 150);
          });
        }

        // Deal cards animation
        if (entry.target.classList.contains("deal-card")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 200);
        }

        // Contact section animations
        if (entry.target.classList.contains("contact-info-box")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 100);
        }

        if (entry.target.classList.contains("contact-cta")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 300);
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".menu-card, .drink-card-special, .deal-card, .contact-info-box, .contact-cta",
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ================================
// SMOOTH SCROLL
// ================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navHeight = document.querySelector(".floating-nav").offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ================================
// NAVBAR SCROLL EFFECT
// ================================
function initScrollNavbar() {
  const navbar = document.querySelector(".floating-nav");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for style changes
    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
}

// ================================
// PARALLAX EFFECT
// ================================
function initParallaxEffect() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const hero = document.querySelector(".hero-content");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - scrolled / 600;
    }

    // Background animation
    const heroBg = document.querySelector(".hero-bg-animation");
    if (heroBg) {
      heroBg.style.transform = `scale(${1 + scrolled * 0.0005})`;
    }
  });
}

// ================================
// CARD HOVER EFFECTS
// ================================
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add glow effect
      this.style.boxShadow = "0 20px 60px rgba(255, 102, 0, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });

    // 3D tilt effect
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

// ================================
// PRICE ANIMATION ON SCROLL
// ================================
function animatePrices() {
  const prices = document.querySelectorAll(".item-price");

  prices.forEach((price) => {
    price.addEventListener("mouseenter", function () {
      const priceText = this.textContent;
      let count = 0;
      const target = parseFloat(priceText.replace("$", ""));

      const interval = setInterval(() => {
        if (count >= target) {
          clearInterval(interval);
        } else {
          count += target / 20;
          this.textContent = `$${count.toFixed(2)}`;
        }
      }, 30);
    });
  });
}

// ================================
// FLOATING ORDER BUTTON EFFECT
// ================================
function initFloatingButton() {
  const floatingBtn = document.querySelector(".floating-order-btn");

  if (floatingBtn) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;

      if (scrolled > 300) {
        floatingBtn.style.opacity = "1";
        floatingBtn.style.transform = "translateY(0)";
      } else {
        floatingBtn.style.opacity = "0";
        floatingBtn.style.transform = "translateY(100px)";
      }
    });

    // Pulse effect on hover
    floatingBtn.addEventListener("mouseenter", function () {
      this.style.animation = "none";
    });

    floatingBtn.addEventListener("mouseleave", function () {
      this.style.animation = "floatButton 3s ease-in-out infinite";
    });
  }
}

// Initialize floating button
initFloatingButton();

// ================================
// LOADING ANIMATION
// ================================
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ================================
// FEATURED BADGE ANIMATIONS
// ================================
function animateBadges() {
  const badges = document.querySelectorAll(".featured-badge");

  badges.forEach((badge) => {
    setInterval(() => {
      badge.style.animation = "none";
      setTimeout(() => {
        badge.style.animation = "badgePulse 2s ease-in-out infinite";
      }, 10);
    }, 3000);
  });
}

animateBadges();

// ================================
// CATEGORY ICON ANIMATIONS
// ================================
function initCategoryIcons() {
  const icons = document.querySelectorAll(".category-icon");

  const iconObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "iconFloat 3s ease-in-out infinite";
        }
      });
    },
    { threshold: 0.5 },
  );

  icons.forEach((icon) => {
    iconObserver.observe(icon);
  });
}

initCategoryIcons();

// ================================
// DRINK CARD HOVER EFFECTS
// ================================
function initDrinkCards() {
  const drinkCards = document.querySelectorAll(".drink-card-special");

  drinkCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".drink-icon");
      if (icon) {
        icon.style.transform = "scale(1.2) rotate(10deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".drink-icon");
      if (icon) {
        icon.style.transform = "";
      }
    });
  });
}

initDrinkCards();

// ================================
// DEAL CARD GLOW EFFECT
// ================================
function initDealCards() {
  const dealCards = document.querySelectorAll(".deal-card");

  dealCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 102, 0, 0.15), rgba(26, 26, 26, 0.9))`;
    });

    card.addEventListener("mouseleave", function () {
      if (this.classList.contains("premium")) {
        this.style.background =
          "linear-gradient(135deg, rgba(255, 204, 0, 0.1) 0%, rgba(26, 26, 26, 0.9) 100%)";
      } else {
        this.style.background = "rgba(26, 26, 26, 0.9)";
      }
    });
  });
}

initDealCards();

// ================================
// SCROLL PROGRESS INDICATOR
// ================================
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6600, #ff3300);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

initScrollProgress();

// ================================
// ACTIVE NAV LINK HIGHLIGHT
// ================================
function initActiveNavLinks() {
  const sections = document.querySelectorAll(
    ".menu-category, .hero, .contact-section",
  );
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

initActiveNavLinks();

// ================================
// IMAGE PLACEHOLDER HOVER
// ================================
function initImagePlaceholders() {
  const placeholders = document.querySelectorAll(".card-image-placeholder");

  placeholders.forEach((placeholder) => {
    placeholder.addEventListener("mouseenter", function () {
      this.style.background =
        "linear-gradient(135deg, rgba(255, 102, 0, 0.2) 0%, rgba(255, 51, 0, 0.2) 100%)";
    });

    placeholder.addEventListener("mouseleave", function () {
      this.style.background =
        "linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(255, 51, 0, 0.1) 100%)";
    });
  });
}

initImagePlaceholders();

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll-heavy functions
window.addEventListener(
  "scroll",
  debounce(function () {
    // Your scroll-heavy functions here
  }, 10),
);

// ================================
// CONSOLE MESSAGE
// ================================
console.log(
  "%c🔥 Flame 5 - Food Truck Website 🔥",
  "color: #ff6600; font-size: 24px; font-weight: bold;",
);
console.log(
  "%cBuilt with love and fire! 🍔🌮🍗",
  "color: #ffcc00; font-size: 16px;",
);

// ================================
// EASTER EGG - KONAMI CODE
// ================================
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", function (e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateFireworks();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateFireworks() {
  // Create fireworks effect
  const colors = ["#ff6600", "#ff3300", "#ffcc00"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createFirework();
    }, i * 100);
  }

  // Show special message
  const message = document.createElement("div");
  message.textContent = "🔥 FIRE MODE ACTIVATED! 🔥";
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6600, #ff3300);
        color: white;
        padding: 2rem 4rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: 900;
        z-index: 10000;
        animation: messageAppear 1s ease-out;
    `;
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}

function createFirework() {
  const firework = document.createElement("div");
  const colors = ["#ff6600", "#ff3300", "#ffcc00"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  firework.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${randomColor};
        border-radius: 50%;
        top: ${Math.random() * window.innerHeight}px;
        left: ${Math.random() * window.innerWidth}px;
        pointer-events: none;
        z-index: 9999;
        animation: fireworkExplode 1s ease-out forwards;
    `;

  document.body.appendChild(firework);

  setTimeout(() => {
    firework.remove();
  }, 1000);
}

// Add firework animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fireworkExplode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }

    @keyframes messageAppear {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

    .nav-link.active {
        color: #ff6600;
    }
`;
document.head.appendChild(style);
