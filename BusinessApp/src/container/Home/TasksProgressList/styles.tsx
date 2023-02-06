import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F9F9FB,
  },

  emptyView: {
    height: scaleSize(50),
  },

  containerEmptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeightSize(15),
  },
  emptyList: {
    height: Constants.isIOS ? scaleHeightSize(160) : scaleHeightSize(170),
    width: '92%',
    borderRadius: scaleSize(24),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_329901,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgNextIc: {
    width: scaleSize(24),
    height: scaleSize(24),
  },
  noDataTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
    color: Colors.Color_DCDFEA,
  },
  createBtn: {
    backgroundColor: Colors.Color_DAF0D9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(10),
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(7),
    borderRadius: scaleSize(20),
  },
  createTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_2D3748,
  },

  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: scaleSize(15),
    marginBottom: Constants.isAndroid ? scaleSize(8) : scaleSize(15),
  },
  contentTitle: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  plusIc: {
    color: Colors.Color_329901,
    fontSize: scaleFont(26),
  },

  categoriesList: {
    paddingBottom: scaleSize(20),
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
    marginBottom: Constants.isAndroid ? 0 : scaleSize(3),
    color: Colors.black,
  },
  dateTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_329901,
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
