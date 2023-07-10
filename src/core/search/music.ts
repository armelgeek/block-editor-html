import searchMusicState, {
  type ListInfo,
  type Source,
} from "../../store/search/music/state";
import searchMusicActions, {
  type SearchResult,
} from "../../store/search/music/action";
import musicSdk from "../../utils/musicSdk";

export const setSource: (typeof searchMusicActions)["setSource"] = (source) => {
  searchMusicActions.setSource(source);
};
export const setSearchText: (typeof searchMusicActions)["setSearchText"] = (
  text
) => {
  searchMusicActions.setSearchText(text);
};

export const setToggl: (typeof searchMusicActions)["setToggl"] = (t) => {
  searchMusicActions.setToggl(t);
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
  sourceId: Source,
  flx: boolean
): Promise<LX.Music.MusicInfoOnline[]> => {
  const listInfo = searchMusicState.listInfos[sourceId] as ListInfo;
  //console.log('listInfo', listInfo);
  if (!text) return [];
  const key = `${page}__${text}__${flx}`;
  if (sourceId == "all") {
    listInfo.key = key;
    let task = [];
    for (const source of searchMusicState.sources) {
      if (source == "all") continue;
      task.push(
        (
          (musicSdk["kw"]?.musicSearch.search(
            text,
            page,
            searchMusicState.listInfos.all.limit,
            flx
          ) as Promise<SearchResult>) ??
          Promise.reject(new Error("source not found: " + source))
        ).catch((error: any) => {
          console.log(error);
          return {
            allPage: 1,
            limit: 30,
            list: [],
            source,
            total: 0,
          };
        })
      );
    }
    return Promise.all(task).then((results: SearchResult[]) => {
      if (key != listInfo.key) return [];
      setSearchText(text);
      setSource(sourceId);
      setToggl(flx);
      return setListInfo(results, page, text);
    });
  } else {
    if (listInfo?.key == key && listInfo?.list.length) return listInfo?.list;
    listInfo.key = key;
    return (
      musicSdk[sourceId]?.musicSearch
        .search(text, page, listInfo.limit, flx)
        .then((data: SearchResult) => {
          if (key != listInfo.key) return [];
          return setListInfo(data, page, text);
        }) ?? Promise.reject(new Error("source not found: " + sourceId))
    ).catch((err: any) => {
      if (listInfo.list.length && page == 1) clearListInfo(sourceId);
      throw err;
    });
  }
};

export const getUserMusicList = async (
  text: string,
  page: number,
  sourceId: Source,
  token: string | null
): Promise<LX.Music.MusicInfoOnline[]> => {
  const listInfo = searchMusicState.listInfos[sourceId] as ListInfo;
  //if (!text) return []
  const key = `${page}__${text}`;
  if (sourceId == "all") {
    listInfo.key = key;
    let task = [];
    for (const source of searchMusicState.sources) {
      if (source == "all") continue;
      task.push(
        (
          (musicSdk["kw"]?.musicSearch.getUserMusic(
            text,
            page,
            searchMusicState.listInfos.all.limit,
            token
          ) as Promise<SearchResult>) ??
          Promise.reject(new Error("source not found: " + source))
        ).catch((error: any) => {
          return {
            allPage: 1,
            limit: 30,
            list: [],
            source,
            total: 0,
          };
        })
      );
    }
    return Promise.all(task).then((results: SearchResult[]) => {
      //console.log('kau',key != listInfo.key)
      if (key != listInfo.key) return [];

      // setSearchText(text)
      // setSource(sourceId)
      return setListInfo(results, page, text);
    });
  } else {
    console.log("key", listInfo?.key == key);
    //if (listInfo?.key == key && listInfo?.list.length) return listInfo?.list

    //listInfo.key = key
    try {
      return (
        musicSdk[sourceId]?.musicSearch
          .getUserMusic(text, page, listInfo.limit, token)
          .then((data: SearchResult) => {
            if (key != listInfo.key) return [];
            return setListInfo(data, page, text);
          }) ?? Promise.reject(new Error("source not found: " + sourceId))
      ).catch((err: any) => {
        if (listInfo.list.length && page == 1) clearListInfo(sourceId);
        throw err;
      });
    } catch (err) {
      console.log("err music.ts", err);
    }
  }
};