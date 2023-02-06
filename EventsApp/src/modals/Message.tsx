import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Text from 'components/native/Text';
const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
import colors from 'contant/colors';
import modal from '../services/modalService';
interface MessageProps {
  callBack?: () => {};
  titleMes?: string;
  contentMess?: string;
  nameClose?: string;
  nameUI?: string;
}
class Messagebox extends Component<MessageProps> {
  hideUi = () => {
    modal.hide();
    if (this.props.callBack) {
      this.props.callBack();
    }
  };
  render() {
    let {titleMes, contentMess, nameClose} = this.props;
    if (this.props.nameUI !== 'message') {
      return null;
    }
    if (typeof contentMess == 'object') {
      if (contentMess?.message) {
        contentMess = contentMess.message;
      } else {
        contentMess = JSON.stringify(contentMess);
      }
    }
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="zoomIn"
          iterationCount={1}
          duration={600}
          direction="alternate"
          style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleTxt}>
              {titleMes ? titleMes : 'Thông báo'}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.contentTxt}>{contentMess}</Text>
          </ScrollView>
          <View style={styles.wrapBt}>
            <TouchableOpacity onPress={this.hideUi} style={styles.bt}>
              <Text style={styles.txtClose}>
                {nameClose ? nameClose : 'Đóng'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    contentMess: state.modalReducer.messageContent,
    nameUI: state.modalReducer.nameUI,
    titleMes: state.modalReducer.messageTitle,
    callBack: state.modalReducer.funcMsg,
    nameClose: state.modalReducer.nameClose,
  };
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    width: '76%',
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: height * 0.7,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  titleTxt: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.PRIMARY,
  },
  contentTxt: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    marginTop: 8,
    lineHeight: 21,
  },
  wrapBt: {
    marginTop: 20,
    justifyContent: 'center',
  },
  bt: {
    alignSelf: 'center',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    minWidth: 80,
  },
  txtClose: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.TEXT_BLACK,
  },
});
export default connect(mapStateToProps)(Messagebox);
