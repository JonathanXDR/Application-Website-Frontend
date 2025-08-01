interface DateType {
  formatOptions?: () => Intl.DateTimeFormatOptions
  event?: string
  fixed?: string | null | Date
  duration?: { from: string, to: string }
}

export interface InfoBarType {
  loading?: boolean
  date?: DateType

  location?: string
  supervisor?: string
  department?: string

  language?: string
  license?: string
  // forks?: number
  // networks?: number
  // watchers?: number
  // stars?: number
  // issues?: number
  // pullRequests?: number
  // subscribers?: number
  // tags?: number
  // commits?: number
  // branches?: number
  // contributors?: number
}
