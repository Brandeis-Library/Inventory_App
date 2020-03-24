var express = require("express");
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//This route is here to allow people to make sure the back end is running via the browser.
router.get('/', function (req, res, next) {
  try {
    res.status(200).send("You have reached route updateInventoryDate")
  } catch (error) {
    console.log(error)
  }
})


/*  update inventory date route. */
router.put('/', async function (req, res, next) {
  try {

    //adding new/update inventory date on item_data
    req.body.item_data.internal_note_3 = req.body.note;
    const date = new Date();
    req.body.item_data.inventory_date = date;

    //update query to Alma backend. API URL, Item Identifiers, APIKEY, and data chunks for bib, holdings, item and link
    //{ data } is the destructured data object from the response that contains the data we need to manipulate/put the update.
    //... are JavaScript spread operators. They allow us 'copy' all of properties and methods of an Object vs typing them all in manually.
    let { data } = await axios.put(process.env.EXLIBRIS_API_ROOT + '/almaws/v1/bibs/' + req.body.mmsId + '/holdings/' + req.body.holdingId + '/items/' + req.body.itemId + '?apikey=' + process.env.EXLIBRIS_API_BIB_UPDATE_KEY, { bib_data: { ...req.body.bib_item }, holding_data: { ...req.body.holding_data }, item_data: { ...req.body.item_data }, link: req.body.link })
    //returning the data object to the front end so we can show changes.
    res.json(data);
  } catch (error) {
    console.log("updateErrorAPI Error:   ", error);
    res.send(error)
  }

});


module.exports = router;
