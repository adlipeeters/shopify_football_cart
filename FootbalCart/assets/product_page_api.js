async function getCountries() {
  try {
    // const response_1 = await fetch("/assets/countries.json");
    const response_1 = await fetch("https://restcountries.com/v3.1/all");
    // const response_1 = await fetch("https://restcountries.com/v2/region/south-america");
    const asia = await response_1.json();
    countries = [...asia];
    asia.forEach((country) => {
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
    console.error(error);
  }
}

const getLeaguesData = async () => {
  try {
    const response = await fetch("/assets/leagues.js");
    const data = await response.json();
    for (const [key, value] of Object.entries(data)) {
      clubs = clubs.concat(value);
    }
    data.english_premier_league.forEach((league) => {
      let english_premier_league = `<label class="custom-league-radio my-2">
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
      $("#data-league-english-premier-league").append(english_premier_league);
    });

    data.english_league_championship.forEach((league) => {
      let english_league_championship = `<label class="custom-league-radio my-2">
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
      $("#data-league-championship").append(english_league_championship);
    });
    data.german_bundesliga.forEach((league) => {
      let german_bundesliga = `<label class="custom-league-radio my-2">
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
      $("#data-league-bundesliga").append(german_bundesliga);
    });
    data.french_league_1.forEach((league) => {
      let french_league_1 = `<label class="custom-league-radio my-2">
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
      $("#data-league-french-league-1").append(french_league_1);
    });
    data.spanish_la_liga.forEach((league) => {
      let spanish_la_liga = `<label class="custom-league-radio my-2">
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
      $("#data-league-la-liga").append(spanish_la_liga);
    });
    data.italian_serie_a.forEach((league) => {
      let italian_serie_a = `<label class="custom-league-radio my-2">
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
      $("#data-league-seria-a").append(italian_serie_a);
    });

    data.dutch_eredivisie.forEach((league) => {
      let dutch_eredivisie = `<label class="custom-league-radio my-2">
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
      $("#data-league-dutch-eredivisie").append(dutch_eredivisie);
    });

    data.scottish_premier_league.forEach((league) => {
      let scottish_premier_league = `<label class="custom-league-radio my-2">
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
      $("#data-league-scottish-premier-league").append(scottish_premier_league);
    });
    data.american_major_league_soccer.forEach((league) => {
      let american_major_league_soccer = `<label class="custom-league-radio my-2">
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
      $("#data-league-american-major-league-soccer").append(
        american_major_league_soccer
      );
    });
    data.australian_a_league.forEach((league) => {
      let australian_a_league = `<label class="custom-league-radio my-2">
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
      $("#data-league-australian-a-league").append(australian_a_league);
    });
    data.portuguese_primeira_liga.forEach((league) => {
      let portuguese_primeira_liga = `<label class="custom-league-radio my-2">
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
      $("#data-league-portuguese-primeira-liga").append(
        portuguese_primeira_liga
      );
    });
    data.saudi_arabian_pro_league.forEach((league) => {
      let saudi_pro_league = `<label class="custom-league-radio my-2">
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
      $("#data-league-saudi-arabian-pro-league").append(saudi_pro_league);
    });
  } catch (error) {
    console.log(error);
  }
};
