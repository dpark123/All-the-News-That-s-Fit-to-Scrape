$("#saved").on("click", function(){
    var saveTitle = this.title;;
    var saveLink = this.link;
    var saveSummary = this.summary;
    console.log(saveTitle)
    console.log(saveLink)
    console.log(saveSummary)
})

$.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i].title + "'>" + data[i].summary + "<br />" + data[i].link + "</p>");
    }
  });