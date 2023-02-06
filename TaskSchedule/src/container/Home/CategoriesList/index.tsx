import React, {memo, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import ProgressBar from 'components/ProgressBar';
import Images from 'common/Images';
import Colors from 'common/Colors';
import {navigate} from 'navigation/RootNavigation';
import {selectCategory, getCategoryDetail} from 'slices';
import {TaskItemOfCategory} from 'interface';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categoryReducer = useSelector(selectCategory);

  const {list} = categoryReducer;

  const goToDetail = (id: string) => {
    dispatch(getCategoryDetail(id));
    navigate('CategoryDetailScreen');
  };

  const getProgress = (taskList: Array<TaskItemOfCategory>) => {
    const listCheckIsTrue = taskList.filter(
      (i: TaskItemOfCategory) => i.checked === true,
    );
    const taskListLength = taskList.length;
    const listCheckIsTrueLength = listCheckIsTrue.length;
    if (
      listCheckIsTrueLength === taskListLength ||
      listCheckIsTrueLength === 0
    ) {
      return (listCheckIsTrueLength / taskListLength) * 100;
    } else {
      return +(Math.round(listCheckIsTrueLength * 100) / taskListLength).toFixed(
        0,
      );
    }
  };

  const renderItemCategory = useCallback(({item, index}: any) => {
    const progressResult = getProgress(item.taskList);
    if (index === 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, styles.itemOne]}
          onPress={() => goToDetail(item.id)}>
          <View style={styles.typeOneIconView}>
            <ImageLoading source={Images.whiteEdit} />
          </View>
          <Text style={styles.nameOne}>{item.title}</Text>
          <Text style={styles.totalProjectOne}>
            {item.taskList?.length || 0} Projects
          </Text>

          <View style={styles.wrapperProgressView}>
            <View style={styles.progressOne}>
              <ProgressBar
                step={progressResult}
                steps={100}
                height={5}
                bgProgress={Colors.lightTextPrimary}
                bgAnimProgress={Colors.white}
              />
            </View>
            <View style={styles.progressView}>
              <Text style={styles.progressOneKey}>Progress</Text>
              <Text style={styles.progressOneValue}>{progressResult}%</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (index > 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, styles.itemTwo]}
          onPress={() => goToDetail(item.id)}>
          <View style={styles.typeTwoIconView}>
            <ImageLoading source={Images.redVideoCameraFront} />
          </View>
          <Text style={styles.nameTwo}>{item.title}</Text>
          <Text style={styles.totalProjectTwo}>
            {item.taskList?.length || 0} Projects
          </Text>
          <View style={styles.wrapperProgressView}>
            <View style={styles.progressTwo}>
              <ProgressBar
                step={progressResult}
                steps={100}
                height={5}
                bgProgress={Colors.sectionSeparatorColor}
                bgAnimProgress={Colors.Color_7F56D9}
              />
            </View>
            <View style={styles.progressView}>
              <Text style={styles.progressTwoKey}>Progress</Text>
              <Text style={styles.progressTwoValue}>{progressResult}%</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }, []);

  if (list.length === 0) {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.noDataTxt}>No Data Display</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('AddCategory')}>
          <Text style={styles.createTxt}>Create New Category</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.categoriesList}
      data={list}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: any) => `${item.id}`}
      renderItem={renderItemCategory}
    />
  );
};

export default memo(CategoriesList);
