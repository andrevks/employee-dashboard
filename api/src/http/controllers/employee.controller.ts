import { Request, Response } from 'express';
import Employee from '../../models/employee.model';
import { z, ZodError } from 'zod';

const employeeSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  department: z.string().min(1),
  hireDate: z.string().min(1).transform((val) => new Date(val)), // hireDate is passed as a string
});

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
      
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = employeeSchema.parse(req.body);
    const newEmployee = new Employee(validatedData);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation error.', issues: error.format() });
    }
    res.status(500).json({ message: 'Error creating employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = employeeSchema.parse(req.body);
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation error.', issues: error.format() });
    }
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
