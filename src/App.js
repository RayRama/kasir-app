import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/navbarComponent";
import { Home, Success } from "./pages";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </Router>
    );
  }
}
