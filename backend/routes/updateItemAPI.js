var express = require('express');
var router = express.Router();
//var request = require('request');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

/*  update item route. */
router.post('/', async function (req, res, next) {
  try {
    console.log("inside update route")
    let data = await axios.put(EXLIBRIS_API_ROOT + '/almaws/v1/bibs/996852870101921/holdings/22178430490001921/items/23178430480001921' + '&apikey=' + process.env.EXLIBRIS_API_BIB_UPDATE_KEY, { item_data: { "inventory_number": 'This was upodated.' } })

    console.log("after the put statement.")


    //await request(process.env.EXLIBRIS_API_ROOT + '/almaws/v1/bibs/996852870101921/holdings/22178430490001920/items/23178430480001920', { item: { item_data: { inventory_number: 'This was upodated.' } } },
    // function (error, response, body) {
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    //   res.send(body);
    // }
    //)
    console.log("Connected to route")
    console.log("-----returned item from Alma after update----- ", data)
    res.send("connected to the route")

  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
