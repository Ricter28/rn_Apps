import React, {memo, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {navigate} from 'navigation/RootNavigation';
import {TaskItem} from 'interface';
import {selectTask, getTaskDetail} from 'slices';
import {formatTimeToArray, formatDateToArray} from 'utils/TransformData';

const bgList = [Images.bgTask1, Images.bgTask2, Images.bgTask3];

interface IProps {
  indexTab: string;
}
interface Items {
  item: TaskItem;
  index: number;
}

const TasksList = ({indexTab}: IProps) => {
  const dispatch = useDispatch();
  const newReducer = useSelector(selectTask);

  const list: any = newReducer.list;

  const goToDetail = (item: TaskItem) => {
    dispatch(getTaskDetail(item.id));
    navigate('CreateTaskScreen', {type: 'update'});
  };

  const renderItemCategory = useCallback(({item, index}: Items) => {
    const timeArray = formatTimeToArray(new Date(item.time));
    const dateArray = formatDateToArray(new Date(item.date));
    const imgIt =
      (index + 1) % 3 === 1
        ? bgList[2]
        : (index + 1) % 2 === 1
        ? bgList[1]
        : bgList[0];

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => goToDetail(item)}>
        <ImageLoading
          resizeMode="cover"
          source={imgIt}
          iconStyle={styles.bgItem}
        />
        <View style={styles.wrapperContent}>
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>
          </View>

          <View style={styles.dateTime}>
            <View style={styles.dateTimeTxt}>
              <Text style={styles.timeTxt}>
                {timeArray.length === 4 ? timeArray[3] : ''}
              </Text>
              <Text style={styles.dateTxt}>
                {dateArray.length === 4 ? dateArray[3] : ''}
              </Text>
            </View>

            <ImageLoading
              iconStyle={styles.clockIc}
              source={Images.greenClockIc}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const listBeforeFilter = list.filter((i: TaskItem) => i.status === indexTab);
  if (listBeforeFilter.length === 0) {
    return (
      <View style={styles.containerEmptyList}>
        <View style={styles.emptyList}>
          <ImageLoading iconStyle={styles.imgNextIc} source={Images.addNewIc} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.createBtn}
            onPress={() => navigate('CreateTaskScreen', {type: 'create'})}>
            <Text style={styles.createTxt}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={listBeforeFilter}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: TaskItem) => `${item.id}`}
        renderItem={renderItemCategory}
      />
    </View>
  );
};

export default memo(TasksList);
