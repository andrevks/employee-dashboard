import { IEmployeeData } from '@/models/employee.model'

export interface IEmployeeDTO {
  _id: string
  name: string
  position: string
  department: string
  hireDate: string
}

export function toEmployeeDTO({
  _id,
  name,
  position,
  department,
  hireDate,
}: IEmployeeData): IEmployeeDTO {
  return {
    _id: _id ?? '',
    name,
    position,
    department,
    hireDate: hireDate.toISOString().split('T')[0], // date tp 'yyyy-mm-dd'
  }
}
