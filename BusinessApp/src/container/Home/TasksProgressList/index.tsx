import React, {memo, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';

import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {navigate} from 'navigation/RootNavigation';
import {selectTask, getTaskDetail} from 'slices';
import {TaskItem} from 'interface';
import {formatTimeToArray, formatDateToArray} from 'utils/TransformData';

const TasksProgressList = () => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);

  const list: any = taskReducer.list;

  const goToDetail = (item: TaskItem) => {
    dispatch(getTaskDetail(item.id));
    navigate('CreateTaskScreen', {type: 'update'});
  };

  const renderItem = useCallback(({item}: any) => {
    const timeArray = formatTimeToArray(new Date(item.time));
    const dateArray = formatDateToArray(new Date(item.date));
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.titleTxt} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.descriptionTxt} numberOfLines={2}>
            {item?.description}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dateTime}>
            <Text style={styles.timeTxt}>
              {timeArray.length === 4 ? timeArray[3] : ''}
            </Text>
            <Text style={styles.dateTxt}>
              {dateArray.length === 4 ? dateArray[3] : ''}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.moreBtn}
            onPress={() => goToDetail(item)}>
            <Text style={styles.moreTxt}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const listBeforeFilter = list.filter(
    (i: TaskItem) => i.status === 'progress',
  );
  if (listBeforeFilter.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.contentTitle}>Progress</Text>
        </View>

        <View style={styles.containerEmptyList}>
          <View style={styles.emptyList}>
            <ImageLoading
              iconStyle={styles.imgNextIc}
              source={Images.addNewIc}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.createBtn}
              onPress={() => navigate('CreateTaskScreen', {type: 'create'})}>
              <Text style={styles.createTxt}>Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Text style={styles.contentTitle}>Progress</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('CreateTaskScreen', {type: 'create'})}>
          <Octicons name="plus-circle" style={styles.plusIc} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.categoriesList}
        data={listBeforeFilter}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: TaskItem) => item.id}
        renderItem={renderItem}
        ListFooterComponent={() => <View style={styles.emptyView} />}
      />
    </View>
  );
};

export default memo(TasksProgressList);
