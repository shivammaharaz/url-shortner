const express = require("express");
const shortId = require("shortid");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5500;
const shortUrl = require("./models/url");
const cors = require("cors");
// middlewARE
const checkHost = require("./middleWares/middleWare");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.set("trust proxy", true);

app.get("/", async (req, resp) => {
  resp.send("hello from sortly");
});
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
        url: `https://url-shortner-git-master-shivammaharaz.vercel.app/${urlExists.shortId}`,
      });
    } else {
      const shortsUrl = new shortUrl({
        fullUrl: url,
        shortId: shortId.generate(),
        ip: req.body.ip,
      });
      const result = await shortsUrl.save();

      res.json({
        url: `https://url-shortner-git-master-shivammaharaz.vercel.app/${result.shortId}`,
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

app.listen(5500, () => {
  console.log("listening");
});
