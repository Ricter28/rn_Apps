import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  monthSelectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(20),
    marginHorizontal: scaleSize(15),
  },
  monthSelectTxt: {
    fontWeight: '500',
    fontSize: scaleFont(24),
  },
  arrowDownIc: {
    width: scaleSize(20),
    height: scaleSize(20),
  },

  dateSelectView: {
    flexDirection: 'row',
  },
  dateTxt: {
    fontWeight: '400',
    fontSize: scaleFont(14),
    color: Colors.Color_5D6B98,
  },
  dateBtn: {
    alignItems: 'center',
    marginHorizontal: scaleSize(8),
  },
  circleDayView: {
    borderColor: Colors.Color_EAECF05,
    borderWidth: scaleSize(1),
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  dayTxt: {
    fontWeight: '500',
    fontSize: scaleFont(17),
    color: Colors.Color_111322,
  },

  dateActiveBtn: {
    alignItems: 'center',
    marginHorizontal: scaleSize(8),
  },
  circleDayActiveView: {
    backgroundColor: Colors.Color_6941C6,
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
    borderColor: Colors.Color_6941C6,
    borderWidth: scaleSize(1),
  },
  dayActiveTxt: {
    fontWeight: '500',
    fontSize: scaleFont(17),
    color: Colors.white,
  },

  titleContentTxt: {
    color: Colors.Color_111322,
    fontWeight: '600',
    fontSize: scaleFont(18),
    marginHorizontal: scaleSize(15),
    marginTop: scaleSize(20),
  },

  taskList: {
    paddingHorizontal: scaleSize(15),
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: scaleSize(20),
  },
  leftItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startTime: {
    fontWeight: '500',
    fontSize: scaleFont(14),
  },
  startTimeType: {
    fontWeight: '500',
    fontSize: scaleFont(14),
  },

  rightItem: {
    width: Constants.Dimension.ScreenWidth(0.75),
    padding: scaleSize(15),
    borderRadius: scaleSize(15),
  },
  titleItem: {
    color: Colors.Color_111322,
    fontWeight: '700',
    fontSize: scaleFont(16),
    marginBottom: scaleSize(10),
  },
  descriptionItem: {
    color: Colors.Color_4A5578,
    fontWeight: '400',
    fontSize: scaleFont(12),
    marginBottom: scaleSize(10),
  },
  time: {
    color: Colors.Color_111322,
    fontWeight: '500',
    fontSize: scaleFont(13),
  },

  separatorItem: {
    height: scaleSize(1),
    backgroundColor: Colors.Color_DCDFEA,
  },
});

export default styles;
