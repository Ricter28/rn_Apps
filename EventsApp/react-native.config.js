const VECTOR_ICONS_FONTS_PATH =
  "./node_modules/react-native-vector-icons/Fonts";
const VECTOR_FONTS = [
  "Entypo.ttf",
  "AntDesign.ttf",
  "EvilIcons.ttf",
  "Feather.ttf",
  "FontAwesome.ttf",
  "FontAwesome5_Brands.ttf",
  "FontAwesome5_Regular.ttf",
  "FontAwesome5_Solid.ttf",
  "Fontisto.ttf",
  "Foundation.ttf",
  "Ionicons.ttf",
  "MaterialCommunityIcons.ttf",
  "MaterialIcons.ttf",
  "Octicons.ttf",
  "SimpleLineIcons.ttf",
  "Zocial.ttf",

  "Inter-SemiBold.ttf",
  "Inter-Thin.ttf",
  "Optima Medium.ttf",
  // "OPTIMA_B.ttf",
  "Optima_Italic.ttf",
  // "OPTIMA.ttf",
  "Inter-Black.ttf",
  "Inter-Bold.ttf",
  "Inter-ExtraBold.ttf",
  "Inter-ExtraLight.ttf",
  "Inter-Light.ttf",
  "Inter-Medium.ttf",
  "Inter-Regular.ttf",
];

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./src/assets/fonts/"],
  dependencies: {
    // Disable auto linking for `react-native-vector-icons` and link
    // the required fonts manually to avoid duplicate resources issue in iOS.
    "react-native-vector-icons": {
      platforms: {
        ios: null,
        android: null,
      },
      assets: VECTOR_FONTS.map((font) => VECTOR_ICONS_FONTS_PATH + "/" + font),
    },
  },
};
