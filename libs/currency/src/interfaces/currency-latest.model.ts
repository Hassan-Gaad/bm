export interface LatestModel {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Record<string,string>
}
export interface ExchangeUiModel{
  base:string,
  target:string,
  amount:number,
  result:string
}

export type HistoryModel = LatestModel

