import { httpFetch } from "../../request";
import { formatPlayTime, decodeName, formatRelativeDate, formatLargeNumber } from "../../index";
import { formatSinger } from "./util";
import _ from "lodash";
function toSecond(t) {
  const [min, sec] = t.split(":");
  return Number(min) * 60 + Number(sec);
}
const boardList = [
  {
    id: "kw__1800",
    name: "1800",
    bangid: "3",
  },
  {
    id: "kw__fitaka",
    name: "fitaka",
    bangid: "17",
  },
  {
    id: "kw__fitiavana",
    name: "fitiavana",
    bangid: "12",
  },
  {
    id: "kw__jaha",
    name: "jaha",
    bangid: "11",
  },
  {
    id: "kw__Kalon'ny fahiny",
    name: "Kalon'ny fahiny",
    bangid: "2",
  },
  {
    id: "kw__leka",
    name: "leka",
    bangid: "4",
  },
  {
    id: "kw__love",
    name: "love",
    bangid: "13",
  },
];
export default {
  list: [
    {
      id: "1800",
      name: "1800",
      bangid: 3,
    },
    {
      id: "fitaka",
      name: "fitaka",
      bangid: 17,
    },
    {
      id: "fitiavana",
      name: "fitiavana",
      bangid: 12,
    },
    {
      id: "jaha",
      name: "jaha",
      bangid: 11,
    },
    {
      id: "kalo",
      name: "Kalon'ny fahiny",
      bangid: 2,
    },
    {
      id: "leka",
      name: "leka",
      bangid: 4,
    },
    {
      id: "love",
      name: "love",
      bangid: 13,
    },
  ],

  getUrl: (p, l, id, filters) => {
    let url = `http://localhost:8100/songs?page=${p}&pageSize=${l}&tags=${id}`;
   
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
    return url;
  },
  regExps: {},
  limit: 30,
  _requestBoardsObj: null,

  getBoardsData() {
    if (this._requestBoardsObj) this._requestBoardsObj.cancelHttp();
    this._requestBoardsObj = httpFetch(
      "http://localhost:8100/tags?page=1&pageSize=20&show_all=true"
    );
    return this._requestBoardsObj.promise;
  },
  getData(url) {
    const requestDataObj = httpFetch(url);
    return requestDataObj.promise;
  },
  filterData(rawList) {
    // console.log(rawList)
    // console.log(rawList.length, rawList2.length)
    return rawList.map((item, inedx) => {
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

  filterBoardsData(rawList) {
    let list = [];
    for (const board of rawList) {
      list.push({
        id: "kw__" + board.name.toLowerCase(),
        name: board.name,
        bangid: String(board.id),
      });
    }
    return list;
  },
  async getBoards(retryNum = 0) {
    if (++retryNum > 3) return Promise.reject(new Error("try max num"));
    let response;
    try {
      response = await this.getBoardsData();
    } catch (error) {
      return this.getBoards(retryNum);
    }
    if (response.statusCode !== 200 || !response.body.tags)
      return this.getBoards(retryNum);

    const list = this.filterBoardsData(response.body.tags);
    //console.log('list',list)
    return {
      list,
      source: "kw",
    };
  },

  getList(id, page, filters, retryNum = 0) {
   // console.log('id',id,'page',page,'fitlexrs',filters);
    //if (++retryNum > 3) return Promise.reject(new Error("try max num"));
    // traitement du filters
   
    return this.getData(this.getUrl(page, this.limit, id, filters)).then(
      ({ statusCode, body }) => {
        if (statusCode !== 200 || !body.songs)
          return this.getList(id, page, filters, retryNum);
        // console.log(data1.musiclist, data2.data)
        let total = parseInt(body.total);
        let list = this.filterData(body.songs);
        return {
          total,
          list,
          limit: this.limit,
          page,
          source: "kw",
        };
      }
    ).catch(err => console.log('error',err));
  },

  // getDetailPageUrl(id) {
  //   return `http://www.kuwo.cn/rankList/${id}`
  // },
};
