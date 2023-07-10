import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
import { headers, timeout } from '../options'

const youtube = {
    search(q) {
        const requestObj = httpFetch(`http://localhost:8100/youtube/search?q=${q.trim()}`, {
            method: 'get',
            timeout,
            headers: {
                'Content-Type':'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
            }
        })
        requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
            //console.log('body',body.videos);
            return statusCode == 200 ? Promise.resolve({ videos: body.videos.map((video) => ({ ...video, isSelected: false })) }) : Promise.reject(new Error(requestMsg.fail))
        })
        return requestObj
    },
}

export default youtube
