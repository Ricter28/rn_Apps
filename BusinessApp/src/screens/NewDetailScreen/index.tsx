import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles';
import {selectNew} from 'slices';
import ImageLoading from 'components/ImageLoading';
import HeaderAction from 'components/HeaderAction';
import {formatDateTimeToArray} from 'utils/TransformData';
import {goBack} from 'navigation/RootNavigation';

const NewDetailScreen = () => {
  const newReducer = useSelector(selectNew);
  const {newDetail} = newReducer;

  const dateArr = formatDateTimeToArray(new Date(newDetail.publishedAt));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <HeaderAction goBack={goBack} />
          <View style={styles.item}>
            <View style={styles.dateTime}>
              <Text style={styles.timeTxt}>
                {dateArr.length === 5 ? dateArr[3] : ''}
              </Text>
              <Text style={styles.dateTxt}>
                {dateArr.length === 5 ? dateArr[4] : ''}
              </Text>
            </View>

            <Text style={styles.authorTxt}>Author: {newDetail?.author}</Text>

            <Text style={styles.descriptionTxt}>{newDetail?.description}</Text>

            <View style={styles.wrapperImg}>
              <ImageLoading
                iconStyle={styles.imgItem}
                url={newDetail?.urlToImage}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.contentTxt}>{newDetail?.content}</Text>
          </View>

          <View style={styles.emptyView} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewDetailScreen;
