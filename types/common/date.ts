export interface DateType {
  formatOptions?: () => Intl.DateTimeFormatOptions
  event?: string
  fixed?: string | null | Date
  duration?: {
    from: string
    to: string
  }
}
