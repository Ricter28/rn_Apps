import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const Constants = {
  appStoreId: '',
  bundleId: '',
  appsflyerKey: '',
  firebaseConfig: {},
  appFacebookId: '',
  googlePlacesApiBaseUrl: '',
  googleApiKey: '',
  GOOGLE_PACES_API_BASE_URL: '',
  apiKey: '2d886d1639fa43688b7a81326fb76f23',
  Language: 'en', // ar, en. Default to set redux. Only use first time
  VND: '₫',
  fontFamily: '',
  fontFamilyBold: '',
  fontHeader: 'verdana',
  fontHeaderAndroid: 'verdana',
  isoDateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'DD-MM-YYYY',
  allCategorySlug: 'show-all-category',
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  Filter: {
    maxPrice: 1000000,
    minPrice: 0,
    defaultPrice: 50000,
    priceStep: 10000,
  },
  AsyncCode: {
    Intro: 'async.intro',
  },
  EmitCode: {
    Toast: 'toast',
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent;
    },
  },
  Window: {
    width,
    height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },
  PostImage: {
    small: 'small',
    medium: 'medium',
    medium_large: 'medium_large',
    large: 'large',
  },
  tagIdBanner: 273, // cat ID for Sticky Products
  pagingLimit: 16,
  fontText: {
    size: 16,
  },
  productAttributeColor: 'color',
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const keyAsyncStorage = {
  TOKEN: 'TOKEN',
};

export default Constants;
