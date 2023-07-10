import { httpFetch } from "../../request";
import {
  formatPlayTime,
  decodeName,
  formatRelativeDate,
  formatLargeNumber,
} from "../../index";
import { headers, timeout } from "../options";
function toSecond(t) {
  const [min, sec] = t.split(":");
  return Number(min) * 60 + Number(sec);
}
export default {
  regExps: {
    mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
  },
  limit: 30,
  total: 0,
  page: 1,
  allPage: 1,
  getUserMusicRequest(str, page, limit, token) {
    let url = "";
    if (str != "") {
      url = `http://localhost:8100/users/songs?search=${encodeURIComponent(
        str
      )}&page=${page}&pageSize=${limit}&direction=desc&sortType=1`;
    } else {
      url = `http://localhost:8100/users/songs?page=${page}&pageSize=${limit}&direction=desc&sortType=1`;
    }

    const musicSearchRequestObj = httpFetch(url, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
    });
    return musicSearchRequestObj.promise;
  },
  getUserMusic(str, page = 1, limit, token, retryNum = 0) {
    if (retryNum > 2) return Promise.reject(new Error("try max num"));
    if (limit == null) limit = this.limit;
    //console.log('token',token);
    return this.getUserMusicRequest(str, page, limit, token)
      .then(({ body: result }) => {
        //console.log('result',result);
        if (!result)
          return this.getUserMusic(str, page, limit, token, ++retryNum);
        let list = this.handleResult(result.songs);
        if (list == null)
          return this.getUserMusic(str, page, limit, token, ++retryNum);

        this.total = parseInt(result.total);
        this.page = page;
        this.allPage = Math.ceil(this.total / limit);

        return Promise.resolve({
          list,
          allPage: this.allPage,
          total: this.total,
          limit,
          source: "kw",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  musicSearch(str, page, limit, flx) {
    let url = `http://localhost:8100/songs?search=${encodeURIComponent(
      str
    )}&page=${page}&pageSize=${limit}&direction=desc&sortType=2&lyrics=${
      flx ? 0 : 1
    }`;
    console.log('url',url);
    const musicSearchRequestObj = httpFetch(url);

    return musicSearchRequestObj.promise;
  },
  handleResult(rawData) {
    //console.log(rawData);
    const result = [];
    if (!rawData) return result;
    for (let i = 0; i < rawData.length; i++) {
      const info = rawData[i];
      const types = [];
      const _types = {};
      let interval = toSecond(info.duration);

      result.push({
        bdid: info.id,
        name: decodeName(info.title),
        singer: decodeName(info.artists),
        source: "kw",
        img: info.img,
        songmid: info.songmid,
        albumId: "",
        interval: Number.isNaN(interval) ? 0 : formatPlayTime(interval),
        albumName: "",
        popularite: formatLargeNumber(info.popularite),
        createdat: formatRelativeDate(info.created_at),
        username: info.user_name,
        lrc: null,
        otherSource: null,
        types,
        _types,
        typeUrl: {},
      });
    }
    return result;
  },
  search(str, page = 1, limit, flx, retryNum = 0) {
    console.log("flx", flx);
    if (retryNum > 2) return Promise.reject(new Error("try max num"));
    if (limit == null) limit = this.limit;

    return this.musicSearch(str, page, limit, flx).then(({ body: result }) => {
      if (!result) return this.search(str, page, limit, flx, ++retryNum);
      let list = this.handleResult(result.songs);
      if (list == null) return this.search(str, page, limit, flx, ++retryNum);

      this.total = parseInt(result.total);
      this.page = page;
      this.allPage = Math.ceil(this.total / limit);

      return Promise.resolve({
        list,
        allPage: this.allPage,
        total: this.total,
        limit,
        source: "kw",
      });
    });
  },
};