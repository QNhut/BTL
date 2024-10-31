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
      price: "23,000đ",
      oldPrice: "25,000đ",
      image: "/Image/Drinks/Cafe/1.png",
      category: "cafe",
    },
    {
      id: 2,
      name: "Cà phê đen",
      price: "20,000đ",
      image: "/Image/Drinks/Cafe/2.png",
      category: "cafe",
    },
    {
      id: 3,
      name: "Cà phê sữa",
      price: "24,000đ",
      image: "/Image/Drinks/Cafe/3.png",
      category: "cafe",
    },
    {
      id: 4,
      name: "Bạc xĩu",
      price: "29,000đ",
      image: "/Image/Drinks/Cafe/4.png",
      category: "cafe",
    },
    {
      id: 5,
      name: "Cà phê muối",
      price: "32,000đ",

      image: "/Image/Drinks/Cafe/5.png",
      category: "cafe",
    },
    {
      id: 6,
      name: "Espresso",
      price: "29,000đ",
      image: "/Image/Drinks/Cafe/6.png",
      category: "cafe",
    },
    {
      id: 7,
      name: "Capuchino",
      price: "36,000đ",
      image: "/Image/Drinks/Cafe/7.png",
      category: "cafe",
    },
    {
      id: 8,
      name: "Latte",
      price: "36,000đ",
      image: "/Image/Drinks/Cafe/8.png",
      category: "cafe",
    },
    {
      id: 9,
      name: "Mocha",
      price: "37,000đ",
      image: "/Image/Drinks/Cafe/9.png",
      category: "cafe",
    },
    {
      id: 10,
      name: "Green Tea Latte",
      price: "36,000đ",
      image: "/Image/Drinks/Cafe/10.png",
      category: "cafe",
    },
    {
      id: 11,
      name: "Trà hoa đậu biết",
      price: "45,000đ",
      image: "/Image/Drinks/Tea/9.png",
      category: "tea",
    },
    {
      id: 12,
      name: "Trà sen vàng",
      price: "45,000đ",
      image: "/Image/Drinks/Tea/8.png",
      category: "tea",
    },
    {
      id: 13,
      name: "Trà dâu",
      price: "45,000đ",
      image: "/Image/Drinks/Tea/7.png",
      category: "tea",
    },
    {
      id: 14,
      name: "Trà vãi",
      price: "45,000đ",
      image: "/Image/Drinks/Tea/6.png",
      category: "tea",
    },
    {
      id: 15,
      name: "Trà đào",
      price: "45,000đ",
      image: "/Image/Drinks/Tea/5.png",
      category: "tea",
    },
    {
      id: 16,
      name: "Trà xanh sữa",
      price: "40,000đ",
      image: "/Image/Drinks/Tea/3.png",
      category: "tea",
    },
    {
      id: 17,
      name: "Lipton",
      price: "42,000đ",
      image: "/Image/Drinks/Tea/2.png",
      category: "tea",
    },

    {
      id: 21,
      name: "Soda dâu",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/1.png",
      category: "soda",
    },
    {
      id: 22,
      name: "Soda việt quất",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/2.png",
      category: "soda",
    },
    {
      id: 23,
      name: "Soda phúc bồn tử",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/3.png",
      category: "soda",
    },
    {
      id: 24,
      name: "Soda blue ocean",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/4.png",
      category: "soda",
    },
    {
      id: 25,
      name: "Soda chanh",
      price: "36,000đ",
      image: "/Image/Drinks/Soda/5.png",
      category: "soda",
    },
    {
      id: 26,
      name: "Soda kiwi",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/6.png",
      category: "soda",
    },
    {
      id: 27,
      name: "Soda xoài",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/8.png",
      category: "soda",
    },
    {
      id: 28,
      name: "Soda đào",
      price: "37,000đ",
      image: "/Image/Drinks/Soda/9.png",
      category: "soda",
    },
    {
      id: 30,
      name: "Ép thơm",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/1.png",
      category: "juice",
    },
    {
      id: 31,
      name: "Ép cà rốt",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/2.png",
      category: "juice",
    },
    {
      id: 32,
      name: "Ép cam",
      price: "37,000đ",
      image: "/Image/Drinks/Juice/3.png",
      category: "juice",
    },
    {
      id: 33,
      name: "Ép táo",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/4.png",
      category: "juice",
    },
    {
      id: 34,
      name: "Ép ổi",
      price: "37,000đ",
      image: "/Image/Drinks/Juice/5.png",
      category: "juice",
    },
    {
      id: 35,
      name: "Ép dưa hấu",
      price: "37,000đ",
      image: "/Image/Drinks/Juice/8.png",
      category: "juice",
    },
    {
      id: 36,
      name: "Ép dưa lưới",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/9.png",
      category: "juice",
    },
    {
      id: 37,
      name: "Ép kiwi",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/10.png",
      category: "juice",
    },
    {
      id: 38,
      name: "Ép cam thơm",
      price: "40,000đ",
      image: "/Image/Drinks/Juice/7.png",
      category: "juice",
    },
    {
      id: 41,
      name: "Yaourt đá",
      price: "32,000đ",
      image: "/Image/Drinks/Yogurt/1.png",
      category: "yaourt",
    },
    {
      id: 42,
      name: "Yaourt việt quất",
      price: "34,000đ",
      image: "/Image/Drinks/Yogurt/2.png",
      category: "yaourt",
    },
    {
      id: 43,
      name: "Yaourt phúc bồn tử",
      price: "34,000đ",
      image: "/Image/Drinks/Yogurt/3.png",
      category: "yaourt",
    },
    {
      id: 44,
      name: "Yaourt dâu",
      price: "34,000đ",
      image: "/Image/Drinks/Yogurt/4.png",
      category: "yaourt",
    },
    {
      id: 45,
      name: "Yaourt chanh dây",
      price: "34,000đ",
      image: "/Image/Drinks/Yogurt/5.png",
      category: "yaourt",
    },
    {
      id: 46,
      name: "Yaourt trái cây",
      price: "35,000đ",
      image: "/Image/Drinks/Yogurt/6.png",
      category: "yaourt",
    },
    {
      id: 47,
      name: "Yaourt kiwi",
      price: "34,000đ",
      image: "/Image/Drinks/Yogurt/7.png",
      category: "yaourt",
    },
    {
      id: 51,
      name: "Sinh tố bơ",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/1.png",
      category: "smoothie",
    },
    {
      id: 52,
      name: "Sinh tố xoài",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/2.png",
      category: "smoothie",
    },
    {
      id: 53,
      name: "Sinh tố mãng cầu",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/3.png",
      category: "smoothie",
    },
    {
      id: 54,
      name: "Sinh tố sapoche",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/4.png",
      category: "smoothie",
    },
    {
      id: 55,
      name: "Sinh tố dâu",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/5.png",
      category: "smoothie",
    },
    {
      id: 56,
      name: "Sinh tố dừa",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/6.png",
      category: "smoothie",
    },
    {
      id: 57,
      name: "Sinh tố bơ dừa",
      price: "45,000đ",
      image: "/Image/Drinks/Sinhto/7.png",
      category: "smoothie",
    },
    {
      id: 61,
      name: "Socola đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/1.png",
      category: "iceblend",
    },
    {
      id: 62,
      name: "Matcha đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/2.png",
      category: "iceblend",
    },
    {
      id: 63,
      name: "Đào vải đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/3.png",
      category: "iceblend",
    },
    {
      id: 64,
      name: "Oreo đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/4.png",
      category: "iceblend",
    },
    {
      id: 65,
      name: "Sakura đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/5.png",
      category: "iceblend",
    },
    {
      id: 66,
      name: "Cacao đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/6.png",
      category: "iceblend",
    },
    {
      id: 67,
      name: "Cà phê đá xay",
      price: "45,000đ",
      image: "/Image/Drinks/Daxay/7.png",
      category: "iceblend",
    },
    {
      id: 71,
      name: "Bánh Flan",
      price: "20,000đ",
      image: "/Image/Cake/Banhlanh/1.png",
      category: "coldcake",
    },
    {
      id: 72,
      name: "Panna cotta dâu",
      price: "22,000đ",
      image: "/Image/Cake/Banhlanh/2.png",
      category: "coldcake",
    },
    {
      id: 73,
      name: "Panna cotta",
      price: "22,000đ",
      image: "/Image/Cake/Banhlanh/3.png",
      category: "coldcake",
    },
    {
      id: 74,
      name: "Tiramisu matcha",
      price: "25,000đ",
      image: "/Image/Cake/Banhlanh/4.png",
      category: "coldcake",
    },
    {
      id: 75,
      name: "Tiramisu socola",
      price: "25,000đ",
      image: "/Image/Cake/Banhlanh/5.png",
      category: "coldcake",
    },
    {
      id: 76,
      name: "Bánh Mousse",
      price: "20,000đ",
      image: "/Image/Cake/Banhlanh/1.png",
      category: "coldcake",
    },
    {
      id: 81,
      name: "Bánh cookies",
      price: "20,000đ",
      image: "/Image/Cake/Banhquy/1.png",
      category: "cookies-croissant",
    },
    {
      id: 82,
      name: "Bánh cookies",
      price: "22,000đ",
      image: "/Image/Cake/Banhquy/2.png",
      category: "cookies-croissant",
    },
    {
      id: 83,
      name: "Bánh croissant",
      price: "20,000đ",
      image: "/Image/Cake/Banhquy/3.png",
      category: "cookies-croissant",
    },
    {
      id: 84,
      name: "Bánh croissant ý",
      price: "20,000đ",
      image: "/Image/Cake/Banhquy/4.png",
      category: "cookies-croissant",
    },
    {
      id: 91,
      name: "Bánh mì",
      price: "20,000đ",
      image: "/Image/Cake/Banhmi/1.png",
      category: "bread",
    },
    {
      id: 92,
      name: "Bánh mì tam giác",
      price: "25,000đ",
      image: "/Image/Cake/Banhmi/2.png",
      category: "bread",
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
    "coldcake",
    "cookies-croissant",
    "bread",
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
            <h6 class="text-black mt-3">${product.name}</h6>
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
  const updateCartCount = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    $(".cart-count").text(totalCount); // Hiển thị số lượng trên biểu tượng giỏ hàng

    const totalPrice = (cart ?? []).reduce((accumulator, currentValue) => {
      const price = Number(
        currentValue.price.replace(/,/g, "").replace("đ", "").trim()
      );
      return accumulator + currentValue.quantity * price;
    }, 0);

    $("#cart-total-summary").text(`Tổng cộng: ${totalPrice.toLocaleString()}đ`);
  };

  // Load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item) => {
      renderCartItem(item);
    });

    updateCartCount();
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
            <div class="content card-content">
                <h3 class="item-title">${item.name}</h3>
                <div class="item-information">
                  <div class="price item-price">${item.price.toLocaleString()}</div>
                  <div class="quantity-control">
                    <button class="btn btn-secondary decrease-quantity">
                      -
                    </button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="btn btn-secondary increase-quantity">
                      +
                    </button>
                  </div>
                </div>
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
    updateCartCount();
  });

  // Remove item from cart
  $(document).on("click", ".remove-item", function () {
    const itemId = $(this).closest(".cart-item").data("product-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => Number(item.id) !== Number(itemId));
    localStorage.setItem("cart", JSON.stringify(cart));
    $(this).closest(".cart-item").remove();
    updateCartCount();
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
    updateCartCount();
  });

  // Decrease quantity
  $(document).on("click", ".decrease-quantity", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const $item = $(this).closest(".cart-item");
    const productId = $item.data("product-id");
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      const quantity = --cart[itemIndex].quantity;
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
        $item.remove();
      } else {
        $item.find(".item-quantity").text(quantity);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  });

  loadCart(); // Fetch and render cart data on page load
});
