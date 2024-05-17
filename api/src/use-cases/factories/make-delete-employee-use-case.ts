import { MongooseEmployeeRepository } from '@/repositories/mongoose/mongoose-employee-repository'
import { DeleteEmployeeUseCase } from '../delete-employee'

export function makeDeleteEmployeeUseCase() {
  const employeeRepository = new MongooseEmployeeRepository()
  return new DeleteEmployeeUseCase(employeeRepository)
}
