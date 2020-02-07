import React from 'react';
const axios = require('axios');
var parser = require('fast-xml-parser');
var he = require('he');

var options = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

class FindItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: '',
      title: "",
      mms_id: "",
      holdingID: "",
      itemID: "",
      callNum: "",
    }
  }

  async callAPI() {
    let { data } = await axios.post("http://localhost:9000/retreiveItem", { barcode: this.state.barcode })
    if (parser.validate(data) === true) { //optional (it'll return an object in case it's not valid)
      var jsonObj = await parser.parse(data, options);

      console.log("jsonObj-----------", jsonObj)
      await this.setState({
        title: jsonObj.item.bib_data.title,
        mms_id: jsonObj.item.bib_data.mms_id,
        holdingID: jsonObj.item.holding_data.holding_id,
        itemID: jsonObj.item.item_data.pid,
        callNum: jsonObj.item.holding_data.call_number
      })
    }
  }

  updateInventory = async () => {
    console.log("updateInventory activated+++++++++");
    //event.preventDefault();

    let data = await axios.post("http://localhost:9000/updateItem", { "item_data": { "inventory_number": 'This was upodated.' } })
    console.log("data front end api", data)
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.barcode2 !== this.props.barcode2) {
      const barcodeClean = this.props.barcode2.trim();
      await this.setState({ barcode: barcodeClean })
      this.callAPI();
    }
  }

  render() {
    return (
      <div className="list">
        <p>Barcode being retreived: {this.state.barcode}</p>
        <p>Title: {this.state.title}</p>
        <p>Call # {this.state.callNum}</p>
        <p>MMS (BibID): {this.state.mms_id}</p>
        <p>HoldingID: {this.state.holdingID}</p>
        <p>ItemID: {this.state.itemID}</p>
        <button onClick={this.updateInventory} >Update Inventory</button>
      </div>)
  }
}

export default FindItem;

