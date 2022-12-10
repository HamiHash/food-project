import { useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReduver = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialInputState;
};

function useInputValidation(validation) {
  const [inputState, dispatch] = useReducer(
    inputStateReduver,
    initialInputState
  );

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validation(inputState.value);
  const inputHasError = !inputIsValid && inputState.isTouched;

  function valueChangeHandler(event) {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  }
  function blurHandler() {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  }
  function reset() {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  }

  return {
    enteredValue: inputState.value,
    inputIsValid,
    inputHasError,
    valueChangeHandler,
    blurHandler,
    reset,
  };
}

export default useInputValidation;
