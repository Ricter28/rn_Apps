import colors from "contant/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import FastImage from "react-native-fast-image";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";
// import colors from '../constant/colors';
import CustomText from "../native/Text";
import Icon from "../others/Icon";
interface PickerProps extends DateTimePickerProps {
  showIcon?: boolean;
  Icon?: React.Component | React.ReactElement;
  lable?: string;
  lableStyle?: TextStyle;
  onConfirm?: (data: any) => void;
  onCancel?: () => void;
  style?: ViewStyle;
  format?: string;
  date?: any;
  mode?: "date" | "time" | "datetime";
  minimumDate?: any;
  maximumDate?: any;
}
const DateTimePicker = (props: PickerProps) => {
  const {
    format = "LT DDD MM, YYYY",
    showIcon = true,
    mode = "datetime",
    minimumDate = undefined,
    maximumDate = undefined,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>(props.date || "");
  const [lable, setLable] = useState(props.lable || "Chọn");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  useEffect(() => {
    if (date != props.date) setDate(props.date);
  }, [props.date]);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    props.onCancel?.();
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
    setDate(date);
    props.onConfirm?.(date);
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.bt, props.style]}
      >
        {/* {showIcon &&
          (props.Icon ?? (
            <Image source={images.CALENDAR} style={styles.calendar} />
          ))} */}
        <CustomText style={[styles.lable, props.lableStyle]}>
          {date ? moment(date).format(format) : ""}
        </CustomText>
      </TouchableOpacity>
      <DateTimePickerModal
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Chọn"
        cancelTextIOS="Đóng"
        date={date || new Date()}
        display="spinner"
        headerTextIOS="Chọn thời gian"
      />
      <TouchableOpacity
        style={styles.img}
        onPress={() => {
          setDatePickerVisibility(!isDatePickerVisible);
        }}
      >
   
        <FastImage
          source={require("../../assets/images/iconCalender.png")}
          style={styles.img}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  bt: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  lable: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
  },
  calendar: {
    height: 27,
    width: 27,
  },
  img: {
    // position: "absolute",
    // alignSelf: "center",
    left: "80%",
    marginTop: -25,
    width:20,
    aspectRatio:1,
    zIndex:1,

  },
});
