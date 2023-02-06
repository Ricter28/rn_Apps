import * as React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ripple from "react-native-material-ripple";
import Modal from "react-native-modal";
import Icon from "./Icon";
import colors from "../../contant/colors";
import Box from "./Box";
import CustomText from "../native/Text";
interface ModalPickerProps {
  data?: Array<any>;
  onItem?: (item: any) => void;
  onShow?: () => void;
  label?: String;
  init?: number;
  buttonStyle?: ViewStyle;
  lableStyle?: TextStyle;
  disabled?: boolean;
}

const ModalPicker = (props: ModalPickerProps) => {
  const [show, setShow] = useState(false);
  const [idSelect, setIdSelect] = useState(props.init || 0);
  const [label, setLable] = useState(props.label || "Chọn dữ liệu");
  const { data = [] } = props;
  React.useEffect(() => {
    if (props.init) {
      data.map((item, index) => {
        if (props.init == parseInt(item.id)) {
          setLable(item.name);
        }
      });
    }
  }, []);
  React.useEffect(() => {
    if (idSelect != props.init) {
      setLable(props.label || "Chọn dữ liệu");
      setIdSelect(props.init || 0);
    }
    if (props.init) {
      data.map((item, index) => {
        if (props.init == parseInt(item.id)) {
          setLable(item.name);
        }
      });
    }
  }, [props.init]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={props.disabled}
        style={[styles.bt, props.buttonStyle]}
        onPress={() => setShow(true)}
      >
        <CustomText style={props.lableStyle}>{label}</CustomText>
        <Icon type="AntDesign" name="down" size={20} />
      </TouchableOpacity>
      <Modal
        isVisible={show}
        onBackdropPress={() => setShow(false)}
        useNativeDriver
      >
        <View style={styles.modalProvice}>
          <Box row style={styles.title}>
            <CustomText style={styles.lable}>{props.label}</CustomText>
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={() => setShow(false)}
            >
              <Icon
                type="AntDesign"
                name="closecircleo"
                size={25}
                color="red"
              />
            </TouchableOpacity>
          </Box>
          <ScrollView contentContainerStyle={{ paddingTop: 16 }}>
            {data.map((item: any, index: number) => (
              <Ripple
                key={"i" + index}
                style={[
                  styles.itemProvince,
                  idSelect === item.id && styles.active,
                ]}
                onPress={() => {
                  setShow(false);
                  setLable(item.name);
                  setIdSelect(item.id);
                  props.onItem?.(item);
                }}
              >
                <CustomText>{item.name}</CustomText>
                {idSelect === item.id && (
                  <Icon
                    type="AntDesign"
                    name="checkcircleo"
                    size={24}
                    color={colors.PRIMARY}
                  />
                )}
              </Ripple>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingVertical: 12,
    alignItems: "center",
  },
  lable: {
    textAlign: "center",
    flex: 1,
    fontWeight: "700",
    paddingLeft: 30,
  },
  itemProvince: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingVertical: 12,
  },
  active: {
    backgroundColor: "#F5F5F5",
  },
  modalProvice: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },
  bt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
});
