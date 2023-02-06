import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F8FFFD,
  },

  emptyView: {
    height: scaleSize(50),
  },

  title: {
    fontWeight: '700',
    fontSize: scaleFont(32),
    marginHorizontal: scaleSize(15),
    marginBottom: Constants.isAndroid ? scaleSize(10) : scaleSize(5),
    marginTop: Constants.isAndroid ? scaleSize(10) : 0,
    color: Colors.black,
  },

  list: {
    marginHorizontal: scaleSize(15),
  },
  item: {
    backgroundColor: Colors.white,
    borderWidth: scaleSize(0.3),
    borderColor: Colors.Color_329901,
    borderRadius: scaleSize(10),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(25),
    paddingHorizontal: scaleSize(15),
    marginBottom: scaleSize(10),
  },

  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTxt: {
    fontWeight: '700',
    fontSize: scaleFont(18),
    color: Colors.Color_329901,
  },
  dateTxt: {
    fontWeight: '500',
    fontSize: scaleFont(16),
    color: Colors.Color_B4B7B4,
  },

  wrapperImg: {
    width: '94%',
    marginHorizontal: '3%',
    height: scaleHeightSize(300),
    marginVertical: scaleSize(10),
  },
  imgItem: {
    width: '100%',
    height: '100%',
    borderRadius: scaleSize(20),
  },

  authorTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
    color: Colors.Color_277005,
    marginTop: scaleSize(5),
    marginBottom: scaleSize(20),
  },
  descriptionTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
    color: Colors.black,
  },
  contentTxt: {
    fontWeight: '300',
    fontSize: scaleFont(16),
    color: Colors.Color_375337,
  },

  imgNextIc: {
    width: scaleSize(12),
    height: scaleSize(12),
    position: 'absolute',
    bottom: scaleSize(-15),
    right: scaleSize(5),
  },
});

export default styles;
