//import { NativeModules } from 'react-native'

//const { UtilsModule } = NativeModules

export const exitApp = null

export const getSupportedAbis = null

export const installApk = (filePath: string, fileProviderAuthority: string) => {}


export const screenkeepAwake = () => {
  if (global.lx.isScreenKeepAwake) return
  global.lx.isScreenKeepAwake = true
 // UtilsModule.screenkeepAwake()
}
export const screenUnkeepAwake = () => {
  // console.log('screenUnkeepAwake')
  if (!global.lx.isScreenKeepAwake) return
  global.lx.isScreenKeepAwake = false
 // UtilsModule.screenUnkeepAwake()
}

export const getWIFIIPV4Address = function (){} as () => Promise<string>

export const getDeviceName = async() => {
 // return UtilsModule.getDeviceName().then((deviceName: string) => deviceName || 'Unknown')
}

export const isNotificationsEnabled = function (){}  as () => Promise<boolean>

export const openNotificationPermissionActivity = function (){}  as () => Promise<void>

export const shareText = async(shareTitle: string, title: string, text: string): Promise<void> => {
  //UtilsModule.shareText(shareTitle, title, text)
}

export const writeFile = async(filePath: string, data: string): Promise<void> => {
 // return UtilsModule.writeStringToFile(filePath, data)
}
export const readFile = async(filePath: string)=> {
  //return UtilsModule.getStringFromFile(filePath)
}
export const getSystemLocales = async() => {
  //return UtilsModule.getSystemLocales()
}
