var express = require("express");
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


//This route is here to allow people to make sure the back end is running via the browser.
router.get('/', function (req, res, next) {
  try {
    res.status(200).send("You have reached route holdingsData")
  } catch (error) {
    console.log(error.message)
  }
})

//route to retrieve the holdings for an item so that the shelf location can be retreived displaye.
router.put("/", async function (req, res, next) {
  try {
    //item retrieve query to Alma backend. Holdings API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH_HOLDINGS + req.body.mmsId + '/holdings/' + req.body.holdingId + '?apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY);

    //pulling out the XML hodings data and searching to see if 'committed to retain' is in the text. If the text is found returning the text to the front end to show.
    let xmlData = data.anies[0];
    let string583a = ""
    const dataJSON = JSON.stringify(xmlData);
    const xmlNum = dataJSON.indexOf('committed to retain')

    if (xmlNum >= 0) {
      string583a = 'committed to retain';
    } else {
      string583a = "";
    }

    res.send(string583a);
  } catch (error) {
    console.log("retreiveItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

module.exports = router;
