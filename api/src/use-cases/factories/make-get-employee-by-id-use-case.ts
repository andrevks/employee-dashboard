import { MongooseEmployeeRepository } from '@/repositories/mongoose/mongoose-employee-repository'
import { GetEmployeeByIdUseCase } from '../get-employee-by-id'

export function makeGetEmployeeByIdUseCase() {
  const employeeRepository = new MongooseEmployeeRepository()
  return new GetEmployeeByIdUseCase(employeeRepository)
}
