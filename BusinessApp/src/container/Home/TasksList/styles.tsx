import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    height: scaleHeightSize(240),
  },

  item: {
    marginHorizontal: Constants.isIOS ? scaleSize(7) : scaleSize(5),
    borderRadius: scaleSize(24),
    width: Constants.isIOS ? scaleSize(190) : scaleSize(180),
    height: scaleHeightSize(240),
  },
  bgItem: {
    height: '100%',
    width: '100%',
    borderRadius: scaleSize(24),
  },
  wrapperContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: Constants.isIOS ? scaleSize(20) : scaleSize(12),
    paddingBottom: scaleSize(14),
    paddingHorizontal: scaleSize(16),
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  name: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  description: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_375337,
    marginTop: scaleSize(5),
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeTxt: {},
  timeTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  dateTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_329901,
  },
  clockIc: {
    width: scaleSize(24),
    height: scaleSize(24),
  },

  containerEmptyList: {
    height: Constants.isIOS ? scaleHeightSize(220) : scaleHeightSize(170),
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default styles;
