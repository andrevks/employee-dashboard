'use client'

import { CustomTable } from '@/components/CustomTable';
import { DeleteEmployeeModal } from '@/components/Modals/DeleteEmployeeModal';
import { Button, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const funcionarios = [
  {
    id: 1,
    nome: "Ana Silva",
    cargo: "Desenvolvedora Front-end",
    departamento: "Tecnologia"
  },
  {
    id: 2,
    nome: "Carlos Souza",
    cargo: "Gerente de Projetos",
    departamento: "Gestão"
  },
  {
    id: 3,
    nome: "Mariana Oliveira",
    cargo: "Analista de Dados",
    departamento: "Data Science"
  },
  {
    id: 4,
    nome: "Pedro Martins",
    cargo: "Designer Gráfico",
    departamento: "Marketing"
  },
  {
    id: 5,
    nome: "Fernanda Costa",
    cargo: "Engenheira de Software",
    departamento: "Tecnologia"
  },
  {
    id: 6,
    nome: "Lucas Lima",
    cargo: "Especialista em SEO",
    departamento: "Marketing"
  },
  {
    id: 7,
    nome: "Beatriz Mendes",
    cargo: "Coordenadora de RH",
    departamento: "Recursos Humanos"
  },
  {
    id: 8,
    nome: "Rafael Almeida",
    cargo: "Contador",
    departamento: "Financeiro"
  },
  {
    id: 9,
    nome: "Juliana Ferreira",
    cargo: "Assistente Administrativo",
    departamento: "Administrativo"
  },
  {
    id: 10,
    nome: "Gabriel Santos",
    cargo: "Desenvolvedor Back-end",
    departamento: "Tecnologia"
  }
];

export default function Home() {
  const { push } = useRouter();
  const [removeEmployeeId, setRemoveEmployeeId] = useState<
    number | null
  >(null);

  const convertedFuncionarios =
    funcionarios.map((funcionario) => {
      return {
        ['id']: funcionario.id,
        ['Nome']: funcionario.nome,
        ['Cargo']: funcionario.cargo,
        ['Departamento']: funcionario.departamento
      }
    })

  const editValue = (id: number) => {
    push(`/employee/${id}`)
  }

  const deleteValue = () => {
    setRemoveEmployeeId(null)
  }

  const openModal = (id: number) => {
    const findEmployee = funcionarios.findIndex((funcionario) => funcionario.id === id)
    if (!findEmployee && typeof findEmployee !== 'number') return

    setRemoveEmployeeId(id)
  }

  return (
    <Container maxW='6xl' py={10}>
      <DeleteEmployeeModal isOpen={!!removeEmployeeId} onClose={() => setRemoveEmployeeId(null)} onConfirm={deleteValue} />
      <Flex wrap={'wrap'} rowGap={2} columnGap={2} alignItems={'center'} mb={8}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          Funcionários
        </Text>
        <Spacer />
        <Link href='/employee'>
          <Button size='md' colorScheme='blue'>Adicionar</Button>
        </Link>
      </Flex>
      <CustomTable
        hiddenColumn='id'
        editValue={(id) => editValue(id)}
        removeValue={(id) => openModal(id)}
        array={convertedFuncionarios}
      />
    </Container>
  );
}
