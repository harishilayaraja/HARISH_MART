/**
 * HARISH MART - Application State & Business Logic
 */

class HarishMartApp {
  constructor() {
    this.products = getStoredProducts();
    this.cart = getStoredCart();
    this.wishlist = getStoredWishlist();
    this.orders = getStoredOrders();
    
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.priceFilter = 150000;
    this.viewMode = localStorage.getItem('harish_mart_view') || 'grid';
    this.theme = localStorage.getItem('harish_mart_theme') || 'light';
    this.appliedCoupon = null;

    this.initTheme();
  }

  // Theme Management
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('harish_mart_theme', this.theme);
    this.initTheme();
    return this.theme;
  }

  // Currency Formatter (Default: Indian Rupee ₹)
  formatPrice(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // Filtering & Sorting
  getFilteredProducts() {
    let result = [...this.products];

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Filter by price
    result = result.filter(p => p.price <= this.priceFilter);

    // Sorting
    switch (this.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = ((a.originalPrice - a.price) / a.originalPrice);
          const discB = ((b.originalPrice - b.price) / b.originalPrice);
          return discB - discA;
        });
        break;
      case 'featured':
      default:
        // default order preserved
        break;
    }

    return result;
  }

  // Cart Operations
  addToCart(productId, variant = null, quantity = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return false;

    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : product.unit);
    const existingIndex = this.cart.findIndex(item => item.id === productId && item.variant === chosenVariant);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant: chosenVariant,
        quantity: quantity,
        category: product.category
      });
    }

    saveCart(this.cart);
    return true;
  }

  updateCartQuantity(productId, variant, delta) {
    const item = this.cart.find(i => i.id === productId && i.variant === variant);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId, variant);
    } else {
      saveCart(this.cart);
    }
  }

  removeFromCart(productId, variant) {
    this.cart = this.cart.filter(item => !(item.id === productId && item.variant === variant));
    saveCart(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    saveCart(this.cart);
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotals() {
    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const originalSubtotal = this.cart.reduce((acc, item) => acc + ((item.originalPrice || item.price) * item.quantity), 0);
    const catalogDiscount = originalSubtotal - subtotal;

    let couponDiscount = 0;
    let shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;

    if (this.appliedCoupon) {
      if (this.appliedCoupon.freeShipping) {
        shippingFee = 0;
      }
      if (this.appliedCoupon.discountPercent) {
        const calculated = (subtotal * this.appliedCoupon.discountPercent) / 100;
        couponDiscount = this.appliedCoupon.maxDiscount ? Math.min(calculated, this.appliedCoupon.maxDiscount) : calculated;
      } else if (this.appliedCoupon.discountFlat) {
        couponDiscount = this.appliedCoupon.discountFlat;
      }
    }

    const totalDiscount = catalogDiscount + couponDiscount;
    const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

    return {
      subtotal,
      originalSubtotal,
      catalogDiscount,
      couponDiscount,
      shippingFee,
      freeShippingThreshold: 499,
      neededForFreeShipping: Math.max(0, 499 - subtotal),
      totalDiscount,
      finalTotal
    };
  }

  // Coupon Application
  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a coupon code' };

    const coupon = PROMO_CODES[cleanCode];
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try HARISH25 or WELCOME50' };
    }

    const { subtotal } = this.getCartTotals();
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of ₹${coupon.minOrder} required for ${cleanCode}` };
    }

    this.appliedCoupon = { code: cleanCode, ...coupon };
    return { success: true, message: `Coupon "${cleanCode}" applied successfully!`, coupon: this.appliedCoupon };
  }

  removeCoupon() {
    this.appliedCoupon = null;
  }

  // Wishlist Operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    saveWishlist(this.wishlist);
    return added;
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  // Order Placement
  createOrder(shippingAddress, paymentMethod) {
    const totals = this.getCartTotals();
    const orderId = 'HM-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder = {
      orderId,
      date: dateStr,
      itemsCount: this.getCartCount(),
      items: [...this.cart],
      itemsSummary: this.cart.map(i => `${i.name} (x${i.quantity})`).join(', '),
      totals,
      shippingAddress,
      paymentMethod,
      status: 'Confirmed'
    };

    this.orders.unshift(newOrder);
    saveOrders(this.orders);
    this.clearCart();
    return newOrder;
  }

  // Product Management (Admin Portal)
  addNewProduct(productData) {
    const id = 'prod-' + Date.now();
    const newProd = {
      id,
      name: productData.name,
      category: productData.category || 'groceries',
      price: Number(productData.price),
      originalPrice: Number(productData.originalPrice || productData.price * 1.2),
      rating: 5.0,
      reviewsCount: 1,
      unit: productData.unit || '1 Unit',
      variants: productData.variants ? productData.variants.split(',').map(s => s.trim()) : [productData.unit || 'Standard'],
      inStock: true,
      stockCount: Number(productData.stock || 20),
      badge: 'NEW ARRIVAL',
      badgeType: 'badge-new',
      image: productData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: productData.description || 'Premium quality product brought to you by Harish Mart.',
      specs: {
        'Brand': 'Harish Mart Select',
        'Quality': '100% Certified Authentic'
      }
    };

    this.products.unshift(newProd);
    saveProducts(this.products);
    return newProd;
  }

  deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    saveProducts(this.products);
  }

  resetCatalog() {
    this.products = [...INITIAL_PRODUCTS];
    saveProducts(this.products);
  }
}

// Global App Instance
const app = new HarishMartApp();
