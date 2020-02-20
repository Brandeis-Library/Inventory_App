import React from 'react';
import { Button } from 'react-bootstrap';


import FindItem from './FindItem';
import AlertDismissible from './AlertDismissible';

class ReceiveBarcode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempBarcode: "",
      barcode: '',
      showAlert: false,
    }
  }

  handleChange = (event) => {
    this.setState({ tempBarcode: event.target.value })
  }

  setShow = () => {
    this.setState({ showAlert: !this.state.AlertshowAlert })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.tempBarcode.length === 14) {
      this.setState({ barcode: this.state.tempBarcode });
      this.setState({ tempBarcode: "" });
    } else {
      this.setShow();
    }
  }


  render() {

    return (<div>
      <AlertDismissible setShow={this.setShow} showAlert={this.state.showAlert} />
      <form onSubmit={this.handleSubmit}>
        <label>
          Barcode:
        <input type="text" autoFocus value={this.state.tempBarcode} onChange={this.handleChange} name="tempBarcode" placeholder="ex: 39097009544900" />
        </label>
        <Button className={"btn btn-secondary"} type="submit" value="Submit" >Submit Barcode</Button>
      </form>
      <FindItem barcode2={this.state.barcode} />
    </div>)
  }
}

export default ReceiveBarcode;
