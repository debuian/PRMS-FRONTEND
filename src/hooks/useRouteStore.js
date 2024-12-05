import { create } from "zustand";

const useRouteStore = create((set) => ({
  selectedRoute: "Dashboard",
  routeData: null,
  setSelectedRoute: (route, data = null) =>
    set({ selectedRoute: route, routeData: data }),
}));

export default useRouteStore;
