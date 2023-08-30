import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const { isLoggedIn: isLoggedInCtx, onLogout: onLogoutCtx } =
    useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedInCtx && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedInCtx && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedInCtx && (
          <li>
            <button onClick={onLogoutCtx}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
