import { languages } from '@/assets/lang/index'
import i18n from '@/main'

export async function fetchData() {
  try {
    const json = languages[i18n.global.locale.value]
    return json
  } catch (error) {
    console.error('helpers', new Error(error as string))
    return {}
  }
}
