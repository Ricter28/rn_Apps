import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F8FFFD,
  },

  emptyView: {
    height: scaleSize(50),
  },
  line: {
    height: scaleSize(1),
    backgroundColor: Colors.Color_B4B7B4,
    marginVertical: scaleHeightSize(15),
    opacity: 0.6,
  },

  content: {
    marginTop: scaleSize(10),
    marginHorizontal: scaleSize(15),
  },

  titleTxt: {
    fontWeight: '200',
    fontSize: scaleFont(18),
    color: Colors.black,
  },

  typeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBtn: {
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    backgroundColor: Colors.white,
    width: '47%',
    marginTop: scaleSize(10),
    paddingVertical: scaleSize(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(20),
  },
  typeTxt: {
    fontWeight: '200',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  typeActiveBtn: {
    backgroundColor: Colors.Color_DAF0D9,
    borderColor: Colors.Color_329901,
  },
  typeActiveTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
  },

  titleInput: {
    fontSize: scaleFont(16),
    height: scaleHeightSize(80),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    backgroundColor: Colors.white,
    borderRadius: scaleSize(12),
    marginTop: scaleSize(5),
    marginBottom: scaleSize(15),
    padding: scaleSize(9),
  },
  descriptionInput: {
    fontSize: scaleFont(16),
    height: scaleHeightSize(120),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    borderRadius: scaleSize(12),
    backgroundColor: Colors.white,
    marginTop: scaleSize(5),
    padding: scaleSize(9),
  },

  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(5),
  },
  timeBtn: {
    backgroundColor: Colors.Color_D9D9D9,
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    borderRadius: scaleSize(15),
    width: '47%',
    paddingVertical: scaleSize(7),
    paddingHorizontal: scaleSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTxt: {
    fontWeight: '600',
    fontSize: scaleFont(16),
    color: Colors.black,
  },
  calendarIc: {
    width: scaleSize(18),
    height: scaleSize(18),
  },
  clockIc: {
    width: scaleSize(18),
    height: scaleSize(18),
  },

  btnView: {
    borderRadius: scaleSize(15),
    padding: scaleSize(12),
    marginTop: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_DAF0D9,
    backgroundColor: Colors.white,
  },
  btnTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.Color_329901,
  },
  successView: {
    backgroundColor: Colors.Color_329901,
  },
  successTxt: {
    color: Colors.white,
  },
  errorView: {
    backgroundColor: Colors.error,
  },
  errorTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.white,
  },
});

export default styles;
