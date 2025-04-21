import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

interface DataChartProps {
  data: { tag: string; count: number }[];
  title?: string;
  selectedDate: {
    startDate: Date;
    endDate: Date;
  };
  type?: "bar" | "line" | "pie";
}

const DataChart: React.FC<DataChartProps> = ({ data, title, selectedDate, type = "bar" }) => {
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
          text: `${title} : ${data.reduce((acc, item) => acc + item.count, 0).toString()}`,
          textStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          },
          subtext: `[${selectedDate?.startDate.toLocaleDateString()} ~ ${selectedDate?.endDate.toLocaleDateString()}]`,
          subtextStyle: {
            fontSize: 16,
            color: "#333",
          },
          left: "center",
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.tag),
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
            data: data.map((item) => item.count),
            type: type,
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

      const pieOption: echarts.EChartsOption = {
        title: {
          text: title,
          left: "center",
          textStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          },
          subtext: `[${selectedDate?.startDate.toLocaleDateString()} ~ ${selectedDate?.endDate.toLocaleDateString()}]`,
          subtextStyle: {
            fontSize: 16,
            color: "#333",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        grid: {
          left: "10%",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: data.map((item) => ({ name: item.tag, value: item.count })),
            label: {
              formatter: "{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      if (type === "bar") {
        chartInstance.setOption(barOption);
      }
      if (type === "pie") {
        chartInstance.setOption(pieOption);
      }
      if (type === "line") {
        chartInstance.setOption(barOption);
      }

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
