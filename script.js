function goShop() {
  window.location.href = "shop.html";
}

function goHome() {
  window.location.href = "index.html";
}

function goVideos() {
  window.location.href = "videos.html";
}

function goCart() {
  window.location.href = "cart.html";
}

function goCustomize() {
  window.location.href = "customize.html";
}

function goStory() {
  window.location.href = "story.html";
}

function goProduct() {
  window.location.href = "product.html";
}

function initializeProductNavLink() {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks) return;

  const productLinkExists =
    navLinks.querySelector("[data-nav='product']") ||
    Array.from(navLinks.querySelectorAll(".nav-button, a")).find(
      (btn) => btn.textContent.trim().toLowerCase() === "product",
    );

  if (productLinkExists) {
    // Ensure the existing product button has data-nav to avoid duplicates
    if (productLinkExists instanceof HTMLElement) {
      productLinkExists.setAttribute("data-nav", "product");
    }
    return;
  }

  const productButton = document.createElement("button");
  productButton.className = "nav-button ghost";
  productButton.setAttribute("data-nav", "product");
  productButton.type = "button";
  productButton.textContent = "Product";
  productButton.onclick = goProduct;

  // Insert after Shop if possible, otherwise append
  const shopButton = navLinks.querySelector("button[onclick='goShop()']");
  if (shopButton && shopButton.parentElement === navLinks) {
    navLinks.insertBefore(productButton, shopButton.nextSibling);
  } else {
    navLinks.appendChild(productButton);
  }
}

function startCustomizeWhatsApp() {
  const message = encodeURIComponent(
    `Hello Flora and Frames,\n\nI am interested in customized decor.\n\nI want to know:\n- How to upload my photos\n- Available sizes and options\n- Pricing and delivery time\n\nPlease help me customize my order.`,
  );

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

let currentSlide = 0;
let autoSlideInterval;
let favoritesAutoScrollInterval;
let categoryRailInterval;
let videoStripInterval;
let miniProductSliderInterval;
let heroSlideIndex = 0;
let heroSliderInterval;
let customizePreviewIndex = 0;
let customizePreviewInterval;
const CART_STORAGE_KEY = "flora_and_frames_cart";
const WHATSAPP_NUMBER = "917045782996";

const previewThemes = {
  soft: {
    title: "Soft Bloom",
    copy: "Blush tones, airy layers, and a personalized romantic finish.",
    tags: ["Blush tones", "Soft wall art", "Dreamy lighting"],
    className: "theme-soft",
  },
  cozy: {
    title: "Cozy Glow",
    copy: "Warm amber light, deeper neutrals, and a room that feels instantly comforting.",
    tags: ["Warm lights", "Golden accents", "Cozy corners"],
    className: "theme-cozy",
  },
  fresh: {
    title: "Fresh Green",
    copy: "Botanical textures, open energy, and decor that feels calm and alive.",
    tags: ["Leafy layers", "Clean palette", "Nature mood"],
    className: "theme-fresh",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileNav();
  initializeAnnouncementSlider();
  initializeCartButtons();
  updateCartCount();
  renderCartPage();
  initializeRevealAnimations();
  initializeHeroSlider();
  initializeCarouselDots();
  initializeCustomizeTeaserSlider();
  initializeCustomizePreview();
  initializeCustomizeOrderForm();
  initializeVideoPopup();
  initializeCardTilt();
  initializeCategorySlideshow();
  initializeCategoryProductPage();
  initializeProductNavLink();
  startAutoSlide();
  startFavoritesAutoScroll();
  startCategoryRailAutoScroll();
  startVideoStripAutoScroll();
  startMiniProductAutoScroll();
});

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
  showCartFeedback(`${product.name} added to cart`);
}

function initializeCartButtons() {
  const buttons = document.querySelectorAll("[data-add-to-cart]");
  if (buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        name: button.dataset.productName,
        price: Number(button.dataset.productPrice),
        image: button.dataset.productImage,
      };

      addToCart(product);
    });
  });
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll("[data-cart-count]");

  badges.forEach((badge) => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-flex" : "none";
  });
}

function showCartFeedback(message) {
  let feedback = document.querySelector(".cart-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "cart-feedback";
    document.body.appendChild(feedback);
  }

  feedback.textContent = message;
  feedback.classList.add("is-visible");

  setTimeout(() => {
    feedback.classList.remove("is-visible");
  }, 1800);
}

function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

// Sample product dataset for category pages
const products = {
  "wall-posters": [
    {
      name: "Anime Poster",
      price: 199,
      image: "img/product_images/wall_posters/anime_poster/anime_poster.jpg",
    },
    {
      name: "Anime Poster 2",
      price: 229,
      image: "img/product_images/wall_posters/anime_poster/anime_poster1.jpg",
    },
    {
      name: "Anime Poster 3",
      price: 249,
      image: "img/product_images/wall_posters/anime_poster/anime_poster2.jpg",
    },
    {
      name: "Anime Poster 4",
      price: 269,
      image: "img/product_images/wall_posters/anime_poster/anime_poster3.jpg",
    },
    {
      name: "Pink Poster",
      price: 179,
      image: "img/product_images/wall_posters/pink_wall_poster/pink_poster.jpg",
    },
    {
      name: "Pink Poster 2",
      price: 189,
      image:
        "img/product_images/wall_posters/pink_wall_poster/pink_poster1.jpg",
    },
    {
      name: "Pink Poster 3",
      price: 199,
      image:
        "img/product_images/wall_posters/pink_wall_poster/pink_poster2.jpg",
    },
    {
      name: "Pink Poster 4",
      price: 209,
      image:
        "img/product_images/wall_posters/pink_wall_poster/pink_poster3.jpg",
    },
    {
      name: "Purple Poster",
      price: 219,
      image: "img/product_images/wall_posters/purple_poster/purple_poster.jpg",
    },
    {
      name: "Purple Poster 2",
      price: 229,
      image: "img/product_images/wall_posters/purple_poster/purple_poster1.jpg",
    },
    {
      name: "Purple Poster 3",
      price: 239,
      image: "img/product_images/wall_posters/purple_poster/purple_poster2.jpg",
    },
  ],
  lights: [
    {
      name: "Fairy Lights",
      price: 299,
      image: "img/product_images/lights/lights.jpg",
    },
    {
      name: "LED String Lights",
      price: 399,
      image: "img/product_images/lights/lights1.jpg",
    },
    {
      name: "Color Lights",
      price: 499,
      image: "img/product_images/lights/lights2.jpg",
    },
  ],
  "fake-vines": [
    {
      name: "Fake Vines Small",
      price: 249,
      image: "img/shop_images/fake_vines.jpeg",
    },
    {
      name: "Fake Vines Large",
      price: 299,
      image: "img/shop_images/fake_vines1.jpeg",
    },
  ],
  "decor-kits": [
    {
      name: "Decor Gift Set 1",
      price: 799,
      image: "img/product_images/decor_gifts/decor_add.jpg",
    },
    {
      name: "Decor Gift Set 2",
      price: 899,
      image: "img/product_images/decor_gifts/decor_add1.jpg",
    },
    {
      name: "Decor Gift Set 3",
      price: 999,
      image: "img/product_images/decor_gifts/decor_add2.jpg",
    },
    {
      name: "Decor Gift Set 4",
      price: 1099,
      image: "img/product_images/decor_gifts/decor_add3.jpg",
    },
    {
      name: "Decor Gift Set 5",
      price: 1199,
      image: "img/product_images/decor_gifts/decor_add4.jpg",
    },
  ],
  gifting: [
    {
      name: "Gift Card Set",
      price: 499,
      image: "img/shop_images/gifting.jpeg",
    },
    {
      name: "Gift Hamper 1",
      price: 599,
      image: "img/shop_images/gifting1.jpeg",
    },
    {
      name: "Gift Hamper 2",
      price: 699,
      image: "img/shop_images/gifting2.jpeg",
    },
    {
      name: "Premium Decor Gift",
      price: 899,
      image: "img/product_images/decor_gifts/decor_add3.jpg",
    },
    {
      name: "Festive Decor Kit",
      price: 1099,
      image: "img/product_images/decor_gifts/decor_add4.jpg",
    },
  ],
  "photo-frames": [
    {
      name: "Classic Photo Frame",
      price: 349,
      image: "img/shop_images/photoframe.jpeg",
    },
    {
      name: "Vintage Frame",
      price: 379,
      image: "img/shop_images/photoframe1.jpeg",
    },
  ],
  "wall-decor": [
    {
      name: "Wall Decor 1",
      price: 699,
      image: "img/shop_images/wall_decor.jpeg",
    },
    {
      name: "Wall Decor 2",
      price: 749,
      image: "img/shop_images/wall_decor1.jpeg",
    },
    {
      name: "Wall Decor 3",
      price: 779,
      image: "img/shop_images/wall_decor.jpeg",
    },
  ],
};

const categoryFriendlyName = {
  "wall-posters": "Wall Posters",
  lights: "Lights",
  "fake-vines": "Fake Vines",
  "decor-kits": "Decor Kits",
  gifting: "Gifting",
  "photo-frames": "Photo Frames",
  "wall-decor": "Wall Decor",
};

function getQueryStringParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function navigateToCategory(categorySlug) {
  if (!categorySlug) return;
  const query = new URLSearchParams({ category: categorySlug }).toString();
  window.location.href = `product.html?${query}`;
}

function initializeCategoryProductPage() {
  const categoryHeading = document.getElementById("category-heading");
  const productGrid = document.getElementById("category-products");

  if (!categoryHeading || !productGrid) {
    return; // Not on product page
  }

  const selected = getQueryStringParam("category");

  if (!selected) {
    categoryHeading.textContent = "All Products";
    const allItems = Object.values(products).flat();
    if (!allItems.length) {
      productGrid.innerHTML = "<p class='empty-state'>No products found</p>";
      return;
    }

    productGrid.innerHTML = allItems
      .map(
        (item) => `
      <article class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="product-price">${formatCurrency(item.price)}</p>
        </div>
      </article>
    `,
      )
      .join("");
    return;
  }

  const categoryKey = selected.trim().toLowerCase();
  const friendlyName = categoryFriendlyName[categoryKey] || categoryKey;
  categoryHeading.textContent = friendlyName;

  const items = products[categoryKey] || [];
  if (!items.length) {
    productGrid.innerHTML = "<p class='empty-state'>No products found</p>";
    return;
  }

  productGrid.innerHTML = items
    .map(
      (item) => `
      <article class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="product-price">${formatCurrency(item.price)}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutForm = document.getElementById("checkout-form");
  const pincodeInput = document.getElementById("customer-pincode");
  const villageSelect = document.getElementById("customer-village");
  const districtInput = document.getElementById("customer-district");
  const stateInput = document.getElementById("customer-state");

  if (!cartItemsContainer || !cartTotalElement || !checkoutForm) return;

  const render = () => {
    const cart = getCart();

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="cart-empty">Your cart is empty right now. Add products from the homepage to continue.</p>`;
      cartTotalElement.textContent = formatCurrency(0);
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
          <article class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <div class="cart-item-copy">
              <h3>${item.name}</h3>
              <p>${formatCurrency(item.price)}</p>
              <div class="cart-item-controls">
                <button type="button" onclick="changeCartQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="changeCartQuantity(${index}, 1)">+</button>
                <button type="button" class="remove-link" onclick="removeCartItem(${index})">Remove</button>
              </div>
            </div>
          </article>
        `,
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    cartTotalElement.textContent = formatCurrency(total);
  };

  window.changeCartQuantity = (index, change) => {
    const cart = getCart();
    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCart(cart);
    render();
  };

  window.removeCartItem = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    render();
  };

  window.clearCart = () => {
    saveCart([]);
    render();
  };

  const resetPincodeFields = (
    placeholderText = "Select village / post office",
  ) => {
    if (villageSelect) {
      villageSelect.innerHTML = `<option value="">${placeholderText}</option>`;
      villageSelect.value = "";
    }

    if (districtInput) districtInput.value = "";
    if (stateInput) stateInput.value = "";
  };

  const fillPincodeDetails = async (pincode) => {
    if (!pincodeInput || !villageSelect || !districtInput || !stateInput)
      return;

    if (!/^\d{6}$/.test(pincode)) {
      resetPincodeFields("Enter a valid 6-digit PIN");
      return;
    }

    resetPincodeFields("Loading...");

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      const data = await response.json();
      const record = Array.isArray(data) ? data[0] : null;
      const offices = record?.PostOffice;

      if (
        !record ||
        record.Status !== "Success" ||
        !Array.isArray(offices) ||
        offices.length === 0
      ) {
        resetPincodeFields("No locations found for this PIN");
        return;
      }

      districtInput.value = offices[0].District || "";
      stateInput.value = offices[0].State || "";

      villageSelect.innerHTML = `<option value="">Select village / post office</option>`;
      offices.forEach((office) => {
        const option = document.createElement("option");
        option.value = office.Name;
        option.textContent = office.Name;
        villageSelect.appendChild(option);
      });
    } catch (error) {
      resetPincodeFields("Could not fetch PIN details");
    }
  };

  if (pincodeInput) {
    pincodeInput.addEventListener("input", () => {
      const cleaned = pincodeInput.value.replace(/\D/g, "").slice(0, 6);
      pincodeInput.value = cleaned;

      if (cleaned.length < 6) {
        resetPincodeFields("Select village / post office");
      }
    });

    pincodeInput.addEventListener("change", () => {
      fillPincodeDetails(pincodeInput.value.trim());
    });

    pincodeInput.addEventListener("blur", () => {
      fillPincodeDetails(pincodeInput.value.trim());
    });
  }

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      showCartFeedback("Add something to cart before checkout");
      return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const pincode = document.getElementById("customer-pincode").value.trim();
    const village = document.getElementById("customer-village").value.trim();
    const district = document.getElementById("customer-district").value.trim();
    const state = document.getElementById("customer-state").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const notes = document.getElementById("customer-notes").value.trim();
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const itemLines = cart
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}`,
      )
      .join("\n");

    const message =
      `Hello Flora and Frames,%0A%0AI want to place an order.%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `PIN Code: ${encodeURIComponent(pincode)}%0A` +
      `Village / Post Office: ${encodeURIComponent(village)}%0A` +
      `District: ${encodeURIComponent(district)}%0A` +
      `State: ${encodeURIComponent(state)}%0A` +
      `Address: ${encodeURIComponent(address)}%0A` +
      `Notes: ${encodeURIComponent(notes || "None")}%0A%0A` +
      `Order Details:%0A${encodeURIComponent(itemLines)}%0A%0A` +
      `Total: ${encodeURIComponent(formatCurrency(total))}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  });

  render();
}

function initializeAnnouncementSlider() {
  const items = document.querySelectorAll(".announcement-item");
  if (items.length <= 1) return;

  let activeIndex = 0;

  setInterval(() => {
    items[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % items.length;
    items[activeIndex].classList.add("is-active");
  }, 2800);
}

function initializeMobileNav() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".mobile-menu-toggle");

  if (!navbar || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initializeCategorySlideshow() {
  // Image configurations for each category
  const categoryImages = {
    "wall-posters": [
      "img/product_images/wall_posters/anime_poster/anime_poster.jpg",
      "img/product_images/wall_posters/anime_poster/anime_poster1.jpg",
      "img/product_images/wall_posters/anime_poster/anime_poster2.jpg",
      "img/product_images/wall_posters/anime_poster/anime_poster3.jpg",
      "img/product_images/wall_posters/pink_wall_poster/pink_poster.jpg",
      "img/product_images/wall_posters/pink_wall_poster/pink_poster1.jpg",
      "img/product_images/wall_posters/pink_wall_poster/pink_poster2.jpg",
      "img/product_images/wall_posters/pink_wall_poster/pink_poster3.jpg",
      "img/product_images/wall_posters/purple_poster/purple_poster.jpg",
      "img/product_images/wall_posters/purple_poster/purple_poster1.jpg",
      "img/product_images/wall_posters/purple_poster/purple_poster2.jpg",
    ],
    lights: [
      "img/product_images/lights/lights.jpg",
      "img/product_images/lights/lights1.jpg",
      "img/product_images/lights/lights2.jpg",
    ],
    "fake-vines": [
      "img/shop_images/fake_vines.jpeg",
      "img/shop_images/fake_vines1.jpeg",
    ],
    "decor-kits": [
      "img/product_images/decor_gifts/decor_add.jpg",
      "img/product_images/decor_gifts/decor_add1.jpg",
      "img/product_images/decor_gifts/decor_add2.jpg",
      "img/product_images/decor_gifts/decor_add3.jpg",
      "img/product_images/decor_gifts/decor_add4.jpg",
    ],
    gifting: [
      "img/shop_images/gifting.jpeg",
      "img/shop_images/gifting1.jpeg",
      "img/shop_images/gifting2.jpeg",
    ],
    "photo-frames": [
      "img/shop_images/photoframe.jpeg",
      "img/shop_images/photoframe1.jpeg",
    ],
    "wall-decor": [
      "img/shop_images/wall_decor.jpeg",
      "img/shop_images/wall_decor1.jpeg",
    ],
  };

  // For old slideshow cards (backward compatibility)
  const categoryConfigs = {
    "wall-posters": {
      images: [
        "img/product_images/wall_posters/anime_poster/anime_poster.jpg",
        "img/product_images/wall_posters/anime_poster/anime_poster1.jpg",
        "img/product_images/wall_posters/anime_poster/anime_poster2.jpg",
        "img/product_images/wall_posters/anime_poster/anime_poster3.jpg",
        "img/product_images/wall_posters/pink_wall_poster/pink_poster.jpg",
        "img/product_images/wall_posters/pink_wall_poster/pink_poster1.jpg",
        "img/product_images/wall_posters/pink_wall_poster/pink_poster2.jpg",
        "img/product_images/wall_posters/pink_wall_poster/pink_poster3.jpg",
        "img/product_images/wall_posters/purple_poster/purple_poster.jpg",
        "img/product_images/wall_posters/purple_poster/purple_poster1.jpg",
        "img/product_images/wall_posters/purple_poster/purple_poster2.jpg",
      ],
      alt: "Wall Poster",
    },
    lights: {
      images: [
        "img/product_images/lights/lights.jpg",
        "img/product_images/lights/lights1.jpg",
        "img/product_images/lights/lights2.jpg",
      ],
      alt: "Lights",
    },
    "fake-vines": {
      images: [
        "img/shop_images/fake_vines.jpeg",
        "img/shop_images/fake_vines1.jpeg",
      ],
      alt: "Fake Vines",
    },
    "decor-kits": {
      images: [
        "img/product_images/decor_gifts/decor_add.jpg",
        "img/product_images/decor_gifts/decor_add1.jpg",
        "img/product_images/decor_gifts/decor_add2.jpg",
        "img/product_images/decor_gifts/decor_add3.jpg",
        "img/product_images/decor_gifts/decor_add4.jpg",
      ],
      alt: "Decor Kits",
    },
    gifting: {
      images: [
        "img/shop_images/gifting.jpeg",
        "img/shop_images/gifting1.jpeg",
        "img/shop_images/gifting2.jpeg",
      ],
      alt: "Gifting",
    },
    "photo-frames": {
      images: [
        "img/shop_images/photoframe.jpeg",
        "img/shop_images/photoframe1.jpeg",
      ],
      alt: "Photo Frames",
    },
    "wall-decor": {
      images: [
        "img/shop_images/wall_decor.jpeg",
        "img/shop_images/wall_decor1.jpeg",
      ],
      alt: "Wall Decor",
    },
  };

  // Initialize new-style category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    const imageElement = card.querySelector(".category-image");
    const dotsContainer = card.querySelector(".dots-container");

    if (!imageElement || !dotsContainer) return;

    const category = imageElement.dataset.category;
    const images = categoryImages[category] || [imageElement.src];

    let currentIndex = 0;
    let slideInterval = null;

    // Function to update the current image
    const updateImage = (index) => {
      const targetSrc = images[index];
      const imageEl = card.querySelector(".category-image");
      if (!imageEl) return;

      // Preload target image to avoid blank frame while loading
      const preloader = new Image();
      preloader.src = targetSrc;
      preloader.onload = () => {
        imageEl.classList.remove("active");

        // Immediately assign new source after fade-out starts and fade back in
        setTimeout(() => {
          imageEl.src = targetSrc;
          requestAnimationFrame(() => imageEl.classList.add("active"));
        }, 50);
      };

      // Update dots
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentIndex = index;
    };

    // Function to move to next image
    const nextImage = () => {
      const nextIndex = (currentIndex + 1) % images.length;
      updateImage(nextIndex);
    };

    // Function to start auto-play
    const startAutoPlay = () => {
      if (slideInterval) clearInterval(slideInterval);
      if (images.length > 1) {
        slideInterval = setInterval(nextImage, 2000);
      }
    };

    // Function to stop auto-play
    const stopAutoPlay = () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    };

    // Set up dots
    dotsContainer.innerHTML = "";
    images.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        updateImage(index);
        startAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    // Start auto-play and setup hover handlers
    updateImage(0);
    startAutoPlay();

    card.addEventListener("mouseenter", stopAutoPlay);
    card.addEventListener("mouseleave", startAutoPlay);

    // Clicking a category card navigates to the product page with category query
    if (category) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        navigateToCategory(category);
      });
    }
  });

  // Initialize old-style slideshow cards (backward compatibility)
  document.querySelectorAll(".category-slideshow-card").forEach((card) => {
    const key = card.dataset.categoryKey;
    const config = categoryConfigs[key];
    if (!config) return;

    const imageEl = card.querySelector(".slideshow-image");
    const dotsContainer = card.querySelector(".slideshow-dots");
    let index = 0;
    let intervalId = null;

    const setIndex = (nextIndex) => {
      index = (nextIndex + config.images.length) % config.images.length;
      if (!imageEl) return;

      imageEl.classList.remove("is-visible");
      requestAnimationFrame(() => {
        imageEl.src = config.images[index];
        imageEl.alt = `${config.alt} ${index + 1}`;
        imageEl.classList.add("is-visible");
      });

      if (dotsContainer) {
        dotsContainer
          .querySelectorAll(".slideshow-dot")
          .forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === index);
          });
      }
    };

    const start = () => {
      stop();
      intervalId = setInterval(() => setIndex(index + 1), 2000);
    };

    const stop = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      config.images.forEach((_, dotIndex) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slideshow-dot";
        dot.setAttribute("aria-label", `Show ${key} image ${dotIndex + 1}`);
        dot.addEventListener("click", () => {
          setIndex(dotIndex);
          start();
        });
        dotsContainer.appendChild(dot);
      });
    }

    card.addEventListener("mouseenter", stop);
    card.addEventListener("mouseleave", start);

    setIndex(0);
    start();
  });
}

function moveCarousel(direction) {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length === 0) return;

  currentSlide += direction;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  updateCarousel();
  startAutoSlide();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  startAutoSlide();
}

function initializeHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.getElementById("hero-slider-dots");

  if (slides.length === 0 || !dotsContainer) return;

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to hero slide ${index + 1}`);
    dot.addEventListener("click", () => {
      heroSlideIndex = index;
      updateHeroSlider();
      startHeroSlider();
    });
    dotsContainer.appendChild(dot);
  });

  updateHeroSlider();
  startHeroSlider();
}

function updateHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-slider-dot");

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === heroSlideIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === heroSlideIndex);
  });
}

function startHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length === 0) return;

  clearInterval(heroSliderInterval);
  heroSliderInterval = setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    updateHeroSlider();
  }, 4200);
}

function updateCarousel() {
  const carousel = document.querySelector(".carousel");
  const dots = document.querySelectorAll(".carousel-dot");

  if (carousel) {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    moveCarousel(1);
  }, 4500);
}

function initializeCarouselDots() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!dotsContainer || slides.length === 0) return;

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  updateCarousel();
}

function initializeCustomizeTeaserSlider() {
  const slider = document.getElementById("customize-slider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".customize-slide");
  const prevButton = slider.querySelector(".customize-slider-prev");
  const nextButton = slider.querySelector(".customize-slider-next");
  const dotsContainer = document.getElementById("customize-slider-dots");

  if (slides.length === 0) return;

  const renderSlides = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === customizePreviewIndex);
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".customize-slider-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === customizePreviewIndex);
      });
    }
  };

  const goToCustomizeSlide = (index) => {
    customizePreviewIndex = (index + slides.length) % slides.length;
    renderSlides();
  };

  const restartCustomizeSlider = () => {
    clearInterval(customizePreviewInterval);
    customizePreviewInterval = setInterval(() => {
      goToCustomizeSlide(customizePreviewIndex + 1);
    }, 3200);
  };

  if (dotsContainer) {
    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "customize-slider-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to customize preview ${index + 1}`);
      dot.addEventListener("click", () => {
        goToCustomizeSlide(index);
        restartCustomizeSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  prevButton?.addEventListener("click", () => {
    goToCustomizeSlide(customizePreviewIndex - 1);
    restartCustomizeSlider();
  });

  nextButton?.addEventListener("click", () => {
    goToCustomizeSlide(customizePreviewIndex + 1);
    restartCustomizeSlider();
  });

  renderSlides();
  restartCustomizeSlider();
}

function startFavoritesAutoScroll() {
  const scroller = document.querySelector(".horizontal-scroll");
  if (!scroller) return;

  const getScrollAmount = () => {
    const card = scroller.querySelector(".scroll-card");
    const cardStyles = card ? window.getComputedStyle(card) : null;
    const gap = parseInt(
      window.getComputedStyle(scroller).columnGap || "20",
      10,
    );

    if (!card || !cardStyles) return 280;
    return card.offsetWidth + gap;
  };

  const startScrolling = () => {
    clearInterval(favoritesAutoScrollInterval);
    favoritesAutoScrollInterval = setInterval(() => {
      const scrollAmount = getScrollAmount();
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const nextPosition = scroller.scrollLeft + scrollAmount;

      if (nextPosition >= maxScrollLeft - 6) {
        scroller.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scroller.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 2600);
  };

  const stopScrolling = () => {
    clearInterval(favoritesAutoScrollInterval);
  };

  startScrolling();

  scroller.addEventListener("mouseenter", stopScrolling);
  scroller.addEventListener("mouseleave", startScrolling);
  scroller.addEventListener("touchstart", stopScrolling, { passive: true });
  scroller.addEventListener("touchend", startScrolling);
}

function startCategoryRailAutoScroll() {
  const rail = document.querySelector(".category-rail");
  if (!rail) return;

  const getScrollAmount = () => {
    const pill = rail.querySelector(".rail-pill");
    const gap = parseInt(window.getComputedStyle(rail).gap || "12", 10);
    return pill ? pill.offsetWidth + gap : 140;
  };

  const startScrolling = () => {
    clearInterval(categoryRailInterval);
    categoryRailInterval = setInterval(() => {
      const scrollAmount = getScrollAmount();
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      const nextPosition = rail.scrollLeft + scrollAmount;

      if (nextPosition >= maxScrollLeft - 6) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      rail.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 2200);
  };

  const stopScrolling = () => {
    clearInterval(categoryRailInterval);
  };

  startScrolling();

  rail.addEventListener("mouseenter", stopScrolling);
  rail.addEventListener("mouseleave", startScrolling);
  rail.addEventListener("touchstart", stopScrolling, { passive: true });
  rail.addEventListener("touchend", startScrolling);
}

function startVideoStripAutoScroll() {
  const strip = document.querySelector(".video-strip");
  if (!strip) return;

  const getScrollAmount = () => {
    const card = strip.querySelector(".video-card");
    const gap = parseInt(window.getComputedStyle(strip).gap || "16", 10);
    return card ? card.offsetWidth + gap : 240;
  };

  const startScrolling = () => {
    clearInterval(videoStripInterval);
    videoStripInterval = setInterval(() => {
      const scrollAmount = getScrollAmount();
      const maxScrollLeft = strip.scrollWidth - strip.clientWidth;
      const nextPosition = strip.scrollLeft + scrollAmount;

      if (nextPosition >= maxScrollLeft - 6) {
        strip.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      strip.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 2600);
  };

  const stopScrolling = () => {
    clearInterval(videoStripInterval);
  };

  startScrolling();

  strip.addEventListener("mouseenter", stopScrolling);
  strip.addEventListener("mouseleave", startScrolling);
  strip.addEventListener("touchstart", stopScrolling, { passive: true });
  strip.addEventListener("touchend", startScrolling);
}

function startMiniProductAutoScroll() {
  const slider = document.querySelector(".mini-product-slider");
  if (!slider) return;

  const getScrollAmount = () => {
    const card = slider.querySelector(".mini-product-card");
    const gap = parseInt(window.getComputedStyle(slider).gap || "14", 10);
    return card ? card.offsetWidth + gap : 170;
  };

  const startScrolling = () => {
    clearInterval(miniProductSliderInterval);
    miniProductSliderInterval = setInterval(() => {
      const scrollAmount = getScrollAmount();
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const nextPosition = slider.scrollLeft + scrollAmount;

      if (nextPosition >= maxScrollLeft - 6) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 2400);
  };

  const stopScrolling = () => {
    clearInterval(miniProductSliderInterval);
  };

  startScrolling();

  slider.addEventListener("mouseenter", stopScrolling);
  slider.addEventListener("mouseleave", startScrolling);
  slider.addEventListener("touchstart", stopScrolling, { passive: true });
  slider.addEventListener("touchend", startScrolling);
}

function initializeRevealAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
    observer.observe(element);
  });
}

function initializeCustomizePreview() {
  const chips = document.querySelectorAll(".custom-chip");
  const previewCard = document.getElementById("preview-card");
  const previewTitle = document.getElementById("preview-title");
  const previewCopy = document.getElementById("preview-copy");
  const previewTag1 = document.getElementById("preview-tag-1");
  const previewTag2 = document.getElementById("preview-tag-2");
  const previewTag3 = document.getElementById("preview-tag-3");

  if (
    chips.length === 0 ||
    !previewCard ||
    !previewTitle ||
    !previewCopy ||
    !previewTag1 ||
    !previewTag2 ||
    !previewTag3
  ) {
    return;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const theme = chip.dataset.theme;
      const themeConfig = previewThemes[theme];
      if (!themeConfig) return;

      chips.forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");

      previewCard.classList.remove("theme-soft", "theme-cozy", "theme-fresh");
      previewCard.classList.add(themeConfig.className);

      previewTitle.textContent = themeConfig.title;
      previewCopy.textContent = themeConfig.copy;
      previewTag1.textContent = themeConfig.tags[0];
      previewTag2.textContent = themeConfig.tags[1];
      previewTag3.textContent = themeConfig.tags[2];
    });
  });
}

function initializeCustomizeOrderForm() {
  const button = document.getElementById("custom-order-whatsapp");

  if (!button) return;

  button.addEventListener("click", () => {
    const name =
      document.getElementById("custom-order-name")?.value.trim() || "";
    const phone =
      document.getElementById("custom-order-phone")?.value.trim() || "";
    const product =
      document.getElementById("custom-order-product")?.value ||
      "Customize Your Decor";
    const size =
      document.getElementById("custom-order-size")?.value || "Not selected";
    const quantity =
      document.getElementById("custom-order-quantity")?.value || "1";
    const notes =
      document.getElementById("custom-order-notes")?.value.trim() || "None";

    const message = encodeURIComponent(
      `Hello Flora and Frames,\n\nI want to place a customization request.\n\nName: ${name || "Not shared"}\nPhone: ${phone || "Not shared"}\nProduct: ${product}\nSize: ${size}\nQuantity: ${quantity}\nNotes: ${notes}\n\nI will attach my photos in this WhatsApp chat. Please guide me further.`,
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  });
}

function initializeVideoPopup() {
  const popup = document.getElementById("video-popup");
  const player = document.getElementById("video-popup-player");
  const cards = document.querySelectorAll(".video-card[data-popup-video]");
  const closeButtons = document.querySelectorAll("[data-close-video-popup]");

  if (!popup || !player || cards.length === 0) return;

  const closePopup = () => {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    player.pause();
    player.removeAttribute("src");
    player.load();
    document.body.style.overflow = "";
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoSrc = card.dataset.popupVideo;
      if (!videoSrc) return;

      player.src = videoSrc;
      popup.classList.add("is-open");
      popup.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      player.play().catch(() => {});
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("is-open")) {
      closePopup();
    }
  });
}

function initializeCardTilt() {
  const cards = document.querySelectorAll(
    ".scroll-card, .category-card, .process-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = (offsetX / rect.width - 0.5) * 10;
      const rotateX = (0.5 - offsetY / rect.height) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
