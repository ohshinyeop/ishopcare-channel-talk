import { create } from "zustand";

// 일반 스토어를 생성

type ExStore = {
  count: number;
  currentTitle: string;
  setCopiedValue: (value: number) => void;
  setCurrentTitle: (title: string) => void;

  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

const useStore = create<ExStore>((set) => ({
  count: 0,
  setCopiedValue: (value: number) => set({ count: value }),
  currentTitle: "Home",
  setCurrentTitle: (title: string) => set({ currentTitle: title }),

  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));

export default useStore;
