import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import HeaderAction from 'components/HeaderAction';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {goBack} from 'navigation/RootNavigation';
import {selectTask, updateTaskItem, removeTaskItem} from 'slices';
import {formatTxTDate} from 'utils/TransformData';

const TaskDetailScreen = () => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);
  const {taskDetail} = taskReducer;

  const onUpdateStatusTask = () => {
    dispatch(
      updateTaskItem({
        id: taskDetail.id,
        data: {
          ...taskDetail,
          status: 'completed',
        },
      }),
    );
    goBack();
  };

  const onDelete = () => {
    try {
      dispatch(removeTaskItem(taskDetail.id));
      goBack();
      showMessage({
        message: 'Delete task success',
        type: 'success',
        duration: 1500,
      });
    } catch (error) {
      showMessage({
        message: 'Delete task failure. Please try again',
        type: 'danger',
        duration: 1500,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAction
        title="Task Details"
        titleActionRight="Save"
        goBack={() => goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Text style={styles.titleTypeTxt}>Task Title</Text>
        <Text style={styles.nameTxt}>{taskDetail.title}</Text>
        <Text style={styles.titleTypeTxt}>Due Date</Text>
        <View style={styles.time}>
          <ImageLoading
            source={Images.aquaClock}
            iconStyle={styles.activeClockIcon}
          />
          <Text style={styles.timeTxt}>
            {formatTxTDate(new Date(taskDetail.date))}
          </Text>
        </View>
        <Text style={styles.titleTypeTxt}>Description</Text>
        <Text style={styles.descriptionTxt}>{taskDetail.description}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.onProgressStatusView}>
          <Text style={styles.onProgressStatusTxt}>On Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.completedStatusView, styles.errorView]}
          onPress={onDelete}>
          <Text style={[styles.completedStatusTxt, styles.errorTxt]}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.completedStatusView}
          onPress={onUpdateStatusTask}>
          <Text style={styles.completedStatusTxt}>Completed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;
