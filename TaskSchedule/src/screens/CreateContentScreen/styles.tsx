import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  emptyView: {
    height: scaleSize(50),
  },
});

export default styles;
