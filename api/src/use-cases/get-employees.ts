import { IEmployeeData } from '@/models/employee.model'
import { IEmployeeRepository } from '@/repositories/employee-repository'

interface IGetEmployeesResponse {
  employees: IEmployeeData[]
}

export class GetEmployeesUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(): Promise<IGetEmployeesResponse> {
    const employees = await this.employeeRepository.findAll()
    return { employees }
  }
}
