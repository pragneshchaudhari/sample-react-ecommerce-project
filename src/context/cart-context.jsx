import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
};

const calculateTotals = (cart) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totlaPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalQuantity, totlaPrice };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exisitingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (exisitingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[exisitingProductIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart, ...calculateTotals(updatedCart) };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
          ...calculateTotals([...state.cart, { ...action.payload }]),
        };
      }
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: updatedCart, ...calculateTotals(updatedCart) };
    case "CHANGE_QUANTITY":
      const updatedCartWithChange = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cart: updatedCartWithChange,
        ...calculateTotals(updatedCartWithChange),
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const changeQuantity = (productId, quantity) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: { id: productId, quantity } });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
