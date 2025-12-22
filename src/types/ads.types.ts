export interface AdCategory {
  id: number
  name: string
  description: string
  active: boolean
  image: string
  created_at: string
  updated_at: string
}

export interface AdCategoryPayload {
  name: string
  description: string
  image?: File | null
  active?: boolean
}
