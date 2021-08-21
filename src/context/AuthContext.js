import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState({});
  const [showSide, setShowSide] = useState(false);

  async function getLoggedIn() {
    const LoggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
    setLoggedIn(LoggedInRes.data);
  }

  async function getUser() {
    const res = await axios.get("http://localhost:5000/auth/me");
    setUser(res.data);
  }

  useEffect(() => {
    getLoggedIn();
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        getUser,
        user,
        setUser,
        showSide,
        setShowSide,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
