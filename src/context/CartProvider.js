import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // we find the index of repeated item (if it exists)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // if "existingCartItemIndex" doesn't exist, this will be null
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // copy the old object
      updatedItems[existingCartItemIndex] = updatedItem; // then we overwrite it
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    // if the amount of the item is equal to 1  we should delete the item:
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // if greater than 1, we just want to update the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items]; // old items
      updatedItems[existingCartItemIndex] = updatedItem; // overwrite the old with updated
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
}

export default CartProvider;
