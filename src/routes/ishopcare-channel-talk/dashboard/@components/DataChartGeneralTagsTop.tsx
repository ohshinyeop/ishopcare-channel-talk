import { Table } from "@tanstack/react-table";
import DataChart from "./DataChart";

interface Props {
  generalTagTable: Table<{
    tag: string;
    count: number;
  }>;
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
}

export const DataChartGeneralTagsTop = ({ generalTagTable, selectedDate }: Props) => {
  return (
    <DataChart
      selectedDate={selectedDate}
      title="최다 문의 Top 5"
      type="pie"
      data={
        // generalTagTable 중에서 row.getIsSelected()인 것들만
        generalTagTable
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
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      }
    ></DataChart>
  );
};
