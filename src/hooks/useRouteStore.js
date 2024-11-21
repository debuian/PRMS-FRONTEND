import { create } from "zustand";

const useRouteStore = create((set) => ({
  selectedRoute: "Dashboard",
  setSelectedRoute: (route) => set({ selectedRoute: route }),
}));

export default useRouteStore;
