import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Text from 'components/native/Text';
import ImageAutoSize from 'components/others/ImageAutoSize';
import colors from 'contant/colors';
import modal from 'services/modalService';
import Icon from 'components/others/Icon';
const { width, height } = Dimensions.get('screen');
const ios = Platform.OS === 'ios';
interface ConfirmProps {
  btnOK?: () => {};
  btnHuy?: () => {};
  titlebntHuy?: string;
  titlebntOK?: string;
  contentConf?: string;
  titleConf?: string;
  nameUI?: string;
  imageConfirm?: string;
}
interface State { }

class Confirm extends Component<ConfirmProps, State> {
  ok = () => {
    modal.hide();
    this.props.btnOK ? this.props.btnOK() : null;
  };
  cancer = () => {
    modal.hide();
    this.props.btnHuy ? this.props.btnHuy() : null;
  };

  render() {
    let {
      titlebntHuy,
      titlebntOK,
      contentConf,
      titleConf,
      nameUI,
      imageConfirm,
    } = this.props;
    if (nameUI !== 'comfirmBox') {
      return null;
    }
    return (
      <View style={styles.container}>

        <Animatable.View
          animation="zoomIn"
          duration={600}
          iterationCount={1}
          direction="alternate"
          style={styles.content}>
          {/* <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 40,
                borderTopWidth: 30,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 5,
           
                borderLeftColor: 'transparent',
                borderTopColor: 'red',
                position:'absolute',
                right:-1
              }} onPress={()=>modal.hide()}>
                <Icon
                  type="AntDesign"
                  size={10}
                  name="close"
                  color={colors.TEXT_BLACK}
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: -25,
                    right:7
                    // left: 1,

                  }}
                />
              </TouchableOpacity> */}
          <View style={styles.top}>
            <TouchableOpacity
              style={{ position: "absolute", top: 2, right: 2 }}
              onPress={() => modal.hide()}
            >
              <Icon type="AntDesign" name="closecircle" size={20} color="red" />
            </TouchableOpacity>

            <Text style={styles.title}>{titleConf || 'Thông báo'}</Text>
          </View>
          <View>
            {imageConfirm ? (
              <ImageAutoSize
                source={{
                  uri: imageConfirm,
                }}
                style={styles.image}
              />
            ) : null}
            <Text style={styles.txtContent}>{contentConf} </Text>
          </View>
          <View style={styles.wrapBottom}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.cancer}
              style={styles.btCancer}>
              <Text>{titlebntHuy ? titlebntHuy : 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.ok}
              style={styles.btOke}>
              <Text bold style={styles.txtOke}>
                {titlebntOK ? titlebntOK : 'Ok'}
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
    contentConf: state.modalReducer.confirmContent,
    titleConf: state.modalReducer.confirmTitle,
    btnHuy: state.modalReducer.onConfirmCancel,
    btnOK: state.modalReducer.onConfirmOk,
    titlebntHuy: state.modalReducer.confirmCancelText,
    titlebntOK: state.modalReducer.confirmOkText,
    nameUI: state.modalReducer.nameUI,
    imageConfirm: state.modalReducer.imageConfirm,
  };
};
const styles = StyleSheet.create({
  container: {
    width,
    height,
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
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 4,
  },
  title: {
    fontWeight: ios ? '600' : '700',
    fontSize: 16,
  },
  txtContent: {
    fontSize: 15,
    alignSelf: 'center',
    lineHeight: 23,
    width: '90%',
    textAlign: 'center',
  },
  wrapBottom: {
    flexDirection: 'row',
    marginTop: 22,
    borderTopWidth: 1,
    borderColor: '#e3e3e6',
    justifyContent: 'center',
  },
  btCancer: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderColor: '#e3e3e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btOke: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtOke: {
    color: colors.PRIMARY,
  },
  image: {
    width: '100%',
    marginVertical: 4,
  },
});
export default connect(mapStateToProps)(Confirm);
