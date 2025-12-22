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

export interface AdProduct {
  id: number
  name: string
  description: string
  active: boolean
  category: number
  image: string
  stock: number | string
  cost_price: string
  sale_price: string
}

export interface AdProductPayload {
  name: string
  description: string
  category: number | string
  stock: number | string
  image?: File | null
  cost_price: string
  sale_price: string
  active?: boolean
}
