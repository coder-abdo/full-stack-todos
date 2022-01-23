import React from "react";
import { AppStore } from "./appstore";
const StoreContext = React.createContext<AppStore>({} as AppStore);

export default function StoreProvider({
  children,
  value,
}: {
  children: React.ReactChild;
  value: AppStore;
}) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
export const useStore = () => React.useContext(StoreContext);
