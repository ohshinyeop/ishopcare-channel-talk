import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 로컬 스토리지에 저장할 데이터 타입을 정의

type ExStore = {
  count: number;
};

const localStorageStore = create(
  persist<ExStore>(
    (set) => ({
      count: 0,
      setCopiedValue: (value: number) => set({ count: value }),
    }),
    {
      name: "vality-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default localStorageStore;
