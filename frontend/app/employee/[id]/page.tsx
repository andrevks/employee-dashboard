'use client'

import { EmployeeForm } from '@/components/Forms/EmployeeForm';
import { EmployeeFormData } from '@/components/Forms/EmployeeForm/types';
import { employeeSchema } from '@/lib/validations/employe';
import { Container, Flex, Spacer, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data)

    reset()
  }

  if (!id || !id.replace(/[^0-9]+/g, '')) {
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
    </Container>
  );
}
