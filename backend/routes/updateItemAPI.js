var express = require('express');
var router = express.Router();

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



/*  update item route. */
router.put('/', async function (req, res, next) {
  try {
    console.log("req.body---------  ", req.body)
    console.log("inside update route")
    const data = await axios.put(process.env.EXLIBRIS_API_ROOT + '/almaws/v1/bibs/996852870101921/holdings/22178430490001921/items/23178430480001921?apikey=' + process.env.EXLIBRIS_API_BIB_UPDATE_KEY, req.body)


    console.log("after the put statement.")
    console.log("Connected to route")
    console.log("-----returned item from Alma after update----- ", data)
    res.json(data);
  } catch (error) {
    console.log("updateErrorAPI Error:   ", error);
    res.send(error)
  }

});

module.exports = router;
