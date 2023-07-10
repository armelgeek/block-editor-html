//import AsyncStorage from '@react-native-async-storage/async-storage'
import { log } from '../utils/log'

const partKeyPrefix = '@___PART___'
const partKeyPrefixRxp = /^@___PART___/
const keySplit = ','
const limit = 500000


export const multiRemove = async (keys:any) => {
  try {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  } catch (e) {
    console.error('Storage error [multiRemove]:', e);
    throw e;
  }
};

export const multiGet = async (keys:any) => {
  try {
    const data = [];
    for (const key of keys) {
      // @ts-ignore
      const value = JSON.parse(localStorage.getItem(key));
      data.push([key, value ? JSON.parse(value) : null]);
    }
    return data;
  } catch (e) {
    console.error('Storage error [multiGet]:', e);
    throw e;
  }
};

export const multiSet = async (data:any) => {
  try {
    for (const [key, value] of data) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error('Storage error [multiSet]:', e);
    throw e;
  }
};
export const getKeys = async () => {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys;
  } catch (e) {
    console.error('Storage error [getAllKeys]:', e);
    throw e;
  }
};

const buildData = (key: string, value: any, datas: Array<[string, string]>) => {
  let valueStr = JSON.stringify(value)
  if (valueStr.length <= limit) {
    datas.push([key, valueStr])
    return
  }

  const partKeys = []
  for (let i = 0, len = Math.floor(valueStr.length / limit); i <= len; i++) {
    let partKey = `${partKeyPrefix}${key}${i}`
    partKeys.push(partKey)
    datas.push([partKey, valueStr.substring(i * limit, (i + 1) * limit)])
  }
  datas.push([key, `${partKeyPrefix}${partKeys.join(keySplit)}`])
}

const handleGetData = async<T>(partKeys: string)=> {
  const keys = partKeys.replace(partKeyPrefixRxp, '').split(keySplit)
  return multiGet(keys).then(datas => {
    return JSON.parse(datas.map(data => data[1]).join(''))
  })
}

export const saveData = async(key: string, value: any) => {
  const datas: Array<[string, string]> = []
  buildData(key, value, datas)

  try {
    await multiSet(datas)
  } catch (e: any) {
    // saving error
    log.error('storage error[saveData]:', key, e.message)
    throw e
  }
}

export const getData = async<T = unknown>(key: string) => {
  let value: string | null
  try {
    console.log('get item key');
    // @ts-ignore
    value = JSON.parse(localStorage.getItem(key));
  } catch (e: any) {
    // error reading value
    log.error('storage error[getData]:', key, e.message)
    throw e
  }
  if (value && partKeyPrefixRxp.test(value)) {
    return handleGetData<T>(value)
  } else if (value == null) return value
  return JSON.parse(value)
}

export const removeData = async(key: string) => {
  let value: string | null
  try {
    console.log('remove data key');
    value = localStorage.getItem(key)
  } catch (e: any) {
    // error reading value
    log.error('storage error[removeData]:', key, e.message)
    throw e
  }
  if (value && partKeyPrefixRxp.test(value)) {
    let partKeys = value.replace(partKeyPrefixRxp, '').split(keySplit)
    partKeys.push(key)
    try {
      await multiRemove(partKeys)
    } catch (e: any) {
      // remove error
      log.error('storage error[removeData]:', key, e.message)
      throw e
    }
  } else {
    try {
      console.log('removeItem key');
      localStorage.removeItem(key)
    } catch (e: any) {
      // remove error
      log.error('storage error[removeData]:', key, e.message)
      throw e
    }
  }
}

export const getAllKeys = async() => {
  let keys
  try {
    keys = await getKeys()
  } catch (e: any) {
    // read key error
    log.error('storage error[getAllKeys]:', e.message)
    throw e
  }

  return keys
}


export const getDataMultiple = async<T extends readonly string[]>(keys: T) => {
  type RawData = { [K in keyof T]: [T[K], string | null] }
  let datas: RawData
  try {
    console.log('getDataMultiple data');
    datas = await multiGet(keys) as RawData
  } catch (e: any) {
    // read error
    log.error('storage error[getDataMultiple]:', e.message)
    throw e
  }
  const promises: Array<Promise<ReadonlyArray<[unknown | null]>>> = []
  for (const [key, value] of datas) {
    if (value && partKeyPrefixRxp.test(value)) {
      promises.push(handleGetData(value))
    } else {

      if(typeof value != null){

        // @ts-ignore
       promises.push(Promise.resolve(typeof value== 'object' ? (value!= "" ? value : JSON.parse(value))  : value))
      }
    }
  }
  return Promise.all(promises).then(values => {
    return datas.map(([key], index) => ([key, values[index]])) as { [K in keyof T]: [T[K], unknown] }
  })
}

export const saveDataMultiple = async(datas: Array<[string, any]>) => {
  const allData: Array<[string, string]> = []
  for (const [key, value] of datas) {
    buildData(key, value, allData)
  }
  try {
    await multiSet(allData)
  } catch (e: any) {
    // save error
    log.error('storage error[saveDataMultiple]:', e.message)
    throw e
  }
}


export const removeDataMultiple = async(keys: string[]) => {
  if (!keys.length) return
  const datas = await multiGet(keys)
  let allKeys = []
  for (const [key, value] of datas) {
    allKeys.push(key)
    if (value && partKeyPrefixRxp.test(value)) {
      allKeys.push(...value.replace(partKeyPrefixRxp, '').split(keySplit))
    }
  }
  try {
    await multiRemove(allKeys)
  } catch (e: any) {
    // remove error
    log.error('storage error[removeDataMultiple]:', e.message)
    throw e
  }
}

export const clearAll = async() => {
  try {
    console.log('clear key');
    localStorage.clear()
  } catch (e: any) {
    // clear error
    log.error('storage error[clearAll]:', e.message)
    throw e
  }
}

//export { useAsyncStorage } from '@react-native-async-storage/async-storage'
