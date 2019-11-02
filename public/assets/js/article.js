$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < 10; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i].title + "'>" + data[i].summary + "<br />" + data[i].link + "</p>");
    }
  });
  

  // When the #clear-all button is pressed
$("#clear-all").on("click", function() {
  // Make an AJAX GET request to delete the notes from the db
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearall",
    // On a successful call, clear the #results section
    success: function(response) {
      $("#results").empty();
    }
  });
});

$("#scrapeArticles").on("click", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/scrape"
    })
})
  