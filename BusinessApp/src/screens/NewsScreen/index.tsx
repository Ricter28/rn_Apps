import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import {selectNew, getNewsList, getDetailNew, getMoreNewsList} from 'slices';
import {NewItem} from 'interface';
import ImageLoading from 'components/ImageLoading';
import Images from 'common/Images';
import {formatDateTimeToArray} from 'utils/TransformData';
import {navigate} from 'navigation/RootNavigation';

const NewsScreen = () => {
  const dispatch = useDispatch();
  const newReducer = useSelector(selectNew);

  const {list, meta, totalList} = newReducer;

  useEffect(() => {
    handleReload();
  }, []);

  const handleReload = () => {
    dispatch(
      getNewsList({country: 'us', category: 'business', page: 1, pageSize: 10}),
    );
  };

  const loadMoreItem = () => {
    const listLength = list.length;
    if (listLength < totalList) {
      dispatch(
        getMoreNewsList({
          country: 'us',
          category: 'business',
          page: meta.page + 1,
          pageSize: 10,
        }),
      );
    }
  };

  const goToDetail = (item: NewItem) => {
    dispatch(getDetailNew(item));
    navigate('NewDetailScreen');
  };

  const renderItem = useCallback(({item}: any) => {
    const dateArr = formatDateTimeToArray(new Date(item.publishedAt));

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => goToDetail(item)}>
        <View style={styles.dateTime}>
          <Text style={styles.timeTxt}>
            {dateArr.length === 5 ? dateArr[3] : ''}
          </Text>
          <Text style={styles.dateTxt}>
            {dateArr.length === 5 ? dateArr[4] : ''}
          </Text>
        </View>

        <Text style={styles.authorTxt} numberOfLines={1}>
          Author: {item?.author}
        </Text>

        <Text style={styles.descriptionTxt} numberOfLines={2}>
          {item?.description}
        </Text>

        <View style={styles.wrapperImg}>
          <ImageLoading
            iconStyle={styles.imgItem}
            url={item?.urlToImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.contentTxt} numberOfLines={3}>
          {item?.content}
        </Text>

        <ImageLoading
          iconStyle={styles.imgNextIc}
          source={Images.nextGreenIc}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>News</Text>
      <FlatList
        data={list}
        style={styles.list}
        keyExtractor={(item, indx) => `${indx}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={styles.emptyView} />}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreItem}
        onRefresh={handleReload}
        refreshing={false}
      />
    </SafeAreaView>
  );
};

export default NewsScreen;
