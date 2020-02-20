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

  updateInventory = async (event) => {
    event.preventDefault();

    //console.log("updateInventory activated+++++++++", this.state);


    await this.setState(prevState => ({
      ...prevState, ...this.state.dataObj,
    }))

    //console.log("State in updateInventory after State update and just before inventory update data is sent to the backend", this.state);

    let { data } = await axios.put("http://localhost:9000/updateItem", { ...this.state.dataObj, note: this.state.internalNote3, mmsId: this.state.mms_id, holdingId: this.state.holdingID, itemId: this.state.itemID })

    //console.log("inventory data from the back end, received on the front end api", data)
  }

  handleChange = async (event) => {
    await this.setState({ internalNote3: event.target.value });
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
        <form onSubmit={this.updateInventory}>
          <label>
            Enter an inventory note:
            <input type="text" value={this.state.internalNote3} onChange={this.handleChange} />
          </label>
          <button  >Update Inventory</button>
        </form>
      </div>)
  }
}

export default FindItem;

