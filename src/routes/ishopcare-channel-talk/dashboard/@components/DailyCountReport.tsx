import LoadingPage from "@/components/commons/LoadingPage";
import { Card } from "@/components/ui/card";
import useStore from "@/store/store";
import { DataChartDaysSpreadSheets } from "../../report/@components/DataChartDaysSpreadSheets";
import { useGetDaysQuery } from "../@hooks/useGetDaysQuery";

interface Props {
  daysData: {
    tag: string;
    count: number;
  }[];
}

export const DailyCountReport = ({ daysData }: Props) => {
  const { data: sheetData, refetch } = useGetDaysQuery();

  const isLoading = useStore((state) => state.isLoading);

  return (
    <>
      <Card className="w-full h-full p-3">
        {isLoading && (
          <div className="h-[300px]">
            <LoadingPage />
          </div>
        )}
        {!isLoading && <DataChartDaysSpreadSheets sheetData={sheetData} />}
      </Card>
    </>
  );
};
