import { Router } from 'express'
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './controllers/employee.controller'

const appRoutes = Router()

appRoutes.get('/employees', getEmployees)
appRoutes.get('/employees/:id', getEmployeeById)
appRoutes.post('/employees', createEmployee)
appRoutes.put('/employees/:id', updateEmployee)
appRoutes.delete('/employees/:id', deleteEmployee)

export default appRoutes
