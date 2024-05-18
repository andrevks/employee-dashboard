import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

export interface EmployeeFormData {
  name: string
  position: string
  department: string
  hireDate: string
}

export interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void
  register: UseFormRegister<EmployeeFormData>
  errors: FieldErrors<EmployeeFormData>
  handleSubmit: UseFormHandleSubmit<EmployeeFormData, undefined>
  submitText: string
}