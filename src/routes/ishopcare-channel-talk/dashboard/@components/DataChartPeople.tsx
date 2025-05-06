import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStore from "@/store/store";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { usePostPoepleQuery } from "../@hooks/usePostPoepleQuery";
import DataChart from "./DataChart";

interface Props {
  peopleTable: Table<{
    tag: string;
    count: number;
  }>;
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
  teams: string[];
}

export const DataChartPeople = ({ peopleTable, selectedDate, teams }: Props) => {
  const setLoading = useStore((state) => state.setLoading);

  // peopleTable.getCoreRowModel().rows.map((row) => row.original.tag)의 앞 4자리를 중복제거 하여 가져온다음,
  // 가져오면 0326슬기 , 0325슬기, 0326선민 등의 형태일텐데,
  // 0326슬기 , 0325슬기 , 0326선민 등에서 0326을 가져온다.
  // 그러고 나서 0326, 0325, ... 중에서 가장 큰 값만 남긴다.
  // 그리고 그 큰값이 포함된 행을 peopleTable.getCoreRowModel().rows 에서 필터링해온다
  // 앞 4자리를 추출하고 중복 제거
  const uniqueTags = Array.from(
    new Set(
      peopleTable.getCoreRowModel().rows.map((row) => row.original.tag.substring(0, 4)), // 앞 4자리 추출
    ),
  );

  // 가장 큰 값 찾기
  const maxTag = uniqueTags.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];

  // 가장 큰 값이 포함된 행 필터링
  const filteredRows = peopleTable.getCoreRowModel().rows.filter((row) => row.original.tag.startsWith(maxTag ?? ""));

  const { mutateAsync } = usePostPoepleQuery();

  const [inputValues, setInputValues] = useState<{ [key: string]: number }>(
    filteredRows.reduce(
      (acc, row) => {
        acc[row.original.tag] = row.original.count ?? 0;
        return acc;
      },
      {} as { [key: string]: number },
    ),
  );

  const handleClickSave = async () => {
    setLoading(true);
    // const dataOfToday = filteredRows.map((row) => {
    //   const tag = row.original.tag;
    //   const count = row.original.count;
    //   return {
    //     tag,
    //     count: inputValues[tag] ?? count,
    //   };
    // });

    const dataOfToday = Object.keys(inputValues).map((key) => ({
      tag: key,
      count: inputValues[key] ?? 0, // Ensure count is a number
    }));

    if (dataOfToday) {
      mutateAsync(dataOfToday)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex w-full gap-3">
      <DataChart
        selectedDate={selectedDate}
        title="개인별 채널톡 응답수"
        type="bar"
        data={
          // peopleTable 중에서 row.getIsSelected()인 것들만
          peopleTable
            .getRowModel()
            .rows.filter((row) => row.getIsSelected())
            .map((row) => {
              const tag = row.getValue("tag");
              const count = row.getValue("count");
              return {
                tag: tag as string,
                count: count as number,
              };
            })
            .sort((a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true }))
        }
      />
      <div className="flex justify-between flex-col items-center p-3 gap-3">
        {teams.map((team) => (
          // input
          <div key={team} className="flex gap-2 w-full text-nowrap">
            <Label htmlFor={team}>
              {filteredRows.filter((row) => row.original.tag.includes(team))[0]?.original.tag ??
                `${filteredRows[0]?.original.tag.slice(0, 4)}${team}`}
            </Label>
            <Input
              id={team}
              type="number"
              value={
                inputValues[
                  filteredRows.filter((row) => row.original.tag.includes(team))[0]?.original.tag ??
                    `${filteredRows[0]?.original.tag.slice(0, 4)}${team}`
                ] ?? 0
              }
              onChange={(e) => {
                const value = Number(e.target.value);
                setInputValues((prev) => ({
                  ...prev,
                  [filteredRows.filter((row) => row.original.tag.includes(team))[0]?.original.tag ??
                  `${filteredRows[0]?.original.tag.slice(0, 4)}${team}`]: value,
                }));
              }}
              defaultValue={filteredRows
                .filter((row) => row.original.tag.includes(team))
                .map((row) => row.original.count)
                .join(", ")}
            />
          </div>
        ))}
        <Button onClick={handleClickSave} className="w-full">
          일별 데이터 저장
        </Button>
      </div>
    </div>
  );
};
