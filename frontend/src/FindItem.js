import React from 'react';
import UpdateItem from './UpdateItem';
const axios = require('axios');


class FindItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: "",
      title: "",
      mms_id: "",
      holdingID: "",
      itemID: "",
      callNum: "",
      inventoryDate: "",
      internalNote3: "",
      dataObj: {},
      link: "",
    }
  }

  async callAPI() {
    let { data } = await axios.post("http://localhost:9000/retreiveItem", { barcode: this.state.barcode })
    //console.log("data item received frontned-----------", data);
    await this.setState({
      title: data.bib_data.title,
      mms_id: data.bib_data.mms_id,
      holdingID: data.holding_data.holding_id,
      itemID: data.item_data.pid,
      callNum: data.holding_data.call_number,
      inventoryDate: data.item_data.inventory_date || "None",
      internalNote3: data.item_data.internal_note_3,
      dataObj: data,
    })
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
        <p>Inventory Date: {this.state.inventoryDate}</p>
        <p>Internal Note: {this.state.internalNote3}</p>

        <UpdateItem itemToUpdate={this.state} />
      </div>)
  }
}

export default FindItem;

