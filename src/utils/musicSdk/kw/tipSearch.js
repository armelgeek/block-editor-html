import { tokenRequest } from './util'
export default {
  regExps: {
    relWord: /RELWORD=(.+)/,
  },
  requestObj: null,
  async tempSearch(str) {
    this.cancelTempSearch()
    this.requestObj = await tokenRequest(`http://localhost:8100/songs?search=${encodeURIComponent(str)}`)
    return this.requestObj.promise.then(({ body, statusCode }) => {
      if (statusCode !== 200) return Promise.reject(new Error('请求失败'))
      return body
    })
  },
  handleResult(rawData) {
    return rawData.songs.map(info => info.title)
  },
  cancelTempSearch() {
    if (this.requestObj && this.requestObj.cancelHttp) this.requestObj.cancelHttp()
  },
  async search(str) {
    return this.tempSearch(str).then(result => this.handleResult(result))
  },
}
