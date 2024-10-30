$(document).ready(function () {
  // Hàm lấy người dùng hiện tại từ localStorage
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  // Hàm hiển thị tên người dùng hiện tại
  function renderCurrentUser() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userName = currentUser.email.split("@")[0]; // Lấy phần tên trước "@"
      $("#current-user").text(`Xin chào ${userName}`);
    }
  }

  // Gọi hàm render khi vừa vào trang
  renderCurrentUser();

  // TOGGLE CART
  const $cartItem = $(".cart-items-container");

  $("#cart-btn").on("click", function () {
    $cartItem.toggleClass("active");
    $(".navbar").removeClass("active");
    $(".User").removeClass("active");
  });

  $(window).scroll(function () {
    $cartItem.removeClass("active");
  });

  // Hàm render sản phẩm
  // Mảng sản phẩm mẫu, mỗi sản phẩm có thêm thuộc tính "category"
  const products = [
    {
      id: 1,
      name: "Americano",
      price: "22,000đ",
      oldPrice: "25,000đ",
      image: "/Image/Drinks/Cafe/1.png",
      category: "cafe",
    },
    {
      id: 2,
      name: "Black Coffee",
      price: "20,000đ",
      image: "/Image/Drinks/Cafe/2.png",
      category: "cafe",
    },
    {
      id: 3,
      name: "Milk Coffee",
      price: "24,000đ",
      image: "/Image/Drinks/Cafe/3.png",
      category: "cafe",
    },
    {
      id: 4,
      name: "Salted Coffee",
      price: "27,000đ",
      image: "/Image/Drinks/Cafe/5.png",
      category: "cafe",
    },
    {
      id: 5,
      name: "Espresso",
      price: "25,000đ",
      image: "/Image/Drinks/Cafe/6.png",
      category: "cafe",
    },
    {
      id: 6,
      name: "Green Tea",
      price: "18,000đ",
      image: "/Image/Drinks/Tea/1.png",
      category: "tea",
    },
    {
      id: 7,
      name: "Peach Tea",
      price: "20,000đ",
      image: "/Image/Drinks/Tea/2.png",
      category: "tea",
    },
    {
      id: 8,
      name: "Strawberry Soda",
      price: "22,000đ",
      image: "/Image/Drinks/Soda/1.png",
      category: "soda",
    },
    {
      id: 9,
      name: "Lemon Juice",
      price: "15,000đ",
      image: "/Image/Drinks/Juice/1.png",
      category: "juice",
    },
    // Thêm nhiều sản phẩm khác
  ];

  // Các danh mục cần render
  const categories = [
    "cafe",
    "tea",
    "soda",
    "juice",
    "yaourt",
    "smoothie",
    "iceblend",
  ];

  // Hàm render danh mục sản phẩm
  function renderCategory(category) {
    // Lọc các sản phẩm thuộc category hiện tại
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    if (filteredProducts.length > 0) {
      let categoryHtml = `
      <section class="menu" id="${category}">
        <h1 class="heading"><span>${
          category.charAt(0).toUpperCase() + category.slice(1)
        }</span></h1>
        <div class="box-container">
          <div class="row justify-content-center">
    `;

      filteredProducts.forEach((product) => {
        categoryHtml += `
        <div class="col-lg-4 col-xl-4 col-xxl-2 col-md-3 col-sm-4 col-6">
          <div class="box4">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price}${
          product.oldPrice ? `<span>${product.oldPrice}</span>` : ""
        }</div>
            <button type="button" data-product-id="${
              product.id
            }" class="btn btn-primary btn-buy">Buy</button>
          </div>
        </div>
      `;
      });

      categoryHtml += `
          </div>
        </div>
      </section>
    `;

      // Thêm danh mục vào #sanpham
      $("#sanpham").append(categoryHtml);
    }
  }

  categories.forEach((category) => {
    renderCategory(category);
  });

  // CART
  // Load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item) => {
      renderCartItem(item);
    });
  };

  // Render cart item
  const renderCartItem = (item) => {
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    const existingCartItem = $(`.cart-item[data-product-id='${item.id}']`);

    if (existingCartItem.length > 0) {
      // Nếu sản phẩm đã có, tăng số lượng
      const itemQuantity = existingCartItem.find(".item-quantity");
      let quantity = parseInt(itemQuantity.text());
      itemQuantity.text(quantity + 1);
    } else {
      const cartItem = $(`
        <div class="cart-item" data-product-id="${item.id}">
            <span class="fas fa-times remove-item" product-id="${
              item.id
            }"></span>
            <img class="item-image" src="${
              item.image
            }" alt="img" width="100px" />
            <div class="content">
                <h3 class="item-title">${item.name}</h3>
                <div class="price item-price">${item.price.toLocaleString()}đ</div>
                <button class="btn btn-secondary decrease-quantity">-</button>
                <span class="item-quantity">1</span>
                <button class="btn btn-secondary increase-quantity">+</button>
            </div>
        </div>
    `);
    
      $(".cart-items-container").prepend(cartItem);
    }
  };

  // Add item to cart
  $(".btn-buy").on("click", function (e) {
    e.preventDefault();
    const productId = Number($(this).data("product-id"));
    const product = products.find((p) => Number(p.id) === productId);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => Number(item.id) === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItem({ ...product, quantity: 1 }); // Render mới để hiển thị
  });

  // Remove item from cart
  $(document).on("click", ".remove-item", function () {
    const itemId = $(this).closest(".cart-item").data("product-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => Number(item.id) !== Number(itemId));
    localStorage.setItem("cart", JSON.stringify(cart));
    $(this).closest(".cart-item").remove();
  });

  // Increase quantity
  $(document).on("click", ".increase-quantity", function () {
    const itemQuantity = $(this).siblings(".item-quantity");
    let quantity = parseInt(itemQuantity.text());
    itemQuantity.text(quantity + 1);

    const itemId = $(this).closest(".cart-item").data("product-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = cart.find((item) => Number(item.id) === itemId);
    itemInCart.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  // Decrease quantity
  $(document).on("click", ".decrease-quantity", function () {
    const itemQuantity = $(this).siblings(".item-quantity");
    let quantity = parseInt(itemQuantity.text());

    if (quantity > 1) {
      itemQuantity.text(quantity - 1);
      const itemId = $(this).closest(".cart-item").data("product-id");
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemInCart = cart.find((item) => Number(item.id) === Number(itemId));

      itemInCart.quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      $(this).closest(".cart-item").remove();
    }
  });

  loadCart(); // Fetch and render cart data on page load
});
