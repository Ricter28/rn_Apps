import {Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';

import styles from './styles';
import TabView from 'container/CreateContent/TabView';
import CreateTaskTab from 'container/CreateContent/TabView/CreateTaskTab';
import CreateCategoryTab from 'container/CreateContent/TabView/CreateCategoryTab';

const CreateContentScreen = () => {
  const [indexTab, setIndexTab] = useState(0);

  const renderTabContent = () => {
    if (indexTab === 0) {
      return <CreateTaskTab />;
    } else if (indexTab === 1) {
      return <CreateCategoryTab />;
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView setIndexTab={setIndexTab} />
      {renderTabContent()}

      <View style={styles.emptyView} />
    </SafeAreaView>
  );
};

export default CreateContentScreen;
