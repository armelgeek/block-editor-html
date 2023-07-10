import { httpFetch } from "../../request";
import {
  formatPlayTime,
  decodeName,
  formatRelativeDate,
  formatLargeNumber,
} from "../../index";
import { objStr2JSON } from "./util";
import _ from "lodash";
import { timeout } from "../options";
function toSecond(t) {
  const [min, sec] = t.split(":");
  return Number(min) * 60 + Number(sec);
}

export default {
  _requestObj_tags: null,
  _requestObj_hotTags: null,
  _requestObj_list: null,
  limit_list: 36,
  limit_song: 10000,
  successCode: 200,
  sortList: [
    {
      name: "最新",
      tid: "new",
      id: "new",
    },
    {
      name: "最热",
      tid: "hot",
      id: "hot",
    },
  ],
  regExps: {
    mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
    // http://www.kuwo.cn/playlist_detail/2886046289
    // https://m.kuwo.cn/h5app/playlist/2736267853?t=qqfriend
    listDetailLink: /^.+\/playlist(?:_detail)?\/(\d+)(?:\?.*|&.*$|#.*$|$)/,
  },
  tagsUrl:
    "http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576",
  hotTagUrl:
    "http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmTagList?loginUid=0&loginSid=0&appUid=76039576",
  getListUrl({ page, filters, id }) {
    let url = `http://localhost:8100/artists?page=${page}&pageSize=${this.limit_list}&tags=${id}&showAll=false`;
    if (!_.isUndefined(filters) && !_.isUndefined(filters.date) && !_.isUndefined(filters.date.id)) {
      url += `&dateFilter=${filters.date.id}`;
    }
    if (!_.isUndefined(filters) && 
    !_.isUndefined(filters.sort) &&
      !_.isUndefined(filters.sort.direction) &&
      !_.isUndefined(filters.sort.selectedItemId)
    ) {
      url += `&direction=${filters.sort.direction}&sortType=${filters.sort.selectedItemId}`;
    }
    console.log(url);
    return url;
  },
  getListDetailUrl(id, page) {
    // http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=2858093057&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1
    return `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${
      page - 1
    }&rn=${
      this.limit_song
    }&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1`;
    // http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=140&prod=pc
  },

  // http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=2849349915&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1
  // 获取标签
  getTag(tryNum = 0) {
    if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
    if (tryNum > 2) return Promise.reject(new Error("try max num"));
    this._requestObj_tags = httpFetch(this.tagsUrl);
    return this._requestObj_tags.promise.then(({ body }) => {
      if (body.code !== this.successCode) return this.getTag(++tryNum);
      return this.filterTagInfo(body.data);
    });
  },
  // 获取标签
  getHotTag(tryNum = 0) {
    if (this._requestObj_hotTags) this._requestObj_hotTags.cancelHttp();
    if (tryNum > 2) return Promise.reject(new Error("try max num"));
    this._requestObj_hotTags = httpFetch(this.hotTagUrl);
    return this._requestObj_hotTags.promise.then(({ body }) => {
      if (body.code !== this.successCode) return this.getHotTag(++tryNum);
      return this.filterInfoHotTag(body.data[0].data);
    });
  },
  filterInfoHotTag(rawList) {
    return rawList.map((item) => ({
      id: `${item.id}-${item.digest}`,
      name: item.name,
      source: "kw",
    }));
  },
  filterTagInfo(rawList) {
    return rawList.map((type) => ({
      name: type.name,
      list: type.data.map((item) => ({
        parent_id: type.id,
        parent_name: type.name,
        id: `${item.id}-${item.digest}`,
        name: item.name,
        source: "kw",
      })),
    }));
  },

  // 获取列表数据
  getList(page, filters, id, tryNum = 0) {
    //if (this._requestObj_list) this._requestObj_list.cancelHttp();
    if (tryNum > 2) return Promise.reject(new Error("try max num"));
    this._requestObj_list = httpFetch(
      this.getListUrl(
        { page, filters, id },
        {
          method: "get",
          timeout,
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
          },
        }
      )
    );
    return this._requestObj_list.promise
      .then(({ body, statusCode }) => {
        if (statusCode !== this.successCode) return this.getList(++tryNum);
        return {
          list: this.filterList(body.data),
          total: body.total,
          page,
          limit: body.limit,
          source: "kw",
        };
      })
      .catch((err) => console.log("error on get artists list", err));
  },

  /**
   * 格式化播放数量
   * @param {*} num
   */
  formatPlayCount(num) {
    if (num > 100000000) return parseInt(num / 10000000) / 10 + "亿";
    if (num > 10000) return parseInt(num / 1000) / 10 + "万";
    return num;
  },
  filterList(rawData) {
    var rw = rawData.map((item) => {
      console.log("item", item);
      return {
        play_count: formatLargeNumber(item.total_play_count),
        id: item.id,
        author: "armel",
        name: item.name,
        time: formatRelativeDate(item.created_at),
        total: formatLargeNumber(item.song_count),
        img: item.img
          ? item.img
          : "https://static.vecteezy.com/system/resources/previews/008/695/904/non_2x/continuous-single-line-drawing-of-a-male-singer-sing-a-song-and-play-music-illustration-of-musician-artist-performance-concept-vector.jpg",
        grade: 0,
        desc: item.desc,
        source: "kw",
      };
    });
    return rw;
  },
  filterList2(rawData) {
    const list = [];
    rawData.forEach((item) => {
      list.push(
        ...item.songs.map((item) => ({
          play_count: item.total_play_count,
          id: item.id,
          author: "armel",
          name: item.name,
          total: 10,
          // time: item.publish_time,
          img: "https://static.vecteezy.com/system/resources/previews/008/695/904/non_2x/continuous-single-line-drawing-of-a-male-singer-sing-a-song-and-play-music-illustration-of-musician-artist-performance-concept-vector.jpg",
          grade: 10,
          desc: "",
          source: "kw",
        }))
      );
    });
    return list;
  },

  getListDetailDigest8(id, page, tryNum = 0) {
    if (tryNum > 2) return Promise.reject(new Error("try max num"));

    const requestObj = httpFetch(this.getListDetailUrl(id, page));
    return requestObj.promise.then(({ body }) => {
      if (body.result !== "ok") return this.getListDetail(id, page, ++tryNum);
      return {
        list: this.filterListDetail(body.musiclist),
        page,
        limit: body.rn,
        total: body.total,
        source: "kw",
        info: {
          name: body.title,
          img: body.pic,
          desc: body.info,
          author: body.uname,
          play_count: this.formatPlayCount(body.playnum),
        },
      };
    });
  },

  getListDetailDigest5Music(id, page, tryNum = 0) {
    if (tryNum > 2) return Promise.reject(new Error("try max num"));
    let url = `http://localhost:8100/songs?page=${page}&pageSize=${this.limit_list}&direction=asc&sortType=2&artistId=${id}`;
    console.log(url);
    const requestObj = httpFetch(url);
    return requestObj.promise
      .then(({ body, ok }) => {
        // if (body.result !== 'ok') return this.getListDetail(id, page, ++tryNum)
        return {
          list: this.filterListDetail(body.songs),
          page,
          limit: body.pageSize,
          total: body.total,
          source: "kw",
          info:
            body.songs.length > 0
              ? {
                  name: body.songs[0].info.name,
                  img: body.songs[0].info.img,
                  desc: body.songs[0].info.desc,
                  author: body.songs[0].info.author,
                  play_count: formatLargeNumber(body.songs[0].info.play_count),
                }
              : {
                  name: "",
                  img: "",
                  desc: "",
                  author: "",
                  play_count: 0,
                },
        };
      })
      .catch((err) => console.log(err));
  },
  async getListDetailDigest5(id, page, retryNum) {
    return this.getListDetailDigest5Music(id, page, retryNum);
  },

  filterBDListDetail(rawList) {
    return rawList.map((item) => {
      let types = [];
      let _types = {};
      for (let info of item.audios) {
        info.size = info.size?.toLocaleUpperCase();
        switch (info.bitrate) {
          case "4000":
            types.push({ type: "flac24bit", size: info.size });
            _types.flac24bit = {
              size: info.size,
            };
            break;
          case "2000":
            types.push({ type: "flac", size: info.size });
            _types.flac = {
              size: info.size,
            };
            break;
          case "320":
            types.push({ type: "320k", size: info.size });
            _types["320k"] = {
              size: info.size,
            };
            break;
          case "192":
          case "128":
            types.push({ type: "128k", size: info.size });
            _types["128k"] = {
              size: info.size,
            };
            break;
        }
      }
      types.reverse();

      return {
        singer: item.artists.map((s) => s.name).join("、"),
        name: item.name,
        albumName: item.album,
        albumId: item.albumId,
        songmid: item.songmid,
        source: "kw",
        interval: formatPlayTime(item.duration),

        img: item.albumPic,
        releaseDate: item.releaseDate,
        lrc: null,
        otherSource: null,
        types,
        _types,
        typeUrl: {},
      };
    });
  },
  getReqId() {
    function t() {
      return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
    }
    return t() + t() + t() + t() + t() + t() + t() + t();
  },
  async getListDetailMusicListByBDListInfo(id, source) {
    const { body: infoData } = await httpFetch(
      `https://bd-api.kuwo.cn/api/service/playlist/info/${id}?reqId=${this.getReqId()}&source=${source}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          plat: "h5",
        },
      }
    ).promise.catch(() => ({ code: 0 }));

    if (infoData.code != 200) return null;

    return {
      name: infoData.data.name,
      img: infoData.data.pic,
      desc: infoData.data.description,
      author: infoData.data.creatorName,
      play_count: infoData.data.playNum,
    };
  },
  async getListDetailMusicListByBDUserPub(id) {
    const { body: infoData } = await httpFetch(
      `https://bd-api.kuwo.cn/api/ucenter/users/pub/${id}?reqId=${this.getReqId()}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          plat: "h5",
        },
      }
    ).promise.catch(() => ({ code: 0 }));

    if (infoData.code != 200) return null;

    // console.log(infoData)
    return {
      name: infoData.data.userInfo.nickname + "喜欢的音乐",
      img: infoData.data.userInfo.headImg,
      desc: "",
      author: infoData.data.userInfo.nickname,
      play_count: "",
    };
  },
  async getListDetailMusicListByBDList(id, source, page, tryNum = 0) {
    const { body: listData } = await httpFetch(
      `https://bd-api.kuwo.cn/api/service/playlist/${id}/musicList?reqId=${this.getReqId()}&source=${source}&pn=${page}&rn=${
        this.limit_song
      }`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          plat: "h5",
        },
      }
    ).promise.catch(() => {
      if (tryNum > 2) return Promise.reject(new Error("try max num"));
      return this.getListDetailMusicListByBDList(id, source, page, ++tryNum);
    });

    if (listData.code !== 200) return Promise.reject(new Error("leka failed"));

    return {
      list: this.filterBDListDetail(listData.data.list),
      page,
      limit: listData.data.pageSize,
      total: listData.data.total,
      source: "kw",
    };
  },
  async getListDetailMusicListByBD(id, page) {
    const uid = /uid=(\d+)/.exec(id)?.[1];
    const listId = /playlistId=(\d+)/.exec(id)?.[1];
    const source = /source=(\d+)/.exec(id)?.[1];
    if (!listId) return Promise.reject(new Error("leka failed"));

    const task = [this.getListDetailMusicListByBDList(listId, source, page)];
    switch (source) {
      case "4":
        task.push(this.getListDetailMusicListByBDListInfo(listId, source));
        break;
      case "5":
        task.push(this.getListDetailMusicListByBDUserPub(uid ?? listId));
        break;
    }
    const [listData, info] = await Promise.all(task);
    listData.info = info ?? {
      name: "",
      img: "",
      desc: "",
      author: "",
      play_count: "",
    };
    // console.log(listData)
    return listData;
  },

  // 获取歌曲列表内的音乐
  getListDetail(id, page, retryNum = 0) {
    return this.getListDetailDigest5(id, page, retryNum);
  },
  filterListDetail(rawData) {
    return rawData.map((item) => {
      let types = [];
      let _types = {};
      return {
        bdid: item.id,
        singer: decodeName(item.artists),
        name: decodeName(item.title),
        albumName: "",
        albumId: "",
        songmid: item.songmid,
        source: "kw",
        interval: formatPlayTime(toSecond(item.duration)),
        popularite: formatLargeNumber(item.popularite),
        createdat: formatRelativeDate(item.created_at),
        username: item.user_name,
        img: null,
        lrc: null,
        otherSource: null,
        types,
        _types,
        typeUrl: {},
      };
    });
  },
  getTags() {
    return Promise.all([this.getTag(), this.getHotTag()]).then(
      ([tags, hotTag]) => ({ tags, hotTag, source: "kw" })
    );
  },
  getDetailPageUrl(id) {
    if (/[?&:/]/.test(id)) id = id.replace(this.regExps.listDetailLink, "$1");
    else if (/^digest-/.test(id)) {
      let result = id.split("__");
      id = result[1];
    }
    return `http://www.kuwo.cn/playlist_detail/${id}`;
  },

  search(text, page, limit = 20) {

    let url = `http://localhost:8100/artists?q=${text}&page=${page}&pageSize=${limit}`;
    return httpFetch(url).promise.then(({ body }) => {
      console.log(body)
      return {
        list: body.data.map((item) => {
          return {
            play_count: formatLargeNumber(item.total_play_count),
            id: item.id,
            author: "armel",
            name: item.name,
            time: formatRelativeDate(item.created_at),
            total: formatLargeNumber(item.song_count),
            img: item.img
              ? item.img
              : "https://static.vecteezy.com/system/resources/previews/008/695/904/non_2x/continuous-single-line-drawing-of-a-male-singer-sing-a-song-and-play-music-illustration-of-musician-artist-performance-concept-vector.jpg",
            grade: 0,
            desc: item.bio,
            source: "all",
          };
        }),
        limit,
        total: parseInt(body.total),
        source: "kw",
      };
    }).catch(err => console.log('err',err));
  },
};

// getList
// getTags
// getListDetail
