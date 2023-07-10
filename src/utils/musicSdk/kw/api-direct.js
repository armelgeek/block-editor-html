import { httpFetch } from '../../request'
import { timeout } from '../options'

export default {
  getMusicUrl(songInfo, type) {
    //console.log('direct');
    const target_url = `http://localhost:8100/youtube/stream?videoId=${songInfo.songmid}`
    const requestObj = httpFetch(target_url, {
      method: 'get',
      timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
    })
    requestObj.promise = requestObj.promise.then(({ body,statusCode }) => {
      // console.log(body)
     // if (statusCode != 200) return Promise.reject(new Error('failed'))

      return { type, url: body.url }
    })
    return requestObj
  },
}
