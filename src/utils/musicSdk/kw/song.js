import { httpFetch } from "../../request";
import { requestMsg } from "../../message";
import { headers, timeout } from "../options";

const song = {
  get(id) {
    const requestObj = httpFetch(`http://localhost:8100/songs/${id}`, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      // console.log('body', body);
      return statusCode == 200
        ? Promise.resolve({ data: body })
        : Promise.reject(new Error(requestMsg.fail));
    });
    return requestObj;
  },
  set(songId, data, token) {
    const url = songId
      ? `http://localhost:8100/songs/${songId}`
      : "http://localhost:8100/songs";
    const requestObj = httpFetch(url, {
      method: songId ? "put" : "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return body;
    });
    return requestObj;
  },
  setViews(songId) {
    const url = `http://localhost:8100/songs/popularity/${songId}`;
    const requestObj = httpFetch(url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      }
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      //console.log('body',body);
      return body;
    });
    return requestObj;
  },
  remove(songId,token) {
    const url = `http://localhost:8100/songs/${songId}`;
    const requestObj = httpFetch(url, {
      method: "delete",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        'Authorization': `Bearer ${token}`,
      }
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return body;
    });
    return requestObj;
  },
  check(songmid) {
    const url = `http://localhost:8100/exists/songs?songmid=${songmid}`;
    const requestObj = httpFetch(url, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      }
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return body.exists;
    }).catch(err =>{
      console.log('err',err);
      return false;
    });
    return requestObj;
  }
};

export default song;
