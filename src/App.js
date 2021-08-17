import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AllOrder from "./components/Order/AllOrder";
import CreateOrder from "./components/Order/CreateOrder";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/all_order" component={AllOrder}></Route>
        <Route exact path="/create_order" component={CreateOrder}></Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
