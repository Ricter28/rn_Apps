import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInputProps } from "react-native";
import { formatMoney } from "utils/format";
import TextInput from "./TextInput";

interface InputMoneyProps extends TextInputProps {
  onChangeValue: (text: string | number) => void;
}

const InputMoney = (props: InputMoneyProps) => {
  const [value, setValue] = useState<string | number>(
    formatMoney(props.value, "") || ""
  );
  useEffect(() => {
    if (!props.value) {
      setValue("");
    }
  }, [props.value]);
  return (
    <TextInput
      keyboardType="numeric"
      {...props}
      value={value + ""}
      onChangeText={(text) => {
        let clearDot = text
          .replace(/\./g, "")
          .replace(/\,/g, "")
          .replace(/-/g, "");
        let money = formatMoney(clearDot, "");
        setValue(money);
        props.onChangeValue?.(clearDot);
      }}
    />
  );
};

export default InputMoney;

const styles = StyleSheet.create({
  container: {},
});
