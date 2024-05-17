import { IEmployeeData } from '@/models/employee.model'
import { IEmployeeRepository } from '@/repositories/employee-repository'
import { EmployeeNotFoundError } from './errors/employee-not-found-error'

interface IUpdateEmployeeRequest {
  id: string
  name?: string
  position?: string
  department?: string
  hireDate?: Date
}

interface IUpdateEmployeeResponse {
  employee: IEmployeeData
}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    id,
    name,
    position,
    department,
    hireDate,
  }: IUpdateEmployeeRequest): Promise<IUpdateEmployeeResponse> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    const updatedEmployee = await this.employeeRepository.update(id, {
      name,
      position,
      department,
      hireDate,
    })

    return {
      employee: updatedEmployee!,
    }
  }
}
