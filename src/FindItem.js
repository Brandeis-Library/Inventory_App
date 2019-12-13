import React from 'react';

class FindItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: '',
      item: { title: "Nothing honey." },
    }
  }



  componentDidUpdate(prevProps, prevState) {

    if (prevProps.barcode2 !== this.props.barcode2) {
      this.setState({ barcode: this.props.barcode2 })
    }
  }

  render() {
    console.log('FindItem this.props', this.props)
    return (
      <div>
        <h1>FindItem.js</h1>

        <p>{this.state.item.title}</p>
        <p>Barcode in FindItem: {this.state.barcode}</p>

      </div>)
  }
}

export default FindItem;

