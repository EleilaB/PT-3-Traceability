const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'a87425010ca44ef1a23980299e68854e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.post('/nameless', (req, res) => {
    rollbar.error("nameless form");
    res.send(200)
});

app.post('/smallgroup', (req, res) => {
    rollbar.error("group size too small");
    res.send(200)
});

app.post('/roomless', (req, res) => {
    rollbar.error("roomless form");
    res.send(200)
});

app.post('/newgroup', (req, res) => {
    rollbar.log("group added");
    res.send(200)
});

const PORT = process.env.PORT || 4005
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}.`)
});