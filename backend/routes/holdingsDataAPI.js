var express = require("express");
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const xml2js = require('xml2js')

//This route is here to allow people to make sure the back end is running via the browser.
router.get('/', function (req, res, next) {
  try {
    res.status(200).send("You have reached route holdingsData")
  } catch (error) {
    console.log(error)
  }
})

//route to retrieve an item via the scanned in barcode from the frontend.
router.put("/", async function (req, res, next) {
  console.log('req.body', req.body)
  try {
    //item retrieve query to Alma backend. API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH_HOLDINGS + req.body.mmsId + '/holdings/' + req.body.holdingId + '?apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY);

    //returning the data object to the front end so we can show scanned item.
    console.log("xml data backend", data)
    let xmlData = data.anies[0];

    const parseString = require('xml2js').parseString;

    parseString(xmlData, function (err, result) {
      console.dir(result);
      const xml2JSON = JSON.stringify(result);
      console.log(xml2JSON);
    });

    const dataJSON = JSON.stringify(xmlData);
    console.log("dataJSON", dataJSON);
    res.json(data);
  } catch (error) {
    console.log("retreiveItemErrorAPI Error:   ", error);
    res.send(error);
  }
});

module.exports = router;
