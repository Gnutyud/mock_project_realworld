import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateCurrentUser } from "../api/authApi";
interface userType {
  username: undefined | string;
  email: undefined | string;
  "email or password": undefined | string;
}

export interface authState {
  isRegister: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: userType | null;
  currentUser: any;
}

let isAuth;

const jsonUser = localStorage.getItem("user");
if (jsonUser) {
  isAuth = JSON.parse(jsonUser).token;
}

const isLoggedIn = !!isAuth;
const initialState: authState = {
  isRegister: false,
  isLoggedIn,
  isLoading: false,
  error: null,
  currentUser: null,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: { user: any }) => {
    const response = await updateCurrentUser(data);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    switchAuthModeHandler(state) {
      state.isRegister = !state.isRegister;
    },
    logoutHandler(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;