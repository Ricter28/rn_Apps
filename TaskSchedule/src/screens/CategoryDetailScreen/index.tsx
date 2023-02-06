import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import HeaderAction from 'components/HeaderAction';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {goBack} from 'navigation/RootNavigation';
import {selectCategory, updateCategoryItem, removeCategoryItem} from 'slices';
import {formatTxTDate} from 'utils/TransformData';

const CategoryDetailScreen = () => {
  const dispatch = useDispatch();
  const categoryReducer = useSelector(selectCategory);
  const {categoryDetail} = categoryReducer;

  const [newTaskList, setNewTaskList] = useState<any>(
    categoryDetail?.taskList || [],
  );

  const activeTask = (id: number) => {
    const temp = [...newTaskList];
    const indexI = temp.findIndex((i: any) => i.id === id);
    if (indexI !== -1 && !temp[indexI].checked) {
      temp[indexI] = {
        ...temp[indexI],
        checked: true,
      };
      dispatch(
        updateCategoryItem({
          id: categoryDetail.id,
          data: {
            ...categoryDetail,
            taskList: temp,
          },
        }),
      );
      showMessage({
        message: 'Update task category success',
        type: 'success',
        duration: 1500,
      });
    }
    setNewTaskList(temp);
  };

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => activeTask(item.id)}>
          {item.checked ? (
            <ImageLoading
              iconStyle={styles.icItem}
              source={Images.purpleCheckBox}
            />
          ) : (
            <View style={styles.circleIcItem} />
          )}
          <Text style={styles.nameItem}>{item.taskName}</Text>
        </TouchableOpacity>
      );
    },
    [newTaskList],
  );

  // const saveData = () => {
  //   dispatch(
  //     updateCategoryItem({
  //       id: categoryDetail.id,
  //       data: {
  //         ...categoryDetail,
  //         taskList: newTaskList,
  //       },
  //     }),
  //   );
  //   goBack();
  // };

  const onDelete = () => {
    try {
      dispatch(removeCategoryItem(categoryDetail.id));
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

  const onCompleted = () => {
    const temp = [...newTaskList];
    const newTasks = [];
    for (let i = 0; i < temp.length; i++) {
      newTasks.push({
        ...temp[i],
        checked: true,
      });
    }
    dispatch(
      updateCategoryItem({
        id: categoryDetail.id,
        data: {
          ...categoryDetail,
          taskList: newTasks,
        },
      }),
    );
    showMessage({
      message: 'Change status category success',
      type: 'success',
      duration: 1500,
    });
    setNewTaskList(newTasks);
  };
  const showOnProgress = newTaskList.every((i: any) => i.checked === true);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAction
        title="Categories Details"
        // titleActionRight="Save"
        // rightActionTxt="Save"
        rightActionBtnStyle={styles.saveBtn}
        rightActionTxtStyle={styles.saveTxt}
        goBack={() => goBack()}
        // onPressText={saveData}
      />

      <FlatList
        data={newTaskList}
        keyExtractor={(item: any) => item.id}
        style={styles.stagesOfTaskList}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.titleTypeTxt}>Task Title</Text>
            <Text style={styles.nameTxt}>{categoryDetail.title}</Text>
            <Text style={styles.titleTypeTxt}>Due Date</Text>
            <View style={styles.footer}>
              <View style={styles.time}>
                <ImageLoading
                  source={Images.aquaClock}
                  iconStyle={styles.activeClockIcon}
                />
                <Text style={styles.timeTxt}>
                  {formatTxTDate(new Date(categoryDetail.dueDate))}
                </Text>
              </View>
              {!showOnProgress && (
                <View style={styles.onProgressStatusView}>
                  <Text style={styles.onProgressStatusTxt}>On Progress</Text>
                </View>
              )}
            </View>
            <Text style={styles.titleTypeTxt}>Description</Text>
            <Text style={styles.descriptionTxt}>
              {categoryDetail.description}
            </Text>
            <Text style={styles.titleTypeTxt}>Stages of Task</Text>
          </>
        )}
      />

      <View style={styles.footerAction}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.completedStatusView]}
          onPress={onCompleted}>
          <Text style={[styles.completedStatusTxt]}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.completedStatusView, styles.errorView]}
          onPress={onDelete}>
          <Text style={[styles.completedStatusTxt, styles.errorTxt]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
