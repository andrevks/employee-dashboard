import Employee, { IEmployee, IEmployeeData } from '@/models/employee.model'
import { IEmployeeRepository } from '../employee-repository'

export class MongooseEmployeeRepository implements IEmployeeRepository {
  async findById(id: string): Promise<IEmployee | null> {
    return await Employee.findById(id)
  }

  async findAll(): Promise<IEmployee[]> {
    return await Employee.find()
  }

  async create(data: IEmployeeData): Promise<IEmployee> {
    const newEmployee = new Employee(data)
    return await newEmployee.save()
  }

  async update(
    id: string,
    data: Partial<IEmployeeData>,
  ): Promise<IEmployee | null> {
    return await Employee.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string): Promise<boolean> {
    const result = await Employee.findByIdAndDelete(id)
    return result !== null
  }
}
