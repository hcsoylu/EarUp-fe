import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PerfectPitch from "./pages/PerfectPitch";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import SideMenu from "./components/SideMenu";

function Router() {
  const { loggedIn, showSide } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {showSide && <SideMenu />}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          {loggedIn === false ? <Register /> : <Redirect to="/login" />}
        </Route>
        {loggedIn === false ? (
          <Redirect to="/login" />
        ) : (
          <Layout>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/pp">
              <PerfectPitch />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
          </Layout>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
