import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99999,
    margin: 0,
  },

  wrapperContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default styles;
