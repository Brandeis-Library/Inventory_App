var express = require('express');
var router = express.Router();
var request = require('request');
const axios = require('axios');


const dotenv = require('dotenv');
dotenv.config();

router.get('/', function (req, res, next) {
  try {
    res.status(200).send("You have reached route updateItem")
  } catch (error) {
    console.log(error)
  }
})

var options = {
  url: 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/996852870101921/holdings/22178430490001921/items/23178430480001921&apikey=l8xxdc15219b3ded41f4816378e4e2149640',
  headers: {
    'User-Agent': 'request'
  }
};

/*  update item route. */
router.post('/', async function (req, res, next) {
  try {
    console.log("req.body---------  ", req.body)
    console.log("inside update route")

    await request.post({
      url: process.env.EXLIBRIS_API_ROOT + '/almaws/v1/bibs/996852870101921/holdings/22178430490001921/items/23178430480001921&apikey=' + process.env.EXLIBRIS_API_BIB_UPDATE_KEY,
      headers: {},
      json: true,
      method: post,
      body: [{
        "item_data": {
          "inventory_number": "This data was uploaded",
          "inventory_date": "2013-12-11Z",
          "inventory_price": "100",
          "internal_note_1": "",
          "internal_note_2": "",
          "internal_note_3": "",
          "statistics_note_1": "",
          "statistics_note_2": "",
          "statistics_note_3": "",
          "physical_condition": {
            "value": "#"
          }
        }
      }],
    },
      function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        return res.send(body);
      });

    console.log("after the put statement.")
    console.log("Connected to route")
    console.log("-----returned item from Alma after update----- ", data)
    res.send("connected to the route")

  } catch (error) {
    res.send(error)
  }

});

module.exports = router;
