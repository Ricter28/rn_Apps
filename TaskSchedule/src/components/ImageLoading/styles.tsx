import {StyleSheet} from 'react-native';

import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
  },

  viewLoading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: scaleSize(30),
    height: scaleSize(30),
  },

  image: {
    height: scaleSize(24),
    width: scaleSize(24),
  },
});

export default styles;
