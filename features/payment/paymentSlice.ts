import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type ServiceData = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface CheckoutState {
  selectedService: ServiceData | null;
}

const initialState: CheckoutState = {
  selectedService: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutService: (state, action: PayloadAction<ServiceData>) => {
      state.selectedService = action.payload;
    },
    clearCheckoutService: (state) => {
      state.selectedService = null;
    },
  },
});

export const { setCheckoutService, clearCheckoutService } = checkoutSlice.actions;
export default checkoutSlice.reducer;