import {Text, View} from 'react-native';
import React, {memo, useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ButtonCustom from 'components/ButtonCustom';
import {removeAllTask, removeAllCategory} from 'slices';

const SelectModal = forwardRef(({type}: any, ref) => {
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    setVisible,
  }));

  const [visible, setVisible] = useState(false);

  const onConfirm = () => {
    if (type === 'category') {
      dispatch(removeAllCategory());
    } else if (type === 'task') {
      dispatch(removeAllTask());
    }
    setVisible(false);
  };

  return (
    <Modal isVisible={visible} style={styles.container} useNativeDriver={true}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title}>You delete all {type}?</Text>

        <View style={styles.actionView}>
          <ButtonCustom
            txt="Confirm"
            onPress={onConfirm}
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

export default memo(SelectModal);
