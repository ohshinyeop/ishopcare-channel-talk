import { Table } from "@tanstack/react-table";
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

export const DataChartPeople = ({ peopleTable, selectedDate }: Props) => {
  return (
    <DataChart
      selectedDate={selectedDate}
      title="개인별 채널톡 응답수"
      type="line"
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
    ></DataChart>
  );
};
