import React from 'react';
const axios = require('axios');

class UpdateItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      internalNote3: "",
      title: "",
      callNum: "",
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

    await this.setState(prevProps => ({
      ...prevProps, ...this.props.itemToUpdate.dataObj,
    }))

    let { data } = await axios.put("http://localhost:9000/updateItem", { ...this.props.itemToUpdate.dataObj, note: this.state.internalNote3, mmsId: this.props.itemToUpdate.mms_id, holdingId: this.props.itemToUpdate.holdingID, itemId: this.props.itemToUpdate.itemID })

    //data will be used to show what the updated object looks like on the screen
    this.setState({
      internalNoteReturned: data.item_data.internal_note_3,
      title: data.bib_data.title,
      callNum: data.holding_data.call_number,
      inventoryDate: data.item_data.inventory_date,
    });
  }

  handleChange = async (event) => {
    await this.setState({ internalNote3: event.target.value });
  }

  render() {

    return (
      <div>
        <h4>Update an Item</h4>
        <form onSubmit={this.updateInventory}>
          <label>
            Enter an inventory note:
            <input type="text" value={this.state.internalNote3} onChange={this.handleChange} />
          </label>
          <button>Update Inventory</button>
        </form>
        <h4>Returned Item After Update</h4>
        <p>Title: {this.state.title}</p>
        <p>Call # {this.state.callNum}</p>
        <p>Inventory Date: {this.state.inventoryDate}</p>
        <p>Internal Note: {this.state.internalNoteReturned}</p>

      </div>
    )
  }
}

export default UpdateItem;
