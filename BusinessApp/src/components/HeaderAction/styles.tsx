import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleSize, scaleFont} from 'common/mixins';
import {getMarginTopHeaderBar} from 'utils/StatusBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(10),
    marginTop: getMarginTopHeaderBar(),
  },

  leftContainer: {
    width: scaleSize(65),
    zIndex: 3,
  },

  centerContainer: {},
  arrowLeftBtn: {
    width: scaleSize(34),
    height: scaleSize(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icBack: {
    width: scaleSize(18),
    height: scaleSize(18),
  },

  textTitle: {
    fontWeight: '700',
    fontSize: scaleFont(24),
    color: Colors.black,
    // fontFamily: Constants.fontFamilyBold,
  },

  rightContainer: {
    width: scaleSize(65),
    alignItems: 'flex-end',
  },
});

export default styles;
