import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import styles from './styles';
import TasksProgressList from 'container/Dashboard/TasksProgressList';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subTitle}>Overall and accurate</Text>
        <View style={styles.lineSubTitle} />
      </View>
      <TasksProgressList />
    </SafeAreaView>
  );
};

export default DashboardScreen;
