import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16, 24, 40, 0.3)',
    shadowOffset: {
      width: scaleSize(0),
      height: scaleSize(0),
    },
    shadowOpacity: 0.7,
    shadowRadius: scaleSize(3),
    elevation: scaleSize(3),
    padding: scaleSize(15),
    marginVertical: scaleSize(15),
    marginHorizontal: scaleSize(15),
    borderRadius: scaleSize(15),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: scaleFont(14),
  },
  description: {
    fontWeight: '400',
    fontSize: scaleFont(12),
    color: Colors.Color_5D6B98,
    marginTop: scaleSize(3),
  },
  lineGray: {
    width: '100%',
    height: scaleSize(1),
    backgroundColor: Colors.Color_DCDFEA,
    marginVertical: scaleSize(15),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
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
  completedStatusView: {
    borderRadius: scaleSize(7),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_D0D5DD,
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(12),
  },
  completedStatusTxt: {
    fontWeight: '500',
    fontSize: scaleFont(12),
  },

  onProgressStatusView: {
    borderRadius: scaleSize(20),
    paddingVertical: scaleSize(9),
    paddingHorizontal: scaleSize(15),
    backgroundColor: 'rgba(3, 152, 85, 0.1)',
  },
  onProgressStatusTxt: {
    fontWeight: '500',
    fontSize: scaleFont(12),
    color: Colors.Color_039855,
  },

  opacityStyle: {
    opacity: 0.6,
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
