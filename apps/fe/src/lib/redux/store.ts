import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import sellerCreateListingReducer from "./slices/sellerCreateListingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      sellerCreateListing: sellerCreateListingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
