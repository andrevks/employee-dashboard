"use client"

import { Icon } from "@chakra-ui/icons";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { FC } from "react";
import { FiEdit, FiTrash } from 'react-icons/fi';
import { CustomTableProps } from './types';


export const CustomTable: FC<CustomTableProps> = ({
  array,
  editValue,
  removeValue,
  hiddenColumn,
  canview,
  ...props
}) => {
  const formattedArray: any[] = hiddenColumn
    ? array.reduce((acc, item: object) => {
      const object = Object.entries(item).reduce((ccc, [key, value]) => {
        if (key === hiddenColumn) {
          return null;
        }

        ccc = { ...ccc, [key]: value };
        return ccc as any;
      }, {});

      acc.push(object);
      return acc;
    }, [] as any[])
    : array;

  const thsNames = Object.keys(formattedArray[0]);

  const ths = (
    <Tr>
      {thsNames.map((element, index) => (
        <Th py={4} key={`${element}-${index}`}>
          {element}
        </Th>
      ))}
      {(!!editValue || !!removeValue) && (
        <Th>
          Ações
        </Th>
      )}
    </Tr>
  );

  const rows = formattedArray.map((element, i) => {
    const tdNames: any[] = Object.values(element);
    return (
      <Tr key={i}>
        {tdNames.map((value, index) => (
          <Td key={`${value}${index}`}>{value}</Td>
        ))}
        <Td>
          {!!editValue && (
            <Button
              onClick={() => editValue(array[i][hiddenColumn ?? "id"])}
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
              onClick={() => removeValue(array[i][hiddenColumn ?? "id"])}
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
    );
  });

  return (
    <TableContainer border={'1px'} borderRadius={'lg'} borderColor={'gray.200'} {...props}>
      <Table size='sm' variant="striped" >
        <Thead>{ths}</Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
};
