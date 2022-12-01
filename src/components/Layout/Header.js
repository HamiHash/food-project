import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.webp";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="table of food" />
      </div>
    </Fragment>
  );
};

export default Header;
