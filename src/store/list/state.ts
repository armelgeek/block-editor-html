import { LIST_IDS } from '../../config/constant'


export interface InitState {
  allMusicList: Map<string, LX.Music.MusicInfo[]>
  defaultList: LX.List.MyDefaultListInfo
  loveList: LX.List.MyLoveListInfo
  tempList: LX.List.MyTempListInfo
  userList: LX.List.UserListInfo[]
  activeListId: string

  allList: Array<LX.List.MyDefaultListInfo | LX.List.MyLoveListInfo | LX.List.UserListInfo>

  tempListMeta: {
    id: string
  }

  fetchingListStatus: Record<string, boolean>
}

const state: InitState = {
  allMusicList: new Map(),
  defaultList: {
    id: LIST_IDS.DEFAULT,
    name: 'Liste de lecture',
  },
  loveList: {
    id: LIST_IDS.LOVE,
    name: 'Ma collection',
  },
  tempList: {
    id: LIST_IDS.TEMP,
    name: 'Liste temporaire',
    meta: {},
  },
  userList: [],
  activeListId: '',
  allList: [],
  tempListMeta: {
    id: '',
  },
  fetchingListStatus: {},
}

state.allList = [state.defaultList, state.loveList]


export default state
