import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import BookingWidget from './components/BookingWidget'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={BookingWidget} />
      </Router>
      
    )
  }
}

export default App;
