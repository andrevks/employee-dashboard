import mongoose, { Document, Schema } from 'mongoose'

export interface IEmployee extends Document {
  name: string
  position: string
  department: string
  hireDate: Date
}

export interface IEmployeeData {
  _id?: string
  name: string
  position: string
  department: string
  hireDate: Date
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
})

export default mongoose.model<IEmployee>('Employee', EmployeeSchema)
