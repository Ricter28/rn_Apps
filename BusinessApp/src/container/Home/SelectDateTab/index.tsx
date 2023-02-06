import React, {
  useRef,
  createRef,
  useEffect,
  useState,
  forwardRef,
  useCallback,
  memo,
} from 'react';
import {Text, View, Animated, TouchableOpacity} from 'react-native';

import styles from './styles';
import Constants from 'common/Constants';

interface IProps {
  setIndexTab: (value: number) => void;
}
interface itemType {
  id: string;
  label: string;
  ref: any;
}
interface TabType {
  item: itemType;
  onItemPress: () => void;
  index: number;
}

const {width} = Constants.Window;

const SelectDateTab = ({setIndexTab}: IProps) => {
  const ref = useRef<any>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [localIndex, setLocalIndex] = useState(0);

  const ListTabVIew = [
    {id: 1, label: 'Today', ref: createRef()},
    {id: 2, label: 'Week', ref: createRef()},
    {id: 3, label: 'Month', ref: createRef()},
  ];

  const onItemPress = (itemIndex: number) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
    setIndexTab(itemIndex);
    setLocalIndex(itemIndex);
  };

  const init = () => {
    ref?.current?.scrollToOffset({
      offset: 1 * width,
    });
  };

  useEffect(() => {
    init();
  }, []);

  const Tabs = useCallback(({data, scrollX, onItemPress}: any) => {
    const containerRef = useRef<any>();
    const [measures, setMeasures] = useState([]);

    useEffect(() => {
      let m: any = [];
      data.forEach((item: any) => {
        item.ref.current.measureLayout(
          containerRef.current,
          (x: any, y: any, width: any, height: any) => {
            m.push({x, y, width, height});

            if (m.length === data.length) {
              setMeasures(m);
            }
          },
        );
      });
    }, []);

    return (
      <View style={{height: 30, width: width - 20, marginHorizontal: 10}}>
        <View style={styles.tabs} ref={containerRef}>
          {data.map((item: any, index: number) => (
            <Tab
              key={item.id}
              item={item}
              index={index}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          ))}
        </View>
        {measures.length > 0 && (
          <Indicator measures={measures} scrollX={scrollX} />
        )}
      </View>
    );
  }, [localIndex]);

  const Tab = forwardRef(({item, onItemPress, index}: TabType, ref: any) => {
    if (localIndex === index) {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onItemPress}
          style={styles.btnTab}>
          <View ref={ref} style={styles.viewCenter}>
            <Text style={styles.textActiveTab}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onItemPress}
        style={styles.btnTab}>
        <View ref={ref} style={styles.viewCenter}>
          <Text style={styles.textTab}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  const Indicator = ({measures, scrollX}: any) => {
    const inputRange = ListTabVIew.map((_, i) => i * width);
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measures.map((measure: any) => measure.x),
    });

    console.log(1)
    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{translateX}],
          },
        ]}
      />
    );
  };

  const renderItemBorderBottom = () => {
    return <View style={{height: 0, width: width}} />;
  };

  return (
    <View style={styles.container}>
      <Tabs scrollX={scrollX} data={ListTabVIew} onItemPress={onItemPress} />

      <Animated.FlatList
        ref={ref}
        data={ListTabVIew}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItemBorderBottom}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    </View>
  );
};

export default memo(SelectDateTab);
