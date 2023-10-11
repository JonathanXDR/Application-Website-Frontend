import i18n from '@/main'

export async function fetchData() {
  try {
    const locale = i18n.global.locale
    console.log('Utils', locale)

    const response = await fetch(`src/assets/lang/${locale}.json`)
    const json = await response.json()
    return json
  } catch (error: unknown) {
    console.error('Utils', new Error(error as string))
    return {}
  }
}
