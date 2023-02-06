import {StyleSheet} from 'react-native';

import Colors from 'common/Colors';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color_F9F9FB,
  },

  infoUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: Constants.isIOS ? scaleSize(5) : scaleSize(20),
  },
  imgUser: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
  },
  infoUserView: {
    marginLeft: scaleSize(10),
  },
  nameUserTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
  },
  numOfTaskUserTxt: {
    fontWeight: '400',
    fontSize: scaleFont(14),
    color: Colors.Color_7D89B0,
    marginTop: scaleSize(5),
  },

  search: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginVertical: scaleSize(20),
    marginHorizontal: scaleSize(15),
    paddingHorizontal: scaleSize(7),
    paddingVertical: Constants.isIOS ? scaleSize(7) : 0,
    borderRadius: scaleSize(30),
    alignItems: 'center',
  },
  searchBtn: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleSize(16),
    borderWidth: scaleSize(1),
    borderColor: Colors.Color_F2F4F7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: scaleSize(16),
    height: scaleSize(16),
  },
  searchInput: {
    flexGrow: 1,
    marginLeft: scaleSize(10),
    width: Constants.Window.width - scaleSize(100),
  },

  titleContentView: {
    marginHorizontal: scaleSize(15),
  },
  titleContentTxt: {
    fontWeight: '600',
    fontSize: scaleFont(18),
  },

  emptyView: {
    height: scaleSize(50),
  },
});

export default styles;
