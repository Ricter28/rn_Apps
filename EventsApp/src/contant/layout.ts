import { Dimensions, Platform, StatusBar } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const layout = {
  width: width,
  heightScreen: Dimensions.get("screen").height,
  widthScreen: Dimensions.get("screen").width,
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  paddingContent: 18,
  paddingHorizontal: 20,
  isPad: Platform.OS === "ios" && Platform.isPad,
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 5,
  },
  shadowLight: {
    shadowColor: "#96C78F",
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.0,

    elevation: 2,
  },
  statusbarHeight:
    Platform.OS == "ios" ? getStatusBarHeight() : StatusBar.currentHeight,
  bottomHeight:
    Platform.OS == "ios" ? getBottomSpace(): 0,
};
export default layout;
