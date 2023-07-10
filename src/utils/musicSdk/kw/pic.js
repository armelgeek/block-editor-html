import { httpFetch } from '../../request'

export default {
  getPic({ songmid }) {
   // const requestObj = httpFetch(`https://i.ytimg.com/vi/${songmid}/hqdefault.jpg`)
   const requestObj = httpFetch(`http://localhost:8100/uploads/1ff25019e9a2f318d58d9bf9efbb03df-rn_image_picker_lib_temp_db07cd35-392e-4b9c-9eef-e1135acfc0fe.jpg`)
    requestObj.promise = requestObj.promise.then(({ body }) => /^http/.test(body) ? body : null)
    return requestObj.promise
  },
}
