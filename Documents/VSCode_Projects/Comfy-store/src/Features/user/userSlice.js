import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return user;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: "winter",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user: user,
      };
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    toggleTheme: () => {
      console.log("togglingTheme");
    },
  },
});

export const { login, logout, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
