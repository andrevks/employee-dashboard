import { InputProps } from '@chakra-ui/react'

export interface CustomInputProps extends InputProps {
  error?: string
  name: string
  label: string
  placeholder?: string
}