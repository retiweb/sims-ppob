import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userData = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  balance: number;
};

type authState = {
  token: string | null;
  isAuthenticated: boolean;
  user: userData | null;
};

const initialState: authState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state: authState, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state: authState) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action: PayloadAction<userData>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
  },
});

export const { setLogin, setLogout, setUser, setBalance } = authSlice.actions;
export default authSlice.reducer;
