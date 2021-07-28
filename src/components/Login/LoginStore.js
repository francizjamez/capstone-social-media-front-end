import create from "zustand";

const useLoginStore = create((set) => ({
  isShowing: false,
  setShowing: (value) => set({ isShowing: value }),
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
  data: {},
  setData: (key, value) =>
    set((state) => {
      // data: {...state.data, }
      const newData = { ...state.data };
      newData[key] = value;
      return { data: newData };
    }),
}));

export default useLoginStore;
