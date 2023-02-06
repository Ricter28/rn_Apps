import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useCallback, memo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';

import styles from './styles';
import {selectTask, addTaskItem, updateTaskItem, removeTaskItem} from 'slices';
import SelectModal from 'container/Home/SelectModal';
import ButtonCustom from 'components/ButtonCustom';
import ImageLoading from 'components/ImageLoading';
import HeaderAction from 'components/HeaderAction';
import HideKeyboard from 'components/HideKeyboard';
import Colors from 'common/Colors';
import Images from 'common/Images';
import {formatTimeToArray, formatDateToArray} from 'utils/TransformData';
import {goBack} from 'navigation/RootNavigation';

const CreateTaskScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);
  const {taskDetail} = taskReducer;

  const isUpdate = route.params?.type === 'update' ? true : false;
  const today = new Date();
  const selectActionModalRef = useRef<any>(null);

  const [type, setType] = useState(isUpdate ? taskDetail.status : 'pending');
  const [titleInput, setTitleInput] = useState(
    isUpdate ? taskDetail.title : '',
  );
  const [descriptionInput, setDescriptionInput] = useState(
    isUpdate ? taskDetail.description : '',
  );
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(
    isUpdate ? new Date(taskDetail.date) : today,
  );
  const [dateTxt, setDateTxt] = useState(
    formatDateToArray(isUpdate ? new Date(taskDetail.date) : today)[3],
  );
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(
    isUpdate ? new Date(taskDetail.time) : today,
  );
  const [timeTxt, setTimeTxt] = useState(
    formatTimeToArray(isUpdate ? new Date(taskDetail.time) : today)[3],
  );

  const onConfirmDate = useCallback(
    (dateVal: Date) => {
      const dateArray = formatDateToArray(dateVal);
      setDateOpen(false);
      setDate(dateVal);
      if (dateArray.length === 4) {
        setDateTxt(dateArray[3]);
      }
    },
    [date],
  );

  const onConfirmTime = useCallback(
    (dateVal: Date) => {
      const timeArray = formatTimeToArray(dateVal);
      setTimeOpen(false);
      setTime(dateVal);
      if (timeArray.length === 4) {
        setTimeTxt(timeArray[3]);
      }
    },
    [time],
  );

  const onCreate = () => {
    const params = {
      id: uuid.v4(),
      title: titleInput,
      description: descriptionInput,
      status: type,
      time,
      date,
      createAt: new Date(),
    };
    dispatch(addTaskItem(params));
    setTimeout(() => {
      onCancel();
    }, 400);
  };

  const onCancel = () => {
    goBack();
  };

  const onUpdate = () => {
    const params = {
      id: taskDetail.id,
      title: titleInput,
      description: descriptionInput,
      status: type,
      time,
      date,
      createAt: taskDetail.createAt,
    };
    dispatch(updateTaskItem({id: taskDetail.id, data: params}));
    onCancel();
  };

  const onDelete = () => {
    dispatch(removeTaskItem(taskDetail.id));
    onCancel();
  };

  return (
    <View style={styles.container}>
      <HeaderAction
        title={isUpdate ? 'Edit Task' : 'Create Task'}
        goBack={goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.titleTxt}>Type:</Text>
          <View style={styles.typeView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.typeBtn,
                type === 'pending' && styles.typeActiveBtn,
              ]}
              onPress={() => setType('pending')}>
              <Text
                style={[
                  styles.typeTxt,
                  type === 'pending' && styles.typeActiveTxt,
                ]}>
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.typeBtn, type === 'new' && styles.typeActiveBtn]}
              onPress={() => setType('new')}>
              <Text
                style={[
                  styles.typeTxt,
                  type === 'new' && styles.typeActiveTxt,
                ]}>
                New
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.typeView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.typeBtn,
                type === 'progress' && styles.typeActiveBtn,
              ]}
              onPress={() => setType('progress')}>
              <Text
                style={[
                  styles.typeTxt,
                  type === 'progress' && styles.typeActiveTxt,
                ]}>
                Progress
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.typeBtn,
                type === 'completed' && styles.typeActiveBtn,
              ]}
              onPress={() => setType('completed')}>
              <Text
                style={[
                  styles.typeTxt,
                  type === 'completed' && styles.typeActiveTxt,
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          <Text style={styles.titleTxt}>Title:</Text>
          <TextInput
            placeholder="Enter your title"
            style={styles.titleInput}
            placeholderTextColor={Colors.Color_B4B7B4}
            multiline={true}
            textAlignVertical="top"
            value={titleInput}
            onChangeText={text => setTitleInput(text)}
          />

          <Text style={styles.titleTxt}>Description:</Text>
          <TextInput
            placeholder="Enter your description"
            style={styles.descriptionInput}
            placeholderTextColor={Colors.Color_B4B7B4}
            multiline={true}
            textAlignVertical="top"
            value={descriptionInput}
            onChangeText={text => setDescriptionInput(text)}
          />

          <View style={styles.line} />

          <Text style={styles.titleTxt}>Time:</Text>
          <View style={styles.timeView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.timeBtn}
              onPress={() => setDateOpen(true)}>
              <Text style={styles.timeTxt}>{dateTxt}</Text>
              <ImageLoading
                iconStyle={styles.calendarIc}
                source={Images.greenCalendarIc}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.timeBtn}
              onPress={() => setTimeOpen(true)}>
              <Text style={styles.timeTxt}>{timeTxt}</Text>
              <ImageLoading
                iconStyle={styles.clockIc}
                source={Images.greenClockIc}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          {isUpdate ? (
            <>
              <ButtonCustom
                txt="SAVE"
                onPress={onUpdate}
                btnStyles={[styles.btnView, styles.successView]}
                btnTxtStyles={[styles.btnTxt, styles.successTxt]}
              />
              <ButtonCustom
                txt="DELETE"
                onPress={() => selectActionModalRef?.current?.setVisible(true)}
                btnStyles={[styles.btnView, styles.errorView]}
                btnTxtStyles={(styles.btnTxt, styles.errorTxt)}
              />
            </>
          ) : (
            <>
              <ButtonCustom
                txt="CREATE"
                onPress={onCreate}
                btnStyles={[styles.btnView, styles.successView]}
                btnTxtStyles={[styles.btnTxt, styles.successTxt]}
              />
              <ButtonCustom
                txt="CANCEL"
                onPress={onCancel}
                btnStyles={styles.btnView}
                btnTxtStyles={styles.btnTxt}
              />
            </>
          )}
          <View style={styles.emptyView} />
          <View style={styles.emptyView} />
        </View>
      </ScrollView>

      <DatePicker
        modal
        locale="en"
        mode="date"
        open={dateOpen}
        date={date}
        // minimumDate={today}
        onConfirm={date => onConfirmDate(date)}
        onCancel={() => setDateOpen(false)}
      />
      <DatePicker
        modal
        locale="en"
        mode="time"
        open={timeOpen}
        date={time}
        onConfirm={date => onConfirmTime(date)}
        onCancel={() => setTimeOpen(false)}
      />
      <SelectModal ref={selectActionModalRef} type="task" confirm={onDelete} />
    </View>
  );
};

export default memo(CreateTaskScreen);
