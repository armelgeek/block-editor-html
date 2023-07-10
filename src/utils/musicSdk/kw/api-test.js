import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
import { headers, timeout } from '../options'

const api_test = {
  // getMusicUrl(songInfo, type) {
  //   const requestObj = httpFetch(`http://45.32.53.128:3002/m/kw/u/${songInfo.songmid}/${type}`, {
  //     method: 'get',
  //     headers,
  //     timeout,
  //   })
  //   requestObj.promise = requestObj.promise.then(({ body }) => {
  //     return body.code === 0 ? Promise.resolve({ type, url: body.data }) : Promise.reject(new Error(body.msg))
  //   })
  //   return requestObj
  // },
  getMusicUrl(songInfo, type) {
    //console.log('test');
    const requestObj = httpFetch(`http://localhost:8100/youtube/stream?videoId=${songInfo.songmid}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return statusCode == 200 ? Promise.resolve({ type, url: body.url }) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  },
}

export default api_test
