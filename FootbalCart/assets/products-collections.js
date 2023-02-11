$(document).ready(function () {
  // $(".filter-list > li > .toggle__filter").click(function () {
  //   console.log("asd");
  //   if ($(this).parent().hasClass("active")) {
  //     $(this).parent().removeClass("active").find(".answer").slideUp();
  //   } else {
  //     $(this).parent().addClass("active").find(".answer").slideDown();
  //   }
  //   return false;
  // });
});
$(document).on("click", ".filter-list > li > .toggle__filter", function () {
  console.log("asd");
  if ($(this).parent().hasClass("active")) {
    $(this).parent().removeClass("active").find(".answer").slideUp();
  } else {
    $(this).parent().addClass("active").find(".answer").slideDown();
  }
  return false;
});

$(document).on("click", ".filter_input", function () {
  // $(".filter__products_btn").click();
  // $(".filter-form").submit()
  // let submitBtn = $(".filter-form").find('input[type="submit"]');
  // submitBtn.click();
  let submitBtn = $(".filter-form").find('input[type="submit"]');
  $('#filter-fucking-form').click()
  setTimeout(() => {
    // submitBtn.click();
    // console.log($(".filter-form").serialize())
    // $(".filter-form").submit()
  }, 1000);

});
$(document).on("click", ".filter_input_collection", function () {
  let url = $(this).attr("link");
  window.location.href = url;
});
