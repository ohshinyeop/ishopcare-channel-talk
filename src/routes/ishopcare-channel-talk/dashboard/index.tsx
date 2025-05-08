import LoadingPage from "@/components/commons/LoadingPage";
import DataSelector from "@/routes/ishopcare-channel-talk/dashboard/@components/DataSelector";
import DataTable from "@/routes/ishopcare-channel-talk/dashboard/@components/DataTable";
import ExcelUploader from "@/routes/ishopcare-channel-talk/dashboard/@components/ExcelUploader";
import useStore from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ishopcare-channel-talk/dashboard/")({
  component: RouteComponent,
});

export const MY_PASSWORD = "20211120**!!";

function RouteComponent() {
  // const [excelData, setExcelData] = useState<TableProps[]>([]);
  const excelData = useStore((state) => state.excelData);
  const setExcelData = useStore((state) => state.setExcelData);

  const allHeaders = excelData.reduce((acc, curr) => {
    const keys = Object.keys(curr);
    if (keys.length > acc.length) {
      return keys;
    }
    return acc;
  }, [] as string[]);
  // excelData[0] ? Object.keys(excelData[0]) : [];
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    if (excelData.length > 0) {
      setExcelHeaders(
        excelData.reduce((acc, curr) => {
          const keys = Object.keys(curr);
          if (keys.length > acc.length) {
            return keys;
          }
          return acc;
        }, [] as string[]),
      );
    }
  }, [excelData]);

  return (
    <div className="bg-white text-gray-600 gap-3 p-3 w-full grid grid-rows-[max-content_max-content_1fr] grid-cols-1 h-full">
      {isLoading && (
        <div className="z-[5] absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <LoadingPage />
        </div>
      )}
      <>
        <ExcelUploader setExcelData={setExcelData} />
        <DataSelector
          data={excelData}
          excelHeaders={excelHeaders}
          allHeaders={allHeaders}
          setExcelHeaders={setExcelHeaders}
        />
        <DataTable data={excelData} />
      </>
    </div>
  );
}
