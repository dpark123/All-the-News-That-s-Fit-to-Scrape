var express = require("express");
var db = require("../models/Index");
var app = express();


module.exports = function (app) {
    // app.get("/", function (req, res) {
    //     res.render("index");
    // })

    // app.get('/articlelist', function(req, res) {
    //     var db = req.db;
    //     var collection = db.get('mongooseHW');
    //     collection.find({
    //         title: title,
    //         summary: summary,
    //         link: link
    //     }
    //     ,function(e,docs){
    //       res.render('articlelist', {
    //         "articlelist" : docs
    //       });
    //     });
    //   });

    app.get('/', function (req, res) {
        // Get the only one db instance in our app
        db.Articles.find(function (err, articles) {
            if (err) return res.sendStatus(500);
            res.render('index', { articlelist: articles });

        })

    })
    app.get('/savedArticles', function (req, res) {
        // Get the only one db instance in our app
        db.Saved.find(function (err, articles) {
            if (err) return res.sendStatus(500);
            res.render('savedArticles', { savedlist: articles });

        })

    })

    app.get("/clearall", function(req, res) {
        // Remove every note from the notes collection
        db.Articles.remove({}, function(error, response) {
          // Log any errors to the console
          if (error) {
            console.log(error);
            res.send(error);
          }
          else {
            // Otherwise, send the mongojs response to the browser
            // This will fire off the success function of the ajax request
            console.log(response);
            res.send(response);
          }
        });
      });
      

}
