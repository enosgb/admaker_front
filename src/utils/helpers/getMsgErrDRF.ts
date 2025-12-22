type DrfError =
  | string
  | {
      message?: string
      detail?: string
      [key: string]: string | string[] | undefined
    }
  | null
  | undefined

export function getMsgErrDRF(errors: DrfError): string {
  if (!errors) return 'Ocorreu um erro!'

  if (typeof errors === 'string') {
    return errors
  }

  let count = 1

  return Object.values(errors)
    .flat()
    .map((msg) => `${count++}. ${msg}`)
    .join('\n')
}
