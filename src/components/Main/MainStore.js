import create from "zustand";

const useMainStore = create((set) => ({
  reloadState: 0,
  toggleReload: () => set((state) => ({ reloadState: state.reloadState + 1 })),
  user: { _id: null },
  setUser: (data) => set({ user: data }),
  content: "",
  setContent: (value) => set({ content: value }),
}));

export default useMainStore;
