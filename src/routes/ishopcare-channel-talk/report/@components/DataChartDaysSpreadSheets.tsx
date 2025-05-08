import { formatDate } from "date-fns";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export const DataChartDaysSpreadSheets = ({
  sheetData,
  selectedDate,
}: {
  sheetData: [] | undefined;
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const barOption: echarts.EChartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          top: "20%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Count"],
          orient: "horizontal",
          bottom: "0%",
          textStyle: {
            fontSize: 12,
            color: "#333",
          },
        },
        title: {
          text: "일별 채널톡 응답수 추이",
          textStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          },
          subtext: `[${
            sheetData?.map((item) => {
              const date = new Date(item[0]);
              return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate(),
              ).padStart(2, "0")}`;
            })[0] ?? ""
          } ~ ${
            sheetData
              // ?.filter((_, index) => index !== 0)
              ?.map((item) => {
                const date = new Date(item[0]);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                  date.getDate(),
                ).padStart(2, "0")}`;
              })
              .at(-1) ?? ""
          }]`,
          subtextStyle: {
            fontSize: 16,
            color: "#333",
          },
          left: "center",
        },
        xAxis: {
          type: "category",
          data: sheetData?.map((item) => {
            return formatDate(new Date(item[0]), "yyyy-MM-dd");
          }),
          // .map((item) => {
          //   const date = new Date(item[0]);
          //   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
          //     date.getDate(),
          //   ).padStart(2, "0")}`;
          // }),
          axisLabel: {
            interval: 0,
            fontSize: 14,
            rotate: 35,
            margin: 20,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: sheetData?.map((item) => item[1]),
            type: "line",
            color: ["#3182F6"],
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
              fontSize: 20,
            },
          },
        ],
      };
      chartInstance.setOption(barOption);
    }
  }, [sheetData]);

  return <div className="w-full" ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};
