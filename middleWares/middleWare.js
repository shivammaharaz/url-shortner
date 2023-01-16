const url = require("url").parse;
var ipInfo = require("ip-info-finder");
const checkHost = async (req, res, next) => {
  const urls = req.body.url;
  req.body.ip =
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket.remoteAddress;
  const hostName = url(urls).hostname;
  ipInfo.getIPInfo(req.body.ip).then((data) => {
    if (data) {
      req.body.ipInfo = data;
    } else {
      req.body.ipInfo = {};
    }
  });

  req.body.ipInfo =
    //   console.log(hostName, ip);
    // if (
    //   hostName === "zipaworld.com" ||
    //   hostName === "couser.zipaworld.com" ||
    //   hostName === "cocust.zipaworld.com" ||
    //   hostName === "www.aaa2innovate.com" ||
    //   hostName === "www.tafrishaala.com"
    // ) {
    //   next();
    // } else {
    //   res.status(401).json({ msg: "unauthorised hostName" });
    // }
    next();
};

module.exports = checkHost;
