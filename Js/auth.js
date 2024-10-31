$(document).ready(function () {
  // Hàm lấy danh sách người dùng từ localStorage hoặc khởi tạo mảng rỗng nếu chưa có
  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  // Hàm lưu danh sách người dùng vào localStorage
  function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Hàm lưu người dùng hiện tại vào localStorage
  function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  // Chuyển đổi giữa các form
  $("#switch-to-register").click(function (e) {
    e.preventDefault();
    $("#login-form").addClass("d-none");
    $("#register-form").removeClass("d-none");
    $("#page-title").text("Đăng Ký");
  });

  $("#switch-to-login").click(function (e) {
    e.preventDefault();
    $("#register-form").addClass("d-none");
    $("#login-form").removeClass("d-none");
    $("#page-title").text("Đăng Nhập");
  });

  // Xử lý đăng ký
  $("#register-form").submit(function (e) {
    e.preventDefault();
    const email = $("#register-email").val();
    const password = $("#register-password").val();

    let users = getUsers();

    // Kiểm tra nếu email đã tồn tại
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert("Email đã được sử dụng!");
      return;
    }

    // Thêm người dùng mới vào mảng và lưu lại vào localStorage
    users.push({ email, password });
    setUsers(users);

    alert("Đăng ký thành công!");
    $("#switch-to-login").click();
  });

  // Xử lý đăng nhập
  $("#login-form").submit(function (e) {
    e.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    let users = getUsers();

    // Tìm người dùng phù hợp
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      alert("Đăng nhập thành công!");
      window.location.href = "/";
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  });

  //#endregion
});
