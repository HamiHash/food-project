import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../context/cart-context";

const HeaderCartButton = (props) => {
  const [btnAction, setBtnAction] = useState(false);
  const cartCtx = useContext(CardContext);

  const numberOfCartItem = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  ////// Bumb for the button when we add items to cart /////
  const btnClasses = `${classes.button} ${btnAction && classes.bump}`;

  // used in useEffect => So use effect only runs when items change (and not the whole cartCtx)
  const { items } = cartCtx;

  useEffect(() => {
    // So it won't run when the page loads
    if (items.length === 0) return;

    // add the "bump" class
    setBtnAction(true);

    // remove the "bump" class after 300ms so it can happen again
    const timer = setTimeout(() => {
      setBtnAction(false);
    }, 300);

    // CleanUp function => So if we Rapidly click on add item, it will only bumb once
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart2}>
      <span className={classes.icon}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
