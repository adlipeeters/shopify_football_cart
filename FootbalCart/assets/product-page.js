$(document).ready(function () {
  $(".tab-item").click(function () {
    let id = $(this).attr("data-attr");
    $(".tab-item").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").addClass("hidden");
    $("#" + id).removeClass("hidden");
  });

  $('input[type="radio"]').on("click", function () {
    $(".empty-svg").removeClass("hidden");
    $(".check-svg").addClass("hidden");
    $(this).toggle("selected");
    $(this).parent().find(".check-svg").removeClass("hidden");
    $(this).parent().find(".empty-svg").addClass("hidden");

    $("#img__position").text($(this).val());
    $('input[name="properties[player_position]"]').val($(this).val());

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
    $("#img__name").val($(this).val());
  });

  $("#img__name").on("keyup", function () {
    $("#name").val($(this).val());
  });

  $(".player_number_property_keyup").on("keyup", function () {
    let num = $(this).attr("data-number");
    let value = $(this).val();
    if (value > 100) {
      value = 100;
      $(this).val(100);
    }
    $("#position_number_property_" + num).text(value);
  });

  $(function () {
    $(window).scroll(function () {
      let pageWidth = $(window).width();
      if (pageWidth > 1024) {
        if ($(this).scrollTop() >= 350) {
          $("#fixed__product").addClass("fixed");
          $("#fixed__product").addClass("top-0");
          $("#fixed__product").addClass("animate-card-on-fixed");
        } else if ($(this).scrollTop() < 350) {
          $("#fixed__product").removeClass("fixed");
          $("#fixed__product").removeClass("top-0");
          $("#fixed__product").removeClass("animate-card-on-fixed");
        }
      }
    });
  });
});

function updateForm(id, price) {
  $("#variant__id").val(id);
  $(".active__variant").removeClass("active__variant");
  $("#selected__variant_id-" + id).addClass("active__variant");
}

const previewImage = (event) => {
  const imageFiles = event.target.files;
  const imageFilesLength = imageFiles.length;
  if (imageFilesLength > 0) {
    const imageSrc = URL.createObjectURL(imageFiles[0]);
    const imagePreviewElement = document.querySelector(
      "#preview-selected-image"
    );
    imagePreviewElement.src = imageSrc;
    imagePreviewElement.style.display = "block";
  }
};

function setPosition(type) {
  if (type == 1) {
    $("#position_property_1").text("PAC");
    $('input[name="properties[player_text_property_position_1]"]').val("PAC");
    $("#position_property_2").text("DRI");
    $('input[name="properties[player_text_property_position_2]"]').val("DRI");
    $("#position_property_3").text("SHO");
    $('input[name="properties[player_text_property_position_3]"]').val("SHO");
    $("#position_property_4").text("DEF");
    $('input[name="properties[player_text_property_position_4]"]').val("DEF");
    $("#position_property_5").text("PAS");
    $('input[name="properties[player_text_property_position_5]"]').val("PAS");
    $("#position_property_6").text("PHY");
    $('input[name="properties[player_text_property_position_6]"]').val("PHY");
  } else {
    $("#position_property_1").text("DIV");
    $('input[name="properties[player_text_property_position_1]"]').val("DIV");
    $("#position_property_2").text("REF");
    $('input[name="properties[player_text_property_position_2]"]').val("REF");
    $("#position_property_3").text("HAN");
    $('input[name="properties[player_text_property_position_3]"]').val("HAN");
    $("#position_property_4").text("SPE");
    $('input[name="properties[player_text_property_position_4]"]').val("SPE");
    $("#position_property_5").text("KIC");
    $('input[name="properties[player_text_property_position_5]"]').val("KIC");
    $("#position_property_6").text("POS");
    $('input[name="properties[player_text_property_position_6]"]').val("POS");
  }
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
  for (let i = 0; i <= 6; i++) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    $("#position_number_property_" + i).text(random);
    $(
      'input[name="properties[player_number_property_position_' + i + ']"]'
    ).val(random);
  }
}
