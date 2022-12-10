import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CardContext from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";

function Cart(props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmite, setDidSubmit] = useState(false);
  const cartCtx = useContext(CardContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }
  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 }); // .addItem is in the cart provider
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  function showCheckoutHandler() {
    setIsCheckingOut(true);
  }

  async function confirmHandler(userData) {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://food-project-c03a0-default-rtdb.europe-west1.firebasedatabase.app/Orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) throw new Error("Fucked up");
      const data = await response.json();

      console.log(data);

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart(); //? clear cart after submit (from card context functions)
    } catch (error) {
      console.log(error);
    }
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button onClick={showCheckoutHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout
          onCloseCheckout={props.onCloseCart}
          onConfirm={confirmHandler}
        />
      )}
      {!isCheckingOut && modalActions}
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order :)</p>;

  return (
    <Modal onCloseCart2={props.onCloseCart}>
      {!isSubmitting && !didSubmite && cartModalContent}
      {isSubmitting && !didSubmite && isSubmittingModalContent}
      {!isSubmitting && didSubmite && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
