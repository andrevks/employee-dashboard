import { TableContainerProps } from '@chakra-ui/react';

export interface CustomTableProps extends TableContainerProps {
  array: any[];
  editValue: (id: number) => void;
  removeValue: (id: number) => void;
  hiddenColumn?: string;
  canview?: (id: number) => void;
}
