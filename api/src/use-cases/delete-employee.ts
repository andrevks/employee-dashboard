import { IEmployeeRepository } from '@/repositories/employee-repository'
import { EmployeeNotFoundError } from './errors/employee-not-found-error'

interface IDeleteEmployeeRequest {
  id: string
}

interface IDeleteEmployeeResponse {
  message: string
}

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    id,
  }: IDeleteEmployeeRequest): Promise<IDeleteEmployeeResponse> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    await this.employeeRepository.delete(id)

    return {
      message: 'Employee deleted',
    }
  }
}
