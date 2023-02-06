import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  categoriesList: {
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(20),
  },
  item: {
    width: Constants.Dimension.ScreenWidth(0.65),
    height: Constants.isIOS ? scaleSize(185) : scaleSize(170),
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(15),
    marginHorizontal: scaleSize(11),
    borderRadius: scaleSize(24),
    shadowColor: 'rgba(16, 24, 40, 0.3)',
    shadowOffset: {
      width: scaleSize(5),
      height: scaleSize(5),
    },
    shadowOpacity: 0.5,
    shadowRadius: scaleSize(2),
    elevation: scaleSize(5),
  },

  itemOne: {
    backgroundColor: Colors.Color_7F56D9,
  },
  typeOneIconView: {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: scaleSize(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Color_53389E,
  },
  nameOne: {
    fontWeight: '600',
    fontSize: scaleFont(16),
    color: Colors.Color_FCFAFF,
    marginTop: Constants.isIOS ? scaleSize(14) : scaleSize(10),
  },
  totalProjectOne: {
    fontWeight: '400',
    fontSize: scaleFont(14),
    color: Colors.Color_F2F4F7,
    marginTop: scaleSize(4),
  },
  wrapperProgressView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  progressOne: {
    borderRadius: scaleSize(50),
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(5),
  },
  progressOneKey: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    color: Colors.white,
  },
  progressOneValue: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    color: Colors.white,
  },

  itemTwo: {
    backgroundColor: Colors.white,
  },
  typeTwoIconView: {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: scaleSize(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Color_da95b3,
  },
  nameTwo: {
    fontWeight: '600',
    fontSize: scaleFont(16),
    marginTop: scaleSize(14),
  },
  totalProjectTwo: {
    fontWeight: '400',
    fontSize: scaleFont(14),
    color: Colors.Color_7D89B0,
    marginTop: scaleSize(4),
  },
  progressTwo: {
    borderRadius: scaleSize(50),
  },
  progressTwoKey: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    color: Colors.Color_4A5578,
  },
  progressTwoValue: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    color: Colors.Color_4A5578,
  },

  emptyList: {
    height: Constants.isIOS ? scaleSize(185) : scaleSize(170),
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(15),
    margin: scaleSize(15),
    marginBottom: scaleSize(20),
    borderRadius: scaleSize(24),
    shadowColor: 'rgba(16, 24, 40, 0.3)',
    shadowOffset: {
      width: scaleSize(1),
      height: scaleSize(1),
    },
    shadowOpacity: 0.5,
    shadowRadius: scaleSize(2),
    elevation: scaleSize(5),
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noDataTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
    color: Colors.Color_DCDFEA,
  },
  createTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
    marginTop: scaleSize(20),
    color: Colors.Color_2D3748,
  },
});

export default styles;
