$(document).ready(function () {
  function toggleSection(sectionId) {
    const $collapse = $(`#${sectionId}`);
    let bsCollapse = new bootstrap.Collapse($collapse[0], { toggle: false });
    $collapse.hasClass("show") ? bsCollapse.hide() : bsCollapse.show();
  }

  function toggleAll() {
    const $collapses = $(".collapse");
    let allOpen = $collapses
      .toArray()
      .every((collapse) => $(collapse).hasClass("show"));

    $collapses.each(function () {
      let bsCollapse = new bootstrap.Collapse(this, { toggle: false });
      allOpen ? bsCollapse.hide() : bsCollapse.show();
    });
  }

  $("#toggle-all-category").click(function (e) {
    toggleAll();
  });

  $("#toggle-all-drinks").click(function (e) {
    toggleSection('collapseDrinks')
  });

  $("#toggle-all-cake").click(function (e) {
    toggleSection('collapseCake')
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
