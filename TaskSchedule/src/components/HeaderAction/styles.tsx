import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(10),
  },

  leftContainer: {
    width: scaleSize(65),
    zIndex: 3,
  },

  centerContainer: {},
  arrowLeftBtn: {
    width: scaleSize(34),
    height: scaleSize(34),
    borderRadius: scaleSize(20),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DCDFEA,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icBack: {
    width: scaleSize(18),
    height: scaleSize(18),
  },

  textTitle: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    // fontFamily: Constants.fontFamilyBold,
  },

  rightContainer: {
    width: scaleSize(65),
    alignItems: 'flex-end',
  },
});

export default styles;
