export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function searchTableFilter<T>(
  data: T[],
  searchValue: string,
  keys: string[]
) {
  const value = searchValue.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
  return data.filter(item =>
    keys.some(key => {
      const val = item[key as keyof T]

      if (typeof val === 'object' && val !== null) {
        const valFormatted = val as Array<any>
        return valFormatted.some((v: string) =>
          removeAccents(v)
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .startsWith(value)
        )
      }

      return (
        typeof val === 'string' &&
        removeAccents(val)
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .includes(value)
      )
    })
  )
}