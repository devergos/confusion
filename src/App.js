import React from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from "reactstrap"
import './App.css';
import { DISHES } from './shared/dishes'

import Menu from './components/MenuComponent';

export class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
