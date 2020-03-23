var express = require("express");
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//This route is here to allow people to make sure the back end is running via the browser.
router.get('/', function (req, res, next) {
  try {
    res.status(200).send("You have reached route retreiveItem")
  } catch (error) {
    console.log(error)
  }
})

//route to retrieve an item via the scanned in barcode from the frontend.
router.post("/", async function (req, res, next) {

  try {
    //item retrieve query to Alma backend. API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH + req.body.barcode + '&apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY + "&expand=p_avail");

    //returning the data object to the front end so we can show scanned item.
    res.json(data);
  } catch (error) {
    console.log("retreiveItemErrorAPI Error:   ", error);
    res.send(error);
  }
});

module.exports = router;
