import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
