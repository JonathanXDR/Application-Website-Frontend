export interface DateType {
  date?: string | null | Date
  formatOptions: () => Intl.DateTimeFormatOptions
  nowKey?: 'created' | 'updated'
  duration?: {
    from?: string
    to?: string
  }
}
