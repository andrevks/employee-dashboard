import { MongooseEmployeeRepository } from '@/repositories/mongoose/mongoose-employee-repository'
import { UpdateEmployeeUseCase } from '../update-employee'

export function makeUpdateEmployeeUseCase() {
  const employeeRepository = new MongooseEmployeeRepository()
  return new UpdateEmployeeUseCase(employeeRepository)
}
