"use client";

import { type ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

type Props = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}
