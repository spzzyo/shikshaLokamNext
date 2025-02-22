"use client"; // Ensure this is at the top

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { columns, users } from "./data";
import { RenderCell } from "./render-cell";

export const TableWrapper = () => {
  const router = useRouter(); // Works in App Router

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => router.push(`/dashboard/students/${item.id}`)} // Correct routing
            >
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ user: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
