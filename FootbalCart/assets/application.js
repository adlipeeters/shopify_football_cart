let is_open = false;
$(document).on("click", "#open-mobile-menu", function () {
  $("#mobile-menu-dropdown").slideDown(350);
  setTimeout(() => {
    is_open = true;
  }, 500);
});

$(document).click(function (event) {
  if (is_open) {
    if (!$(event.target).closest("#mobile-menu-dropdown").length) {
      $("#mobile-menu-dropdown").slideUp(350);
      is_open = false;
    }
  }
});

console.log("aaaaaa");
