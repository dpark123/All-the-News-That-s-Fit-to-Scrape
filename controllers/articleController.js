var express = require("express");

var router = express.Router();

var article = require("../models/Articles");
var saved = require("../models/Saved");

router.get("/", function(req, res) {
    article.removeAllListeners(function(data) {
        var hbsObject = {
            article: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    });
});

module.exports = router;