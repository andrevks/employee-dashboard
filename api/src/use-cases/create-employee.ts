import { IEmployee } from '@/models/employee.model'
import { IEmployeeRepository } from '@/repositories/employee-repository'

interface ICreateEmployeeRequest {
  name: string
  position: string
  department: string
  hireDate: Date
}

interface ICreateEmployeeResponse {
  employee: IEmployee
}

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    name,
    position,
    department,
    hireDate,
  }: ICreateEmployeeRequest): Promise<ICreateEmployeeResponse> {
    const employee = await this.employeeRepository.create({
      name,
      position,
      department,
      hireDate,
    })

    return {
      employee,
    }
  }
}
