import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

interface DataChartProps {
  data: { tag: string; count: number }[];
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
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
          text: "일별 채널톡 파트 응답수",
          left: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#333",
          },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.tag),
          axisLabel: {
            interval: 0,
            fontSize: 11,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((item) => item.count).sort((a, b) => a - b),
            type: "bar",
            color: "#2e93ff",
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
              fontSize: 20,
            },
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        chartInstance.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default DataChart;
