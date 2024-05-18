import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { CustomInputProps } from './types';

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({
  error,
  name,
  label,
  ...props
}, ref) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input id={name} name={name} ref={ref} {...props} />
    {!!error && (
      <FormErrorMessage>{error}</FormErrorMessage>
    )}
  </FormControl>
));