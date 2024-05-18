'use client'

import { CustomTable } from '@/components/CustomTable';
import { DataTable } from '@/components/DataTable';
import { DeleteEmployeeModal } from '@/components/Modals/DeleteEmployeeModal';
import { deleteEmployeeById, EmployeeResponse, getEmployees } from '@/lib/services/employee';
import { Button, Container, Flex, Spacer, Text, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import { searchTableFilter } from '@/utils/searchTableFilter';


const columnHelper = createColumnHelper<EmployeeResponse>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Nome"
  }),
  columnHelper.accessor("position", {
    cell: (info) => info.getValue(),
    header: "Cargo"
  }),
  columnHelper.accessor("department", {
    cell: (info) => info.getValue(),
    header: "Departamento"
  }),
];


export default function Home() {
  const { push } = useRouter();
  const [removeEmployeeId, setRemoveEmployeeId] = useState<
    string | null
  >(null);
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState<EmployeeResponse[]>([])

  const updatedEmployees = async () => {
    const response = await getEmployees()
    setData(response)
  }

  useEffect(() => {
    updatedEmployees()
  }, [])


  const editValue = (id: string) => {
    push(`/employee/${id}`)
  }

  const deleteValue = async () => {
    if (!removeEmployeeId) {
      return
    }

    try {
      await deleteEmployeeById(removeEmployeeId)
      setRemoveEmployeeId(null)
      updatedEmployees()
    } catch (error) {
      console.error(error)
    }
  }

  const filteredResult = searchTableFilter(data, searchValue, ["name", "department", "position"])

  const actualList = searchValue.length > 0 ? filteredResult : data

  return (
    <Container maxW='6xl' py={10}>
      <DeleteEmployeeModal isOpen={!!removeEmployeeId} onClose={() => setRemoveEmployeeId(null)} onConfirm={deleteValue} />
      <Flex wrap={'wrap'} justify={'space-between'} rowGap={2} columnGap={2} alignItems={'center'} mb={8}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          Funcionários
        </Text>
        <Flex justifyContent={"flex-end"} flex={{ md: 1 }} rowGap={2} columnGap={2} alignItems={'center'}>
          <Input maxW={"md"}
            name='source' placeholder='pesquise aqui' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          <Link href='/employee'>
            <Button size='md' colorScheme='blue'>Adicionar</Button>
          </Link>
        </Flex>
      </Flex>
      <DataTable
        columns={columns}
        data={actualList}
        editValue={(id) => editValue(id)}
        removeValue={(id) => setRemoveEmployeeId(id)}
      />
    </Container>
  );
}
