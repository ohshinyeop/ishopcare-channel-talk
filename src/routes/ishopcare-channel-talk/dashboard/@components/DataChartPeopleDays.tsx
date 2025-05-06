import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePostDaysQuery } from "../@hooks/usePostDaysQuery";
import DataChart from "./DataChart";

interface Props {
  daysData: {
    tag: string;
    count: number;
  }[];
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
}

export const DataChartPeopleDays = ({ daysData, selectedDate }: Props) => {
  const setLoading = useStore((state) => state.setLoading);

  const [inputData, setInputData] = useState<{
    tag: string;
    count: number;
  }>(daysData[daysData.length - 1] ?? { tag: "", count: 0 });

  useEffect(() => {
    setInputData({
      tag: daysData[daysData.length - 1]?.tag ?? "",
      count: daysData[daysData.length - 1]?.count ?? 0,
    });
  }, [daysData]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id === "tag")
      setInputData((prev) => ({
        ...prev,
        tag: e.target.value,
      }));
    else if (id === "count")
      setInputData((prev) => ({
        ...prev,
        count: parseInt(e.target.value) ?? 0,
      }));
  };

  // save
  const { mutateAsync } = usePostDaysQuery();

  const handleClickSaveDays = () => {
    setLoading(true);
    const dataOfToday = inputData;

    const currentYear = new Date().getFullYear();

    if (!dataOfToday) return;
    // MMDD 분리
    const month = parseInt(dataOfToday.tag.slice(0, 2), 10) - 1; // JS는 0부터 시작 (0=1월)
    const day = parseInt(dataOfToday?.tag?.slice(2), 10);

    // Date 객체 생성
    const date = new Date(currentYear, month, day);

    mutateAsync({
      date: date,
      responseCount: dataOfToday?.count,
    }).then((res) => {
      if (res.status === 200) {
        toast("저장되었습니다.");
        // refetch();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        toast("저장에 실패했습니다.");
      }
    });
  };

  return (
    <div className="flex w-full gap-3 ">
      <DataChart selectedDate={selectedDate} title="채널톡 파트 응답수" data={daysData}></DataChart>
      <div className="flex justify-between flex-col items-center p-3 gap-3">
        <div className="w-full gap-3 grid grid-rows-2 ">
          <div className="w-full grid gap-2 grid-cols-[40px_1fr]">
            <Label>
              <span className="text-md text-nowrap">날짜</span>
            </Label>
            <Input id="tag" onChange={onChange} value={inputData.tag} type="number" placeholder="날짜"></Input>
          </div>
          <div className="w-full grid gap-2 grid-cols-[40px_1fr]">
            <Label>
              <span className="text-md text-nowrap">카운트</span>
            </Label>
            <Input onChange={onChange} id="count" value={inputData.count} type="number" placeholder="카운트"></Input>
          </div>
        </div>
        <Button onClick={handleClickSaveDays} className="w-full">
          일별 데이터 저장
        </Button>
      </div>
    </div>
  );
};
