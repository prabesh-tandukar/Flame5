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
  initShoppingCart();
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

// ================================
// SHOPPING CART SYSTEM
// ================================
function initShoppingCart() {
    // Cart state
    let cart = JSON.parse(localStorage.getItem('flame5Cart')) || [];

    // DOM elements
    const floatingCart = document.getElementById('floatingCart');
    const cartBadge = document.getElementById('cartBadge');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Initialize cart
    updateCartUI();

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const category = this.dataset.category;

            addToCart({ name, price, category });

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Add item to cart
    function addToCart(item) {
        const existingItem = cart.find(i => i.name === item.name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        saveCart();
        updateCartUI();
        showAddedNotification(item.name);
    }

    // Remove item from cart
    function removeFromCart(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        saveCart();
        updateCartUI();
    }

    // Update item quantity
    function updateQuantity(itemName, change) {
        const item = cart.find(i => i.name === itemName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(itemName);
            } else {
                saveCart();
                updateCartUI();
            }
        }
    }

    // Clear cart
    function clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            updateCartUI();
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('flame5Cart', JSON.stringify(cart));
    }

    // Update cart UI
    function updateCartUI() {
        // Update badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle('hidden', totalItems === 0);

        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateCartQuantity('${item.name}', -1)">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity('${item.name}', 1)">+</button>
                        <button class="remove-item" onclick="removeCartItem('${item.name}')">Remove</button>
                    </div>
                </div>
            `).join('');
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
        }

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    // Show cart modal
    floatingCart.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    // Close cart modal
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Clear cart button
    clearCartBtn.addEventListener('click', clearCart);

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
        checkoutModal.classList.add('active');
        resetCheckoutFlow();
    });

    // Close checkout modal
    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
    });

    // Make functions global for onclick handlers
    window.updateCartQuantity = updateQuantity;
    window.removeCartItem = removeFromCart;

    // Show added notification
    function showAddedNotification(itemName) {
        const notification = document.createElement('div');
        notification.textContent = `${itemName} added to cart!`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #ff6600, #ff3300);
            color: white;
            padding: 1rem 2rem;
            border-radius: 15px;
            font-weight: 700;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Initialize checkout flow
    initCheckoutFlow();
}

// ================================
// CHECKOUT FLOW WITH FIREBASE
// ================================
function initCheckoutFlow() {
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const phoneNumber = document.getElementById('phoneNumber');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const otpCode = document.getElementById('otpCode');
    const resendOtp = document.getElementById('resendOtp');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    // Initialize reCAPTCHA when checkout modal opens
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        setTimeout(() => {
            initRecaptcha();
        }, 500);
    });

    // Send OTP with Firebase
    sendOtpBtn.addEventListener('click', async () => {
        let phone = phoneNumber.value.trim();
        if (!phone || phone.length < 8) {
            alert('Please enter a valid phone number');
            return;
        }

        // Format phone number for NZ if not already formatted
        if (!phone.startsWith('+')) {
            if (phone.startsWith('0')) {
                phone = '+64' + phone.substring(1);
            } else {
                phone = '+64' + phone;
            }
        }

        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sending...';

        try {
            confirmationResult = await auth.signInWithPhoneNumber(phone, recaptchaVerifier);
            document.getElementById('displayPhone').textContent = phone;
            showCheckoutStep(2);
            showNotification('Verification code sent to ' + phone);
        } catch (error) {
            console.error('SMS Error:', error);
            let errorMessage = 'Failed to send verification code. ';

            if (error.code === 'auth/invalid-phone-number') {
                errorMessage += 'Invalid phone number format.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage += 'Too many attempts. Please try again later.';
            } else if (error.code === 'auth/captcha-check-failed') {
                errorMessage += 'Security check failed. Please refresh and try again.';
            } else {
                errorMessage += error.message;
            }

            alert(errorMessage);
            // Reinitialize reCAPTCHA
            initRecaptcha();
        } finally {
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = 'Send Code';
        }
    });

    // Verify OTP with Firebase
    verifyOtpBtn.addEventListener('click', async () => {
        const code = otpCode.value.trim();
        if (!code || code.length !== 6) {
            alert('Please enter a valid 6-digit code');
            return;
        }

        verifyOtpBtn.disabled = true;
        verifyOtpBtn.textContent = 'Verifying...';

        try {
            await confirmationResult.confirm(code);
            showCheckoutStep(3);
            displayOrderSummary();
            showNotification('Phone verified successfully!');
        } catch (error) {
            console.error('Verification Error:', error);
            alert('Invalid verification code. Please try again.');
            otpCode.value = '';
        } finally {
            verifyOtpBtn.disabled = false;
            verifyOtpBtn.textContent = 'Verify Code';
        }
    });

    // Resend OTP
    resendOtp.addEventListener('click', async () => {
        let phone = phoneNumber.value.trim();
        if (!phone.startsWith('+')) {
            if (phone.startsWith('0')) {
                phone = '+64' + phone.substring(1);
            } else {
                phone = '+64' + phone;
            }
        }

        try {
            initRecaptcha();
            confirmationResult = await auth.signInWithPhoneNumber(phone, recaptchaVerifier);
            showNotification('New verification code sent!');
        } catch (error) {
            console.error('Resend Error:', error);
            alert('Failed to resend code. Please try again.');
        }
    });

    // Confirm order - Save to Firestore
    confirmOrderBtn.addEventListener('click', async () => {
        confirmOrderBtn.disabled = true;
        confirmOrderBtn.textContent = 'Placing Order...';

        try {
            const orderNumber = Math.floor(10000 + Math.random() * 90000);
            const cart = JSON.parse(localStorage.getItem('flame5Cart')) || [];
            const user = auth.currentUser;

            const orderData = {
                orderNumber: orderNumber,
                phone: phoneNumber.value,
                userId: user ? user.uid : null,
                items: cart,
                total: calculateTotal(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Save to Firestore
            await db.collection('orders').add(orderData);

            document.getElementById('orderNumber').textContent = orderNumber;

            // Also save to localStorage as backup
            saveOrder(orderData);

            // Clear cart
            localStorage.removeItem('flame5Cart');

            showCheckoutStep(4);
            showNotification('Order placed successfully!');

        } catch (error) {
            console.error('Order Error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            confirmOrderBtn.disabled = false;
            confirmOrderBtn.textContent = 'Confirm Order';
        }
    });

    // Close success
    closeSuccessBtn.addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.remove('active');
        // Sign out user after order
        auth.signOut();
        location.reload();
    });
}

function resetCheckoutFlow() {
    showCheckoutStep(1);
    document.getElementById('phoneNumber').value = '';
    document.getElementById('otpCode').value = '';
}

function showCheckoutStep(step) {
    for (let i = 1; i <= 4; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (stepEl) {
            stepEl.classList.toggle('hidden', i !== step);
        }
    }
}

function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('flame5Cart')) || [];
    const summary = document.getElementById('orderSummary');

    summary.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div>
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('') + `
        <div class="summary-item" style="border-top: 2px solid rgba(255, 102, 0, 0.3); padding-top: 1rem; margin-top: 1rem;">
            <div class="summary-item-name" style="font-size: 1.3rem;">Total</div>
            <div class="summary-item-price" style="font-size: 1.5rem;">$${calculateTotal().toFixed(2)}</div>
        </div>
    `;
}

function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('flame5Cart')) || [];
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('flame5Orders')) || [];
    orders.push(order);
    localStorage.setItem('flame5Orders', JSON.stringify(orders));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6600, #ff3300);
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        font-weight: 700;
        z-index: 10000;
        animation: slideInDown 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const cartAnimations = document.createElement('style');
cartAnimations.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }

    @keyframes slideInDown {
        from { transform: translate(-50%, -100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }

    @keyframes slideOutUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100px); opacity: 0; }
    }
`;
document.head.appendChild(cartAnimations);

// ================================
// FIREBASE CONFIGURATION
// ================================
const firebaseConfig = {
    apiKey: "AIzaSyAzLELqijT7vg2p0jMqxim0tforocB5uyU",
    authDomain: "flame5-orders.firebaseapp.com",
    projectId: "flame5-orders",
    storageBucket: "flame5-orders.firebasestorage.app",
    messagingSenderId: "1073281350654",
    appId: "1:1073281350654:web:943e1163e021747e00deaf",
    measurementId: "G-YK2E62FND4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Configure reCAPTCHA for phone auth
let recaptchaVerifier = null;
let confirmationResult = null;
let recaptchaWidgetId = null;

function initRecaptcha() {
    // If reCAPTCHA already exists, just reset it instead of creating new one
    if (recaptchaVerifier && recaptchaWidgetId !== null) {
        try {
            grecaptcha.reset(recaptchaWidgetId);
            console.log('reCAPTCHA reset');
            return;
        } catch (e) {
            console.log('Could not reset reCAPTCHA, creating new one');
        }
    }

    // Clear existing verifier if any
    if (recaptchaVerifier) {
        try {
            recaptchaVerifier.clear();
        } catch (e) {
            console.log('Could not clear reCAPTCHA');
        }
        recaptchaVerifier = null;
    }

    // Create new reCAPTCHA verifier
    try {
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sendOtpBtn', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('reCAPTCHA verified');
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
                showNotification('Verification expired. Please try again.');
            }
        });

        // Render and store widget ID for future resets
        recaptchaVerifier.render().then((widgetId) => {
            recaptchaWidgetId = widgetId;
        });
    } catch (e) {
        console.log('reCAPTCHA init error:', e);
    }
}
