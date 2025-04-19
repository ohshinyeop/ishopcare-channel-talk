import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableProps } from "@/routes/dashboard/@type/type";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";

interface DataSelectorProps {
  allHeaders: string[];
  excelHeaders: string[];
  data: TableProps[];
  setExcelHeaders: React.Dispatch<React.SetStateAction<string[]>>;
}

// operationWaitingTime?: string;
//   operationAvgReplyTime?: string;
//   operationTotalReplyTime?: string;
//   operationReplyCount?: string;

const DataSelector: React.FC<DataSelectorProps> = ({ excelHeaders, allHeaders, setExcelHeaders, data }) => {
  const [selectedData, setSelectedData] = React.useState<string[]>(allHeaders);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedData((prevSelectedData) => {
      if (isChecked) {
        // Add the selected value
        const updatedData = [...prevSelectedData, value];
        setExcelHeaders(updatedData);
        return updatedData;
      } else {
        // Remove the unselected value
        const updatedData = prevSelectedData.filter((item) => item !== value);
        setExcelHeaders(updatedData);
        return updatedData;
      }
    });
  };
  const columns = useMemo<ColumnDef<TableProps>[]>(
    () =>
      excelHeaders?.map((header) => ({
        accessorKey: header,
        header: header,
        cell: (info) => info.getValue(),
      })),
    [excelHeaders],
  );

  // Create the table instance
  const rawDataTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="wf-full h-full overflow-hidden flex flex-col gap-3 p-3">
      {rawDataTable.getCoreRowModel().rows.length > 0 ? (
        <>
          <Button
            className="w-fit"
            // // 모두 선택, 모두 해제
            onClick={() => {
              if (selectedData.length === allHeaders.length) {
                setSelectedData([]);
                setExcelHeaders([]);
              } else {
                setSelectedData(allHeaders);
                setExcelHeaders(allHeaders);
              }
            }}
          >
            {selectedData.length === allHeaders.length ? "Deselect All" : "Select All"}
          </Button>
          <div className="grid grid-rows-1 gap-3 grid-cols-5">
            {allHeaders.map((category, index) => (
              <div key={index} className="w-fit">
                <label className="flex items-center gap-2">
                  {/* <input
                    type="checkbox"
                    value={category}
                    checked={selectedData.includes(category)}
                    onChange={handleCheckboxChange}
                  />
                  {category} */}
                  <Checkbox
                    id={category}
                    value={category}
                    checked={selectedData.includes(category)}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange({
                        target: {
                          value: category,
                          checked: checked,
                        },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    className="peer"
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-gray-300"></div>

          <div className="max-h-[500px] overflow-auto flex">
            <Table>
              <TableHeader>
                {rawDataTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead className="border-r" key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rawDataTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="border-r" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-gray-500 text-sm">No data available</div>
        </div>
      )}
    </Card>
  );
};

export default DataSelector;
