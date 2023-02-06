import {Text, View} from 'react-native';
import React, {memo, useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ButtonCustom from 'components/ButtonCustom';

interface IProps {
  type: string;
  confirm: () => void;
}

const SelectModal = forwardRef(({type, confirm}: IProps, ref) => {
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    setVisible,
  }));

  const [visible, setVisible] = useState(false);

  const onConfirm = () => {
    confirm && confirm();
    setVisible(false);
  };

  return (
    <Modal isVisible={visible} style={styles.container} useNativeDriver={true}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title}>Are you delete {type}?</Text>

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
