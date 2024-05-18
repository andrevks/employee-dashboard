import * as z from "zod"

export const employeeSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome é obrigatório, min. 3 caracteres" })
    .refine(name => /^[\p{L}\s]+$/u.test(name), {
      message: "Nome deve conter apenas letras"
    }),
  position: z.string().min(3, { message: "O cargo é obrigatório" }),
  department: z.string().min(3, { message: "O departamento é obrigatório" }),
  hireDate: z.string().refine(date => {
    // Verifica se a data está no formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }

    // Extrai o ano da data
    const year = parseInt(date.split('-')[0], 10);
    // Verifica se o ano é válido
    return !isNaN(year) && year > 1900 && year <= new Date().getFullYear();
  }, {
    message: "Data inválida"
  })
})