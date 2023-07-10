import { buildActiveThemeColors } from '../../theme/themes'
import state from './state'


export default {
  setTheme(theme: any) {
    state.theme = buildActiveThemeColors(theme)
    // ThemeContext.displayName
    global.state_event.themeUpdated(state.theme)
  },
  setShouldUseDarkColors(shouldUseDarkColors: any) {
    if (state.shouldUseDarkColors == shouldUseDarkColors) return
    state.shouldUseDarkColors = shouldUseDarkColors
  },
}

