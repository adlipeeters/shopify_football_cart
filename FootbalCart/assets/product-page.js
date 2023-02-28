let canvas;
let clubs = [];
let countries = [];
let stats = {
  1: {
    name: "",
    value: "",
    left: 85,
    top: 335,
    index: 1,
  },
  2: {
    name: "",
    value: "",
    left: 205,
    top: 335,
    index: 2,
  },
  3: {
    name: "",
    value: "",
    left: 85,
    top: 365,
    index: 3,
  },
  4: {
    name: "",
    value: "",
    left: 205,
    top: 365,
    index: 4,
  },
  5: {
    name: "",
    value: "",
    left: 85,
    top: 395,
    index: 5,
  },
  6: {
    name: "",
    value: "",
    left: 205,
    top: 395,
    index: 6,
  },
};

let section_control = {
  active: "section_card_size",
};

$(document).ready(function () {
  // getLeaguesData();
  canvas = new fabric.Canvas("product-canvas");
  // canvas.setBackgroundColor("#00ff00", canvas.renderAll.bind(canvas));
  let dominantColor = getDominantColor(canvas);
  // console.log(dominantColor);
  initialiseCanvas();
  initialiseLeagues();
  initialiseCountries();

  $(".tab-item").click(function () {
    let id = $(this).attr("data-attr");
    $(".tab-item").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").addClass("hidden");
    $("#" + id).removeClass("hidden");
  });

  $(".player__position").on("click", function () {
    $(".empty-svg").show();
    $(".check-svg").hide();
    $(this).toggle("selected");
    $(this).parent().find(".check-svg").show();
    $(this).parent().find(".empty-svg").hide();

    $("#img__position").text($(this).val());
    $('input[name="properties[Player position]"]').val($(this).val());
    profilePosition($(this).val());

    if ($(this).val() != "GK") {
      setPosition(1);
    } else {
      setPosition(2);
    }
    enableInputStats();
  });

  $("#custom_player_position").on("keyup", function () {
    let position = $(this).val().toUpperCase();
    $('input[name="properties[Player position]"]').val(position);
    profilePosition(position);
    $("#img__position").text(position);
    if (position != "GK") {
      setPosition(1);
    } else {
      setPosition(2);
    }
    enableInputStats();
  });

  $("#search_for_player_position").on("keyup", function () {
    let filter = $(this).val().toUpperCase();
    switch (filter) {
      case "GK":
      case "CB":
      case "RB":
      case "LB":
      case "RWB":
      case "LWB":
        $("li[data-attr='defence']").click();
        break;
      case "CDM":
      case "CM":
      case "CAM":
      case "LM":
      case "RM":
      case "RW":
        $("li[data-attr='midfield']").click();
        break;
      case "ST":
      case "CF":
      case "RF":
      case "LF":
        $("li[data-attr='attack']").click();
        break;
      default:
    }
  });

  $("#search_for_club").on("keyup", function () {
    $("#data-league-search").empty();
    let filter = $(this).val().toUpperCase();
    $(".league-slider").slick("slickGoTo", 13);
    const options = {
      includeScore: true,
      caseSensitive: true,
      includeMatches: true,
      threshold: 0.0,
      keys: ["strTeam"],
      weight: 1,
    };
    const fuzzyClubs = new Fuse(clubs, options);
    const result = fuzzyClubs.search(filter);
    result.forEach((league) => {
      let res = `<label class="custom-league-radio my-2">
            <input
            type="radio"
              name="properties[Club]"
              value="${league.item.strTeam}"
              class="league-group"
              badge="${league.item.strTeamBadge}"
              >
              <div class="radio-button flex items-center justify-around px-3">
              <div>
                <div class="mr-1.5">
                  <img src="${league.item.strTeamBadge}" class="w-4 h-4 rounded-full"/>
                </div>
                </div>
                <div>
                <p class="font-medium">${league.item.strTeam}</p>
                </div>
                </div>
                </label> `;
      $("#data-league-search").append(res);
    });
  });

  $("#search_for_country").on("keyup", function () {
    $("#data-country-search").empty();
    let filter = $(this).val().toUpperCase();
    $(".country-slider").slick("slickGoTo", 7);
    const options = {
      includeScore: true,
      caseSensitive: true,
      includeMatches: true,
      threshold: 0.0,
      keys: ["name.official"],
      weight: 1,
    };
    const fuzzyCountries = new Fuse(countries, options);
    const result = fuzzyCountries.search(filter);
    result.forEach((country) => {
      let res = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.item.name.official}"
            class="country-group"
            flag="${country.item.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.item.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.item.name.official}</p>
              </div>
              </div>
              </label> `;
      $("#data-country-search").append(res);
    });
  });

  $("#name").on("keyup", function () {
    profileName($(this).val());
  });

  $("#name").on("change", function () {
    profileName($(this).val());
  });

  $('input[name="properties[Profile picture]"]').on("change", function () {
    profileImage(this);
  });

  // $("#img__name").on("keyup", function () {
  //   $("#name").val($(this).val());
  // });

  $(".player_number_property_keyup").on("keyup", function () {
    let num = $(this).attr("data-number");
    let value = $(this).val();
    if (value > 100) {
      value = 100;
      $(this).val(100);
    }
    $("#position_number_property_" + num).text(value);
    num = Number(num);
    stats[num].value = value;
    profileStats();
  });

  $(".player_number_property_keyup").on("change", function () {
    let num = $(this).attr("data-number");
    let value = $(this).val();
    if (value > 100) {
      value = 100;
      $(this).val(100);
    }
    $("#position_number_property_" + num).text(value);
    num = Number(num);
    stats[num].value = value;
    profileStats();
  });

  $("#overall-rating").on("keyup", function () {
    profileRating($(this).val());
  });

  // let element = document.getElementById("fixed__product");
  // var lastScrollTop = 0;
  $(function () {
    $(window).scroll(function () {
      let pageWidth = $(window).width();
      let pageHeight = $(window).height();
      if (pageWidth > 1024) {
        if ($(this).scrollTop() >= 300) {
          $("#fixed__product").addClass("fixed");
          $("#fixed__product").addClass("top-0");
          $("#fixed__product").addClass("animate-card-on-fixed");
        } else if ($(this).scrollTop() < 300) {
          $("#fixed__product").removeClass("fixed");
          $("#fixed__product").removeClass("top-0");
          $("#fixed__product").removeClass("animate-card-on-fixed");
        }
      }
    });
  });

  $(".country-slider").on("wheel", function (e) {
    e.preventDefault();
    if (e.originalEvent.deltaY < 0) {
      $(this).slick("slickNext");
    } else {
      $(this).slick("slickPrev");
    }
  });

  $(".go_to_country_option").on("click", function () {
    let index = $(this).attr("slider-index");
    $(".country-slider").slick("slickGoTo", index);
  });
  $(".go_to_league_option").on("click", function () {
    let index = $(this).attr("slider-index");
    $(".league-slider").slick("slickGoTo", index);
  });
});

$(document).on("change", ".country-group", function () {
  let url = $(this).attr("flag");
  profileCountry(url);
});

$(document).on("change", ".league-group", function () {
  let url = $(this).attr("badge");
  profileLeague(url);
});

$(document).on("click", "#add_to_cart_first_step", function () {
  console.log($("input[name='properties[User confirmation]']").val());
  if (
    $('input[name="properties[Name]"]').val() != "" &&
    $("input[type='file'][name='properties[Profile picture]']").get(0).files
      .length != 0 &&
    $('input[name="properties[Club]"]').val() != "" &&
    $("input[type='url'][name='properties[Flag]']").val() != "" &&
    $("input[type='url'][name='properties[Badge]']").val() != "" &&
    $("input[name='properties[Overall rating]']").val() != "" &&
    $("input[name='properties[Player position]']").val() != "" &&
    $("input[name='properties[User confirmation]']").val() != "" &&
    $("input[type='file'][name='properties[Generated picture]']").get(0).files
      .length != 0 &&
    $('input[name="properties[User confirmation]"]').prop("checked") == true
  ) {
    $("#tab-1").hide().removeClass("activee");
    $("#tab-2").show().addClass("activee");
  } else {
    $("#toast-warning").slideDown(300);
    setTimeout(() => {
      $("#toast-warning").slideUp(300);
    }, 1500);
  }
});

$(document).on("click", "#close-success-modal", function () {
  $("#success_dialog").hide(300);
});

$(document).on("click", ".changeSection", function () {
  console.log(section_control.active);
  let go_to = $(this).attr("data-section");
  $("#" + section_control.active).addClass("hidden");
  $("#" + go_to).removeClass("hidden");
  if (go_to == "section_card_club") {
    initialiseLeagues();
  } else if (go_to == "section_card_country") {
    initialiseCountries();
  }
  section_control.active = $(this).attr("data-section");
});

// $(window).resize(function () {
//   let width = $(window).width();
//   console.log(width);
//   if (width < 768) {
//     if (!$("#section_card_club").hasClass("hidden")) {
//       $("#section_card_club").addClass("hidden");
//     }
//   } else {
//     $("#section_card_club").removeClass("hidden");
//   }
// });

// function addToCart() {
//   let addToCartForm = document.querySelector("#product-form");
//   let formData = new FormData(addToCartForm);

//   $.ajax({
//     url: "/cart/add.js",
//     type: "POST",
//     dataType: "json",
//     processData: false,
//     contentType: false,
//     data: formData,
//     success: function (data) {
//       // Handle successful submission
//       // console.log(data);
//       $("#success_dialog").fadeIn();
//     },
//     error: function (XMLHttpRequest, textStatus) {
//       // Handle error
//       // console.log("Error: " + textStatus);
//     },
//   });
// }

function initialiseLeagues() {
  if ($(".league-slider").hasClass("slick-initialized")) {
    $(".league-slider").slick("unslick");
    $(".options-for-league").slick("unslick");
  }

  $(".league-slider").slick({
    dots: false,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 250,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
    prevArrow: $(".carousel__arrow-back_league"),
    nextArrow: $(".carousel__arrow-next_league"),
    cssEase: "linear",
    asNavFor: ".options-for-league",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".options-for-league").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".league-slider",
  });
}

function initialiseCountries() {
  if ($(".country-slider").hasClass("slick-initialized")) {
    $(".country-slider").slick("unslick");
    $(".options-for-country").slick("unslick");
  }

  $(".country-slider").slick({
    dots: false,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 250,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
    prevArrow: $(".carousel__arrow-back"),
    nextArrow: $(".carousel__arrow-next"),
    cssEase: "linear",
    asNavFor: ".options-for-country",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".options-for-country").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".country-slider",
  });
}

function initialiseCanvas() {
  let imgElement = document.getElementById("featured__image");
  let img = new fabric.Image(imgElement, {
    selectable: false,
  });
  let centerX = canvas.width / 2 - img.width / 2;
  let centerY = canvas.height / 2 - img.height / 2;
  img.set({
    left: centerX,
    top: centerY,
  });
  canvas.add(img);
  img.scaleToHeight(500);
  img.centerH();
  img.centerV();
}

function profileName(name) {
  removeCanvasItem("profile_name");
  let color = "white";
  let text = new fabric.Text(name, {
    left: 75,
    top: 300,
    fill: color,
    fontSize: 16,
    fontFamily: "Roboto",
    index: "profile_name",
  });
  canvas.add(text);
  let image = canvas.getObjects()[0];
  image.sendToBack();
  text.set("text", name);
  canvas.renderAll();
}

function profileImage(input) {
  removeCanvasItem("profile_image");
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    let image = new Image();
    image.src = reader.result;
    image.onload = function () {
      let fabricImage = new fabric.Image(image, {
        selectable: true,
        evented: true,
      });
      canvas.add(fabricImage);
      // fabricImage.scaleToHeight(200);
      fabricImage.scaleToWidth(110);
      fabricImage.set({
        left: 175,
        top: 75,
        index: "profile_image",
      });
    };
  });
  reader.readAsDataURL(input.files[0]);
}

function profilePosition(name) {
  let left;
  if (name.length == 2) {
    left = 80;
  } else {
    left = 75;
  }
  removeCanvasItem("profile_position");
  let color = "white";
  let text = new fabric.Text(name, {
    left: left,
    top: 125,
    fill: color,
    fontSize: 16,
    fontFamily: "Roboto",
    index: "profile_position",
  });
  canvas.add(text);
  text.set("text", name);
  canvas.renderAll();
}

function profileCountry(url) {
  removeCanvasItem("profile_country");
  $("#form_flag").val(url);
  let uploadedImg = document.getElementById("hidden_flag_img");
  uploadedImg.setAttribute("crossOrigin", "anonymous");
  uploadedImg.src = url;

  setTimeout(() => {
    let img = new fabric.Image(uploadedImg);
    img.scaleToWidth(30);
    img.set({
      index: "profile_country",
      top: 175,
      left: 77,
    });
    canvas.add(img);
  }, 500);
}

function profileLeague(url) {
  removeCanvasItem("profile_league");
  $("#form_badge").val(url);
  let uploadedImg = document.getElementById("hidden_badge_img");
  uploadedImg.setAttribute("crossOrigin", "anonymous");
  uploadedImg.src = url;

  setTimeout(() => {
    let img = new fabric.Image(uploadedImg);
    img.scaleToWidth(30);
    img.set({
      index: "profile_league",
      top: 210,
      left: 77,
    });
    canvas.add(img);
  }, 500);
}

function profileStats() {
  let color = "white";
  for (const [key, value] of Object.entries(stats)) {
    removeCanvasItem(value.index);
    let text = new fabric.Text(value.value + "   " + value.name, {
      left: value.left,
      top: value.top,
      fill: color,
      fontSize: 16,
      index: value.index,
      fontFamily: "Roboto",
    });
    canvas.add(text);
  }
  canvas.renderAll();
}

function profileRating(num) {
  removeCanvasItem("profile_rating");
  let color = "white";
  let text = new fabric.Text(num, {
    left: 75,
    top: 90,
    fill: color,
    fontSize: 16,
    fontFamily: "Roboto",
    index: "profile_rating",
  });
  canvas.add(text);
  text.set("text", num);
  canvas.renderAll();
}

function saveCanvas() {
  let canvas = document.querySelector("canvas");
  let image = convertCanvasToImage(canvas);
  const inputElement = document.querySelector("#generated-picture");
  const src = image.src;
  const mimeType = "image/png";
  const bytes = atob(src.split(",")[1]);
  const buffer = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes.charCodeAt(i);
  }
  const blob = new Blob([buffer], { type: mimeType });
  let list = new DataTransfer();
  const file = new File([blob], "image.png", { type: mimeType });
  list.items.add(file);
  let myFileList = list.files;
  inputElement.files = myFileList;
}

function convertCanvasToImage(canvas) {
  let image = new Image();
  image.src = canvas.toDataURL("image/png");
  $("#generated_image_preview").attr("src", image.src);

  return image;
}

function removeCanvasItem(item) {
  for (let i = canvas.getObjects().length - 1; i >= 0; i--) {
    if (canvas.getObjects()[i].index == item) {
      canvas.remove(canvas.getObjects()[i]);
    }
  }
}

function updateForm(id, price) {
  $("#variant__id").val(id);
  $(".active__variant").removeClass("active__variant");
  $("#selected__variant_id-" + id).addClass("active__variant");

  // testing scroll
  // Get a reference to the section you want to scroll to
  // $("#section_profile_picture").show();
  // const section = document.querySelector("#section_profile_picture");
  // section.scrollIntoView({ behavior: "smooth" });
}

function setPosition(type) {
  if (type == 1) {
    $("#position_property_1").text("PAC");
    $('input[name="properties[Stat Title 1]"]').val("PAC");
    stats[1].name = "PAC";
    $("#position_property_2").text("DRI");
    $('input[name="properties[Stat Title 2]"]').val("DRI");
    stats[2].name = "DRI";
    $("#position_property_3").text("SHO");
    $('input[name="properties[Stat Title 3]"]').val("SHO");
    stats[3].name = "SHO";
    $("#position_property_4").text("DEF");
    $('input[name="properties[Stat Title 4]"]').val("DEF");
    stats[4].name = "DEF";
    $("#position_property_5").text("PAS");
    $('input[name="properties[Stat Title 5]"]').val("PAS");
    stats[5].name = "PAS";
    $("#position_property_6").text("PHY");
    $('input[name="properties[Stat Title 6]"]').val("PHY");
    stats[6].name = "PHY";
  } else {
    $("#position_property_1").text("DIV");
    $('input[name="properties[Stat Title 1]"]').val("DIV");
    stats[1].name = "DIV";
    $("#position_property_2").text("REF");
    $('input[name="properties[Stat Title 2]"]').val("REF");
    stats[2].name = "REF";
    $("#position_property_3").text("HAN");
    $('input[name="properties[Stat Title 3]"]').val("HAN");
    stats[3].name = "HAN";
    $("#position_property_4").text("SPE");
    $('input[name="properties[Stat Title 4]"]').val("SPE");
    stats[4].name = "SPE";
    $("#position_property_5").text("KIC");
    $('input[name="properties[Stat Title 5]"]').val("KIC");
    stats[5].name = "KIC";
    $("#position_property_6").text("POS");
    $('input[name="properties[Stat Title 6]"]').val("POS");
    stats[6].name = "POS";
  }
  profileStats();
}

function enableInputStats() {
  for (let i = 0; i <= 6; i++) {
    $('input[name="properties[Stat Value ' + i + ']"]').prop("disabled", false);
  }
  $("#randomise_btn").attr("disabled", false);
}

function randomiseStats() {
  let min = 1;
  let max = 100;
  for (let i = 1; i <= 6; i++) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    stats[i].value = random;
    $("#position_number_property_" + i).text(random);
    $('input[name="properties[Stat Value ' + i + ']"]').val(random);
  }
  profileStats();
}

function getDominantColor(canvas) {
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = imageData.data;
  var colorCount = {};
  for (var i = 0, n = pixels.length; i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];
    var color = "rgb(" + red + "," + green + "," + blue + ")";
    if (colorCount[color]) {
      colorCount[color]++;
    } else {
      colorCount[color] = 1;
    }
  }
  var dominantColor = Object.keys(colorCount).sort(function (a, b) {
    return colorCount[b] - colorCount[a];
  })[0];
  return dominantColor;
}
