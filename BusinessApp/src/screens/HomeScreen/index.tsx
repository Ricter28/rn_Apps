import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import AppIcon from 'react-native-dynamic-app-icon';
import styles from './styles';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {statusTask} from 'common/Config';
import TasksList from 'container/Home/TasksList';
import TasksProgressList from 'container/Home/TasksProgressList';
import {navigate} from 'navigation/RootNavigation';

const HomeScreen = () => {
  const [indexTab, setIndexTab] = useState('pending');

  const changeIndexTab = (id: string) => {
    
    setIndexTab(id);
  };

  //CHANGE LOGO APP HERE
  // month 0 - 11
  if(new Date().getFullYear() === 2022 &&
    new Date().getMonth() === 11 &&
    new Date().getDate() === 19){
    AppIcon.setAppIcon('SetLogo2');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>News</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('DashboardScreen')}>
          <ImageLoading iconStyle={styles.imgNextIc} source={Images.chartIc} />
        </TouchableOpacity>
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
            onPress={()=>changeIndexTab(i.id)}>
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
      <TasksList indexTab={indexTab} />

      <TasksProgressList />
    </SafeAreaView>
  );
};

export default HomeScreen;
