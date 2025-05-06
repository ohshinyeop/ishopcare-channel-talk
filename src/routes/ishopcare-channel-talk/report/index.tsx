import { Card } from "@/components/ui/card";
import useStore from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { DailyCountReport } from "../dashboard/@components/DailyCountReport";
import { useGetDaysQuery } from "../dashboard/@hooks/useGetDaysQuery";
import { DataChartPeopleSpreadSheets } from "./@components/DataChartPeopleSpreadSheets";

export const Route = createFileRoute("/ishopcare-channel-talk/report/")({
  component: RouteComponent,
});

function RouteComponent() {
  const daysData = useStore((state) => state.daysData);
  const { data: sheetData, refetch } = useGetDaysQuery();

  function transformData(data: any[][]) {
    if (data?.length < 2 || !data) return []; // 데이터가 부족하면 빈 배열 반환

    const headers = data[0]; // 첫 번째 배열은 헤더
    const values = data.slice(1); // 나머지는 값들

    return values.map((row) => {
      const result: { [key: string]: any } = {};
      headers?.forEach((header, index) => {
        result[header] = row[index] ?? ""; // 헤더와 값을 매칭
      });
      return result;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 일별 채널톡 응답추이 */}
      <DailyCountReport daysData={daysData} />
      <Card className="w-full h-full p-3">
        <DataChartPeopleSpreadSheets sheetData={transformData(sheetData)} />
      </Card>
    </div>
  );
}
