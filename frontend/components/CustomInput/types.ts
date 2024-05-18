import { InputProps } from '@chakra-ui/react'
import { Control } from 'react-hook-form'

export interface CustomInputProps extends InputProps {
  error?: string
  name: string
  label: string
  placeholder?: string
}