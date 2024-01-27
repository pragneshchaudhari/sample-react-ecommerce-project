import {create} from 'zustand';

const calculateTotals = (cart) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

const useCartStore = create((set) => ({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,

  addToCart: (product, quantity) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Product already in the cart, update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += quantity;

        return { cart: updatedCart, ...calculateTotals(updatedCart) };
      } else {
        // Product not in the cart, add to cart
        return { cart: [...state.cart, { ...product, quantity: quantity }], ...calculateTotals([...state.cart, { ...product, quantity: quantity }]) };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      return { cart: updatedCart, ...calculateTotals(updatedCart) };
    }),

  changeQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCartWithQuantityChange = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      return {
        cart: updatedCartWithQuantityChange,
        ...calculateTotals(updatedCartWithQuantityChange),
      };
    }),
}));

export default useCartStore;