import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const {ScreenWidth} = Constants.Dimension;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleSize(10),
    width: '100%',
    backgroundColor: Colors.Color_F8FFFD,
  },

  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    height: scaleSize(4),
    backgroundColor: Colors.Color_329901,
    width: ScreenWidth(0.3),
  },

  btnTab: {
    width: ScreenWidth(0.3),
  },
  viewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textActiveTab: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: scaleFont(16),
  },
  textTab: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scaleFont(16),
    opacity: 0.6,
  },
});

export default styles;
