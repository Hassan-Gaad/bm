export interface ConvertModel {
  success: boolean
  query: QueryModel
  info: InfoModel
  historical: boolean
  date: string
  result: number
}

export interface QueryModel {
  from: string
  to: string
  amount: number
}

export interface InfoModel {
  timestamp: number
  rate: number
}
