import LoadingPage from "@/components/commons/LoadingPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataSelector from "@/routes/ishopcare-channel-talk/dashboard/@components/DataSelector";
import DataTable from "@/routes/ishopcare-channel-talk/dashboard/@components/DataTable";
import ExcelUploader from "@/routes/ishopcare-channel-talk/dashboard/@components/ExcelUploader";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";
import useStore from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/ishopcare-channel-talk/dashboard/")({
  component: RouteComponent,
});

const MY_PASSWORD = "20211120**!!";

function RouteComponent() {
  const [excelData, setExcelData] = useState<TableProps[]>([]);
  const allHeaders = excelData[0] ? Object.keys(excelData[0]) : [];
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    if (excelData.length > 0) {
      setExcelHeaders(excelData[0] ? Object.keys(excelData[0]) : []);
    }
  }, [excelData]);

  const [auth, setAuth] = useState(false);

  const [inputPassword, setInputPassword] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const password = event.currentTarget.value;
      if (password === MY_PASSWORD) {
        setAuth(true);
      } else {
        setAuth(false);
        toast("Password incorrect", {
          icon: "❌",
        });
      }
    }
  };
  const handleClickSubmit = () => {
    if (inputPassword === MY_PASSWORD) {
      setAuth(true);
    } else {
      setAuth(false);
      toast("Password incorrect", {
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    setInputPassword("");
    setExcelData([]);
    return () => {
      setInputPassword("");
      setExcelData([]);
    };
  }, []);

  return auth ? (
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
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="mb-4 text-lg font-semibold">Enter Password</p>
      <Input
        type="password"
        onKeyDown={handleKeyDown}
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-fit"
        placeholder="Password"
      />
      <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleClickSubmit}>
        Submit
      </Button>
    </div>
  );
}
