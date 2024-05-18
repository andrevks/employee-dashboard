'use client'
import { EmployeeForm } from '@/components/Forms/EmployeeForm';
import { EmployeeFormData } from '@/components/Forms/EmployeeForm/types';
import { postEmployees } from '@/lib/services/employee';
import { employeeSchema } from '@/lib/validations/employe';
import { Container, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';


export default function Employee() {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  })

  const { replace } = useRouter()

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await postEmployees(data)
      reset()
      replace('/')
    } catch (error) {
      console.error(error)
    }
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
