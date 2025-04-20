import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

interface DataChartProps {
  data: { tag: string; count: number }[];
  title?: string;
}

const DataChart: React.FC<DataChartProps> = ({ data, title }) => {
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
          text: title || "Data Chart",
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
            fontSize: 14,
            rotate: 35,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((item) => item.count),
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
