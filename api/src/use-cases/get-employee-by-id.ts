import { IEmployeeData } from '@/models/employee.model'
import { IEmployeeRepository } from '@/repositories/employee-repository'
import { EmployeeNotFoundError } from './errors/employee-not-found-error'

interface IGetEmployeeByIdRequest {
  id: string
}

interface IGetEmployeeByIdResponse {
  employee: IEmployeeData
}

export class GetEmployeeByIdUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    id,
  }: IGetEmployeeByIdRequest): Promise<IGetEmployeeByIdResponse> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    return {
      employee,
    }
  }
}
