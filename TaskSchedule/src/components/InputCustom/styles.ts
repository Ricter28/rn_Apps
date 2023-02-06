import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    marginLeft: scaleSize(10),
    marginRight: scaleSize(15),
    fontWeight: '500',
    fontSize: scaleFont(16),
  },
  error: {
    color: Colors.error,
    fontWeight: '400',
    fontSize: scaleFont(13),
    marginHorizontal: scaleSize(15),
    marginTop: scaleSize(3),
  },
});

export default styles;
