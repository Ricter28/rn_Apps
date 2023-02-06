import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import InputCustom from 'components/InputCustom';
import ImageLoading from 'components/ImageLoading';
import HideKeyboard from 'components/HideKeyboard';
import Images from 'common/Images';
import {formatTxTDate} from 'utils/TransformData';
import AddNewTask from 'container/CreateContent/TabView/AddNewTask';
import {addCategoryItem} from 'slices';
import {TaskItemOfCategory} from 'interface';

const CreateCategoryTab = () => {
  const dispatch = useDispatch();
  const addNewRef = useRef<any>(null);

  const today = new Date();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [dateTxt, setDateTxt] = useState('');
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState<Array<TaskItemOfCategory>>([]);

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

  const onOpenAddNewModal = () => {
    addNewRef?.current?.setError('');
    addNewRef?.current?.setValue('');
    addNewRef?.current?.setVisible(true);
  };

  const addTaskToList = (value: string) => {
    const lengthTasks = taskList?.length || 0;
    if (lengthTasks > 0) {
      const lastElement: any = taskList[lengthTasks - 1];
      setTaskList([
        ...taskList,
        {
          id: lastElement.id + 1,
          taskName: value,
          checked: false,
        },
      ]);
    } else {
      setTaskList([
        {
          id: 1,
          taskName: value,
          checked: false,
        },
      ]);
    }
    addNewRef?.current?.setVisible(false);
  };

  const onAddNewCategory = () => {
    try {
      if (title.length > 0) {
        showMessage({
          message: 'Create category success',
          type: 'success',
          duration: 1500,
        });
        const res = formatTxTDate(today);
        dispatch(
          addCategoryItem({
            id: uuid.v4(),
            title,
            dueDate: date,
            description,
            taskList,
            createAt: today,
          }),
        );
        setTitle('');
        setDate(today);
        setDescription('');
        setDateTxt(res);
        setTaskList([]);
      } else {
        setTitleError('Please enter a title');
      }
    } catch (error) {
      showMessage({
        message: 'Create category failure. Please try again',
        type: 'danger',
        duration: 1500,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.titleTypeTxt}>Task Title</Text>
        <InputCustom
          inputStyle={styles.btnView}
          value={title}
          txtError={titleError}
          placeholder="input title"
          onChangeText={setTitle}
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

        <Text style={styles.titleTypeTxt}>Stages of Task</Text>
        {taskList.length > 0 &&
          taskList.map(item => (
            <View style={styles.item} key={item.id}>
              <Text style={styles.nameItem}>{item.taskName}</Text>
            </View>
          ))}
        <TouchableOpacity
          style={styles.addNameBtn}
          activeOpacity={0.7}
          onPress={onOpenAddNewModal}>
          <Text style={styles.addName}>Add New</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.onProgressStatusView}
          onPress={onAddNewCategory}>
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

      <AddNewTask ref={addNewRef} addTaskToList={addTaskToList} />
    </SafeAreaView>
  );
};

export default CreateCategoryTab;
