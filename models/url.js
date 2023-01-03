const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://Shivam:2001@cluster0.bxo7vjp.mongodb.net/url_sortner",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("connected");
    }
  }
);

const { Schema, model } = mongoose;

const urlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: Object,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});

const shortUrl = model("shorturl", urlSchema);
module.exports = shortUrl;
