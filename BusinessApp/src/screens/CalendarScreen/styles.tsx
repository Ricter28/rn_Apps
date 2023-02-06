import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F8FFFD,
  },

  line: {
    height: scaleSize(1),
    backgroundColor: Colors.Color_B4B7B4,
    marginVertical: scaleHeightSize(20),
    opacity: 0.6,
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
    marginBottom: Constants.isAndroid ? scaleSize(10) : scaleSize(5),
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

  dateSelectView: {
    flexDirection: 'row',
    marginTop: scaleSize(15),
  },
  dateBtn: {
    alignItems: 'center',
    marginLeft: scaleSize(15),
    width: scaleSize(40),
    height: scaleSize(40),
  },

  titleContentTxt: {
    color: Colors.Color_111322,
    fontWeight: '700',
    fontSize: scaleFont(18),
    marginHorizontal: scaleSize(15),
  },
  taskList: {
    marginTop: scaleSize(15),
  },
  item: {
    height: Constants.isIOS ? scaleHeightSize(160) : scaleHeightSize(170),
    marginHorizontal: scaleSize(15),
    marginBottom: scaleSize(15),
    paddingVertical: scaleSize(15),
    paddingHorizontal: scaleSize(10),
    borderRadius: scaleSize(24),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_329901,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  titleTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  descriptionTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_375337,
    marginTop: scaleSize(3),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dateTime: {},
  timeTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    marginBottom: scaleSize(3),
    color: Colors.black,
  },
  dateItemTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_329901,
  },
  dateTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.Color_B4B7B4,
  },
  dateActiveTxt: {
    color: Colors.black,
  },
  moreBtn: {
    backgroundColor: Colors.Color_D9D9D9,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(4),
    borderRadius: scaleSize(30),
  },
  moreTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.black,
  },
});

export default styles;
