import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F8FFFD,
  },

  emptyView: {
    height: scaleSize(50),
  },

  header: {
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(15),
  },
  title: {
    fontWeight: '700',
    fontSize: scaleFont(32),
    marginBottom: Constants.isAndroid ? 0 : scaleSize(5),
    marginTop: Constants.isAndroid ? scaleSize(10) : 0,
    color: Colors.black,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_B4B7B4,
  },
  lineSubTitle: {
    height: scaleSize(3),
    width: scaleSize(200),
    backgroundColor: Colors.Color_B4B7B4,
    opacity: 0.5,
  },
});

export default styles;
