//import { NativeModules } from 'react-native'

//const { CacheModule } = NativeModules

export const getAppCacheSize = async(): Promise<number> =>  12000000
export const clearAppCache = function (){} as () => Promise<void>
