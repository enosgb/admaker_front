export interface User {
  id: number
  name: string
  email: string
  is_staff?: boolean
  is_active?: boolean
  image: string | null
  created_at: string
}

export interface UserPayload {
  name: string
  email: string
  password?: string
  image?: File | null | string
  is_staff?: boolean
  is_active?: boolean
}
