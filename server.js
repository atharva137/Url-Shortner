const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost:27017/urlShortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("vadiya");
});

db.dropDatabase();

const app = express();
app.use(express.json());
// allowing express to take userInput url
app.use(express.urlencoded({ extended: false }));
// setting up daynamic hbs file for rendering html page
app.set("view engine", "hbs");

// setting routes fnding all urls and sending it to index.hbs
app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  if (shortUrls.length > 10) {
    db.dropDatabase();
  }

  console.log(shortUrls);
  res.render("index", { shortUrls: shortUrls });
});
// creating url and short url by using post method
app.post("/shortUrls", async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

//taking url that entered and using it
app.get("/:Url", async (req, res) => {
  const url = await shortUrl.findOne({ short: req.params.Url });
  if (url == null) return res.sendStatus(404);

  url.save();

  res.redirect(url.full);
});
app.listen("3000", () => {
  console.log("server is on");
});
