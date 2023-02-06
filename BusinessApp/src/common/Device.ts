import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const { width, height } = Dimensions.get('window')

const hasNotch = DeviceInfo.hasNotch()

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  (height >= 812 || width >= 812)

export default {
  isIphoneX,
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 50 : 30) : (hasNotch ? 0 : 35),
  HeaderHeight: Platform.OS === 'ios' ? (isIphoneX ? 44 : 44) : 56,
}
