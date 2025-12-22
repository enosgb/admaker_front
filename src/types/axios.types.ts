export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}
export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  total_pages: number,
  current_page: number,
  results: T[]
}
