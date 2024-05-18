'use client'

import { EmployeeForm } from '@/components/Forms/EmployeeForm';
import { EmployeeFormData } from '@/components/Forms/EmployeeForm/types';
import { NotFoundEmployeeModal } from '@/components/Modals/NotFoundEmployeeModal';
import { getEmployeeById, putEmployee } from '@/lib/services/employee';
import { employeeSchema } from '@/lib/validations/employe';
import { Container, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EmployeeByIdProps {
  params: {
    id: string
  }
}

export default function EmployeeById({
  params: { id },
}: EmployeeByIdProps) {
  const { replace } = useRouter();
  const { register, formState: { errors }, handleSubmit, reset } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  })
  const [modalError, setModalError] = useState(false)


  const onSubmit = async (data: EmployeeFormData) => {
    try {

      await putEmployee({
        ...data,
        _id: id
      })
      reset()
      replace('/')
    } catch (error) {
      
    }


  }

  const getEmployeeID = async () => {
    try {
      const response = await getEmployeeById(id)
      reset(response)
    } catch (error) {
      setModalError(true)
    }

  }
  useEffect(() => {
    getEmployeeID()
  }, [])

  if (!id) {
    replace('/')
    return
  }

  return (
    <Container maxW='6xl' py={10}>
      <Text fontSize={'2xl'} fontWeight={'bold'} mb={8}>
        Funcionários
      </Text>

      <EmployeeForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        submitText="Cadastrar"
      />

      <NotFoundEmployeeModal
       isOpen={modalError}
       onClose={() => {
        setModalError(false)
        replace('/')
       }}
       onConfirm={() =>replace('/employee') }
      />
    </Container>
  );
}
