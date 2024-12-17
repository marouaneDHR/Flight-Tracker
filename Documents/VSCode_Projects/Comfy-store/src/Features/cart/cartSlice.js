import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderTotal: 0,
  cartItems: [],
  numItemsInCart: 0,
  shipping: 500,
  tax: 0,
  cartTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getCartFromLocalStorage,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const item = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += parseInt(product.amount, 10);
      state.cartTotal += product.price * parseInt(product.amount, 10);
      cartSlice.caseReducers.calculateTotals(state);
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      state.numItemsInCart -= item.amount;
      state.cartTotal -= item.price * item.amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    editItem: (state, action) => {
      const { productId, amount } = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    calculateTotals: (state) => {
      state.tax = Number((0.1 * state.cartTotal).toFixed(2));
      state.orderTotal = Number(state.cartTotal + state.shipping + state.tax);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
