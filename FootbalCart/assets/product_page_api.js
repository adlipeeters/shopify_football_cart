function getCountries() {
  try {
    // const response_1 = await fetch("https://restcountries.com/v3.1/all");
    // const asia = await response_1.json();
    // console.log(asia);
    // console.log(countries_json_data);
    countries = [...countries_json_data];
    countries_json_data.forEach((country) => {
      if (country.region == "Asia") {
        let asia = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-asia").append(asia);
      } else if (country.region == "Africa") {
        let africa = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-africa").append(africa);
      } else if (country.region == "Europe") {
        let europe = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-europe").append(europe);
      } else if (country.continents[0] == "North America") {
        let north_america = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-north_america").append(north_america);
      } else if (country.continents[0] == "South America") {
        let south_america = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-south_america").append(south_america);
      } else if (country.continents[0] == "Oceania") {
        let oceania = `<label class="custom-country-radio my-2">
          <input
          type="radio"
            name="properties[Country]"
            value="${country.name.official}"
            class="country-group"
            flag="${country.flags["svg"]}"
            >
            <div class="radio-button flex items-center justify-around px-3">
            <div>
              <div class="mr-1.5">
                <img src="${country.flags["svg"]}" class="w-4 h-4 rounded-full"/>
              </div>
              </div>
              <div>
              <p class="font-medium">${country.name.official}</p>
              </div>
              </div>
              </label> `;
        $("#data-country-oceania").append(oceania);
      }
    });
  } catch (error) {
    // console.error(error);
  }
}

// const getCountries = () => {
//   console.log("ready");
//   console.log(countries_json_data)
// };

const getLeaguesData = async () => {
  try {
    let data = leagues_json_data[0];
    // console.log(data)
    // clubs = [...leagues_json_data[0]];
    for (const [key, value] of Object.entries(data)) {
      value.forEach((league) => {
        clubs.push(league)
        let append = `<label class="custom-league-radio my-2">
                <input
                type="radio"
                  name="properties[Club]"
                  value="${league.strTeam}"
                  class="league-group"
                  badge="${league.strTeamBadge}"
                  >
                  <div class="radio-button flex items-center justify-around px-3">
                  <div>
                    <div class="mr-1.5">
                      <img src="${league.strTeamBadge}" class="w-4 h-4 rounded-full"/>
                    </div>
                    </div>
                    <div>
                    <p class="font-medium">${league.strTeam}</p>
                    </div>
                    </div>
                    </label> `;
        $("#data-league-" + key).append(append);
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

$(document).on("click", ".additional-product-options", function () {
  if ($(this).is(":checked")) {
    addToCart($(this).attr("variant"));
    // console.log("Checkbox is checked");
  } else {
    removeFromCart($(this).attr("variant"));
    // console.log("Checkbox is not checked");
  }
});

function addToCart(variantId) {
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1,
    }),
  }).then(function (response) {
    // Handle the response here
  });
}

function removeFromCart(variantId) {
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 0,
    }),
  }).then(function (response) {
    // Handle the response here
  });
}
