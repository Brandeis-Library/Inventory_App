import React from 'react';

class FindItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: "1001",
      item: { title: "Nothing honey." },
    }
  }

  componentDidUpdate(prevState) {
    if (this.prevState.barcode !== this.state.barcode) {

    }
  }

  render() {
    return (
      <div>
        <h1>FindItem.js</h1>
        <p>{this.state.barcode}</p>
        <p>{this.state.item.title}</p>
      </div>)
  }
}

export default FindItem;
