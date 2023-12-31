import React, { useContext } from "react";
import AuthContext from "../../context/auth-context.js";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.scss";

const Home = () => {
  const ctx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
