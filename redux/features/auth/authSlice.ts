import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TAuthUser = {
  userId: string;
  role: string;
  isProfileComplete: boolean;
};

type TAuthState = {
  user: TAuthUser | null;
  access_token: string | null;
  refresh_token: string | null;
};

const initialState: TAuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: TAuthUser | null;
        access_token: string | null;
        refresh_token?: string | null;
      }>
    ) => {
      const { user, access_token, refresh_token = null } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.access_token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
