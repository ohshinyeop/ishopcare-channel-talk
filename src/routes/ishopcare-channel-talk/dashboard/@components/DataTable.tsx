import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowDownUp, CalendarIcon, MoveDown, MoveUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import DataChart from "./DataChart";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TableProps } from "@/routes/ishopcare-channel-talk/dashboard/@type/type";

interface DataTableProps {
  data: TableProps[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredData = useMemo(() => {
    // data에서 key값의 앞 4자리가 오늘 date.format(MMDD)와 같은지 확인
    const date = format(selectedDate ?? new Date(), "MMdd");

    // data의 각 행에서 tags를 가져와서
    // tags를 쉼표로 분리하였을때 regex = /^\d{4}([가-힣]{2})$/; 형태 이면서 startsWith(date)인 것들만 반환
    return data.filter((item) => {
      const tags = item.tags?.split(", ") || [];
      return tags.some((tag) => {
        const regex = /^\d{4}([가-힣]{2})$/;
        const match = tag.match(regex);
        if (match) {
          const word = match[0];
          if (word) {
            return word.startsWith(date);
          }
        }
        return false;
      });
    });
  }, [data, selectedDate]);

  // wordCountAllTable을 만들기 위해서
  // wordCountArray를 tanstack table로 변환

  const columnsGeneralTags = useMemo<
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
        size: 200,
      },
      {
        accessorKey: "count",
        header: "Count",
        cell: (info) => info.getValue(),
        size: 50,
      },
    ];
  }, []);

  const tableDataGeneralTags = useMemo(() => {
    const count: Record<string, number> = {};
    filteredData.forEach((item) => {
      const tags = item.tags?.split(", ") || [];
      tags.forEach((tag) => {
        // 모든 태그를 가져와서 카운트
        const tagList = tag.split(", ");
        tagList.forEach((tag) => {
          if (tag.match(/^\d{4}([가-힣]{2})$/)) {
            return;
          } else if (count[tag]) {
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
    // 위 리스트에서 오늘
  }, [filteredData]);

  const [sortingGeneral, setSortingGeneral] = React.useState<SortingState>([
    {
      id: "count",
      desc: true,
    },
  ]);
  const generalTagTable = useReactTable({
    data: tableDataGeneralTags,
    columns: columnsGeneralTags,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSortingGeneral,
    getSortedRowModel: getSortedRowModel(), //client-side sorting

    state: {
      sorting: sortingGeneral,
    },
  });

  // ========= wordCountPeople =========
  // ========= wordCountPeople =========
  // ========= wordCountPeople =========
  // ========= wordCountPeople =========
  // ========= wordCountPeople =========

  const tableDataPeople = useMemo(() => {
    const count: Record<string, number> = {};
    const date = format(selectedDate ?? new Date(), "MMdd");
    filteredData.forEach((item) => {
      const tags = item.tags?.split(", ") || [];
      tags.forEach((tag) => {
        const regex = /^\d{4}([가-힣]{2})$/;
        const match = tag.match(regex);
        if (match) {
          const word = match[0];
          if (word) {
            if (!word.startsWith(date)) {
              return;
            } else if (count[word]) {
              count[word]++;
            } else {
              count[word] = 1;
            }
          }
        }
      });
    });
    return Object.entries(count).map(([key, value]) => ({
      tag: key,
      count: value,
    }));
  }, [filteredData]);
  // wordCount를 배열로 변환

  const columnsPeople = useMemo<
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
        size: 200,
      },
      {
        accessorKey: "count",
        header: "Count",
        cell: (info) => info.getValue(),
        size: 50,
      },
    ];
  }, []);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "count",
      desc: true,
    },
  ]);
  const peopleTable = useReactTable({
    data: tableDataPeople,
    columns: columnsPeople,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    state: {
      sorting: sorting,
    },
  });

  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
          >
            <CalendarIcon />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
        </PopoverContent>
      </Popover>
      {tableDataGeneralTags.length > 0 ? (
        <div className="wf-full grid grid-cols-[max-content_1fr] gap-3">
          <div className="border border-gray-300 rounded-md overflow-y-hidden">
            <Table>
              <TableHeader>
                {generalTagTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className=" cursor-pointer"
                        key={header.id}
                        style={{ width: header.getSize() }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="border-r flex justify-between">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {!header.column.getIsSorted() && <ArrowDownUp className="w-4 h-4" />}

                          {header.column.getIsSorted() === "asc" && <MoveUp className="w-4 h-4" />}
                          {header.column.getIsSorted() === "desc" && <MoveDown className="w-4 h-4" />}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            </Table>
            <Table className="overflow-y-scroll flex h-[700px]">
              <TableBody>
                {generalTagTable.getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell, i) => (
                        <TableCell className="rounded-md" key={cell.id} style={{ width: cell.column.getSize() }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <Card>
            <DataChart title="일별 채널톡 태그수" data={tableDataGeneralTags}></DataChart>
          </Card>
          <div className="border border-gray-300 rounded-md overflow-y-hidden">
            <Table>
              <TableHeader>
                {peopleTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className="cursor-pointer"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: header.getSize() }}
                      >
                        <div className="border-r flex justify-between">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {!header.column.getIsSorted() && <ArrowDownUp className="w-4 h-4" />}
                          {header.column.getIsSorted() === "asc" && <MoveUp className="w-4 h-4" />}
                          {header.column.getIsSorted() === "desc" && <MoveDown className="w-4 h-4" />}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            </Table>
            <Table className="overflow-y-scroll flex h-[700px]">
              <TableBody>
                {peopleTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell style={{ width: cell.column.getSize() }} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <DataChart title="일별 채널톡 파트 응답수" data={tableDataPeople}></DataChart>
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
