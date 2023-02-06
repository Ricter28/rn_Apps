import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Layout from "../contant/layout";
import PropTypes from "prop-types";
import Text from "./native/Text";
import modal from "services/modalService";
// import helpers from '../../global/helpers';

type props = {
  value?: any;
  data?: any[];
  title?: string;
  onChangeValue?: any;
  placeholder?: string;
  labelStyle?: object;
  style?: object;
  renderIcon?: any;
};

interface MyState {
  show: boolean;
}

export default class PickerSelect extends Component<props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    let {
      style,
      value,
      data = [],
      title,
      onChangeValue,
      placeholder,
      labelStyle,
      renderIcon,
    } = this.props;
    let detectValue = data.find((item) => item == value);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.setState({ show: true });
          }}
          style={[style, styles.rowCenter]}
        >
          <View style={{ flex: 5 }}>
            <Text
              textStyle="regular"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                labelStyle,
                { color: detectValue ? "#444444" : "#8c8c8c" },
              ]}
            >
              {detectValue ? detectValue.name : placeholder}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            {renderIcon ? renderIcon() : null}
          </View>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.show}
          onRequestClose={() => {
            this.setState({ show: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({ show: false });
            }}
            style={styles.activeItem}
          >
            <View style={styles.wrapContent}>
              <View style={styles.title}>
                <Text textStyle="bold">{title}</Text>
              </View>

              <FlatList
                bounces={false}
                data={data}
                ListEmptyComponent={
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: 10,
                      color: "gray",
                    }}
                  >
                    Danh sách trống
                  </Text>
                }
                keyExtractor={(data, index) => index + ""}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      // if (item.status == "disable") {
                      //   return this.setState({ show: false }, () => {
                      //     modal.showMessage({
                      //       content: "Phương thức thanh toán chưa khả dụng !",
                      //     });
                      //   });
                      // }
                      this.setState({ show: false });
                      let temp = item;
                      onChangeValue((temp));
                    }}
                    style={{
                      height: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eeeeee",
                      justifyContent: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                      opacity: item.status == "disable" ? 0.5 : 1,
                    }}
                  >
                    <Text style={{textAlign:'center'}} textStyle="regular">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapContent: {
    maxWidth: Layout.window.width * 0.8,
    minWidth: Layout.window.width * 0.8,
    maxHeight: Layout.window.height * 0.6,
    minHeight: Layout.window.height * 0.15,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#eeeeee",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize:16
  },
});
