import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownUp, MoveDown, MoveUp } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import DataChart from "./DataChart";

import { Card } from "@/components/ui/card";
import { TableProps } from "@/routes/dashboard/@type/type";

interface DataTableProps {
  data: TableProps[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // data에서 column id가 tags인것들만 가져와서
  // MMDD슬기 의형태를 띄는 것들만 필터링
  // '슬기'는 한글 2글자로 필터링, 즉 월일글자글자
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const tags = item.tags?.split(",") || [];
      return tags.some((tag) => {
        const regex = /^\d{4}([가-힣]{2})$/;
        const match = tag.match(regex);
        return match;
      });
    });
  }, [data]);

  // wordCountAllTable을 만들기 위해서
  // wordCountArray를 tanstack table로 변환

  const columnsWordCountAll = useMemo<
    ColumnDef<{
      tag: string;
      count: number;
    }>[]
  >(() => {
    return [
      {
        accessorKey: "tag",
        header: "tag",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "count",
        header: "Count",
        cell: (info) => info.getValue(),
      },
    ];
  }, []);

  const wordCountAllTableData = useMemo(() => {
    const count: Record<string, number> = {};
    filteredData.forEach((item) => {
      const tags = item.tags?.split(",") || [];
      tags.forEach((tag) => {
        // 모든 태그를 가져와서 카운트
        const tagList = tag.split(",");
        tagList.forEach((tag) => {
          if (count[tag]) {
            count[tag]++;
          } else {
            count[tag] = 1;
          }
        });
      });
    });
    return Object.entries(count).map(([key, value]) => ({
      tag: key,
      count: value,
    }));
  }, [filteredData]);

  const [, setSortingAll] = React.useState<SortingState>([]);
  const wordCountAllTable = useReactTable({
    data: wordCountAllTableData,
    columns: columnsWordCountAll,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSortingAll,
    getSortedRowModel: getSortedRowModel(), //client-side sorting

    initialState: {
      sorting: [
        {
          id: "count",
          desc: true,
        },
      ],
    },
  });

  // data에서 column id가 tags인것들만 가져와서
  // 각 값들을 모두 쉼표로 분리하여 유니크 한 값들만 가져오기
  // 그리고 그 유니크한 값들이 몇번씩 등장했는지 카운트한다
  // {key:count} 형태로 변환
  const wordCountPeople = useMemo(() => {
    const count: Record<string, number> = {};
    filteredData.forEach((item) => {
      const tags = item.tags?.split(",") || [];
      tags.forEach((tag) => {
        const regex = /^\d{4}([가-힣]{2})$/;
        const match = tag.match(regex);
        if (match) {
          const word = match[0];
          if (word) {
            if (count[word]) {
              count[word]++;
            } else {
              count[word] = 1;
            }
          }
        }
      });
    });
    return count;
  }, [filteredData]);
  // wordCount를 배열로 변환
  const [wordCountArray, setWordCountArray] = React.useState<{ tag: string; count: number }[]>([]);

  useEffect(() => {
    const array = Object.entries(wordCountPeople).map(([key, value]) => ({
      tag: key,
      count: value,
    }));
    setWordCountArray(array);
  }, [wordCountPeople]);

  // wordCountArray를 tanstack table로 변환

  const columnsWordCount = useMemo<
    ColumnDef<{
      tag: string;
      count: number;
    }>[]
  >(() => {
    return [
      {
        accessorKey: "tag",
        header: "Tag",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "count",
        header: "Count",
        cell: (info) => info.getValue(),
      },
    ];
  }, []);
  const [, setSorting] = React.useState<SortingState>([]);
  const wordCountTable = useReactTable({
    data: wordCountArray,
    columns: columnsWordCount,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), //client-side sorting

    initialState: {
      sorting: [
        {
          id: "count",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-3">
      {wordCountArray.length > 0 ? (
        <div className="wf-full grid grid-cols-[max-content_max-content_1fr] grid-rows-1 gap-3 border-b border-gray-500">
          <Table>
            <TableHeader>
              {wordCountAllTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="border-r cursor-pointer"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="border-r flex justify-between">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {!header.column.getIsSorted() && <ArrowDownUp className="w-4 h-4" />}

                        {header.column.getIsSorted() === "asc" && <MoveUp className="w-4 h-4" />}
                        {header.column.getIsSorted() === "desc" && <MoveDown className="w-4 h-4" />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {wordCountAllTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              {wordCountTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="border-r cursor-pointer"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="border-r flex justify-between">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {!header.column.getIsSorted() && <ArrowDownUp className="w-4 h-4" />}
                        {header.column.getIsSorted() === "asc" && <MoveUp className="w-4 h-4" />}
                        {header.column.getIsSorted() === "desc" && <MoveDown className="w-4 h-4" />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {wordCountTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Card>
            <DataChart data={wordCountArray}></DataChart>
          </Card>
        </div>
      ) : (
        <Card className="w-full h-full flex justify-center items-center">
          <div className="text-gray-500 text-sm">No data available</div>
        </Card>
      )}
    </div>
  );
};

export default DataTable;
