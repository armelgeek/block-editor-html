import { dateFormat } from "./common";

export { tranditionalize as langS2T } from "../utils/simplify-chinese-main";

export * from "./common";

// https://stackoverflow.com/a/53387532
export function compareVer(currentVer: string, targetVer: string): -1 | 0 | 1 {
  // treat non-numerical characters as lower version
  // replacing them with a negative number based on charcode of each character
  const fix = (s: string) => `.${s.toLowerCase().charCodeAt(0) - 2147483647}.`;

  const currentVerArr: Array<string | number> = ("" + currentVer)
    .replace(/[^0-9.]/g, fix)
    .split(".");
  const targetVerArr: Array<string | number> = ("" + targetVer)
    .replace(/[^0-9.]/g, fix)
    .split(".");
  let c = Math.max(currentVerArr.length, targetVerArr.length);
  for (let i = 0; i < c; i++) {
    // convert to integer the most efficient way
    currentVerArr[i] = ~~currentVerArr[i];
    targetVerArr[i] = ~~targetVerArr[i];
    if (currentVerArr[i] > targetVerArr[i]) return 1;
    else if (currentVerArr[i] < targetVerArr[i]) return -1;
  }
  return 0;
}

export const toNewMusicInfo = (oldMusicInfo: any) => {
  const meta: Record<string, any> = {
    songId: oldMusicInfo.songmid, // 歌曲ID，local为文件路径
    albumName: oldMusicInfo.albumName, // 歌曲专辑名称
    picUrl: oldMusicInfo.img, // 歌曲图片链接
    popularite: oldMusicInfo.popularite,
    createdat: oldMusicInfo.createdat,
    username: oldMusicInfo.username
  };

  if (oldMusicInfo.source == "local") {
    meta.filePath = oldMusicInfo.filePath ?? oldMusicInfo.songmid ?? "";
    meta.ext = oldMusicInfo.ext ?? /\.(\w+)$/.exec(meta.filePath)?.[1] ?? "";
  } else {
    meta.qualitys = oldMusicInfo.types;
    meta._qualitys = oldMusicInfo._types;
    meta.albumId = oldMusicInfo.albumId;
    if (meta._qualitys.flac32bit && !meta._qualitys.flac24bit) {
      meta._qualitys.flac24bit = meta._qualitys.flac32bit;
      delete meta._qualitys.flac32bit;

      meta.qualitys = (meta.qualitys as any[]).map((quality) => {
        if (quality.type == "flac32bit") quality.type = "flac24bit";
        return quality;
      });
    }

    switch (oldMusicInfo.source) {
      case "kg":
        meta.hash = oldMusicInfo.hash;
        break;
      case "tx":
        meta.strMediaMid = oldMusicInfo.strMediaMid;
        meta.albumMid = oldMusicInfo.albumMid;
        meta.id = oldMusicInfo.songId;
        break;
      case "mg":
        meta.copyrightId = oldMusicInfo.copyrightId;
        meta.lrcUrl = oldMusicInfo.lrcUrl;
        meta.mrcUrl = oldMusicInfo.mrcUrl;
        meta.trcUrl = oldMusicInfo.trcUrl;
        break;
    }
  }

  return {
    id: `${oldMusicInfo.source as string}_${oldMusicInfo.songmid as string}`,
    name: oldMusicInfo.name,
    singer: oldMusicInfo.singer,
    source: oldMusicInfo.source,
    interval: oldMusicInfo.interval,
    meta: meta as LX.Music.MusicInfoOnline["meta"],
    bdid: oldMusicInfo.bdid,
    popularite: oldMusicInfo.popularite,
    createdat: oldMusicInfo.createdat,
    username: oldMusicInfo.username
  };
};

export const toOldMusicInfo = (minfo: LX.Music.MusicInfo): any => {
  const oInfo: Record<string, any> = {
    name: minfo.name,
    bdid: minfo.bdid,
    singer: minfo.singer,
    source: minfo.source,
    songmid: minfo.meta.songId,
    interval: minfo.interval,
    albumName: minfo.meta.albumName,
    img: minfo.meta.picUrl ?? "",
    popularite: minfo.popularite,
    createdat: minfo.createdat,
    username: minfo.username,
    typeUrl: {},
  };
  if (minfo.source == "local") {
    oInfo.filePath = minfo.meta.filePath;
    oInfo.ext = minfo.meta.ext;
    oInfo.albumId = "";
    oInfo.types = [];
    oInfo._types = {};
  } else {
    oInfo.albumId = minfo.meta.albumId;
    oInfo.types = minfo.meta.qualitys;
    oInfo._types = minfo.meta._qualitys;

    switch (minfo.source) {
      case "kg":
        oInfo.hash = minfo.meta.hash;
        break;
      case "tx":
        oInfo.strMediaMid = minfo.meta.strMediaMid;
        oInfo.albumMid = minfo.meta.albumMid;
        oInfo.songId = minfo.meta.id;
        break;
      case "mg":
        oInfo.copyrightId = minfo.meta.copyrightId;
        oInfo.lrcUrl = minfo.meta.lrcUrl;
        oInfo.mrcUrl = minfo.meta.mrcUrl;
        oInfo.trcUrl = minfo.meta.trcUrl;
        break;
    }
  }

  return oInfo;
};

/**
 * 修复2.0.0-dev.8之前的新列表数据音质
 * @param musicInfo
 */
export const fixNewMusicInfoQuality = (musicInfo: any) => {
  if (musicInfo.source == "local") return musicInfo;

  if (
    musicInfo.meta._qualitys.flac32bit &&
    !musicInfo.meta._qualitys.flac24bit
  ) {
    musicInfo.meta._qualitys.flac24bit = musicInfo.meta._qualitys.flac32bit;
    delete musicInfo.meta._qualitys.flac32bit;

    musicInfo.meta.qualitys = musicInfo.meta.qualitys.map((quality) => {
      if (quality.type == "flac32bit") quality.type = "flac24bit";
      return quality;
    });
  }

  return musicInfo;
};

export const filterMusicList=(
  list:any
):any => {
  const ids = new Set<string>();
  return list.filter((s) => {
    if (!s.id || ids.has(s.id) || !s.name) return false;
    if (s.singer == null) s.singer = "";
    ids.add(s.id);
    return true;
  });
};

export const deduplicationList = <T extends LX.Music.MusicInfo>(
  list: T[]
): T[] => {
  const ids = new Set<string>();
  return list.filter((s) => {
    if (ids.has(s.id)) return false;
    ids.add(s.id);
    return true;
  });
};

/**
 * 时间格式化
 */
export const dateFormat2 = (time: number): string => {
  let differ = Math.trunc((Date.now() - time) / 1000);
  if (differ < 60) {
    return global.i18n.t("date_format_second", { num: differ });
  } else if (differ < 3600) {
    return global.i18n.t("date_format_minute", {
      num: Math.trunc(differ / 60),
    });
  } else if (differ < 86400) {
    return global.i18n.t("date_format_hour", {
      num: Math.trunc(differ / 3600),
    });
  } else {
    return dateFormat(time);
  }
};

/**
 * 格式化播放数量
 * @param {*} num 数字
 */
export const formatPlayCount = (num: number): string => {
  if (num > 100000000) return `${Math.trunc(num / 10000000) / 10}亿`;
  if (num > 10000) return `${Math.trunc(num / 1000) / 10}万`;
  return String(num);
};
export function formatRelativeDate(dateString:string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) { // moins d'une minute
    return "< 1 minute";
  } else if (diff < 3600000) { // moins d'une heure
    const minutes = Math.floor(diff / 60000);
    return `Il y a ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
  } else if (diff < 86400000) { // moins d'un jour
    const hours = Math.floor(diff / 3600000);
    return `Il y a ${hours} ${hours > 1 ? "heures" : "heure"}`;
  } else if (diff < 2592000000) { // moins d'un mois
    const days = Math.floor(diff / 86400000);
    return `Il y a ${days} ${days > 1 ? "jours" : "jour"}`;
  } else if (diff < 31536000000) { // moins d'une année
    const months = Math.floor(diff / 2592000000);
    return `Il y a ${months} ${months > 1 ? "mois" : "mois"}`;
  } else { // plus d'un an
    const years = Math.floor(diff / 31536000000);
    return `Il y a ${years} ${years > 1 ? "années" : "année"}`;
  }
}
export function formatLargeNumber(number:any) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return number.toString();
  }
}
