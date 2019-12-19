var express = require("express");
var router = express.Router();
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();



router.post("/", async function (req, res, next) {

  try {
    await request(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH + req.body.barcode + '&apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.send(body);
    });
  } catch (error) {
    res.send(err);
  }
});

module.exports = router;
