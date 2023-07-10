//import RNFetchBlob from "rn-fetch-blob";
import { httpFetch } from "../../request";
import { timeout } from "../options";
export default {
  loginAuth(email, password) {
    const target_url = `http://localhost:8100/login`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, password },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      //console.log('body',body);
      return statusCode == 200
        ? Promise.resolve({
            accessToken: body.accessToken,
            refreshToken: body.refreshToken,
            isVerified: body.isVerified,
          })
        : Promise.reject({
            statusCode: statusCode,
            message: body.message,
          });
    });
    return requestObj;
  },
  refreshTokenAuth(token) {
    const target_url = `http://localhost:8100/refresh-token`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: {
        refreshToken: token,
      },
    });
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }) => {
        const { token } = body;
        return { accessToken: token };
      })
      .catch((err) => {
        //console.log(err);
      });
    return requestObj;
  },
  meInfo(formData, token) {
    const target_url = `http://localhost:8100/me`;
    const requestObj = httpFetch(target_url, {
      method: "put",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      body: {
        email: formData.email,
        name: formData.name,
      },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      const { message, token } = body;
        return Promise.resolve({
          message,
          token,
        });
    }).catch(err =>{
      console.log('erro auth',err);
      return Promise.reject(new Error("failed"));
    });
    return requestObj;
  },
  getMeInfo(token) {
    const target_url = `http://localhost:8100/me`;
    //console.log('get user',token);
    const requestObj = httpFetch(target_url, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      //if (statusCode != 200) return Promise.reject(new Error("failed"));
      return body;
    });
    return requestObj;
  },
  updateAvatar({ fileName, uri }, token) {
    const apiUrl = "http://localhost:8100/profilePicture";
    /**return RNFetchBlob.fetch(
      "PUT",
      apiUrl,
      {
        "Content-Type": "multipart/form-data",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Authorization: `Bearer ${token}`,
      },
      [
        {
          name: "photo",
          filename: fileName,
          type: "image/jpeg",
          data: RNFetchBlob.wrap(uri),
        },
      ]
    );**/
  },
  registerUser(username, email, password, confirmPassword) {
    const target_url = `http://localhost:8100/register`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { username, email, password, confirmPassword },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return Promise.resolve(body)
    }).catch(err => Promise.reject(new Error(err.message)));
    return requestObj;
  },
  resetPassword(email) {
    const target_url = `http://localhost:8100/password/reset`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return body;
    });
    return requestObj;
  },
  newPassword(email, code, newPassword) {
    const target_url = `http://localhost:8100/password/new`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, code, newPassword },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return body;
    });
    return requestObj;
  },
  codeVerification(email, code) {
    const target_url = `http://localhost:8100/password/reset/verify`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email, code },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  verifyAccount(code, password) {
    const target_url = `http://localhost:8100/verify`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { code, password },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  regenerateVerifyCode(email) {
    const target_url = `http://localhost:8100/regenerate/verify/code`;
    const requestObj = httpFetch(target_url, {
      method: "post",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
      body: { email },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      return statusCode == 200
        ? Promise.resolve(body)
        : Promise.reject(new Error(body.message));
    });
    return requestObj;
  },
  getUserLists(q = "", page = 1, limit = 10) {
    const target_url =
      q != ""
        ? `http://localhost:8100/user/list?q=${q}&page=${page}&limit=${limit}`
        : `http://localhost:8100/user/list?page=${page}&limit=${limit}`;
    const requestObj = httpFetch(target_url, {
      method: "get",
      timeout,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0",
      },
    });
    requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
      // if (statusCode != 200) return Promise.reject(new Error("failed"));
      return body;
    });
    return requestObj;
  },
};
