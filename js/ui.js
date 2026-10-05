/**
 * HARISH MART - UI Controller & DOM Event Handlers
 */

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Render Category Chips in Secondary Navbar
function renderCategories() {
  const list = document.getElementById('categoriesList');
  if (!list) return;

  list.innerHTML = INITIAL_CATEGORIES.map(cat => `
    <li>
      <button class="category-chip ${app.selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
        <span class="category-chip-badge">${cat.badge}</span>
      </button>
    </li>
  `).join('');

  list.querySelectorAll('.category-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      app.selectedCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
      // Scroll to catalog smoothly
      const catalogEl = document.getElementById('catalogSection');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('catalogCount');
  if (!grid) return;

  const products = app.getFilteredProducts();
  if (countEl) {
    countEl.textContent = `Showing ${products.length} products`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h3>No matching products found</h3>
        <p>Try clearing filters or searching with a different term.</p>
        <button class="filter-pill-btn active" style="margin-top: 1rem;" onclick="resetAllFilters()">
          <i class="fa-solid fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  grid.className = `products-grid ${app.viewMode === 'list' ? 'list-view' : ''}`;

  grid.innerHTML = products.map(p => {
    const isWish = app.isWishlisted(p.id);
    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="card-media">
          <span class="card-badge ${p.badgeType || 'badge-hot'}">${p.badge || `${discount}% OFF`}</span>
          <button class="wishlist-btn ${isWish ? 'active' : ''}" onclick="handleWishlistToggle('${p.id}', event)" title="Add to Wishlist">
            <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
          <button class="quick-view-btn" onclick="openQuickView('${p.id}')">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
        </div>
        
        <div class="card-body">
          <div class="card-category">${p.category}</div>
          <h3 class="card-title" title="${p.name}">${p.name}</h3>
          
          <div class="card-meta">
            <div class="rating-box">
              <i class="fa-solid fa-star"></i>
              <span>${p.rating}</span>
            </div>
            <span class="reviews-text">(${p.reviewsCount.toLocaleString()} reviews)</span>
            <span class="unit-tag">${p.unit}</span>
          </div>

          <div class="card-price-row">
            <span class="current-price">${app.formatPrice(p.price)}</span>
            <span class="original-price">${app.formatPrice(p.originalPrice)}</span>
            <span class="discount-percentage">${discount}% OFF</span>
          </div>

          <div class="card-actions">
            <button class="add-cart-btn" onclick="handleAddToCart('${p.id}', event)">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Handle Add to Cart with visual feedback
function handleAddToCart(productId, event) {
  if (event) event.stopPropagation();
  const success = app.addToCart(productId);
  if (success) {
    const product = app.products.find(p => p.id === productId);
    showToast(`Added "${product.name.substring(0, 26)}..." to cart!`, 'success');
    updateCartUI();
    openCartDrawer();
  }
}

// Handle Wishlist Toggle
function handleWishlistToggle(productId, event) {
  if (event) event.stopPropagation();
  const added = app.toggleWishlist(productId);
  const product = app.products.find(p => p.id === productId);

  if (added) {
    showToast(`Added to Wishlist!`, 'success');
  } else {
    showToast(`Removed from Wishlist`, 'info');
  }

  updateWishlistUI();
  renderProducts();
}

// Update Cart Badge, Totals, and Drawer Content
function updateCartUI() {
  const count = app.getCartCount();
  const totals = app.getCartTotals();

  // Badges & Header
  document.querySelectorAll('.cart-badge-count').forEach(el => el.textContent = count);
  const headerTotal = document.getElementById('headerCartTotal');
  if (headerTotal) {
    headerTotal.textContent = app.formatPrice(totals.finalTotal);
  }

  // Free shipping progress bar
  const shippingFill = document.getElementById('shippingProgressFill');
  const shippingMsg = document.getElementById('shippingProgressMsg');
  if (shippingFill && shippingMsg) {
    if (totals.subtotal >= 499 || count === 0) {
      shippingFill.style.width = '100%';
      shippingMsg.innerHTML = count === 0 ? 'Add items to unlock <b>FREE Delivery</b>' : '🎉 You have unlocked <b>FREE Express Delivery!</b>';
    } else {
      const pct = Math.min(100, Math.round((totals.subtotal / 499) * 100));
      shippingFill.style.width = pct + '%';
      shippingMsg.innerHTML = `Add <b>${app.formatPrice(totals.neededForFreeShipping)}</b> more for <b>FREE Delivery</b>`;
    }
  }

  // Drawer Items List
  const itemsContainer = document.getElementById('cartItemsList');
  if (!itemsContainer) return;

  if (app.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-light);"></i>
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Looks like you haven't added any items yet.</p>
        <button class="add-cart-btn" style="margin: 0 auto; display: inline-flex;" onclick="closeCartDrawer()">
          Start Shopping
        </button>
      </div>
    `;
  } else {
    itemsContainer.innerHTML = app.cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-thumb" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-variant">Variant: ${item.variant}</div>
          <div class="cart-item-pricing">
            <span class="cart-item-price">${app.formatPrice(item.price)}</span>
            <div class="qty-stepper">
              <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', '${item.variant}', -1); updateCartUI();">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', '${item.variant}', 1); updateCartUI();">+</button>
            </div>
          </div>
        </div>
        <button class="cart-item-remove" onclick="app.removeFromCart('${item.id}', '${item.variant}'); updateCartUI();" title="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }

  // Price Summary
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');
  const appliedCouponContainer = document.getElementById('appliedCouponContainer');

  if (subtotalEl) subtotalEl.textContent = app.formatPrice(totals.subtotal);
  if (discountEl) discountEl.textContent = totals.couponDiscount > 0 ? `-${app.formatPrice(totals.couponDiscount)}` : '₹0';
  if (shippingEl) shippingEl.textContent = totals.shippingFee === 0 ? 'FREE' : app.formatPrice(totals.shippingFee);
  if (totalEl) totalEl.textContent = app.formatPrice(totals.finalTotal);

  if (appliedCouponContainer) {
    if (app.appliedCoupon) {
      appliedCouponContainer.innerHTML = `
        <div class="applied-coupon-tag">
          <span><i class="fa-solid fa-tag"></i> Coupon "${app.appliedCoupon.code}" Applied</span>
          <button onclick="app.removeCoupon(); updateCartUI();" style="color: inherit;"><i class="fa-solid fa-xmark"></i></button>
        </div>
      `;
    } else {
      appliedCouponContainer.innerHTML = '';
    }
  }
}

// Update Wishlist Badges & Modal
function updateWishlistUI() {
  const count = app.getWishlistCount();
  document.querySelectorAll('.wishlist-badge-count').forEach(el => el.textContent = count);
}

// Cart Drawer open/close
function openCartDrawer() {
  updateCartUI();
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('drawerBackdrop').classList.remove('active');
}

// Quick View Modal
function openQuickView(productId) {
  const p = app.products.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

  content.innerHTML = `
    <div class="quick-view-grid">
      <div class="qv-gallery">
        <img class="qv-main-img" id="qvMainImg" src="${p.image}" alt="${p.name}">
        <div style="display: flex; gap: 0.5rem;">
          <img src="${p.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 2px solid var(--primary); cursor: pointer;">
        </div>
      </div>
      <div class="qv-details">
        <div class="qv-category">${p.category}</div>
        <h2 class="qv-title">${p.name}</h2>
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div class="rating-box"><i class="fa-solid fa-star"></i> ${p.rating}</div>
          <span style="font-size: 0.85rem; color: var(--text-light);">${p.reviewsCount.toLocaleString()} Customer Reviews</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-green);"><i class="fa-solid fa-circle-check"></i> In Stock (${p.stockCount} available)</span>
        </div>
        
        <div class="qv-pricing">
          <span class="qv-current-price">${app.formatPrice(p.price)}</span>
          <span class="qv-original-price">${app.formatPrice(p.originalPrice)}</span>
          <span class="discount-percentage">${discount}% OFF</span>
        </div>

        <p class="qv-desc">${p.description}</p>

        ${p.variants && p.variants.length > 0 ? `
          <div class="qv-variants">
            <div class="qv-variants-label">Select Option / Pack Size:</div>
            <div class="variant-chips" id="qvVariantChips">
              ${p.variants.map((v, i) => `
                <button class="variant-btn ${i === 0 ? 'active' : ''}" onclick="selectVariant(this)">${v}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="margin-bottom: 1.25rem;">
          <div class="qv-variants-label"><i class="fa-solid fa-truck-fast"></i> Check Delivery Pincode:</div>
          <div class="pincode-checker">
            <input type="text" id="qvPincodeInput" class="pincode-input" placeholder="Enter 6-digit Pincode (e.g. 560001)" maxlength="6">
            <button class="pincode-btn" onclick="checkPincode()">Check</button>
          </div>
          <div id="qvPincodeResult" class="delivery-estimate-msg"></div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: auto;">
          <button class="add-cart-btn" style="padding: 0.85rem;" onclick="handleAddToCartFromQV('${p.id}')">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button class="filter-pill-btn" onclick="handleWishlistToggle('${p.id}'); this.querySelector('i').classList.toggle('fa-solid');">
            <i class="${app.isWishlisted(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function selectVariant(btn) {
  const chips = btn.closest('.variant-chips');
  chips.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function handleAddToCartFromQV(productId) {
  const activeVariantBtn = document.querySelector('#qvVariantChips .variant-btn.active');
  const variant = activeVariantBtn ? activeVariantBtn.textContent : null;
  app.addToCart(productId, variant, 1);
  const p = app.products.find(item => item.id === productId);
  showToast(`Added "${p.name.substring(0, 24)}..." (${variant || p.unit}) to cart!`, 'success');
  closeModal('quickViewModal');
  updateCartUI();
  openCartDrawer();
}

function checkPincode() {
  const input = document.getElementById('qvPincodeInput');
  const resultEl = document.getElementById('qvPincodeResult');
  const code = (input.value || '').trim();

  if (!code || code.length < 6) {
    resultEl.innerHTML = '<span style="color: var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> Please enter a valid 6-digit PIN code</span>';
    return;
  }

  const info = PINCODES_DB[code] || PINCODES_DB['default'];
  resultEl.innerHTML = `
    <span style="color: var(--accent-green);"><i class="fa-solid fa-circle-check"></i> Delivery available to <b>${info.city}</b> by Tomorrow! Free standard shipping.</span>
  `;
}

// Modal helper
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// Wishlist Modal
function openWishlistModal() {
  const modal = document.getElementById('wishlistModal');
  const content = document.getElementById('wishlistContent');

  if (app.wishlist.length === 0) {
    content.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <i class="fa-regular fa-heart" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h3>Your Wishlist is Empty</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Save your favorite items to purchase them anytime!</p>
        <button class="add-cart-btn" style="margin: 0 auto; display: inline-flex;" onclick="closeModal('wishlistModal')">
          Explore Products
        </button>
      </div>
    `;
  } else {
    const wishItems = app.products.filter(p => app.wishlist.includes(p.id));
    content.innerHTML = `
      <h3 style="margin-bottom: 1.25rem;">My Wishlist (${wishItems.length} items)</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${wishItems.map(p => `
          <div style="display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
            <img src="${p.image}" style="width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-md);">
            <div style="flex: 1;">
              <h4 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${p.name}</h4>
              <div style="font-weight: 700; color: var(--primary);">${app.formatPrice(p.price)}</div>
            </div>
            <button class="add-cart-btn" style="padding: 0.5rem 1rem;" onclick="app.addToCart('${p.id}'); showToast('Moved to cart!', 'success'); updateCartUI();">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button onclick="handleWishlistToggle('${p.id}'); openWishlistModal();" style="color: var(--text-light); padding: 0.5rem;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  modal.classList.add('active');
}

// Multi-Step Checkout Modal
let checkoutStep = 1;
function openCheckoutModal() {
  if (app.cart.length === 0) {
    showToast('Your cart is empty! Add items before checkout.', 'error');
    return;
  }
  closeCartDrawer();
  checkoutStep = 1;
  renderCheckoutStep();
  document.getElementById('checkoutModal').classList.add('active');
}

function renderCheckoutStep() {
  const content = document.getElementById('checkoutContent');
  const totals = app.getCartTotals();

  if (checkoutStep === 1) {
    content.innerHTML = `
      <div class="checkout-stepper">
        <div class="stepper-step active"><div class="step-num">1</div><div class="step-label">Shipping Address</div></div>
        <div class="stepper-step"><div class="step-num">2</div><div class="step-label">Delivery Speed</div></div>
        <div class="stepper-step"><div class="step-num">3</div><div class="step-label">Payment</div></div>
        <div class="stepper-step"><div class="step-num">4</div><div class="step-label">Confirm</div></div>
      </div>

      <h3 style="margin-bottom: 1.25rem;">Enter Delivery Address</h3>
      <form id="shippingForm" onsubmit="handleShippingSubmit(event)" class="form-grid">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" id="shipName" class="form-control" placeholder="e.g. Harish Kumar" required value="Harish Kumar">
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number *</label>
          <input type="tel" id="shipPhone" class="form-control" placeholder="e.g. 9876543210" required value="9876543210">
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label class="form-label">Street Address & Landmark *</label>
          <input type="text" id="shipAddress" class="form-control" placeholder="Flat No., Building, Street Name" required value="Plot 42, Green Valley Enclave, MG Road">
        </div>
        <div class="form-group">
          <label class="form-label">City *</label>
          <input type="text" id="shipCity" class="form-control" placeholder="City" required value="Bengaluru">
        </div>
        <div class="form-group">
          <label class="form-label">PIN Code *</label>
          <input type="text" id="shipPin" class="form-control" placeholder="6-digit PIN" maxlength="6" required value="560001">
        </div>
        <div style="grid-column: 1 / -1; display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button type="submit" class="checkout-btn" style="width: auto; padding: 0.75rem 2rem;">
            Proceed to Delivery Speed <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </form>
    `;
  } else if (checkoutStep === 2) {
    content.innerHTML = `
      <div class="checkout-stepper">
        <div class="stepper-step completed"><div class="step-num"><i class="fa-solid fa-check"></i></div><div class="step-label">Address</div></div>
        <div class="stepper-step active"><div class="step-num">2</div><div class="step-label">Delivery Speed</div></div>
        <div class="stepper-step"><div class="step-num">3</div><div class="step-label">Payment</div></div>
        <div class="stepper-step"><div class="step-num">4</div><div class="step-label">Confirm</div></div>
      </div>

      <h3 style="margin-bottom: 1.25rem;">Choose Delivery Method</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid var(--primary); border-radius: var(--radius-md); cursor: pointer; background: var(--primary-light);">
          <input type="radio" name="deliverySpeed" value="standard" checked style="accent-color: var(--primary); transform: scale(1.2);">
          <div style="flex: 1;">
            <div style="font-weight: 700; color: var(--primary);">Standard Free Delivery (1 - 2 Days)</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Guaranteed doorstep delivery with temperature control</div>
          </div>
          <div style="font-weight: 800; color: var(--accent-green);">FREE</div>
        </label>

        <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer;">
          <input type="radio" name="deliverySpeed" value="express" style="accent-color: var(--primary); transform: scale(1.2);">
          <div style="flex: 1;">
            <div style="font-weight: 700;">⚡ Instant 2-Hour Express Delivery</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Priority dedicated delivery rider dispatched instantly</div>
          </div>
          <div style="font-weight: 800;">₹49</div>
        </label>
      </div>

      <div style="display: flex; justify-content: space-between;">
        <button class="filter-pill-btn" onclick="checkoutStep=1; renderCheckoutStep();"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <button class="checkout-btn" style="width: auto; padding: 0.75rem 2rem;" onclick="checkoutStep=3; renderCheckoutStep();">
          Proceed to Payment <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
  } else if (checkoutStep === 3) {
    content.innerHTML = `
      <div class="checkout-stepper">
        <div class="stepper-step completed"><div class="step-num"><i class="fa-solid fa-check"></i></div><div class="step-label">Address</div></div>
        <div class="stepper-step completed"><div class="step-num"><i class="fa-solid fa-check"></i></div><div class="step-label">Speed</div></div>
        <div class="stepper-step active"><div class="step-num">3</div><div class="step-label">Payment</div></div>
        <div class="stepper-step"><div class="step-num">4</div><div class="step-label">Confirm</div></div>
      </div>

      <h3 style="margin-bottom: 1rem;">Select Payment Method</h3>
      <div class="payment-tabs">
        <button class="payment-tab-btn active" id="tabUpi" onclick="switchPaymentTab('upi')"><i class="fa-solid fa-qrcode"></i> UPI / QR Code</button>
        <button class="payment-tab-btn" id="tabCard" onclick="switchPaymentTab('card')"><i class="fa-solid fa-credit-card"></i> Card</button>
        <button class="payment-tab-btn" id="tabCod" onclick="switchPaymentTab('cod')"><i class="fa-solid fa-money-bill-wave"></i> Cash on Delivery</button>
      </div>

      <div id="paymentTabContent">
        <!-- UPI VIEW -->
        <div id="upiView" class="upi-qr-card">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="white" rx="8"/>
            <path d="M10 10H35V35H10V10ZM15 15V30H30V15H15Z" fill="#0F766E"/>
            <rect x="19" y="19" width="7" height="7" fill="#0F766E"/>
            <path d="M65 10H90V35H65V10ZM70 15V30H85V15H70Z" fill="#0F766E"/>
            <rect x="74" y="19" width="7" height="7" fill="#0F766E"/>
            <path d="M10 65H35V90H10V65ZM15 70V85H30V70H15Z" fill="#0F766E"/>
            <rect x="19" y="74" width="7" height="7" fill="#0F766E"/>
            <rect x="42" y="15" width="8" height="20" fill="#0F766E"/>
            <rect x="42" y="42" width="16" height="16" fill="#0F766E"/>
            <rect x="65" y="45" width="10" height="8" fill="#0F766E"/>
            <rect x="65" y="65" width="25" height="25" fill="#0F766E"/>
          </svg>
          <div style="font-weight: 700; margin-bottom: 0.25rem;">Scan & Pay with Any UPI App</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Google Pay, PhonePe, Paytm, BHIM, CRED</div>
          <div style="display: inline-block; background: var(--bg-card); padding: 0.4rem 1rem; border-radius: var(--radius-sm); font-family: monospace; font-weight: bold; border: 1px solid var(--border-color);">
            harishmart@upi
          </div>
        </div>

        <!-- CARD VIEW -->
        <div id="cardView" style="display: none;">
          <div class="card-preview">
            <div class="card-preview-chip"></div>
            <div class="card-preview-number" id="previewCardNum">•••• •••• •••• 4242</div>
            <div class="card-preview-bottom">
              <div>
                <div style="font-size: 0.65rem; opacity: 0.7;">CARD HOLDER</div>
                <div id="previewCardName" style="font-weight: 700;">HARISH KUMAR</div>
              </div>
              <div>
                <div style="font-size: 0.65rem; opacity: 0.7;">EXPIRES</div>
                <div id="previewCardExp" style="font-weight: 700;">12/28</div>
              </div>
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Card Number</label>
              <input type="text" class="form-control" placeholder="4111 2222 3333 4242" maxlength="19" oninput="formatCardNum(this)">
            </div>
            <div class="form-group">
              <label class="form-label">Expiry (MM/YY)</label>
              <input type="text" class="form-control" placeholder="12/28" maxlength="5">
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="password" class="form-control" placeholder="•••" maxlength="3">
            </div>
          </div>
        </div>

        <!-- COD VIEW -->
        <div id="codView" style="display: none; padding: 2rem 1rem; text-align: center;">
          <i class="fa-solid fa-hand-holding-dollar" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
          <h4>Cash on Delivery Available</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Pay securely in cash or via UPI QR code when our delivery partner arrives at your doorstep.</p>
        </div>
      </div>

      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Total Payable:</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">${app.formatPrice(totals.finalTotal)}</div>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="filter-pill-btn" onclick="checkoutStep=2; renderCheckoutStep();"><i class="fa-solid fa-arrow-left"></i> Back</button>
          <button class="checkout-btn" style="width: auto; padding: 0.75rem 2rem;" onclick="finalizeOrder()">
            Place Order <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    `;
  }
}

function handleShippingSubmit(e) {
  e.preventDefault();
  window.currentShipping = {
    name: document.getElementById('shipName').value,
    phone: document.getElementById('shipPhone').value,
    address: document.getElementById('shipAddress').value,
    city: document.getElementById('shipCity').value,
    pin: document.getElementById('shipPin').value
  };
  checkoutStep = 2;
  renderCheckoutStep();
}

let activePaymentType = 'UPI (harishmart@upi)';
function switchPaymentTab(type) {
  document.querySelectorAll('.payment-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('upiView').style.display = 'none';
  document.getElementById('cardView').style.display = 'none';
  document.getElementById('codView').style.display = 'none';

  if (type === 'upi') {
    document.getElementById('tabUpi').classList.add('active');
    document.getElementById('upiView').style.display = 'block';
    activePaymentType = 'UPI (Instant)';
  } else if (type === 'card') {
    document.getElementById('tabCard').classList.add('active');
    document.getElementById('cardView').style.display = 'block';
    activePaymentType = 'Credit/Debit Card';
  } else if (type === 'cod') {
    document.getElementById('tabCod').classList.add('active');
    document.getElementById('codView').style.display = 'block';
    activePaymentType = 'Cash on Delivery (COD)';
  }
}

function formatCardNum(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = formatted;
  const preview = document.getElementById('previewCardNum');
  if (preview) preview.textContent = formatted || '•••• •••• •••• 4242';
}

function finalizeOrder() {
  const address = window.currentShipping || {
    name: 'Harish Kumar',
    phone: '9876543210',
    address: 'Plot 42, MG Road',
    city: 'Bengaluru',
    pin: '560001'
  };

  const order = app.createOrder(address, activePaymentType);
  updateCartUI();
  renderOrderSuccess(order);
}

function renderOrderSuccess(order) {
  const content = document.getElementById('checkoutContent');
  content.innerHTML = `
    <div class="order-success-box">
      <div class="success-icon-wrap"><i class="fa-solid fa-check"></i></div>
      <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem; color: var(--text-main);">Order Placed Successfully!</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Thank you for shopping with <b>HARISH MART</b>. Your order has been registered.</p>
      
      <div style="background: var(--bg-main); border: 1px dashed var(--border-color); border-radius: var(--radius-md); padding: 1rem; display: inline-block; margin-bottom: 2rem;">
        <span style="color: var(--text-muted); font-size: 0.85rem;">Order Reference ID: </span>
        <strong style="color: var(--primary); font-size: 1.1rem; letter-spacing: 1px;">#${order.orderId}</strong>
      </div>

      <div class="tracking-timeline">
        <div class="tracking-step done">
          <div class="tracking-dot"><i class="fa-solid fa-check"></i></div>
          <div class="tracking-label">Order Placed</div>
        </div>
        <div class="tracking-step done">
          <div class="tracking-dot"><i class="fa-solid fa-box"></i></div>
          <div class="tracking-label">Packed</div>
        </div>
        <div class="tracking-step">
          <div class="tracking-dot"><i class="fa-solid fa-truck"></i></div>
          <div class="tracking-label">Shipped</div>
        </div>
        <div class="tracking-step">
          <div class="tracking-dot"><i class="fa-solid fa-house"></i></div>
          <div class="tracking-label">Delivered</div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="add-cart-btn" style="width: auto; padding: 0.75rem 1.5rem;" onclick="closeModal('checkoutModal'); renderProducts();">
          Continue Shopping
        </button>
        <button class="filter-pill-btn" onclick="window.print();">
          <i class="fa-solid fa-receipt"></i> Print Invoice
        </button>
      </div>
    </div>
  `;
}

// Live Search with Auto-Suggestions
function setupSearch() {
  const input = document.getElementById('mainSearchInput');
  const popup = document.getElementById('searchResultsPopup');
  const catSelect = document.getElementById('searchCatSelect');
  const clearBtn = document.getElementById('searchClearBtn');

  if (!input || !popup) return;

  function doSearch() {
    const val = input.value.trim();
    app.searchQuery = val;
    clearBtn.style.display = val ? 'block' : 'none';

    if (!val) {
      popup.style.display = 'none';
      renderProducts();
      return;
    }

    const matches = app.getFilteredProducts();
    if (matches.length > 0) {
      popup.innerHTML = matches.slice(0, 5).map(m => `
        <div class="search-result-item" onclick="openQuickView('${m.id}'); document.getElementById('searchResultsPopup').style.display='none';">
          <img class="search-result-thumb" src="${m.image}" alt="${m.name}">
          <div class="search-result-details">
            <div class="search-result-title">${m.name}</div>
            <div class="search-result-price">${app.formatPrice(m.price)}</div>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-light); text-transform: uppercase;">${m.category}</span>
        </div>
      `).join('');
      popup.style.display = 'block';
    } else {
      popup.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No products found for "${val}"</div>`;
      popup.style.display = 'block';
    }

    renderProducts();
  }

  input.addEventListener('input', doSearch);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    app.searchQuery = '';
    clearBtn.style.display = 'none';
    popup.style.display = 'none';
    renderProducts();
  });

  if (catSelect) {
    catSelect.addEventListener('change', () => {
      app.selectedCategory = catSelect.value;
      renderCategories();
      renderProducts();
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      popup.style.display = 'none';
    }
  });
}

// Reset all filters
function resetAllFilters() {
  app.selectedCategory = 'all';
  app.searchQuery = '';
  app.sortBy = 'featured';
  app.priceFilter = 150000;

  const searchInp = document.getElementById('mainSearchInput');
  if (searchInp) searchInp.value = '';
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  renderCategories();
  renderProducts();
}

// Hero Carousel auto-sliding
let currentSlide = 0;
function setupHeroCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (slides.length === 0) return;

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    const slidesContainer = document.getElementById('carouselSlides');
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    dots.forEach((d, idx) => d.classList.toggle('active', idx === currentSlide));
  }

  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });

  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

// Live AI Support Chat Widget
function setupChatbot() {
  const btn = document.getElementById('chatWidgetBtn');
  const windowEl = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const messagesBox = document.getElementById('chatMessages');

  if (!btn || !windowEl) return;

  btn.addEventListener('click', () => windowEl.classList.toggle('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));

  function addBotMessage(text, suggestions = []) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.innerHTML = text;

    if (suggestions.length > 0) {
      const chips = document.createElement('div');
      chips.className = 'chat-suggestions';
      chips.innerHTML = suggestions.map(s => `<span class="chat-chip" onclick="handleChatQuery('${s}')">${s}</span>`).join('');
      msg.appendChild(chips);
    }

    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.textContent = text;
    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  window.handleChatQuery = function(text) {
    addUserMessage(text);
    setTimeout(() => {
      respondToChat(text.toLowerCase());
    }, 400);
  };

  function respondToChat(q) {
    if (q.includes('coupon') || q.includes('offer') || q.includes('discount')) {
      addBotMessage(
        '🔥 Here are current active coupon codes at Harish Mart:<br>• <b>HARISH25</b>: 25% OFF on orders over ₹999<br>• <b>WELCOME50</b>: Flat ₹50 OFF on any order<br>• <b>FREESHIP</b>: Free Delivery on any order!',
        ['Apply HARISH25', 'Check Delivery', 'Track My Order']
      );
    } else if (q.includes('track') || q.includes('order')) {
      const orders = app.orders;
      if (orders.length > 0) {
        const lastOrder = orders[0];
        addBotMessage(
          `📦 Your latest order <b>#${lastOrder.orderId}</b> placed on ${lastOrder.date} is currently <b>${lastOrder.status}</b>.<br>Expected delivery: Tomorrow by 2:00 PM.`,
          ['View Order History', 'Contact Support']
        );
      } else {
        addBotMessage('You have no active orders yet. Browse our top deals to start your order!', ['Show Deals', 'View Categories']);
      }
    } else if (q.includes('return') || q.includes('refund')) {
      addBotMessage('🛡️ <b>Harish Mart Guarantee:</b> We offer an easy 7-day hassle-free return and instant refund policy on all eligible groceries, electronics, and fashion items.');
    } else if (q.includes('delivery') || q.includes('shipping') || q.includes('pincode')) {
      addBotMessage('⚡ We offer <b>FREE Delivery</b> on all orders above ₹499! We also offer 2-Hour Express Delivery in select metro pincodes.');
    } else {
      addBotMessage('Hello! I am your <b>Harish Mart Assistant</b>. How can I help you today?', ['Show Active Coupons', 'Track My Order', 'Delivery Times', 'Return Policy']);
    }
  }

  function sendChat() {
    const val = (input.value || '').trim();
    if (!val) return;
    addUserMessage(val);
    input.value = '';
    setTimeout(() => respondToChat(val.toLowerCase()), 500);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendChat);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChat();
    });
  }
}

// User Account & Order History Modal
function openAccountModal(tab = 'history') {
  const modal = document.getElementById('accountModal');
  const content = document.getElementById('accountContent');

  content.innerHTML = `
    <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-user-circle"></i> My Account & Orders</h3>
    <div class="payment-tabs" style="margin-bottom: 1.5rem;">
      <button class="payment-tab-btn ${tab === 'history' ? 'active' : ''}" onclick="openAccountModal('history')"><i class="fa-solid fa-receipt"></i> Order History</button>
      <button class="payment-tab-btn ${tab === 'profile' ? 'active' : ''}" onclick="openAccountModal('profile')"><i class="fa-solid fa-id-card"></i> Saved Profile</button>
      <button class="payment-tab-btn ${tab === 'admin' ? 'active' : ''}" onclick="openAccountModal('admin')"><i class="fa-solid fa-shield-halved"></i> Store Manager</button>
    </div>

    ${tab === 'history' ? `
      <div>
        ${app.orders.length === 0 ? `
          <div style="text-align: center; padding: 2rem;">No orders found.</div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${app.orders.map(o => `
              <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; background: var(--bg-main);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <div>
                    <strong style="color: var(--primary);">#${o.orderId}</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">Placed on ${o.date}</span>
                  </div>
                  <span style="background: var(--accent-green-light); color: var(--accent-green); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">${o.status}</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;">${o.itemsSummary || 'Standard items'}</p>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.95rem;">
                  <span>Payment: ${o.paymentMethod || 'UPI'}</span>
                  <span style="color: var(--text-main); font-size: 1.1rem;">${app.formatPrice(o.totalAmount || o.totals?.finalTotal || 0)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    ` : tab === 'profile' ? `
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Customer Name</label>
          <input type="text" class="form-control" value="Harish Kumar" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input type="text" class="form-control" value="+91 98765 43210" readonly>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label class="form-label">Primary Address</label>
          <input type="text" class="form-control" value="Plot 42, Green Valley Enclave, MG Road, Bengaluru - 560001" readonly>
        </div>
        <div style="grid-column: 1 / -1; margin-top: 1rem;">
          <button class="filter-pill-btn active" onclick="showToast('Profile updated!', 'success')">Save Changes</button>
        </div>
      </div>
    ` : `
      <!-- Admin Store Manager -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h4>Add New Product to Harish Mart</h4>
          <button class="filter-pill-btn" onclick="app.resetCatalog(); renderProducts(); showToast('Catalog reset to defaults!', 'info'); closeModal('accountModal');">
            <i class="fa-solid fa-rotate-left"></i> Reset Defaults
          </button>
        </div>
        <form onsubmit="handleAdminAddProduct(event)" class="form-grid">
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Product Title *</label>
            <input type="text" id="adminProdName" class="form-control" placeholder="e.g. Organic Pure Kashmiri Saffron" required>
          </div>
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select id="adminProdCategory" class="form-control">
              <option value="groceries">Daily Groceries</option>
              <option value="electronics">Electronics & Gadgets</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty & Wellness</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Selling Price (₹) *</label>
            <input type="number" id="adminProdPrice" class="form-control" placeholder="499" required>
          </div>
          <div class="form-group">
            <label class="form-label">Original Price (MRP ₹)</label>
            <input type="number" id="adminProdMRP" class="form-control" placeholder="799">
          </div>
          <div class="form-group">
            <label class="form-label">Unit / Size</label>
            <input type="text" id="adminProdUnit" class="form-control" placeholder="e.g. 500g or 1 Unit">
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Image URL</label>
            <input type="url" id="adminProdImg" class="form-control" placeholder="https://images.unsplash.com/...">
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Short Description</label>
            <textarea id="adminProdDesc" class="form-control" rows="2" placeholder="Description of product benefits..."></textarea>
          </div>
          <div style="grid-column: 1 / -1; margin-top: 0.5rem;">
            <button type="submit" class="checkout-btn" style="width: auto; padding: 0.75rem 2rem;">
              <i class="fa-solid fa-plus"></i> Add Product to Store
            </button>
          </div>
        </form>
      </div>
    `}
  `;

  modal.classList.add('active');
}

function handleAdminAddProduct(e) {
  e.preventDefault();
  const name = document.getElementById('adminProdName').value;
  const category = document.getElementById('adminProdCategory').value;
  const price = document.getElementById('adminProdPrice').value;
  const originalPrice = document.getElementById('adminProdMRP').value;
  const unit = document.getElementById('adminProdUnit').value;
  const image = document.getElementById('adminProdImg').value;
  const description = document.getElementById('adminProdDesc').value;

  app.addNewProduct({ name, category, price, originalPrice, unit, image, description });
  showToast(`Added product "${name}" to store catalog!`, 'success');
  closeModal('accountModal');
  renderProducts();
}

// Initial Setup & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupSearch();
  setupHeroCarousel();
  setupChatbot();

  // Dark/Light Theme Toggle
  const themeToggle = document.getElementById('themeToggleBtn');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const mode = app.toggleTheme();
      themeToggle.querySelector('i').className = mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      showToast(`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Enabled`);
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      app.sortBy = sortSelect.value;
      renderProducts();
    });
  }

  // Grid/List View Toggle
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      app.viewMode = 'grid';
      localStorage.setItem('harish_mart_view', 'grid');
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      renderProducts();
    });

    viewListBtn.addEventListener('click', () => {
      app.viewMode = 'list';
      localStorage.setItem('harish_mart_view', 'list');
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      renderProducts();
    });
  }

  // Cart Drawer open/close buttons
  const openCartBtn = document.getElementById('headerCartBtn');
  const closeCartBtn = document.getElementById('cartDrawerCloseBtn');
  const backdrop = document.getElementById('drawerBackdrop');

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', () => {
    closeCartDrawer();
  });

  // Wishlist open button
  const wishlistBtn = document.getElementById('headerWishlistBtn');
  if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlistModal);

  // User Account button
  const accountBtn = document.getElementById('headerAccountBtn');
  if (accountBtn) accountBtn.addEventListener('click', () => openAccountModal('history'));

  // Coupon Apply in drawer
  const applyCouponBtn = document.getElementById('cartApplyCouponBtn');
  const couponInput = document.getElementById('cartCouponInput');
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const res = app.applyCoupon(couponInput.value);
      if (res.success) {
        showToast(res.message, 'success');
        couponInput.value = '';
      } else {
        showToast(res.message, 'error');
      }
      updateCartUI();
    });
  }

  // Checkout button in drawer
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);

  // Close modals on clicking overlay background
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
});
