import React, { Component } from 'react';
import './App.css';
import BookingWidget from './components/BookingWidget'

class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <BookingWidget />
      </div>
      
    )
  }
}

export default App;
