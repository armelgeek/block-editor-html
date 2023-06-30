import { apiPrefix } from "@/config/constant";
import { timeout } from "../options";
import { httpFetch } from "../request";
export default {
  loginAuth(email: string, password: string) {
    const target_url = `${apiPrefix.baseUrl}/login`;
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
  refreshTokenAuth(token: any) {
    const target_url = `${apiPrefix.baseUrl}/refresh-token`;
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
  meInfo(formData: any, token: string) {
    const target_url = `${apiPrefix.baseUrl}/me`;
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
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }) => {
        const { message, token } = body;
        return Promise.resolve({
          message,
          token,
        });
      })
      .catch((err) => {
        console.log("erro auth", err);
        return Promise.reject(new Error("failed"));
      });
    return requestObj;
  },
  getMeInfo(token: string) {
    const target_url = `${apiPrefix.baseUrl}/me`;
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
  registerUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const target_url = `${apiPrefix.baseUrl}/register`;
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
    requestObj.promise = requestObj.promise
      .then(({ body, statusCode }) => {
        return Promise.resolve(body);
      })
      .catch((err) => Promise.reject(new Error(err.message)));
    return requestObj;
  },
  resetPassword(email: string) {
    const target_url = `10.0.2.2:8100/password/reset`;
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
  newPassword(email: string, code: string, newPassword: string) {
    const target_url = `${apiPrefix.baseUrl}/password/new`;
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
  codeVerification(email: string, code: string) {
    const target_url = `${apiPrefix.baseUrl}/password/reset/verify`;
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
  verifyAccount(code: string, password: string) {
    const target_url = `${apiPrefix.baseUrl}/verify`;
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
  regenerateVerifyCode(email: string) {
    const target_url = `${apiPrefix.baseUrl}/regenerate/verify/code`;
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
        ? `${apiPrefix.baseUrl}/user/list?q=${q}&page=${page}&limit=${limit}`
        : `${apiPrefix.baseUrl}/user/list?page=${page}&limit=${limit}`;
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
      return body;
    });
    return requestObj;
  },
};
