export const apiPrefix = {
    baseUrl: "http://localhost:8100" 
}


export const routeLists = {
    app: '/',
    login: "/login"
}



export const HEADER_HEIGHT = 42;
export const LIST_ITEM_HEIGHT = 100;
export const LIST_SCROLL_POSITION_KEY = "__LIST_SCROLL_POSITION_KEY__";

export const LIST_IDS = {
  DEFAULT: "default",
  LOVE: "love",
  TEMP: "temp",
  DOWNLOAD: "download",
  PLAY_LATER: null,
} as const;

// export const COMPONENT_IDS = {
//   home: 'home',
//   playDetail: 'playDetail',
// } as const
// export type COMPONENT_IDS_TYPE = keyof typeof COMPONENT_IDS
export enum COMPONENT_IDS {
  home = "home",
  playDetail = "playDetail",
  songlistDetail = "songlistDetail",
  comment = "comment",
  createSong = "createSong",
}

export enum NAV_SHEAR_NATIVE_IDS {
  playDetail_pic = "playDetail_pic",
  playDetail_header = "playDetail_header",
  playDetail_pageIndicator = "playDetail_pageIndicator",
  playDetail_player = "playDetail_player",
  songlistDetail_pic = "songlistDetail_pic",
  songlistDetail_title = "songlistDetail_title",
}

export const storageDataPrefix = {
  accessToken: "@user_token",
  refreshToken: "@user_refresh_token",
  setting: "@setting_v1",
  userList: "@user_list",
  viewPrevState: "@view_prev_state",

  list: "@list__",
  listScrollPosition: "@list_scroll_position",
  listPrevSelectId: "@list_prev_select_id",

  lyric: "@lyric__",
  musicUrl: "@music_url__",
  musicOtherSource: "@music_other_source__",
  playInfo: "@play_info",

  syncAuthKey: "@sync_auth_key",
  syncHost: "@sync_host",
  syncHostHistory: "@sync_host_history",

  notificationTipEnable: "@notification_tip_enable",

  searchHistoryList: "@search_history_list",
  listUpdateInfo: "@list_update_info",
  ignoreVersion: "@ignore_version",
  leaderboardSetting: "@leaderboard_setting",
  songListSetting: "@songist_setting",
  searchSetting: "@search_setting",

  fontSize: "@font_size",

  theme: "@theme"
} as const;

// v0.x.x 版本的 data keys
export const storageDataPrefixOld = {
  setting: "@setting",
  list: "@list__",
  listPosition: "@listposition__",
  listSort: "@listsort__",
  // lyric: '@lyric__',
  // musicUrl: '@music_url__',
  playInfo: "@play_info",
  syncAuthKey: "@sync_auth_key",
  syncHost: "@sync_host",
  syncHostHistory: "@sync_host_history",
  notificationTipEnable: "@notification_tip_enable",
} as const;

export const APP_PROVIDER_NAME = "cn.toside.music.mobile.provider";

export const NAV_MENUS = [
  { id: "nav_top", icon: "home" },
  //{ id: 'nav_search', icon: 'search1' },
  //{ id: 'nav_songlist', icon: 'team' },
  { id: "nav_love", icon: "hearto" },
  // { id: 'download', icon: 'download-2' },
  { id: "nav_setting", icon: "user" },
] as const;

export type NAV_ID_Type = (typeof NAV_MENUS)[number]["id"];

export const LXM_FILE_EXT_RXP = /\.(json|lxmc)$/;

export const MUSIC_TOGGLE_MODE = {
  listLoop: "listLoop", // 列表循环
  random: "random", // 列表随机
  list: "list", // 顺序播放
  singleLoop: "singleLoop", // 单曲循环
  none: "none", // 禁用
} as const;

export const MUSIC_TOGGLE_MODE_LIST = [
  MUSIC_TOGGLE_MODE.listLoop,
  MUSIC_TOGGLE_MODE.random,
  MUSIC_TOGGLE_MODE.list,
  MUSIC_TOGGLE_MODE.singleLoop,
  MUSIC_TOGGLE_MODE.none,
] as const;

export const DEFAULT_SETTING = {
  leaderboard: {
    source: "kw" as LX.OnlineSource,
    boardId: "kw__tous",
  },

  songList: {
    source: "kg" as LX.OnlineSource,
    sortId: "5",
    tagName: "",
    tagId: "",
  },

  search: {
    temp_source: "kw" as LX.OnlineSource,
    source: "all" as LX.OnlineSource | "all",
    type: "music" as "music" | "songlist",
    flx: false,
  },

  viewPrevState: {
    id: "nav_top" as NAV_ID_Type,
    // query: {},
  },
};

export const SYNC_CODE = {
  helloMsg: "Hello~::^-^::~v3~",
  idPrefix: "OjppZDo6",
  authMsg: "lx-music auth::",
  authFailed: "Auth failed",
  missingAuthCode: "Missing auth code",
  getServiceIdFailed: "Get service id failed",
  connectServiceFailed: "Connect service failed",
  connecting: "Connecting...",
  unknownServiceAddress: "Unknown service address",
  msgBlockedIp: "Blocked IP",
  msgConnect: "lx-music connect",
  msgAuthFailed: "Auth failed",
} as const;

export const SYNC_CLOSE_CODE = {
  normal: 1000,
  failed: 4100,
} as const;

export const SNAKE_GAME={
  gridSize: 30,
  cellSize: 30
}