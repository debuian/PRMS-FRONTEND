import { create } from "zustand";

const useRouteStore = create((set) => ({
  selectedRoute: "CreateReport  ",
  setSelectedRoute: (route) => set({ selectedRoute: route }),
}));

export default useRouteStore;
