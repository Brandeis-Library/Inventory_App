import React from 'react';
import { Button } from 'react-bootstrap';
const axios = require('axios');


class UpdateItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      internalNote3: "",
      title: "",
      callNum: "",
      status: "",
      inventoryDate: "",
      internalNoteReturned: "",

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemToUpdate.internalNote3 !== prevProps.itemToUpdate.internalNote3) {
      this.setState({
        internalNote3: this.props.itemToUpdate.internalNote3
      })
    }
  }

  updateInventory = async (event) => {
    event.preventDefault();

    if (this.props.itemToUpdate.mms_id) {
      await this.setState(prevProps => ({
        ...prevProps, ...this.props.itemToUpdate.dataObj,
      }))
      console.log("this.props.itemToUpdate.dataObj", this.props.itemToUpdate.dataObj);

      let { data } = await axios.put("http://localhost:9000/updateItem", { ...this.props.itemToUpdate.dataObj, note: this.state.internalNote3, mmsId: this.props.itemToUpdate.mms_id, holdingId: this.props.itemToUpdate.holdingID, itemId: this.props.itemToUpdate.itemID })


      //data will be used to show what the updated object looks like on the screen
      this.setState({
        internalNoteReturned: data.item_data.internal_note_3,
        title: data.bib_data.title,
        callNum: data.holding_data.call_number,
        inventoryDate: data.item_data.inventory_date,
        status: data.item_data.base_status.desc,
      });
    } else {
      alert("Retrieve a valid item before submitting changes.")
    }
  }

  handleChange = async (event) => {
    await this.setState({ internalNote3: event.target.value });
  }

  render() {

    return (
      <div >
        <h4 className={"updateH4"}>Update an Item</h4>
        <form onSubmit={this.updateInventory}>
          <label>
            Enter an inventory note:
            <input type="text" value={this.state.internalNote3} onChange={this.handleChange} name='internalNote3' placeholder="ex: Needs staff intervention." className={"rounded"} />
          </label>
          <p><Button className={"btn btn-secondary"} type="submit" value="Submit" >Update Inventory</Button></p>
        </form>
        <h4>Returned Item After Update</h4>
        <p>Title: {this.state.title}</p>
        <p>Call # {this.state.callNum}</p>
        <p>Status: {this.state.status}</p>
        <p>Inventory Date: {this.state.inventoryDate}</p>
        <p>Internal Note: {this.state.internalNoteReturned}</p>

      </div>
    )
  }
}

export default UpdateItem;
