import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

// context
import CartProvider from "./context/CartProvider";

// cart position doesnt matter becouse we use portals on it
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
