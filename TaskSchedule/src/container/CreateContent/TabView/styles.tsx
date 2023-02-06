import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const {ScreenWidth} = Constants.Dimension;

const styles = StyleSheet.create({
  container: {
    marginTop: scaleSize(10),
  },

  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    height: scaleSize(4),
    backgroundColor: Colors.Color_5D6B98,
    width: ScreenWidth(0.44),
  },

  btnTab: {
    width: ScreenWidth(0.44),
  },
  viewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textActiveTab: {
    color: 'black',
    fontWeight: '500',
    fontSize: scaleFont(16),
  },
  textTab: {
    color: 'gray',
    fontWeight: '500',
    fontSize: scaleFont(16),
    opacity: 0.6,
  },
});

export default styles;
