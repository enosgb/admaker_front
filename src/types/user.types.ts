export interface User {
  id: number
  name: string
  email: string
  is_staff?: boolean
  image: string | null
}
