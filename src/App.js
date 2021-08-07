import axios from "axios";
import React from "react";
import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
