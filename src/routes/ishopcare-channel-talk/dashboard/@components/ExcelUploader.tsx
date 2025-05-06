import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileInput, FileUploader, FileUploaderContent } from "@/components/ui/file-upload";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";
import useStore from "@/store/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FileUp } from "lucide-react";
import * as XLSX from "xlsx";

interface Props {
  setExcelData: (data: TableProps[]) => void;
}

const ExcelUploader = ({ setExcelData }: Props) => {
  const setLoading = useStore((state) => state.setLoading);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);

  const handleFileUpload = async (file: File[] | null) => {
    setLoading(true);
    if (!file) return;
    setFiles(file);

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
        setExcelData(jsonData);
      }
    };
    if (!file[0]) return;
    reader.readAsBinaryString(file[0]);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
      <Card className="flex items-center gap-2 p-0">
        <FileUploader
          value={files}
          onValueChange={handleFileUpload}
          dropzoneOptions={dropZoneConfig}
          className="relative h-full"
        >
          <FileInput className="h-full p-3">
            <Button className="w-full h-full border-0" variant={"outline"}>
              <div className="wf-full flex items-center justify-center h-full">
                <FileUp className="w-4 h-4 mr-2" />
                <Label className="w-full flex items-center justify-center h-full gap-1">
                  Click to upload a <div className="text-blue-500"> file </div> or drag and drop here
                </Label>
              </div>
            </Button>
          </FileInput>
          {files.length > 0 && (
            <FileUploaderContent className="flex items-center h-full">
              <div className="p-3 flex w-full h-full gap-3 justify-center items-center">
                <div className="w-fit">
                  <div className="text-sm text-gray-500">{files[0]?.name}</div>
                </div>
                <Button
                  onClick={() => {
                    setFiles([]);
                    setExcelData([]);
                  }}
                  variant={"outline"}
                  className="h-3 w-3 py-3"
                >
                  X
                </Button>
              </div>
            </FileUploaderContent>
          )}
        </FileUploader>
      </Card>
    </div>
  );
};

export default ExcelUploader;
