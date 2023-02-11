$(document).ready(function () {
  console.log(articles);
});

$(document).on("keyup", "#search-for-article", function () {
  $("#search-results").empty();
  let filter = $(this).val();
  console.log(filter);
  const options = {
    includeScore: true,
    caseSensitive: true,
    includeMatches: true,
    threshold: 0.0,
    keys: ["title", "content"],
    weight: 1,
  };
  const fuzzyArticles = new Fuse(articles, options);
  const result = fuzzyArticles.search(filter);
  console.log(result);
  result.forEach((element) => {
    let res = `<div class="py-3 w-1/2 hover:bg-gray-100 transition duration-300">
        <a href="support/${element.item.handle}">
            <p class='text-gray-500'>
                ${element.item.title}
            </p>
        </a>
    </div>`;

    $("#search-results").append(res).hide().fadeIn(350);
  });
});
