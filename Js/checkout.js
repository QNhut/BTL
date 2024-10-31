$(document).ready(function () {
  // Load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalPrice = (cart ?? []).reduce((accumulator, currentValue) => {
      const price = Number(
        currentValue.price.replace(/,/g, "").replace("đ", "").trim()
      );
      return accumulator + currentValue.quantity * price;
    }, 0);

    $("#total-price").text(`${totalPrice.toLocaleString()}đ`);

    cart.forEach((item) => {
      renderCartItem(item);
    });
  };

  // Render cart item
  const renderCartItem = (item) => {
    const cartItem = $(`
      <li
        data-product-id="${item.id}"
        class="list-group-item d-flex justify-content-between lh-condensed"
      >
        <div>
          <h6 class="my-${item.id}">${item.name} (${item.quantity})</h6>
        </div>
          <span class="text-muted">${item.price.toLocaleString()}</span>
      </li>
    `);

    $("#list-cart-items").prepend(cartItem);
  };

  loadCart();

  // Hàm lấy người dùng hiện tại từ localStorage
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  // Hàm hiển thị tên người dùng hiện tại
  function renderCurrentUser() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const name = currentUser.email.split("@")[0]; // Lấy phần tên trước "@"
      $("#name-customer").val(name);
      $("#email-customer").val(currentUser.email);
    }
  }

  renderCurrentUser();

  // Hàm để tạo ID duy nhất cho mỗi invoice dựa trên thời gian hiện tại
  function generateInvoiceId() {
    const now = new Date();
    return (
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0")
    );
  }

  // Hàm để lưu Invoice vào localStorage
  function saveInvoice(invoice) {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }

  // Hàm hiển thị bảng invoices
  function renderInvoices() {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    let tableContent = invoices
      .map(
        (invoice) => `
      <tr>
        <td>${invoice.id}</td>
        <td>${invoice.name}</td>
        <td>${invoice.email}</td>
        <td>${invoice.total}</td>
      </tr>
    `
      )
      .join("");
    $("#invoice-table tbody").html(tableContent);
  }

  // Xử lý khi nhấn nút "Thanh toán ngay"
  $("#btn-payment").on("click", function (e) {
    e.preventDefault();
    const name = $("#name-customer").val() ?? "<no name>";
    const email = $("#email-customer").val() ?? "<no email>";
    const total = $("#total-price").text();

    if (!total) {
      return;
    }

    const totalAsNumber = Number(
      total.replace(/,/g, "").replace("đ", "").trim()
    );

    if (!totalAsNumber) {
      return;
    }

    const newInvoice = {
      id: generateInvoiceId(),
      name: name,
      email: email,
      total: total,
    };

    // Lưu invoice mới vào localStorage và cập nhật bảng
    saveInvoice(newInvoice);
    renderInvoices();
    localStorage.removeItem("cart");
    window.location.reload();
  });

  // Hiển thị bảng invoices khi trang được tải
  renderInvoices();
});
