var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");

var PORT = process.env.PORT || 8080;


// Initialize Express
var app = express();

require("./routes/routes")(app);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");



// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var routes = require("./controllers/articleController");
var results = {};


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongooseHW", { useUnifiedTopology:true, useNewUrlParser: true });
// Make a request via axios to grab the HTML body from the site of your choice
app.get("/scrape", function (req, res) {
  axios.get("https://www.nytimes.com/section/world/").then(function (response) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    $("section.css-18l1u7x article div.css-10wtrbd").each(function (i, element) {
      var link = $(element).children("h2").children("a").attr("href");
      var title = $(element).children("h2").children("a").text();
      var summary = $(element).children("p").text();

  
      results.title = title;
      results.link = link;
      results.summary = summary;
      console.log(results);


      db.Articles.create(results)
        .then(function (dbArticles) {
          // View the added result in the console
          console.log(dbArticles);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });

    });
    res.send("Scrape Complete");
  });
});




// app.get("/", function (req, res) {

//   res.render("index", results);

// });
// app.use(routes);

app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Articles.find({})
    .then(function (dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticles);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

