import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { makeCreateEmployeeUseCase } from '../../use-cases/factories/make-create-employee-use-case'
import { EmployeeNotFoundError } from '@/use-cases/errors/employee-not-found-error'
import { makeUpdateEmployeeUseCase } from '@/use-cases/factories/make-update-employee-use-case'
import { makeGetEmployeeByIdUseCase } from '@/use-cases/factories/make-get-employee-by-id-use-case'
import { makeGetEmployeesUseCase } from '@/use-cases/factories/make-get-employees-use-case'
import { makeDeleteEmployeeUseCase } from '@/use-cases/factories/make-delete-employee-use-case'
import { toEmployeeDTO } from '../../dto/employee-dto'

const employeeSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  department: z.string().min(1),
  hireDate: z
    .string()
    .min(1)
    .transform((val) => new Date(val)), // hireDate is passed as a string
})

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const makeGetEmployessUseCase = makeGetEmployeesUseCase()
    const { employees } = await makeGetEmployessUseCase.execute()
    res.status(200).json(employees.map(toEmployeeDTO))
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' })
  }
}

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const getEmployeeByIdUseCase = makeGetEmployeeByIdUseCase()
    const { employee } = await getEmployeeByIdUseCase.execute({
      id: req.params.id,
    })
    res.status(200).json(toEmployeeDTO(employee))
  } catch (error) {
    if (error instanceof EmployeeNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({ message: 'Error fetching employee' })
  }
}

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = employeeSchema.parse(req.body)
    const createEmployeeUseCase = makeCreateEmployeeUseCase()
    const { employee } = await createEmployeeUseCase.execute(validatedData)
    res.status(201).json(toEmployeeDTO(employee))
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Validation error.', issues: error.format() })
    }
    res.status(500).json({ message: 'Error creating employee' })
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = employeeSchema.parse(req.body)
    const updateEmployeeUseCase = makeUpdateEmployeeUseCase()
    const { employee } = await updateEmployeeUseCase.execute({
      id: req.params.id,
      ...validatedData,
    })
    res.status(200).json(toEmployeeDTO(employee))
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: 'Validation error.', issues: error.format() })
    }
    if (error instanceof EmployeeNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({ message: 'Error updating employee' })
  }
}

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleteEmployeeUseCase = makeDeleteEmployeeUseCase()
    await deleteEmployeeUseCase.execute({
      id: req.params.id,
    })
    res.status(204).send()
  } catch (error) {
    if (error instanceof EmployeeNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({ message: 'Error deleting employee' })
  }
}
