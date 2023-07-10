import { httpFetch } from '../../request'

export default {
  _requestObj: null,
  async getList(retryNum = 0) {
    if (this._requestObj) this._requestObj.cancelHttp()
    if (retryNum > 2) return Promise.reject(new Error('try max num'))

    const _requestObj = httpFetch('http://localhost:8100/popular/songs', {
      headers: {
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9;)',
      },
    })
    const { body, statusCode } = await _requestObj.promise
    //if (statusCode != 200 || body.status !== 'ok') throw new Error('获取热搜词失败')
     //console.log(body, statusCode)
    return { source: 'kw', list: body }
  },
  filterList(rawList) {
    return rawList.map(item => item.key)
  },
}
