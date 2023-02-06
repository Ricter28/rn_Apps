import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarHeader: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(50),
    marginBottom: scaleSize(5),
  },
  avatar: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(50),
  },
  cameraBtn: {
    position: 'absolute',
    bottom: scaleSize(0),
    right: scaleSize(0),
  },
  cameraIc: {
    width: scaleSize(20),
    height: scaleSize(20),
  },

  content: {
    marginHorizontal: scaleSize(15),
  },
  btnView: {
    borderRadius: scaleSize(50),
    paddingHorizontal: scaleSize(15),
    paddingVertical: Constants.isIOS ? scaleSize(15) : scaleSize(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(15),
    shadowColor: 'rgba(16, 24, 40, 0.3)',
    shadowOffset: {
      width: scaleSize(1),
      height: scaleSize(1),
    },
    shadowOpacity: 0.8,
    shadowRadius: scaleSize(3),
    elevation: scaleSize(5),
  },
  btnTxt: {
    fontWeight: '700',
    fontSize: scaleFont(16),
  },
  icNormalView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  successView: {
    backgroundColor: 'rgba(3, 152, 85, 0.1)',
    marginHorizontal: scaleSize(15),
    marginBottom: Constants.isIOS ? 0 : scaleSize(20),
  },
  successTxt: {
    paddingVertical: Constants.isIOS ? scaleSize(0) : scaleSize(5),
    color: Colors.Color_039855,
  },
});

export default styles;
