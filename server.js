const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = (module.exports = express());
const server = http.createServer(app);
const port = parseInt(process.env.PORT || 3000);
const devMode = process.env.NODE_ENV !== "production";
const data = require("./data/data");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(devMode ? "dev" : "combined"));
app.use(cors({ origin: true }));

// TODO: ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE
// ^^^ Example: app.use('/v1/kitten', require('./routes/kitten'))
// ^^^ Example: app.use('/cats', require('./routes/kitten'))
app.get("/", (req, res) => res.json(data));
app.post("/", (req, res) => {
  let title = req.body.data.locationTitle;
  let note = req.body.data.locationNote;
  let latAndLong = req.body.data.latLong;
  let markerType = req.body.data.markerType;
  console.dir(req.body.data.locationTitle);
  createUserData(title, note, latAndLong, markerType);
  res.json({ 
    success: true,
    message: 'Check the map for your Marker!'
  });
});

app.use(notFound);
app.use(errorHandler);

server
  .listen(port)
  .on("error", console.error.bind(console)) // .bind what dis?
  .on("listening", console.log.bind(console, "Listening on " + port));

function notFound(req, res, next) {
  const url = req.originalUrl;
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important auto requests
    console.error("[404: Requested file not found] ", url);
  }
  res.status(404).send({ error: "Url not found", status: 404, url });
}

function errorHandler(err, req, res, next) {
  console.error("ERROR", err);
  const stack = devMode ? err.stack : undefined;
  res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}

function createUserData(title, note, latAndLong, markerT) {
  data.toolTip.push({
    id: data.toolTip.length + 1,
    locationTitle: title,
    locationNote: note
  });
  console.dir(data.toolTip[data.toolTip.length - 1]);
  data.markerInfo.push({
    id: data.markerInfo.length + 1,
    latLong: latAndLong.split(",").map(item => parseFloat(item)),
    markerType: markerT
  });
  console.dir(data.markerInfo[data.markerInfo.length - 1]);
}
