import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import {getDayByMonth} from 'utils/TransformData';
import {getDistanceWithToday} from 'utils/DateHelpers';
import {selectTask, getTaskDetail} from 'slices';
import {TaskItem} from 'interface';
import {statusTask} from 'common/Config';
import {formatTimeToArray, formatDateToArray} from 'utils/TransformData';
import {navigate} from 'navigation/RootNavigation';

interface ItemType {
  id: number;
  title: string;
  description: string;
  starTime: string[];
  time: string;
  color: string;
}
interface DayItemType {
  day: any;
  dayOnWeek: string;
  isToday: boolean;
}

const today = new Date();

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const taskReducer = useSelector(selectTask);

  const {list} = taskReducer;

  const [daysList, setDaysList] = useState<Array<DayItemType>>([]);
  const [tasks, setTasks] = useState([]);
  const [indexTab, setIndexTab] = useState('pending');
  const [daySelect, setDaySelect] = useState(today.getDate());

  useEffect(() => {
    const result = getDayByMonth(today.getFullYear(), today.getMonth());
    const indexSelectItem = result.findIndex(
      (i: DayItemType) => i.day === today.getDate(),
    );
    if (indexSelectItem !== -1) {
      result[indexSelectItem].isToday = true;
      setDaysList(result);
    } else {
      setDaysList(result);
    }

    const totalTaskByDay = list.filter(
      (i: TaskItem) =>
        getDistanceWithToday(
          i.date,
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ) === 1 && indexTab === i.status,
    );
    setTasks(totalTaskByDay);
  }, []);

  useEffect(() => {
    if (daySelect !== today.getDate()) {
      const totalTaskByDay = list.filter(
        (i: TaskItem) =>
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            daySelect,
          ) === 1 && indexTab === i.status,
      );
      setTasks(totalTaskByDay);
    } else {
      const totalTaskByDay = list.filter(
        (i: TaskItem) =>
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ) === 1 && indexTab === i.status,
      );
      setTasks(totalTaskByDay);
    }
  }, [list, indexTab]);

  const changeIndexTab = (id: string) => {
    setIndexTab(id);
  };

  const onSelectDay = (day: number) => {
    const result: Array<DayItemType> = [...daysList];
    for (const i in result) {
      if (result[i]?.day === day) {
        result[i].isToday = true;
      } else {
        result[i].isToday = false;
      }
    }
    const totalTaskByDay = list.filter(
      (i: TaskItem) =>
        getDistanceWithToday(
          i.date,
          today.getFullYear(),
          today.getMonth(),
          day,
        ) === 1 && indexTab === i.status,
    );
    setTasks(totalTaskByDay);
    setDaysList(result);
    setDaySelect(day);
  };

  const goToDetail = (item: TaskItem) => {
    dispatch(getTaskDetail(item.id));
    navigate('CreateTaskScreenOnCalendar', {type: 'update'});
  };

  const renderTaskItem: ListRenderItem<TaskItem> = useCallback(
    ({item}: any) => {
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
              <Text style={styles.dateItemTxt}>
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
    },
    [list],
  );

  const renderDayItem: ListRenderItem<any> = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.dateBtn}
        onPress={() => onSelectDay(item.day)}>
        <Text style={[styles.dateTxt, item.isToday && styles.dateActiveTxt]}>
          {item.day}
        </Text>
        <Text style={[styles.dateTxt, item.isToday && styles.dateActiveTxt]}>
          {item.dayOnWeek}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick and easy</Text>
      </View>
      <View style={styles.statusTask}>
        {statusTask.map(i => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={i.id}
            style={[
              styles.statusBtn,
              indexTab === i.id && styles.statusActiveBtn,
            ]}
            onPress={() => changeIndexTab(i.id)}>
            <Text
              style={[
                styles.statusTxt,
                indexTab === i.id && styles.statusActiveTxt,
              ]}>
              {i.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dateSelectView}>
        <FlatList
          data={daysList}
          keyExtractor={(item: any) => `day-${item.day}`}
          renderItem={renderDayItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.line} />

      <Text style={styles.titleContentTxt}>Tasks</Text>
      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: TaskItem) => item.id}
        style={styles.taskList}
        renderItem={renderTaskItem}
        ListFooterComponent={() => <View style={styles.emptyView} />}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;
