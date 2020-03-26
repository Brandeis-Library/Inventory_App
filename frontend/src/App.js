import React from 'react';
import ReceiveBarcode from './ReceiveBarcode';
import './App.css';


function App() {

  return (
    <div className="App">
      <img className="logo" src='/Library_logo_blue_DIGITAL.png' alt='Brandeis Logo' />
      <h1>Inventory App</h1>
      < ReceiveBarcode />
    </div >
  );
}

export default App;
