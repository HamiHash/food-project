import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";
import useInputValidation from "../hooks/input-validation";

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();

    // Todo => FETCH TO BACKEND
    console.log();

    nameReset();
    streetReset();
    postReset();
    cityReset();
  };

  const {
    enteredValue: nameValue,
    inputIsValid: nameIsValid,
    inputHasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInputValidation((nameValue) => nameValue.trim() !== "");

  const {
    enteredValue: streetValue,
    inputIsValid: streetIsValid,
    inputHasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInputValidation((streetValue) => streetValue.trim() !== "");

  const {
    enteredValue: postValue,
    inputIsValid: postIsValid,
    inputHasError: postHasError,
    valueChangeHandler: postChangeHandler,
    blurHandler: postBlurHandler,
    reset: postReset,
  } = useInputValidation((postValue) => postValue.trim() !== "");

  const {
    enteredValue: cityValue,
    inputIsValid: cityIsValid,
    inputHasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInputValidation((cityValue) => cityValue.trim() !== "");

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (nameIsValid || streetIsValid || postIsValid || cityIsValid)
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [nameIsValid, streetIsValid, postIsValid, cityIsValid]);

  return (
    <Modal>
      <form className={classes.control} onSubmit={confirmHandler}>
        <div className={!nameHasError ? classes.control : classes.invalid}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
        </div>
        <div className={!streetHasError ? classes.control : classes.invalid}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={streetValue}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
          />
        </div>
        <div className={!postHasError ? classes.control : classes.invalid}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={postValue}
            onChange={postChangeHandler}
            onBlur={postBlurHandler}
          />
        </div>
        <div className={!cityHasError ? classes.control : classes.invalid}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={cityValue}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
          />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCloseCheckout}>
            Cancel
          </button>
          <button disabled={!formIsValid} className={classes.submit}>
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
