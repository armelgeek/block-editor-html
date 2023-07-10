//import { Alert } from 'react-native'
// import { exitApp } from '../../utils/common'
//import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import { log } from '../utils/log'

const errorHandler = (e: Error, isFatal: boolean) => {
  if (isFatal) {
    alert('💥Unexpected error occurred💥')
  }
  log.error(e.stack)
}

if (process.env.NODE_ENV !== 'development') {
  //setJSExceptionHandler(errorHandler)

  /**setNativeExceptionHandler((errorString) => {
    log.error(errorString)
   // console.log('+++++', errorString, '+++++')
  }, false)**/
}
