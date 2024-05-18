import { TableContainerProps } from '@chakra-ui/react';

export interface CustomTableProps extends TableContainerProps {
  array: any[];
  editValue: (id: string) => void;
  removeValue: (id: string) => void;
  hiddenColumn?: string;
}
