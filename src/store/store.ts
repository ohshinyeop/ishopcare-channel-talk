import { create } from "zustand";

// 일반 스토어를 생성

type ExStore = {
  count: number;
  currentTitle: string;
  setCopiedValue: (value: number) => void;
  setCurrentTitle: (title: string) => void;
};

const useStore = create<ExStore>((set) => ({
  count: 0,
  setCopiedValue: (value: number) => set({ count: value }),
  currentTitle: "Home",
  setCurrentTitle: (title: string) => set({ currentTitle: title }),
}));

export default useStore;
