import { request, generateRsaKey } from './utils'
import { getSyncAuthKey, setSyncAuthKey } from '../data'
import { SYNC_CODE } from '../../../config/constant'
import log from '../log'
import { aesDecrypt, aesEncrypt, rsaDecrypt } from '../utils'
import { getDeviceName } from '../../../utils/nativeModules/utils'

const hello = async(urlInfo: LX.Sync.UrlInfo) => request(`${urlInfo.httpProtocol}//${urlInfo.hostPath}/hello`)
  .then(({ text }) => text == SYNC_CODE.helloMsg)
  .catch((err: any) => {
    log.error('[auth] hello', err.message)
    //console.log(err)
    return false
  })

const getServerId = async(urlInfo: LX.Sync.UrlInfo) => request(`${urlInfo.httpProtocol}//${urlInfo.hostPath}/id`)
  .then(({ text }) => {
    if (!text.startsWith(SYNC_CODE.idPrefix)) return ''
    return text.replace(SYNC_CODE.idPrefix, '')
  })
  .catch((err: any) => {
    log.error('[auth] getServerId', err.message)
    console.log(err)
    throw err
  })

const codeAuth = async(urlInfo: LX.Sync.UrlInfo, serverId: string, authCode: string) => {
  
}

const keyAuth = async(urlInfo: LX.Sync.UrlInfo, keyInfo: LX.Sync.KeyInfo) => {

}

const auth = async(urlInfo: LX.Sync.UrlInfo, serverId: string, authCode?: string) => {
  if (authCode) return codeAuth(urlInfo, serverId, authCode)
  const keyInfo = await getSyncAuthKey(serverId)
  if (!keyInfo) throw new Error(SYNC_CODE.missingAuthCode)
  await keyAuth(urlInfo, keyInfo)
  return keyInfo
}

export default async(urlInfo: LX.Sync.UrlInfo, authCode?: string) => {
  console.log('connect: ', urlInfo.href, authCode)
  if (!await hello(urlInfo)) throw new Error(SYNC_CODE.connectServiceFailed)
  const serverId = await getServerId(urlInfo)
  if (!serverId) throw new Error(SYNC_CODE.getServiceIdFailed)
  return auth(urlInfo, serverId, authCode)
}
