import { encryptMsg, decryptMsg } from './utils'
import * as modules from './modules'
// import { action as commonAction } from '../../../store/modules/common'
// import { getStore } from '../../../store'
import registerSyncListHandler from './syncList'
import log from '../log'
import { SYNC_CLOSE_CODE, SYNC_CODE } from '../../../config/constant'
import { aesEncrypt } from '../utils'
import { setSyncStatus } from '../../../core/sync'
import { dateFormat } from '../../../utils/common'

let status: LX.Sync.Status = {
  status: false,
  message: '',
}

export const sendSyncStatus = (newStatus: Omit<LX.Sync.Status, 'address'>) => {
  status.status = newStatus.status
  status.message = newStatus.message
  setSyncStatus(status)
}

export const sendSyncMessage = (message: string) => {
  status.message = message
  setSyncStatus(status)
}

const handleConnection = (socket: LX.Sync.Socket) => {
  for (const moduleInit of Object.values(modules)) {
    moduleInit(socket)
  }
}

const heartbeatTools = {
  failedNum: 0,
  maxTryNum: 100000,
  stepMs: 3000,
  pingTimeout: null as NodeJS.Timeout | null,
  delayRetryTimeout: null as NodeJS.Timeout | null,
  handleOpen() {
    console.log('open')
    // this.failedNum = 0
    this.heartbeat()
  },
  heartbeat() {
    if (this.pingTimeout) clearTimeout(this.pingTimeout)

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      client?.close()
    }, 30000 + 1000)
  },
  reConnnect() {
    if (this.pingTimeout) {
      clearTimeout(this.pingTimeout)
      this.pingTimeout = null
    }
    // client = null
    if (!client) return

    if (++this.failedNum > this.maxTryNum) {
      this.failedNum = 0
      throw new Error('connect error')
    }

    const waitTime = Math.min(2000 + Math.floor(this.failedNum / 2) * this.stepMs, 30000)

    // sendSyncStatus({
    //   status: false,
    //   message: `Waiting ${waitTime / 1000}s reconnnect...`,
    // })

    this.delayRetryTimeout = setTimeout(() => {
      this.delayRetryTimeout = null
      if (!client) return
      console.log(dateFormat(new Date()), 'reconnnect...')
      sendSyncStatus({
        status: false,
        message: `Try reconnnect... (${this.failedNum})`,
      })
      connect(client.data.urlInfo, client.data.keyInfo)
    }, waitTime)
  },
  clearTimeout() {
    if (this.delayRetryTimeout) {
      clearTimeout(this.delayRetryTimeout)
      this.delayRetryTimeout = null
    }
    if (this.pingTimeout) {
      clearTimeout(this.pingTimeout)
      this.pingTimeout = null
    }
  },
  connect(socket: LX.Sync.Socket) {
    console.log('heartbeatTools connect')
    socket.addEventListener('open', () => {
      this.handleOpen()
    })
    socket.addEventListener('message', ({ data }) => {
      if (data == 'ping') this.heartbeat()
    })
    socket.addEventListener('close', (event) => {
      // console.log(event.code)
      switch (event.code) {
        case SYNC_CLOSE_CODE.normal:
        case SYNC_CLOSE_CODE.failed:
          return
      }
      this.reConnnect()
    })
  },
}


let client: LX.Sync.Socket | null
// let listSyncPromise: Promise<void>
export const connect = (urlInfo: LX.Sync.UrlInfo, keyInfo: LX.Sync.KeyInfo) => {

}

export const disconnect = async() => {
  if (!client) return
  log.info('disconnecting...')
  client.close(SYNC_CLOSE_CODE.normal)
  client = null
  heartbeatTools.clearTimeout()
  heartbeatTools.failedNum = 0
}

export const getStatus = (): LX.Sync.Status => status
