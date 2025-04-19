import DataSelector from "@/routes/dashboard/@components/DataSelector";
import DataTable from "@/routes/dashboard/@components/DataTable";
import ExcelUploader from "@/routes/dashboard/@components/ExcelUploader";
import { TableProps } from "@/routes/dashboard/@type/type";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/")({
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

  return (
    <div className="bg-white text-gray-600 gap-3 p-3 w-full grid grid-rows-[max-content_max-content_1fr] grid-cols-1 h-full">
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
