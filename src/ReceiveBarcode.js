import React from 'react';

import FindItem from './FindItem';

class ReceiveBarcode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: "",

    }
  }

  handleChange = (event) => {
    this.setState({ barcode: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (<div>
      <form>
        <label>
          Barcode:
        <textarea autoFocus value={this.state.barcode} onChange={this.handleChange} name="barcode" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <FindItem barcode2={this.state.barcode} />
    </div>)
  }
}

export default ReceiveBarcode;
