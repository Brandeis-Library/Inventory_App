import React from 'react';
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
      inventoryNum: "",
      internalNote3: "",
      dataObj: {},
      link: "",
    }
  }



  async callAPI() {
    let dataOrig = await axios.post("http://localhost:9000/retreiveItem", { barcode: this.state.barcode })
    console.log("dataOrig", dataOrig);
    let { data } = dataOrig;
    console.log("data item received frontned-----------", data);
    let { item_data } = data;
    console.log("Item data being broken out", item_data);
    let { link_data } = dataOrig;


    await this.setState({
      title: data.bib_data.title,
      mms_id: data.bib_data.mms_id,
      holdingID: data.holding_data.holding_id,
      itemID: data.item_data.pid,
      callNum: data.holding_data.call_number,
      inventoryDate: data.item_data.inventory_date || "None",
      inventoryNum: data.item_data.inventory_number,
      internalNote3: "This item updated. ",//data.item_data.internal_note_3,
      dataObj: data,

    })
  }

  updateInventory = async () => {
    console.log("updateInventory activated+++++++++", this.state);

    // This is the code I was working on at the end of the day.
    await this.setState(prevState => ({
      ...prevState, ...this.state.dataObj,
    }))

    console.log("State in updateInventory after State update and just before inventory update data is sent to the backend", this.state);

    let data = await axios.put("http://localhost:9000/updateItem", { ...this.state.dataObj })
    console.log("inventory data from the back end, received on the front end api", data)
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
        <p>Inventory #: {this.state.inventoryNum}</p>
        <p>Internal Note: {this.state.internalNote3}</p>
        <button onClick={this.updateInventory} >Update Inventory</button>
      </div>)
  }
}

export default FindItem;

