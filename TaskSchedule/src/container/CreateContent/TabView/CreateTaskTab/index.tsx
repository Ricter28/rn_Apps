import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import InputCustom from 'components/InputCustom';
import ImageLoading from 'components/ImageLoading';
import HideKeyboard from 'components/HideKeyboard';
import Images from 'common/Images';
import {addTaskItem} from 'slices';
import {formatTxTDate} from 'utils/TransformData';

const CreateTaskTab = () => {
  const dispatch = useDispatch();
  const addNewRef = useRef<any>(null);

  const today = new Date();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [dateTxt, setDateTxt] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const res = formatTxTDate(date);
    setDateTxt(res);
  }, []);

  const onConfirmDate = (date: Date) => {
    const res = formatTxTDate(date);
    setOpen(false);
    setDate(date);
    setDateTxt(res);
  };

  const onFocusInput = useCallback(() => {
    setTitleError('');
  }, []);

  const addNewTask = () => {
    try {
      if (title.length > 0) {
        const res = formatTxTDate(today);
        showMessage({
          message: 'Create category success',
          type: 'success',
          duration: 1500,
        });
        dispatch(
          addTaskItem({
            id: uuid.v4(),
            title,
            date,
            description,
            createAt: today,
            status: 'onProgress',
          }),
        );
        setTitle('');
        setDescription('');
        setDate(today);
        setDateTxt(res);
      } else {
        setTitleError('Please enter a task name');
      }
    } catch (error) {
      showMessage({
        message: 'Create task failure. Please try again',
        type: 'danger',
        duration: 1500,
      });
    }
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <Text style={styles.titleTypeTxt}>Task Title</Text>
          <InputCustom
            inputStyle={styles.btnView}
            value={title}
            txtError={titleError}
            placeholder="input title"
            onChangeText={setTitle}
            onFocus={onFocusInput}
          />

          <Text style={styles.titleTypeTxt}>Due Date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.time}
            onPress={() => setOpen(true)}>
            <ImageLoading
              source={Images.aquaClock}
              iconStyle={styles.activeClockIcon}
            />
            <Text style={styles.timeTxt}>{dateTxt}</Text>
          </TouchableOpacity>

          <Text style={styles.titleTypeTxt}>Description</Text>
          <TextInput
            placeholder="input description"
            multiline
            style={styles.descriptionInput}
            value={description}
            onChangeText={txt => setDescription(txt)}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.onProgressStatusView}
            onPress={addNewTask}>
            <Text style={styles.onProgressStatusTxt}>Save</Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          locale="en"
          open={open}
          date={date}
          minimumDate={today}
          onConfirm={date => onConfirmDate(date)}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SafeAreaView>
    </HideKeyboard>
  );
};

export default CreateTaskTab;
