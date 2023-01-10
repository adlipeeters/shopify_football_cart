let canvas;
// let canvas_order = [];
let stats = {
  1: {
    name: "",
    value: "",
    left: 155,
    top: 335,
    index: 1,
  },
  2: {
    name: "",
    value: "",
    left: 275,
    top: 335,
    index: 2,
  },
  3: {
    name: "",
    value: "",
    left: 155,
    top: 365,
    index: 3,
  },
  4: {
    name: "",
    value: "",
    left: 275,
    top: 365,
    index: 4,
  },
  5: {
    name: "",
    value: "",
    left: 155,
    top: 395,
    index: 5,
  },
  6: {
    name: "",
    value: "",
    left: 275,
    top: 395,
    index: 6,
  },
};
$(document).ready(function () {
  canvas = new fabric.Canvas("product-canvas");
  initialiseCanvas();
  getCountries();

  $(".tab-item").click(function () {
    let id = $(this).attr("data-attr");
    $(".tab-item").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").addClass("hidden");
    $("#" + id).removeClass("hidden");
  });

  $(".player__position").on("click", function () {
    $(".empty-svg").removeClass("hidden");
    $(".check-svg").addClass("hidden");
    $(this).toggle("selected");
    $(this).parent().find(".check-svg").removeClass("hidden");
    $(this).parent().find(".empty-svg").addClass("hidden");

    $("#img__position").text($(this).val());
    $('input[name="properties[player_position]"]').val($(this).val());
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
    $('input[name="properties[player_position]"]').val(position);
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

  $("#name").on("keyup", function () {
    profileName($(this).val());
  });

  $("#name").on("change", function () {
    profileName($(this).val());
  });

  $('input[name="properties[profile-picture]"]').on("change", function () {
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
  });

  $("#overall-rating").on("keyup", function () {
    profileRating($(this).val());
  });

  $(function () {
    $(window).scroll(function () {
      let pageWidth = $(window).width();
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
});

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
    left: 150,
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
        left: 250,
        top: 75,
        index: "profile_image",
      });
    };
  });
  reader.readAsDataURL(input.files[0]);
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

function profilePosition(name) {
  removeCanvasItem("profile_position");
  let color = "white";
  let text = new fabric.Text(name, {
    left: 150,
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

function profileRating(num) {
  removeCanvasItem("profile_rating");
  let color = "white";
  let text = new fabric.Text(num, {
    left: 150,
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
}

function setPosition(type) {
  if (type == 1) {
    $("#position_property_1").text("PAC");
    $('input[name="properties[player_text_property_position_1]"]').val("PAC");
    stats[1].name = "PAC";
    $("#position_property_2").text("DRI");
    $('input[name="properties[player_text_property_position_2]"]').val("DRI");
    stats[2].name = "DRI";
    $("#position_property_3").text("SHO");
    $('input[name="properties[player_text_property_position_3]"]').val("SHO");
    stats[3].name = "SHO";
    $("#position_property_4").text("DEF");
    $('input[name="properties[player_text_property_position_4]"]').val("DEF");
    stats[4].name = "DEF";
    $("#position_property_5").text("PAS");
    $('input[name="properties[player_text_property_position_5]"]').val("PAS");
    stats[5].name = "PAS";
    $("#position_property_6").text("PHY");
    $('input[name="properties[player_text_property_position_6]"]').val("PHY");
    stats[6].name = "PHY";
  } else {
    $("#position_property_1").text("DIV");
    $('input[name="properties[player_text_property_position_1]"]').val("DIV");
    stats[1].name = "DIV";
    $("#position_property_2").text("REF");
    $('input[name="properties[player_text_property_position_2]"]').val("REF");
    stats[2].name = "REF";
    $("#position_property_3").text("HAN");
    $('input[name="properties[player_text_property_position_3]"]').val("HAN");
    stats[3].name = "HAN";
    $("#position_property_4").text("SPE");
    $('input[name="properties[player_text_property_position_4]"]').val("SPE");
    stats[4].name = "SPE";
    $("#position_property_5").text("KIC");
    $('input[name="properties[player_text_property_position_5]"]').val("KIC");
    stats[5].name = "KIC";
    $("#position_property_6").text("POS");
    $('input[name="properties[player_text_property_position_6]"]').val("POS");
    stats[6].name = "POS";
  }
  profileStats();
}

function enableInputStats() {
  for (let i = 0; i <= 6; i++) {
    $(
      'input[name="properties[player_number_property_position_' + i + ']"]'
    ).prop("disabled", false);
  }
  $("#randomise_btn").attr("disabled", false);
}

function randomiseStats() {
  let min = 1;
  let max = 100;
  // let stats = [];
  for (let i = 1; i <= 6; i++) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    stats[i].value = random;
    $("#position_number_property_" + i).text(random);
    $(
      'input[name="properties[player_number_property_position_' + i + ']"]'
    ).val(random);
  }
  profileStats();
}

async function getCountries() {
  try {
    const response_1 = await fetch("https://restcountries.com/v2/region/asia");
    const asia = await response_1.json();
    asia.forEach((country) => {
      let data = `<label class="custom-country-radio my-2">
        <input
          type="radio"
          name="country-group"
          value="${country.name}"
          class="country-group">
        <div class="radio-button flex items-center justify-around px-3">
          <div>
            <div class="mr-1.5">
              <img src="${country.flag}" class="w-4 h-4 rounded-full"/>
            </div>
          </div>
          <div>
            <p class="font-medium">${country.name}</p>
          </div>
        </div>
      </label> `;
      $("#data-country-asia").append(data);
    });
  } catch (error) {
    console.error(error);
  }
}
