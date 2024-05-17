import { Router } from 'express';
import { getEmployees } from './controllers/employee.controller';

const appRoutes = Router();

appRoutes.get('/employees', getEmployees);

export default appRoutes;
