import { Request, Response } from 'express';
import Employee from '../../models/employee.model';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

