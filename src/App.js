import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

// context
import CartProvider from "./context/CartProvider";
import Checkout from "./components/Checkout/Checkout";

// cart position doesnt matter becouse we use portals on it
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  function showCheckoutHandler() {
    setCartIsShown(false);
    setCheckoutIsShown(true);
  }

  function hideCheckoutHandler() {
    setCheckoutIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          onCloseCart={hideCartHandler}
          onShowCheckout={showCheckoutHandler}
        />
      )}
      {checkoutIsShown && <Checkout onCloseCheckout={hideCheckoutHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
