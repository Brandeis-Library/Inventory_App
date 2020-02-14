var express = require("express");
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();



router.post("/", async function (req, res, next) {

  try {
    const { data } = await axios.get(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH + req.body.barcode + '&apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY + "&expand=p_avail");
    console.log('data:', data); // Print the HTML for the Google homepage.
    res.json(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
