// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date string
app.get('/api/timestamp/:date_string?', (req, res) => {
  let date;
  let dateParam = req.params.date_string;
  if (dateParam === undefined) {
    date = new Date();
  } else {
    // if format is YYYY-MM-DD we want to pass as string. Otherwise pass as number.
    date = dateParam.includes('-') ? new Date(dateParam) : new Date(parseInt(dateParam));
  }
  let getTime = date.getTime();
  let utcString = date.toUTCString();
  if (Number.isNaN(getTime)) {
    res.send({error: utcString});
  } else {
    res.send({unix: date.getTime(), utc: utcString});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});