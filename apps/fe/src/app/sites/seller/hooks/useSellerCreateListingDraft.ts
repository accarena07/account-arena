"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  hydrateSellerCreateListing,
  sellerCreateListingInitialState,
} from "@/lib/redux/slices/sellerCreateListingSlice";

const STORAGE_KEY = "seller.createListing.draft.v1";

export function useSellerCreateListingDraft() {
  const dispatch = useAppDispatch();
  const createListingState = useAppSelector((state) => state.sellerCreateListing);
  const isHydratedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        isHydratedRef.current = true;
        return;
      }

      const parsed = JSON.parse(raw) as Partial<typeof sellerCreateListingInitialState>;
      dispatch(
        hydrateSellerCreateListing({
          ...sellerCreateListingInitialState,
          ...parsed,
        }),
      );
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      isHydratedRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isHydratedRef.current) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createListingState));
  }, [createListingState]);

  const saveDraftNow = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createListingState));
  };

  const clearDraft = () => {
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return { saveDraftNow, clearDraft };
}
