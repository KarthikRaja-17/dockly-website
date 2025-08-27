import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OTPData {
  userId: number;
  otp: string;
  email: string;
}

interface AuthState {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  otpData: OTPData | null;
  isOTPModalOpen: boolean;
}

const initialState: AuthState = {
  isAdmin: false,
  isLoginModalOpen: false,
  otpData: null,
  isOTPModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setIsLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
    setOTPData: (state, action: PayloadAction<OTPData | null>) => {
      state.otpData = action.payload;
    },
    setIsOTPModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOTPModalOpen = action.payload;
    },
    clearOTPData: (state) => {
      state.otpData = null;
      state.isOTPModalOpen = false;
    },
    logout: (state) => {
      state.isAdmin = false;
      state.otpData = null;
      state.isOTPModalOpen = false;
    },
  },
});

export const {
  setIsAdmin,
  setIsLoginModalOpen,
  setOTPData,
  setIsOTPModalOpen,
  clearOTPData,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
