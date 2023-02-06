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
    flexDirection: 'row',
    alignItems: 'center',
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
  imgNextIc: {
    width: scaleSize(28),
    height: scaleSize(26),
  },

  statusTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: scaleSize(15),
  },
  statusBtn: {
    backgroundColor: Colors.white,
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    borderRadius: scaleSize(20),
    width: '30%',
    paddingVertical: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusActiveBtn: {
    backgroundColor: Colors.Color_DAF0D9,
    borderColor: Colors.Color_329901,
  },
  statusTxt: {
    fontWeight: '200',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  statusActiveTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
  },
});

export default styles;
