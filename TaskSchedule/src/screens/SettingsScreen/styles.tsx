import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    marginVertical: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarHeader: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(50),
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
  joinAtTxt: {
    fontWeight: '400',
    fontSize: scaleFont(14),
    color: Colors.Color_DCDFEA,
    marginTop: scaleSize(10),
  },

  content: {
    marginHorizontal: scaleSize(15),
  },
  btnView: {
    borderRadius: scaleSize(50),
    padding: scaleSize(15),
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
  icNormalTxt: {
    color: Colors.black,
  },
  iconStyle: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  successView: {
    backgroundColor: 'rgba(3, 152, 85, 0.1)',
  },
  successTxt: {
    color: Colors.Color_039855,
  },
  normalView: {
    backgroundColor: Colors.Color_F5F5F5,
  },
  normalTxt: {
    color: Colors.Color_7D89B0,
  },
});

export default styles;
