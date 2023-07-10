import { httpFetch } from '../../request'
import { headers, timeout } from '../options'

const api_temp = {
  getMusicUrl(songInfo, type) {
   // console.log('temp',songInfo);
    const requestObj = httpFetch(`http://localhost:8100/youtube/stream?videoId=${songInfo.songmid}`, {
      method: 'get',
      headers,
      timeout,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body,statusCode }) => {
      return statusCode == 200 ? Promise.resolve({ type, url: body.url }) : Promise.reject(new Error(body.msg))
    })
    return requestObj
  },
}

export default api_temp
