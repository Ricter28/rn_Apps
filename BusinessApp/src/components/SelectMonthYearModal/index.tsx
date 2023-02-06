import React, {
  memo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import MonthPicker from 'react-native-month-year-picker';

import styles from './styles';

interface IProps {
  visible: boolean;
  setMonthSelected: (value: Date) => void;
  setVisible: (value: boolean) => void;
}

const today = new Date();

const SelectMonthYearModal = forwardRef(
  ({visible, setMonthSelected, setVisible}: IProps, ref) => {
    useImperativeHandle(ref, () => ({
      date,
      showPicker,
    }));

    const [date, setDate] = useState(today);
    const [show, setShow] = useState(true);
    // const [visible, setVisible] = useState(false);

    const showPicker = useCallback((value: any) => {
      setVisible(true);
      setShow(value);
    }, []);

    const onValueChange = useCallback(
      (event: any, newDate: any) => {
        const selectedDate = newDate || date;

        showPicker(false);
        setVisible(false);
        setDate(selectedDate);
        setMonthSelected(selectedDate);
      },
      [date, showPicker],
    );

    return (
      <Modal
        isVisible={visible}
        style={styles.container}
        useNativeDriver={true}>
        <View style={styles.wrapperContainer}>
          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              maximumDate={today}
              mode="full"
            />
          )}
        </View>
      </Modal>
    );
  },
);

export default SelectMonthYearModal;
