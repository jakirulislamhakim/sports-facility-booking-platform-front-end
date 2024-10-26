import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthUser } from '../../../types';
import { RootState } from '../../store';

// Define a type for the slice state
interface TAuthState {
  user: TAuthUser | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<TAuthState>) => {
      const { token, user } = actions.payload;
      state.user = user;
      state.token = token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
