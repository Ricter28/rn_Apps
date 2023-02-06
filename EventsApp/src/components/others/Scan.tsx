import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Vibration} from 'react-native';
let {width, height} = Dimensions.get('window');
import {RNCamera} from 'react-native-camera';
import PropTypes from 'prop-types';
import Box from './Box';
const RGBA_OUTSIZE_QR = 'rgba(0,0,0,0.5)';

export default class BoxQRScan extends Component<any, any> {
  static propTypes = {
    qrSize: PropTypes.number,
    noBoxRadius: PropTypes.bool,
    disable: PropTypes.bool,
    isBarcode: PropTypes.bool,
    onSuccessCalBack: PropTypes.func,
    style: PropTypes.object,
  };

  timeOutFunc: any = 1;
  canScan = true;

  onBarCodeRead = (data: any) => {
    if (this.canScan) {
      console.log(data);
      Vibration.vibrate();

      this.canScan = false;
      this.timeOutFunc = setTimeout(() => {
        this.canScan = true;
      }, 2000);
      const {onSuccessCalBack, type} = this.props;

      if (onSuccessCalBack) {
        onSuccessCalBack(data, type);
      }
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeOutFunc);
  }

  render() {
    let {qrSize, disable, isBarcode, noBoxRadius, ...props} = this.props;
    return (
      <View {...props}>
        {disable ? (
          <Box flex={1} />
        ) : (
          <RNCamera
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            style={{
              flex: 1,
            }}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
        )}
        {/* {!noBoxRadius ? <View style={styles.boxRadius} /> : null} */}

        <View style={styles.boxRGB}>
          <View
            style={{width: '100%', flex: 1, backgroundColor: RGBA_OUTSIZE_QR}}
          />
          <View
            style={{
              width: '100%',
              height: qrSize,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                flex: 1,
                backgroundColor: RGBA_OUTSIZE_QR,
              }}
            />
            <View
              style={{
                width: isBarcode ? qrSize * 2.5 : qrSize,
                height: '100%',
                backgroundColor: disable ? RGBA_OUTSIZE_QR : 'transparent',
              }}
            />
            <View
              style={{
                height: '100%',
                flex: 1,
                backgroundColor: RGBA_OUTSIZE_QR,
              }}
            />
          </View>
          <View
            style={{width: '100%', flex: 1, backgroundColor: RGBA_OUTSIZE_QR}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxRadius: {
    width: '100%',
    backgroundColor: '#fff',
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  boxRGB: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
