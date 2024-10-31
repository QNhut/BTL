$(document).ready(function () {
  // Mở tất cả các menu con khi tải trang
  $(".collapse").each(function () {
    new bootstrap.Collapse(this, { toggle: false }).show();
  });

  function toggleSection(sectionId) {
    const $collapse = $(`#${sectionId}`);
    if ($collapse.hasClass("show")) {
      $collapse.collapse("hide");
    } else {
      $collapse.collapse("show");
    }
  }

  function toggleAll() {
    const $collapses = $(".collapse");
    let allOpen = $collapses.toArray().every((collapse) => $(collapse).hasClass("show"));

    $collapses.each(function () {
      if (allOpen) {
        $(this).collapse("hide");
      } else {
        $(this).collapse("show");
      }
    });
  }

  $("#toggle-all-category").click(function () {
    toggleAll();
  });

  $("#toggle-all-drinks").click(function () {
    toggleSection("collapseDrinks");
  });

  $("#toggle-all-cake").click(function () {
    toggleSection("collapseCake");
  });

  $(window).on("scroll", function () {
    const $header = $("header");
    const $navbar = $(".navbar-thumuc");

    if ($(this).scrollTop() > 50) {
      $header.addClass("scrolled");
      $navbar.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
      $navbar.removeClass("scrolled");
    }
  });
});
