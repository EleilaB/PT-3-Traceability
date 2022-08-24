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

const PORT = process.env.PORT || 4005
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}.`)
});