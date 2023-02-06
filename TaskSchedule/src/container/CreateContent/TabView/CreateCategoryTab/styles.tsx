import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: scaleSize(15),
  },

  titleTypeTxt: {
    fontWeight: '500',
    fontSize: scaleFont(14),
    color: Colors.Color_5D6B98,
    marginTop: scaleSize(22),
    marginBottom: scaleSize(7),
  },

  nameTxt: {
    fontWeight: '600',
    fontSize: scaleFont(20),
  },

  btnView: {
    paddingVertical: scaleSize(10),
    marginLeft: scaleSize(0),
    marginRight: scaleSize(0),
    fontWeight: '600',
    fontSize: scaleFont(20),
  },
  iconStyle: {
    width: scaleSize(20),
    height: scaleSize(20),
  },

  descriptionTxt: {
    fontWeight: '500',
    fontSize: scaleFont(14),
  },
  descriptionInput: {
    fontWeight: '500',
    fontSize: scaleFont(14),
    height: scaleSize(50),
  },

  time: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  activeClockIcon: {
    width: scaleSize(16),
    height: scaleSize(16),
  },
  timeTxt: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    marginLeft: scaleSize(7),
  },

  footer: {
    marginHorizontal: scaleSize(15),
    marginBottom: scaleSize(10),
  },
  onProgressStatusView: {
    borderRadius: scaleSize(20),
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(15),
    backgroundColor: 'rgba(3, 152, 85, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  onProgressStatusTxt: {
    fontWeight: '500',
    fontSize: scaleFont(14),
    color: Colors.Color_039855,
  },

  item: {
    backgroundColor: Colors.Color_F9F9FB,
    flexDirection: 'row',
    marginTop: scaleSize(15),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(20),
    borderRadius: scaleSize(10),
  },
  icItem: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  circleIcItem: {
    width: scaleSize(20),
    height: scaleSize(20),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_98A2B3,
    borderRadius: scaleSize(10),
  },
  nameItem: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    marginLeft: scaleSize(10),
  },

  addNameBtn: {
    backgroundColor: Colors.Color_F9F9FB,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(15),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(20),
    borderRadius: scaleSize(10),
  },
  addName: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_B9C0D4,
  },
});

export default styles;
