import React from "react";

const CardContext = React.createContext({
  // for VS code auto complition
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CardContext;

/*
// Provide context: "hey react! here is my context, all components that are wrapped by it should have access to it"

// Consume (We have two options):

  1) <CardContext.Consumer> {(ctx) => {return "our JSX code goes here"}} <CardContext.  Consumer>

  2) const ctx = useContext(CardContext)  (remeber to import useContext hook)
     return (our JSX code)

*/
