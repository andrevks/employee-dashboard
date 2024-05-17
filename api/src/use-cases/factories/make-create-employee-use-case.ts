import { MongooseEmployeeRepository } from '@/repositories/mongoose/mongoose-employee-repository'
import { CreateEmployeeUseCase } from '../create-employee'

export function makeCreateEmployeeUseCase() {
  const employeeRepository = new MongooseEmployeeRepository()
  return new CreateEmployeeUseCase(employeeRepository)
}
