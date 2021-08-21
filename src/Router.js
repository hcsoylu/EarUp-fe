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
        <Route exact path="/">
          {loggedIn === false ? <Login /> : <Home />}
        </Route>
        <Route path="/register">
          {loggedIn === false ? <Register /> : <Redirect to="/" />}
        </Route>
        {loggedIn === false ? (
          <Redirect to="/" />
        ) : (
          <Layout>
            <Route path="/pp">
              <PerfectPitch />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
          </Layout>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
