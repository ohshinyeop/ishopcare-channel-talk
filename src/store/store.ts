import { create } from "zustand";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";


// 일반 스토어를 생성

type ExStore = {
  count: number;
  currentTitle: string;
  setCopiedValue: (value: number) => void;
  setCurrentTitle: (title: string) => void;

  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;

  // const [excelData, setExcelData] = useState<TableProps[]>([]);
  excelData: TableProps[];
  setExcelData: (data: TableProps[]) => void;

  files: File[];
  setFiles: (files: File[]) => void;

  daysData: {
    tag: string;
    count: number;
  }[];
  setDaysData: (data: { tag: string; count: number }[]) => void;


};

const useStore = create<ExStore>((set) => ({
  count: 0,
  setCopiedValue: (value: number) => set({ count: value }),
  currentTitle: "Home",
  setCurrentTitle: (title: string) => set({ currentTitle: title }),

  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),

  excelData: [],
  setExcelData: (data: TableProps[]) => set({ excelData: data }),

  files: [],
  setFiles: (files: File[]) => set({ files: files }),

  daysData: [],
  setDaysData: (data: { tag: string; count: number }[]) => set({ daysData: data }),
}));

export default useStore;
