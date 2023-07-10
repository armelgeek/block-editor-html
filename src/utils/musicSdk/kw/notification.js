import { httpFetch } from '../../request'
import { timeout } from '../options'

export default {
    ping() {
        const target_url = `http://localhost:8100/notification`
        const requestObj = httpFetch(target_url, {
            method: 'post',
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
            },
            body: { parm: '' }
        })
        requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
           // if (statusCode != 200) return Promise.reject(new Error('failed'))
           // const { accessToken, refreshToken } = body;
           return body;
        }).catch(err =>{
            //console.log(err);
        })
        return requestObj
    }
}

