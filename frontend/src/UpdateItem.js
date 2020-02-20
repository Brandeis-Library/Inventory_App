import React from 'react';
const axios = require('axios');

class UpdateItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      internalNote3: "",
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

    //console.log("inventory data from the back end, received on the front end api", data)
    //data will be used to show what the updated object looks like on the screen
  }

  handleChange = async (event) => {
    await this.setState({ internalNote3: event.target.value });
  }

  render() {
    console.log("this.props.itemToUpdate", this.props.itemToUpdate)
    return (
      <div>
        <h4>Inside UpdateItem</h4>
        <form onSubmit={this.updateInventory}>
          <label>
            Enter an inventory note:
            <input type="text" value={this.state.internalNote3} onChange={this.handleChange} />
          </label>
          <button>Update Inventory</button>
        </form>
      </div>
    )
  }
}

export default UpdateItem;
