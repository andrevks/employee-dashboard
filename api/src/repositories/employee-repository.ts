import { IEmployee, IEmployeeData } from '@/models/employee.model'

export interface IEmployeeRepository {
  findById(id: string): Promise<IEmployee | null>
  findAll(): Promise<IEmployee[]>
  create(data: IEmployeeData): Promise<IEmployee>
  update(id: string, data: Partial<IEmployeeData>): Promise<IEmployee | null>
  delete(id: string): Promise<boolean>
}
