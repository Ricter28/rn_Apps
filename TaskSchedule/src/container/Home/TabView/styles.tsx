import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    marginTop: scaleSize(15),
    marginHorizontal: scaleSize(15),
  },

  tabs: {
    flex: 1,
    flexDirection: 'row',
  },

  tabBtn: {
    marginRight: scaleSize(15),
  },
  textActiveTab: {
    color: Colors.Color_6941C6,
    fontSize: scaleFont(12),
    fontWeight: '500',
  },
  textTab: {
    color: Colors.Color_7D89B0,
    fontSize: scaleFont(12),
    fontWeight: '500',
  },
});

export default styles;
