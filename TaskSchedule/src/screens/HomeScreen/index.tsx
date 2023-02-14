import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import TabView from 'container/Home/TabView';
import CategoriesList from 'container/Home/CategoriesList';
import TaskList from 'container/Home/TaskList';
import {selectUser, selectTask} from 'slices';
import {getDistanceBetweenTwoDate} from 'utils/DateHelpers';
import {TaskItem} from 'interface';
import AppIcon from 'react-native-dynamic-app-icon';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector(selectUser);
  const taskReducer = useSelector(selectTask);

  const today = new Date();
  const {list} = taskReducer;
  const [indexTab, setIndexTab] = useState(0);
  // indexTab is 1 - today, 2 - Upcoming, 3 - Late, 4 - Completed
  const handleIconChange = () => {
    if (
      new Date().getFullYear() === 2022 &&
      new Date().getMonth() === 11 &&
      new Date().getDate() === 19
    ) {
      AppIcon.setAppIcon('SetLogo2');
    }
  };
  const totalTaskToday = list.filter(
    (i: TaskItem) =>
      getDistanceBetweenTwoDate(i.date, today) === 1 &&
      i.status === 'onProgress',
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.infoUser}>
        {userReducer?.avatar ? (
          <ImageLoading
            resizeMode="cover"
            source={{uri: userReducer.avatar}}
            iconStyle={styles.imgUser}
          />
        ) : (
          <ImageLoading
            resizeMode="cover"
            source={Images.defaultAvatar}
            iconStyle={styles.imgUser}
          />
        )}
        <View style={styles.infoUserView}>
          <Text style={styles.nameUserTxt}>{userReducer.userName}</Text>
          <Text style={styles.numOfTaskUserTxt}>
            {totalTaskToday?.length || 0} tasks today
          </Text>
        </View>
      </View>

      <View style={styles.search}>
        <TouchableOpacity activeOpacity={0.75} style={styles.searchBtn}>
          <ImageLoading
            source={Images.blackSearch}
            iconStyle={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput placeholder="Search task..." style={styles.searchInput} />
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContentView}>
          <Text style={styles.titleContentTxt}>Categories</Text>
        </View>
        <CategoriesList />

        <View style={styles.titleContentView}>
          <Text style={styles.titleContentTxt}>My Task</Text>
        </View>
        <TabView setIndexTab={setIndexTab} />
        <TaskList indexTab={indexTab} />

        <View style={styles.emptyView} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
