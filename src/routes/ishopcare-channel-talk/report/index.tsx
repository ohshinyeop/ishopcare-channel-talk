import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, formatDate, getUnixTime, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetDaysQuery } from "../dashboard/@hooks/useGetDaysQuery";
import { DataChartDaysSpreadSheets } from "./@components/DataChartDaysSpreadSheets";
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
    const values = data
      .slice(1)
      .map((row) => {
        const result: { [key: string]: any } = {};
        headers?.forEach((header, index) => {
          result[header] = row[index] ?? ""; // 헤더와 값을 매칭
        });
        return result;
      })
      .filter((item) => {
        const date = new Date(item.date);
        return date >= subDays(selectedDate.startDate, 1) && date <= addDays(selectedDate.endDate, 1);
      });

    return values;
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    // 2달전
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    endDate: new Date(),
  });

  const [filteredData, setFilteredData] = useState<[]>(
    sheetData?.filter((item: any) => {
      const date = new Date(item[0]);
      return date >= subDays(selectedDate.startDate, 1) && date <= addDays(selectedDate.endDate, 1);
    }),
  );

  useEffect(() => {
    setFilteredData(
      sheetData?.filter((item: any) => {
        const date = getUnixTime(new Date(item[0]));

        return date >= getUnixTime(subDays(selectedDate.startDate, 1)) && date <= getUnixTime(selectedDate.endDate);
      }),
    );
  }, [sheetData, selectedDate]);

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="w-full flex gap-2 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            >
              <CalendarIcon />
              {selectedDate.startDate ? (
                formatDate(selectedDate.startDate, "yyyy-MM-dd")
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50 bg-white border-2" align="start">
            <Calendar
              mode="single"
              selected={selectedDate.startDate}
              onSelect={(date) => {
                setSelectedDate((prev) => ({
                  ...prev,
                  startDate: date ?? new Date(),
                }));
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            >
              <CalendarIcon />
              {selectedDate.endDate ? formatDate(selectedDate.endDate, "yyyy-MM-dd") : <span>Pick a end end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50 bg-white border-2" align="start">
            <Calendar
              mode="single"
              selected={selectedDate.endDate}
              onSelect={(date) => {
                setSelectedDate((prev) => ({
                  ...prev,
                  endDate: date ?? new Date(),
                }));
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* 일별 채널톡 응답추이 */}
      <Card className="w-full h-full p-3">
        <DataChartDaysSpreadSheets sheetData={filteredData} selectedDate={selectedDate} />
      </Card>
      <Card className="w-full h-full p-3">
        <DataChartPeopleSpreadSheets sheetData={transformData(sheetData)} selectedDate={selectedDate} />
      </Card>
    </div>
  );
}
