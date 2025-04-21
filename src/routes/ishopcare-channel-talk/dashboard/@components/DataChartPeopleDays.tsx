import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
}

export const DataChartPeopleDays = ({ peopleTable, selectedDate }: Props) => {
  const [data, setData] = useState<
    {
      tag: string;
      count: number;
    }[]
  >([]);

  // peopleTable
  // .getRowModel()
  // .rows.filter((row) => row.getIsSelected()) 중에서 앞 4자리를 가져와서 각각 카운트한다
  // 앞 4자리는 0423과 같은 mmdd 형식이다 각각의 mmdd의 개수 를 센다

  useEffect(() => {
    const groupedData: { [key: string]: number } = {};
    peopleTable
      .getRowModel()
      .rows.filter((row) => row.getIsSelected())
      .forEach((row) => {
        const tag = row.getValue("tag") as string;
        const count = row.getValue("count") as number;
        const date = tag.substring(0, 4); // mmdd 형식으로 앞 4자리만 가져온다
        if (groupedData[date]) {
          groupedData[date] += count; // 이미 존재하는 날짜는 카운트를 더한다
        } else {
          groupedData[date] = count; // 새로운 날짜는 카운트를 추가한다
        }
      });

    setData(
      Object.entries(groupedData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tag, count]) => ({
          tag,
          count,
        }))
        .sort((a, b) => a.count - b.count), // count 기준으로 정렬
    );
  }, [peopleTable, peopleTable.getCoreRowModel().rows]);

  return <DataChart selectedDate={selectedDate} title="일별 채널톡 파트 응답수" data={data}></DataChart>;
};
