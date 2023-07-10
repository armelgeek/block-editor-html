import { getData, removeData, saveData } from "../plugins/storage";
import moment from "moment";
export const getItem = async (key: string) => {
  let data = (await getData(key)) as any;
  data = JSON.parse(data as any);
  if (data !== null && data.expireAt && new Date(data.expireAt) < new Date()) {
    await removeData(key);
    return true;
  }
  return false;
};
export const checkKeyExist = async (key: string) => {
  let value = await getData(key);
  return !!value;
};
export const hasExpired = async (key: string) => {
  let data = (await getData(key)) as any;
  if (
    data != undefined &&
    data.expireAt != undefined &&
    new Date(data.expireAt) < new Date()
  ) {
    console.log("ici has expired");
    return false;
  } else {
    console.log("ici not expired");
    return true;
  }
};
export const setItem = async (
  key: string,
  value: any,
  expireInMinutes: number,
  callback: any
) => {
  const expireAt = getExpireDate(expireInMinutes);
  const data = { value: value, expireAt: expireAt } as any;
  let inMemory = (await getData(key)) as any;
  if (inMemory != null) {
  }
  if (inMemory != null) {
    console.log("exist", key,inMemory, 'now', new Date(), 'expire_at',new Date(inMemory.expireAt));
    if (moment().isBefore(moment(inMemory.expireAt))) {
      console.log("pas encore expired pour", key);
    } else {
      console.log("has expired so set new value", key);
      await removeData(key);
      await saveData(key, data);
      callback();
    }
  } else {
    console.log("not exist", key);
    saveData(key, data);
    callback();
  }
};

export const removeItem = (key: string) => {
  return removeData(key);
};

export const getExpireDate = (expireInMinutes: number) => {
  const now = new Date();
  const expireTime = new Date(now);
  console.log('expireInMinutes',now.getMinutes() + expireInMinutes);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
};
