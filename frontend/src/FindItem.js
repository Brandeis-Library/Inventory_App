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
      status: "",
      callNum: "",
      permLib: "",
      permLoc: "",
      tempLib: "",
      tempLoc: "",
      inventoryDate: "",
      internalNote3: "",
      dataObj: {},
      link: "",
    }
  }


  async callAPI() {
    let { data } = await axios.post("http://localhost:9000/retreiveItem", { barcode: this.props.barcode2 })
    console.log("returned item ", data);
    if (data.name !== "Error") {
      await this.setState({
        barcode: this.props.barcode2,
        title: data.bib_data.title,
        mms_id: data.bib_data.mms_id,
        holdingID: data.holding_data.holding_id,
        itemID: data.item_data.pid,
        status: data.item_data.base_status.desc,
        callNum: data.holding_data.call_number,
        inventoryDate: data.item_data.inventory_date || "None",
        internalNote3: data.item_data.internal_note_3,
        permLib: data.item_data.library.desc,
        permLoc: data.item_data.location.desc,
        tempLib: data.holding_data.temp_library.desc,
        tempLoc: data.holding_data.temp_location.desc,
        dataObj: data,

      })
    } else {
      alert("Please enter a valid barcode.")
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("inside findItem componentDidUpdate")
    console.log("prevProps", prevProps, "prevState", prevState);


    if (prevState.inventoryDate === this.state.inventoryDate) {
      console.log("inside findItem componentDidUpdate if inventory_date statement")
      if (prevProps.barcode2 !== this.props.barcode2) {
        console.log("inside findItem componentDidUpdate if barcode statement")
        this.callAPI();
      }

      let { data } = await axios.put("http://localhost:9000/updateItemInventoryDate", { ...this.state.dataObj, mmsId: this.state.mms_id, holdingId: this.state.holdingID, itemId: this.state.itemID })
      console.log("state------  ", this.state);
      console.log("data--------  ", data);
      //data will be used to show what the updated object looks like on the screen
      if (Object.keys(data).length !== 0) {
        await this.setState({

          inventoryDate: data.item_data.inventory_date

        });

      }
    }

  }


  render() {
    console.log("props", this.props)

    return (
      <div className="list">
        <h4>Barcode being retreived: {this.state.barcode}</h4>
        <p>Title: {this.state.title}</p>
        <p>Call # {this.state.callNum}</p>
        <p>Status: {this.state.status}</p>
        {/* <p>MMS (BibID): {this.state.mms_id}</p>
        <p>HoldingID: {this.state.holdingID}</p>
        <p>ItemID: {this.state.itemID}</p> */}
        <p>Library/Location: {this.state.permLib} - {this.state.permLoc}</p>

        {this.state.tempLib ?
          <p>Temp Library/Location: {this.state.tempLib} - {this.state.tempLoc}</p>
          : <div></div>
        }

        <p>Inventory Date: {this.state.inventoryDate}</p>
        <p>Internal Note: {this.state.internalNote3}</p>
        <hr />
        <UpdateItem itemToUpdate={this.state} />

      </div>)
  }
}

export default FindItem;

