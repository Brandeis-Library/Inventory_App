import React from 'react';

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
    this.setState({ barcode: this.state.tempBarcode });
    this.setState({ tempBarcode: "" });
  }

  render() {

    return (<div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Barcode:
        <input type="text" autoFocus value={this.state.tempBarcode} onChange={this.handleChange} name="tempBarcode" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <FindItem barcode2={this.state.barcode} />
    </div>)
  }
}

export default ReceiveBarcode;
