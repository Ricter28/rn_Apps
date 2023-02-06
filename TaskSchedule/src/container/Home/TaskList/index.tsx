import React, {useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {navigate} from 'navigation/RootNavigation';
import {selectTask, getTaskDetail} from 'slices';
import {renderStatusTxt, formatTxTDate} from 'utils/TransformData';
import {getDistanceBetweenTwoDate} from 'utils/DateHelpers';
import {TaskItem} from 'interface';

interface IProps {
  indexTab: number;
}

const TaskList = ({indexTab}: IProps) => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);

  const today = new Date();
  const {list} = taskReducer;

  const goToDetail = (id: string) => {
    dispatch(getTaskDetail(id));
    navigate('TaskDetailScreen');
  };

  const RenderItemTask = useCallback(({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => goToDetail(item.id)}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <ImageLoading source={Images.threeDotsHorizontal} />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.description,
            item.status === 'completed' && styles.opacityStyle,
          ]}>
          {item.description}
        </Text>
        <View style={styles.lineGray} />
        <View style={styles.footer}>
          <View
            style={[
              styles.time,
              item.status === 'completed' && styles.opacityStyle,
            ]}>
            <ImageLoading
              source={Images.aquaClock}
              iconStyle={styles.activeClockIcon}
            />
            <Text style={styles.timeTxt}>
              {formatTxTDate(new Date(item.date))}
            </Text>
          </View>
          {item.status === 'onProgress' ? (
            <View style={styles.onProgressStatusView}>
              <Text style={styles.onProgressStatusTxt}>
                {renderStatusTxt(item.status)}
              </Text>
            </View>
          ) : (
            <View style={styles.completedStatusView}>
              <Text style={styles.completedStatusTxt}>
                {renderStatusTxt(item.status)}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [list]);

  if (list.length === 0) {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.noDataTxt}>No Data Display</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('AddCategory')}>
          <Text style={styles.createTxt}>Create New Task</Text>
        </TouchableOpacity>
      </View>
    );
  }
  let newList = [];
  if (indexTab === 0) {
    newList = list.filter(
      (i: TaskItem) => getDistanceBetweenTwoDate(i.date, today) === 1,
    );
  }
  if (indexTab === 1) {
    newList = list.filter(
      (i: TaskItem) => getDistanceBetweenTwoDate(i.date, today) === 2,
    );
  }
  if (indexTab === 2) {
    newList = list.filter(
      (i: TaskItem) => getDistanceBetweenTwoDate(i.date, today) === 3,
    );
  }
  if (indexTab === 3) {
    newList = list.filter(
      (i: TaskItem) => i.status === 'completed',
    );
  }
  return (
    <>
      {newList.map((item: TaskItem) => (
        <RenderItemTask key={item.id} item={item} />
      ))}
    </>
  );
};

export default TaskList;
