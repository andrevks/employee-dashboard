import { MongooseEmployeeRepository } from '@/repositories/mongoose/mongoose-employee-repository'
import { GetEmployeesUseCase } from '../get-employees'

export function makeGetEmployeesUseCase() {
  const employeeRepository = new MongooseEmployeeRepository()
  return new GetEmployeesUseCase(employeeRepository)
}
