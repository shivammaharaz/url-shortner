const express = require("express");
const shortId = require("shortid");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const shortUrl = require("./models/url");
const cors = require("cors");
// middlewARE
const checkHost = require("./middleWares/middleWare");

const app = express();

app.use(cors({ "Access-Control-Allow-Origin": "*"}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.set("trust proxy", true);

// creating-sortUrl
app.post("/", checkHost, async (req, res, next) => {
  try {
    const { url } = req.body;
    // console.log("hitted");
    if (!url) {
      res.status(500).json({ msg: "please provide" });
    }
    const urlExists = await shortUrl.findOne({ fullUrl: url });
    if (urlExists) {
      res.json({
        url: `http://localhost:5000/${urlExists.shortId}`,
      });
    } else {
      const shortsUrl = new shortUrl({
        fullUrl: url,
        shortId: shortId.generate(),
        ip: req.body.ip,
      });
      const result = await shortsUrl.save();

      res.json({
        url: `http://localhost:5000/${result.shortId}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// url-redirect when user hits short-url
app.get("/:shortId", async (req, resp, next) => {
  const shortId = req.params;
  // console.log(shortId);
  const urlData = await shortUrl.findOne(shortId);
  if (urlData && urlData.fullUrl) resp.redirect(urlData.fullUrl);
  else resp.send("<h1 style='textAlign:center;'>url doesnot exist</h1> ");
});

app.listen(PORT, () => {
  console.log("listening");
});
