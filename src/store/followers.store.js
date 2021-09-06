import create from "zustand";

const useFollowerStore = create((set) => ({
  showFollowers: false,
  setShowFollowers: (payload) => set({ showFollowers: payload }),
}));

export default useFollowerStore;
