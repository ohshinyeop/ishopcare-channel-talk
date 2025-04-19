import { Button } from "@/components/ui/button";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { TableProps } from "@/routes/dashboard/@type/type";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FileUp } from "lucide-react";
import React from "react";
import * as XLSX from "xlsx";

interface Props {
  excelData: TableProps[];
  setExcelData: React.Dispatch<React.SetStateAction<TableProps[]>>;
}

const ExcelUploader = ({ excelData, setExcelData }: Props) => {
  const [files] = React.useState<File[]>([]);
  const handleFileUpload = (file: File[] | null) => {
    console.log("file", file);
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
        if (!sheet) {
          return;
        }
        const jsonData: TableProps[] = XLSX.utils.sheet_to_json(sheet);
        console.log("jsonData", jsonData);
        setExcelData(jsonData);
      }
    };
    if (!file[0]) return;
    reader.readAsBinaryString(file[0]);
  };

  const dropZoneConfig = {
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx", ".xls"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
    multiple: false,
  };

  return (
    <div>
      <div className="flex items-center gap-2 ">
        <FileUploader
          value={files}
          onValueChange={handleFileUpload}
          dropzoneOptions={dropZoneConfig}
          className="relative h-16"
        >
          <FileInput className="h-full">
            <Button className="w-full h-full" variant={"outline"}>
              <div className="wf-full flex items-center justify-center h-full">
                <FileUp className="w-4 h-4 mr-2" />
                <Label className="w-full flex items-center justify-center h-full gap-1">
                  Click to upload a <div className="text-blue-500"> file </div> or drag and drop here
                </Label>
              </div>
            </Button>
          </FileInput>
        </FileUploader>
      </div>
    </div>
  );
};

export default ExcelUploader;
