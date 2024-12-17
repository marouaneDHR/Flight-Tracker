import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cart/cartSlice";
import userReducer from "./Features/user/userSlice";

const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,

  },
});
export default store;
