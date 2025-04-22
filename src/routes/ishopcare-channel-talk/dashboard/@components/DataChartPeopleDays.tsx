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
  return <DataChart selectedDate={selectedDate} title="채널톡 파트 응답수" data={daysData}></DataChart>;
};
