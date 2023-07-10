import playerActions from '../../store/player/action'
import playerState from '../../store/player/state'

export const setModeCreator = (val: boolean) => {
  if (playerState.modeCreator == val) return
  playerActions.setModeCreator(val)
}
