import LoadingPage from "@/components/commons/LoadingPage";
import DataSelector from "@/routes/ishopcare-channel-talk/dashboard/@components/DataSelector";
import DataTable from "@/routes/ishopcare-channel-talk/dashboard/@components/DataTable";
import ExcelUploader from "@/routes/ishopcare-channel-talk/dashboard/@components/ExcelUploader";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";
import useStore from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ishopcare-channel-talk/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [excelData, setExcelData] = useState<TableProps[]>([]);

  const allHeaders = excelData[0] ? Object.keys(excelData[0]) : [];

  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  useEffect(() => {
    if (excelData.length > 0) {
      setExcelHeaders(excelData[0] ? Object.keys(excelData[0]) : []);
    }
  }, [excelData]);
  const isLoading = useStore((state) => state.isLoading);

  return (
    <div className="bg-white text-gray-600 gap-3 p-3 w-full grid grid-rows-[max-content_max-content_1fr] grid-cols-1 h-full">
      {isLoading && (
        <div className="z-[5] absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <LoadingPage />
        </div>
      )}
      <ExcelUploader setExcelData={setExcelData} excelData={excelData} />
      <DataSelector
        data={excelData}
        excelHeaders={excelHeaders}
        allHeaders={allHeaders}
        setExcelHeaders={setExcelHeaders}
      />
      <DataTable data={excelData} />
      {/* <DataChart data={excelData} /> */}
    </div>
  );
}
