import React from 'react';
import { Button } from 'react-bootstrap';


import FindItem from './FindItem';


class ReceiveBarcode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempBarcode: "",
      barcode: '',

    }
  }

  handleChange = (event) => {
    this.setState({ tempBarcode: event.target.value })
  }



  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.tempBarcode.length <= 14 || this.state.tempBarcode.length >= 13) {
      this.setState({ barcode: this.state.tempBarcode });
      this.setState({ tempBarcode: "" });
    } else {
      alert("Please enter a properly formatted barcode.")
    }
  }


  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Barcode:
        <input type="text" autoFocus value={this.state.tempBarcode} onChange={this.handleChange} name="tempBarcode" placeholder="ex: 39097009544900" />
          </label>
          <p><Button className={"btn btn-secondary"} type="submit" value="Submit" >Submit Barcode</Button></p>
        </form>
        <FindItem barcode2={this.state.barcode} />
      </div>
    )
  }
}

export default ReceiveBarcode;
