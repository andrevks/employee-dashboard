'use client'
import { EmployeeForm } from '@/components/Forms/EmployeeForm';
import { EmployeeFormData } from '@/components/Forms/EmployeeForm/types';
import { employeeSchema } from '@/lib/validations/employe';
import { Container, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


export default function Employee() {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  })

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data)

    reset()
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
