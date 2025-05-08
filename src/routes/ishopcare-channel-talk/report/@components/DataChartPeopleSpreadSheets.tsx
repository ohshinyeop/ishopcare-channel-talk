import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export const DataChartPeopleSpreadSheets = ({
  sheetData,
  selectedDate,
}: {
  sheetData: { [key: string]: any }[];
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current && sheetData) {
      const chartInstance = echarts.init(chartRef.current);

      // x축 데이터 (date)
      const xAxisData = sheetData.map((item) => {
        const date = new Date(item.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(
          2,
          "0",
        )}`;
      });

      // y축 데이터 (각 이름별 값)
      const seriesData = Object.keys(sheetData[0] || {})
        .filter((key) => key !== "date" && key !== "responseCount") // date와 responseCount 제외
        .map((name) => ({
          name,
          type: "line",
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            fontSize: 20,
          },
          data: sheetData.map((item) => (item[name] !== "" ? item[name] : 0)), // 빈 값은 0으로 처리
        }));

      const lineOption: echarts.EChartsOption = {
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
          data: seriesData.map((series) => series.name),
          bottom: "0%",
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            interval: 0,
            fontSize: 14,
            rotate: 35,
            margin: 20,
          },
        },
        title: {
          text: "일별 채널톡 파트원별 응답수 추이",
          textStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          },
          subtext: `[${
            // date ~ date
            sheetData
              .filter((_, index) => index !== 0)
              .map((item) => {
                const date = new Date(item.date);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                  date.getDate(),
                ).padStart(2, "0")}`;
              })[0] ?? ""
          } ~ ${
            sheetData
              .filter((_, index) => index !== 0)
              .map((item) => {
                const date = new Date(item.date);
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
        yAxis: {
          type: "value",
        },
        series: seriesData as echarts.SeriesOption[],
      };

      chartInstance.setOption(lineOption);
    }
  }, [sheetData]);

  return <div className="w-full" ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};
