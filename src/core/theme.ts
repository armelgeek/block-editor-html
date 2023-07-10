import themeActions from '../store/theme/action'
import { getTheme } from '../theme/themes'
import { updateSetting } from './common'
import themeState from '../store/theme/state'

export const setShouldUseDarkColors = (shouldUseDarkColors: any) => {
  themeActions.setShouldUseDarkColors(shouldUseDarkColors)
}

export const applyTheme = (theme:any) => {
  themeActions.setTheme(theme)
}

export const setTheme = (id: string) => {
  updateSetting({ 'theme.id': id })
  void getTheme().then(theme => {
    if (theme.id == themeState.theme.id) return
    applyTheme(theme)
  })
}
