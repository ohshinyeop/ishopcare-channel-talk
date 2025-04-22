import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
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

const DEFAULT_HEADERS = ["name", "tags", "url", "openedAt", "goalState"];
const DataSelector: React.FC<DataSelectorProps> = ({ excelHeaders, allHeaders, setExcelHeaders, data }) => {
  const [selectedData, setSelectedData] = React.useState<string[]>(DEFAULT_HEADERS);

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
      excelHeaders
        .sort((a, b) => DEFAULT_HEADERS.indexOf(a) - DEFAULT_HEADERS.indexOf(b))
        .map((header) => ({
          accessorKey: header,
          header: header,
          enableHiding: !DEFAULT_HEADERS.includes(header),
          cell: (info) => {
            // 서류문의, 급건!, 신규, 0331지은, 토스포스
            // 위 글자수보다 많으면 tooltip으로 보여주기
            if (header === "url") {
              return (
                <a
                  href={info.getValue() as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500 w-full flex gap-2 items-center"
                >
                  <span>Link</span>
                  <div>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              );
            }
            const cellValue = info.getValue() as string;
            const isLongText = cellValue?.length > 20;
            return <div>{cellValue}</div>;
            // isLongText ? (
            //   <TooltipProvider>
            //     <Tooltip>
            //       <TooltipTrigger asChild>
            //         <div className="w-40 cursor-context-menu">{cellValue.slice(0, 10) + "..."}</div>
            //       </TooltipTrigger>
            //       <TooltipContent>
            //         <div className="w-full">{cellValue}</div>
            //       </TooltipContent>
            //     </Tooltip>
            //   </TooltipProvider>
            // ) : (
            //   <div>{cellValue}</div>
            // );
          },
          size: header === "url" ? 100 : 600,
        })),
    [excelHeaders],
  );

  // Create the table instance
  const rawDataTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // virtualization
  // const tableContainerRef = useRef<HTMLDivElement>(null);

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
          <div className="border border-gray-300 rounded-md max-h-[500px] overflow-auto flex">
            {/* <div
              className="container h-[450px] overflow-auto"
              ref={tableContainerRef}
              style={{
                overflow: "auto", //our scrollable table container
                position: "relative", //needed for sticky header
                height: "800px", //should be a fixed height
              }}
            >
              <table style={{ display: "grid" }}> */}
            <Table>
              <TableHeader
              // style={{
              //   display: "grid",
              //   position: "sticky",
              //   top: 0,
              //   zIndex: 1,
              // }}
              >
                {rawDataTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="table-row"
                    // style={{ display: "flex", width: "100%" }}
                  >
                    {headerGroup.headers.map((header) =>
                      header.column.columnDef.enableHiding ? null : (
                        <TableHead
                          key={header.id}
                          // style={{
                          //   display: "flex",
                          //   width: header.getSize(),
                          // }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ),
                    )}
                  </TableRow>
                ))}
              </TableHeader>
              {/* <TableBody table={rawDataTable} tableContainerRef={tableContainerRef} /> */}
              <TableBody>
                {rawDataTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="table-row">
                    {row.getVisibleCells().map((cell) =>
                      cell.column.columnDef.enableHiding ? null : (
                        // <TableCell
                        //   key={cell.id}
                        //   style={{
                        //     display: "flex",
                        //     width: cell.column.getSize(),
                        //   }}
                        // >
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ),
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* </div> */}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-gray-500 text-sm">No data available</div>
        </div>
      )}
    </Card>
  );
};

// interface TableBodyProps {
//   table: ReactTable<TableProps>;
//   tableContainerRef: React.RefObject<HTMLDivElement | null>;
// }

// function TableBody({ table, tableContainerRef }: TableBodyProps) {
//   const { rows } = table.getRowModel();

//   // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
//   const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
//     count: rows.length,
//     estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
//     getScrollElement: () => tableContainerRef?.current,
//     //measure dynamic row height, except in firefox because it measures table border height incorrectly
//     measureElement:
//       typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
//         ? (element) => element?.getBoundingClientRect().height
//         : undefined,
//     overscan: 5,
//   });

//   return (
//     <tbody
//       style={{
//         display: "grid",
//         height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
//         position: "relative", //needed for absolute positioning of rows
//       }}
//     >
//       {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//         const row = rows[virtualRow.index] as Row<TableProps>;
//         return <TableBodyRow key={row.id} row={row} virtualRow={virtualRow} rowVirtualizer={rowVirtualizer} />;
//       })}
//     </tbody>
//   );
// }

// interface TableBodyRowProps {
//   row: Row<TableProps>;
//   virtualRow: VirtualItem;
//   rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
// }

// function TableBodyRow({ row, virtualRow, rowVirtualizer }: TableBodyRowProps) {
//   return (
//     <TableRow
//       data-index={virtualRow.index} //needed for dynamic row height measurement
//       ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
//       key={row.id}
//       style={{
//         display: "flex",
//         position: "absolute",
//         transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
//         width: "100%",
//       }}
//     >
//       {row.getVisibleCells().map((cell) => {
//         return cell.column.columnDef.enableHiding ? null : (
//           <TableCell
//             key={cell.id}
//             style={{
//               display: "flex",
//               width: cell.column.getSize(),
//             }}
//           >
//             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//           </TableCell>
//         );
//       })}
//     </TableRow>
//   );
// }

export default DataSelector;
