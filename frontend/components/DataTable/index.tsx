import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Button, Icon, TableContainer } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";
import { FiEdit, FiTrash } from "react-icons/fi";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  editValue: (id: string) => void;
  removeValue: (id: string) => void;
};

export function DataTable<Data extends object>({
  data,
  columns,
  editValue,
  removeValue
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <TableContainer border={'1px'} borderRadius={'lg'} borderColor={'gray.200'} >
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
            {(!!editValue || !!removeValue) && (
              <Th>
                Ações
              </Th>
            )}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
              <Td>
          {!!editValue && (
            <Button
              onClick={() => 
                editValue(row.original?._id)
              }
              variant="ghost"
              p={0}
              px={2}
              colorScheme="blue"
            >
              <Icon as={FiEdit} boxSize={4} />
            </Button>
          )}
          {!!removeValue && (
            <Button
              onClick={() => removeValue(row.original?._id)}
              variant="ghost"
              p={0}
              px={2}
              colorScheme="red"
            >
              <Icon as={FiTrash} boxSize={4} />
            </Button>
          )}
        </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </TableContainer>
  );
}
