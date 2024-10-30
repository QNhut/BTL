$(document).ready(function () {
  let $navbar = $("#navbarNav");
  let $cartItem = $(".cart-items-container");
  let $userMenu = $(".user-menu");
  let $searchForm = $(".search-form");

  $("#menu-btn").click(function () {
    $navbar.toggleClass("active");
    $cartItem.removeClass("active");
    $userMenu.removeClass("active");
  });

  $("#user-btn").click(function () {
    $userMenu.toggleClass("active");
    $navbar.removeClass("active");
    $cartItem.removeClass("active");
  });

  $("#search-btn").click(function () {
    if ($(window).width() < 992) {
      $searchForm.toggle();
    }
  });

  $(window).resize(function () {
    if ($(window).width() >= 992) {
      $searchForm.show();
    } else {
      $searchForm.hide();
    }
  });

  $(window).scroll(function () {
    $navbar.removeClass("active");
    $cartItem.removeClass("active");
    $userMenu.removeClass("active");
  });
});
