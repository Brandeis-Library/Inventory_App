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
    req.body.item_data.internal_note_3 = req.body.note;

    let { data } = await axios.put(process.env.EXLIBRIS_API_ROOT + '/almaws/v1/bibs/' + req.body.mmsId + '/holdings/' + req.body.holdingId + '/items/' + req.body.itemId + '?apikey=' + process.env.EXLIBRIS_API_BIB_UPDATE_KEY, { bib_data: { ...req.body.bib_item }, holding_data: { ...req.body.holding_data }, item_data: { ...req.body.item_data }, link: req.body.link })
    console.log("after the put statement.")

    res.json(data);
  } catch (error) {
    console.log("updateErrorAPI Error:   ", error);
    res.send(error)
  }

});

module.exports = router;
