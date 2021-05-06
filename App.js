import React, { Fragment, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Home from "./Home";
import Customers from "./Customers";
import Restaurants from "./Restaurants";
import Other from "./Other";

import { databaseRef } from "./firebase";

function App() {

  return (
    <Fragment>
      <Router>
        <div>
          <Navbar style={{ backgroundColor: "#C1CEFE" }} variant="light">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/restaurants">Partners</Nav.Link>
              <Nav.Link href="/customers">Products</Nav.Link>
              <Nav.Link href="/other">Locations</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route path="/customers">
              <Customers />
            </Route>

            <Route path="/restaurants">
              <Restaurants />
            </Route>

            <Route path="/other">
              <Other />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;