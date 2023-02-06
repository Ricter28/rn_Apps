import {Text, View} from 'react-native';
import React, {memo, useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';

import styles from './styles';
import InputCustom from 'components/InputCustom';
import ButtonCustom from 'components/ButtonCustom';

const AddNewTask = forwardRef(({addTaskToList}: any, ref) => {
  useImperativeHandle(ref, () => ({
    setVisible,
    setValue,
    setError,
  }));

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onAddTask = () => {
    if (value.length > 0) {
      addTaskToList(value);
      // setVisible(false);
    } else {
      setError('Please enter task name');
    }
  };

  return (
    <Modal isVisible={visible} style={styles.container} useNativeDriver={true}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title}>Add new a task</Text>
        <InputCustom
          inputStyle={styles.inputView}
          value={value}
          txtError={error}
          placeholder="input task"
          onChangeText={setValue}
        />

        <View style={styles.actionView}>
          <ButtonCustom
            txt="Save"
            onPress={onAddTask}
            btnStyles={[styles.successView, styles.btnView]}
            btnTxtStyles={[styles.successTxt, styles.btnTxt]}
          />
          <ButtonCustom
            txt="Cancel"
            onPress={() => setVisible(false)}
            btnStyles={[styles.btnView, styles.normalView]}
            btnTxtStyles={[styles.btnTxt, styles.normalTxt]}
          />
        </View>
      </View>
    </Modal>
  );
});

export default memo(AddNewTask);
