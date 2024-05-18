'use client'

import { Button, Flex, VStack } from '@chakra-ui/react'
import { CustomInput } from '../../CustomInput'
import { EmployeeFormProps } from './types'

export const EmployeeForm = ({
  onSubmit,
  register,
  errors,
  handleSubmit,
  submitText
}: EmployeeFormProps) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <VStack alignItems={'flex-start'} gap={4}>
      <CustomInput
        label="Nome"
        error={errors.name?.message}
        {...register('name')}
      />
      <Flex
        w={'100%'}
        wrap={{
          base: 'wrap',
          md: 'nowrap'
        }} gap={4}>
        <CustomInput
          label="Cargo"
          {...register('position')}
          error={errors.position?.message}
        />
        <CustomInput
          label="Departamento"
          {...register('department')}
          error={errors.department?.message}
        />
      </Flex>
      <CustomInput
        label="Data de Admissão"
        type="date"
        {...register('hireDate')}
        error={errors.hireDate?.message}
      />
      <Button type="submit" colorScheme="blue">{submitText}</Button>
    </VStack>
  </form>
)
