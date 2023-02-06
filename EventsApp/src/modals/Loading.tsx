import React, { Component } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import colors from 'contant/colors';
import modal from '../services/modalService';

const { width, height } = Dimensions.get('screen');
// screen là cả thanh tab bar
// window là chỉ phần màn hình
// screen và window trên ios là bằng nhau
interface LoadingProps {
  nameUI?: string;
}
class Loading extends Component<LoadingProps> {
  hideLoading = () => modal.hide();

  render() {
    if (this.props.nameUI !== 'loading') return null;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.hideLoading}
        style={styles.container}>
        <View style={styles.viewIndicator}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'rgba(1,1,1,0.4)',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIndicator: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: any) => {
  return {
    nameUI: state.modalReducer.nameUI,
  };
};
export default connect(mapStateToProps)(Loading);
