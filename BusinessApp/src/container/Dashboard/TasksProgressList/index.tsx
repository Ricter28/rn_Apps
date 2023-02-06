import React, {memo, useCallback, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ChartCircle from '../ChartCircle';
import ImageLoading from 'components/ImageLoading';
import SelectDateTab from 'container/Home/SelectDateTab';
import Images from 'common/Images';
import Colors from 'common/Colors';
import {navigate} from 'navigation/RootNavigation';
import {selectTask, getTaskDetail} from 'slices';
import {TaskItem} from 'interface';
import {formatTimeToArray, formatDateToArray} from 'utils/TransformData';
import {
  checkDateOnWeek,
  getDistanceWithToday,
  checkDateOnMonth,
} from 'utils/DateHelpers';

const TasksProgressList = () => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);

  const list: any = taskReducer.list;
  const today = new Date();

  const [indexTab, setIndexTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const onChangeTab = (id: number) => {
    setLoading(true);
    setIndexTab(id);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const goToDetail = (item: TaskItem) => {
    dispatch(getTaskDetail(item.id));
    navigate('CreateTaskScreen', {type: 'update'});
  };

  const renderHeader = () => {
    return (
      <>
        <ChartCircle indexTab={indexTab} setLoading={setLoading} />

        <View style={styles.contentView}>
          <Text style={styles.contentTitle}>Progress</Text>
        </View>
      </>
    );
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

  let listBeforeFilter: any = [];
  if (indexTab === 1) {
    listBeforeFilter = list.filter(
      (i: TaskItem) =>
        i.status === 'progress' && checkDateOnWeek(i.date, today),
    );
  } else if (indexTab === 2) {
    listBeforeFilter = list.filter(
      (i: TaskItem) =>
        i.status === 'progress' && checkDateOnMonth(i.date, today),
    );
  } else {
    listBeforeFilter = list.filter(
      (i: TaskItem) =>
        i.status === 'progress' &&
        getDistanceWithToday(
          i.date,
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ) === 1,
    );
  }
  console.log(listBeforeFilter);
  const renderContent = (list: any) => {
    if (loading) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator
            size="large"
            color={Colors.Color_329901}
            style={styles.loading}
          />
        </View>
      );
    } else if (list.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <ChartCircle indexTab={indexTab} setLoading={setLoading} />

          <View style={styles.containerProgressView}>
            <View style={styles.contentView}>
              <Text style={styles.contentTitle}>Progress</Text>
            </View>

            <View style={styles.containerEmptyList}>
              <ImageLoading
                iconStyle={styles.imgNextIc}
                source={Images.noData}
              />
            </View>
          </View>
          <View style={styles.emptyView} />
        </ScrollView>
      );
    } else {
      return (
        <FlatList
          style={styles.categoriesList}
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: TaskItem) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={() => <View style={styles.emptyView} />}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <SelectDateTab setIndexTab={onChangeTab} />

      {renderContent(listBeforeFilter)}
    </View>
  );
};

export default memo(TasksProgressList);
