import searchMusicState, {
  type ListInfo,
  type Source,
} from "../store/userList/state";
import searchMusicActions, {
  type SearchResult,
} from "../store/userList/action";
import musicSdk from "../utils/musicSdk";

export const setSource: (typeof searchMusicActions)["setSource"] = (source) => {
  searchMusicActions.setSource(source);
};
export const setSearchText: (typeof searchMusicActions)["setSearchText"] = (
  text
) => {
  searchMusicActions.setSearchText(text);
};
export const setListInfo: typeof searchMusicActions.setListInfo = (
  result,
  id,
  page
) => {
  return searchMusicActions.setListInfo(result, id, page);
};

export const clearListInfo: typeof searchMusicActions.clearListInfo = (
  source
) => {
  searchMusicActions.clearListInfo(source);
};

export const search = async (
  text: string,
  page: number,
  sourceId: Source
): Promise<LX.Music.MusicInfoOnline[]> => {
  const listInfo = searchMusicState.listInfos[sourceId] as ListInfo;
  //console.log('listInfo', listInfo);
  if (!text) return [];
  return (
    musicSdk[sourceId]?.musicSearch
      .search(text, page, listInfo.limit)
      .then((data: SearchResult) => {
        return setListInfo(data, page, text);
      }) ?? Promise.reject(new Error("source not found: " + sourceId))
  ).catch((err: any) => {
    if (listInfo.list.length && page == 1) clearListInfo(sourceId);
    throw err;
  });
};

export const getUserMusicList = async (
  text: string,
  page: number,
  sourceId: Source,
  token: string | null
): Promise<LX.Music.MusicInfoOnline[]> => {
  const listInfo = searchMusicState.listInfos[sourceId] as ListInfo;
  try {
    return (
      musicSdk['kw']?.musicSearch
        .getUserMusic(text, page, listInfo.limit, token)
        .then((data: SearchResult) => {
          return setListInfo(data, page, text);
        }) ?? Promise.reject(new Error("source not found: " + sourceId))
    ).catch((err: any) => {
      if (listInfo.list.length && page == 1) clearListInfo(sourceId);
      throw err;
    });
  } catch (err) {
    console.log("err userList.ts", err);
   
  }
};
