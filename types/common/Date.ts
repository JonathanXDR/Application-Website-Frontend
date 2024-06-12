export interface DateType {
  formatOptions: () => Intl.DateTimeFormatOptions
  nowKey?: 'created' | 'updated'
  fixed?: string | null | Date
  duration?: {
    from: string
    to: string
  }
}
