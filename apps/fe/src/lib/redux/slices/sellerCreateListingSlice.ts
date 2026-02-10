import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SellerDeliveryMethod = "instant" | "manual";

type SellerCreateListingState = {
  gameCategory: string;
  listingHeadline: string;
  rankProgress: string;
  description: string;
  price: string;
  priceNegotiable: boolean;
  deliveryMethod: SellerDeliveryMethod;
};

export const sellerCreateListingInitialState: SellerCreateListingState = {
  gameCategory: "",
  listingHeadline: "",
  rankProgress: "",
  description: "",
  price: "1500000",
  priceNegotiable: true,
  deliveryMethod: "instant",
};

const sellerCreateListingSlice = createSlice({
  name: "sellerCreateListing",
  initialState: sellerCreateListingInitialState,
  reducers: {
    hydrateSellerCreateListing(state, action: PayloadAction<SellerCreateListingState>) {
      return { ...state, ...action.payload };
    },
    updateStepOne(
      state,
      action: PayloadAction<
        Partial<
          Pick<
            SellerCreateListingState,
            "gameCategory" | "listingHeadline" | "rankProgress" | "description"
          >
        >
      >,
    ) {
      Object.assign(state, action.payload);
    },
    updateStepThree(
      state,
      action: PayloadAction<
        Partial<
          Pick<
            SellerCreateListingState,
            "price" | "priceNegotiable" | "deliveryMethod"
          >
        >
      >,
    ) {
      Object.assign(state, action.payload);
    },
    resetSellerCreateListing() {
      return sellerCreateListingInitialState;
    },
  },
});

export const {
  hydrateSellerCreateListing,
  updateStepOne,
  updateStepThree,
  resetSellerCreateListing,
} = sellerCreateListingSlice.actions;
export default sellerCreateListingSlice.reducer;
