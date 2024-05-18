import { EmployeeFormData } from "@/components/Forms/EmployeeForm/types";
import { api } from "../api";


export interface EmployeeResponse {
  _id: string
  name: string
  position: string
  department: string
  hireDate: string
}
export const getEmployees = async () => {
  const { data } = await api.get('/employees')
  return data as EmployeeResponse[]
}

export const postEmployees = async (props: EmployeeFormData) => {
  const { data } = await api.post('/employees', props)
  return data as EmployeeResponse
}

export const getEmployeeById = async (id: string) => {
  const { data } = await api.get(`/employees/${id}`)
  return data as EmployeeResponse
}

export const putEmployee = async (props: EmployeeResponse) => {
  const { data } = await api.put(`/employees/${props._id}`, props)
  return data as EmployeeResponse
}

export const deleteEmployeeById = async (id: string) => {
  const { data } = await api.delete(`/employees/${id}`)
  return data as EmployeeResponse
}