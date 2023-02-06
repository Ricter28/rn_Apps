import images from "assets/images";
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
    format = "DD-MM-YYYY",
    showIcon = true,
    mode = "date",
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
        {showIcon &&
          (props.Icon ?? (
            <Image source={images.CALENDAR} style={styles.calendar} />
          ))}
        <CustomText style={[styles.lable, props.lableStyle]}>
          {date ? moment(date).format(format) : lable}
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
      <TouchableOpacity style={styles.img}
      onPress={() => {
        setDatePickerVisibility(!isDatePickerVisible);
      }}
                >
                  <Icon
                    type="Fontisto"
                    name="angle-down"
                    size={20}
                    color={colors.PRIMARY}
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
    // width: "100%",
    // flex: 1,
    paddingHorizontal: 8,
    height: 40,
    position: "absolute",
    marginTop: "4%",
    marginLeft: "4.5%",
  },
  lable: {
    color: colors.BLACK,
    marginLeft: "10%",
  },
  calendar: {
    height: 27,
    width: 27,
  },
  img: {
    position: "absolute",
    alignSelf: "center",
    left: "75%",
    top: 10,
  },
});
