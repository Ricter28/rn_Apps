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

  item: {
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
    height: scaleHeightSize(240),
    marginVertical: scaleSize(20),
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
});

export default styles;
