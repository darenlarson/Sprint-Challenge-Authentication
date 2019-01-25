import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import Signin from './components/Signin.js';
import Signup from './components/Signup.js';
import Jokes from './components/Jokes.js';



class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route exact path="/" component={Homepage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default App;
