import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const {ScreenWidth} = Constants.Dimension;

const styles = StyleSheet.create({
  container: {},

  wrapperContent: {
    backgroundColor: Colors.white,
    borderRadius: scaleSize(7),
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(20),
  },
  title: {
    fontWeight: '600',
    fontSize: scaleFont(18),
  },
  inputView: {
    paddingVertical: scaleSize(10),
    marginLeft: scaleSize(0),
    marginRight: scaleSize(0),
    fontSize: scaleFont(14),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_475467,
    paddingHorizontal: scaleSize(15),
    marginTop: scaleSize(15),
    borderRadius: scaleSize(7),
  },

  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(15),
  },
  btnView: {
    borderRadius: scaleSize(7),
    padding: scaleSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  successView: {
    backgroundColor: 'rgba(3, 152, 85, 0.1)',
  },
  btnTxt: {
    fontWeight: '700',
    fontSize: scaleFont(16),
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
