import type { I18n } from '../../lang/i18n'
import { getDeviceLanguage } from '../../utils/tools'
import { setLanguage, updateSetting } from '../../core/common'


export default async(setting: LX.AppSetting) => {
  let lang = setting['common.langId']

  //global.i18n = createI18n()

  if (!lang || !global.i18n.availableLocales.includes(lang)) {
    updateSetting({ 'common.langId': 'en_us' })
  }
  setLanguage(lang)
}
