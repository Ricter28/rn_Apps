import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, View, StyleSheet, Text as Txt} from 'react-native';
import {arc, pie} from 'd3';
import Svg, {G, Text, Path} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';

import Colors from 'common/Colors';
import Images from 'common/Images';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize, scaleFont} from 'common/mixins';
import ImageLoading from 'components/ImageLoading';
import {selectTask} from 'slices';
import {TaskItem} from 'interface';
import {
  checkDateOnWeek,
  getDistanceWithToday,
  checkDateOnMonth,
} from 'utils/DateHelpers';

const {width, height} = Dimensions.get('window');
const colorsArray = [
  Colors.Color_FFB800,
  Colors.Color_007EC5,
  Colors.Color_B4B7B4,
  Colors.Color_329901,
];

const translate = (x: any, y: any) => {
  return `translate(${x}, ${y})`;
};

const Slice = ({value, fill, innerRadius = 0, outerRadius, label}: any) => {
  const newArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);
  return (
    <G>
      <Path d={newArc(value)} fill={fill} stroke={fill} />
      {label !== 0 && (
        <Text
          fill="white"
          stroke="white"
          fontSize="16"
          fontWeight="bold"
          x={newArc.centroid(value)[0]}
          y={newArc.centroid(value)[1]}
          textAnchor="end">
          {label}%
        </Text>
      )}
    </G>
  );
};

const Pie = ({x, y, data, radius}: any) => {
  const newPie = pie();

  const renderSlice = (value: any, i: number) => {
    return (
      <Slice
        key={i}
        outerRadius={radius}
        value={value}
        fill={colorsArray[i]}
        label={value.data}
      />
    );
  };

  return <G transform={translate(x, y)}>{newPie(data).map(renderSlice)}</G>;
};

const ChartCircle = ({indexTab, setLoading}: any) => {
  const taskReducer = useSelector(selectTask);
  const {list} = taskReducer;

  const [data, setData] = useState<Array<number>>([]);

  useEffect(() => {
    initData();
  }, [indexTab]);

  const initData = useCallback(() => {
    const today = new Date();

    if (indexTab === 0) {
      const pendingList = list.filter(
        (i: TaskItem) =>
          i.status === 'pending' &&
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ) === 1,
      );
      const newList = list.filter(
        (i: TaskItem) =>
          i.status === 'new' &&
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ) === 1,
      );
      const progressList = list.filter(
        (i: TaskItem) =>
          i.status === 'progress' &&
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ) === 1,
      );
      const completedList = list.filter(
        (i: TaskItem) =>
          i.status === 'completed' &&
          getDistanceWithToday(
            i.date,
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ) === 1,
      );
      const total =
        pendingList.length +
        newList.length +
        progressList.length +
        completedList.length;
      setData([
        renderLength(pendingList, total),
        renderLength(newList, total),
        renderLength(progressList, total),
        renderLength(completedList, total),
      ]);

      // console.log(
      //   pendingList,
      //   renderLength(pendingList, total),
      //   newList,
      //   renderLength(newList, total),
      //   progressList,
      //   renderLength(progressList, total),
      //   completedList,
      //   renderLength(completedList, total),
      // );
    } else if (indexTab === 1) {
      const pendingList = list.filter(
        (i: TaskItem) =>
          i.status === 'pending' && checkDateOnWeek(i.date, today),
      );
      const newList = list.filter(
        (i: TaskItem) => i.status === 'new' && checkDateOnWeek(i.date, today),
      );
      const progressList = list.filter(
        (i: TaskItem) =>
          i.status === 'progress' && checkDateOnWeek(i.date, today),
      );
      const completedList = list.filter(
        (i: TaskItem) =>
          i.status === 'completed' && checkDateOnWeek(i.date, today),
      );
      const total =
        pendingList.length +
        newList.length +
        progressList.length +
        completedList.length;
      setData([
        renderLength(pendingList, total),
        renderLength(newList, total),
        renderLength(progressList, total),
        renderLength(completedList, total),
      ]);
    } else if (indexTab === 2) {
      const pendingList = list.filter(
        (i: TaskItem) =>
          i.status === 'pending' && checkDateOnMonth(i.date, today),
      );
      const newList = list.filter(
        (i: TaskItem) => i.status === 'new' && checkDateOnMonth(i.date, today),
      );
      const progressList = list.filter(
        (i: TaskItem) =>
          i.status === 'progress' && checkDateOnMonth(i.date, today),
      );
      const completedList = list.filter(
        (i: TaskItem) =>
          i.status === 'completed' && checkDateOnMonth(i.date, today),
      );
      const total =
        pendingList.length +
        newList.length +
        progressList.length +
        completedList.length;
      setData([
        renderLength(pendingList, total),
        renderLength(newList, total),
        renderLength(progressList, total),
        renderLength(completedList, total),
      ]);
    }
  }, [indexTab]);

  const renderLength = (list: any, total: number) => {
    try {
      const newNumber = (list.length / total) * 100;
      if (total === 0) {
        return 0;
      }
      return +newNumber.toFixed(0);
    } catch (error) {
      return 0;
    }
  };

  const newWidth = Constants.isAndroid ? width - scaleSize(120) : width;
  const newHeight = Constants.isAndroid ? height - scaleSize(120) : height;

  const minViewportSize = Math.min(newWidth, newHeight);
  // This sets the radius of the pie chart to fit within
  // the current window size, with some additional padding
  const radius = (minViewportSize * 0.9) / 2;
  // Centers the pie chart
  const checkEmptyData = data.every(i => i === 0);
  if (checkEmptyData) {
    return (
      <View style={styles.containerEmpty}>
        <View style={styles.containerEmptyList}>
          <ImageLoading iconStyle={styles.imgNextIc} source={Images.noData} />
        </View>
      </View>
    );
  }
  return (
    <View style={{height: height / 2 + 20}}>
      <View style={styles.container}>
        <Svg height="100%" width="100%">
          <Pie x={width / 2} y={height / 4 - 20} radius={radius} data={data} />
        </Svg>
        <View style={styles.typeColor}>
          <View style={styles.typeItem}>
            <View style={[styles.item, styles.yellowItem]} />
            <Txt style={[styles.txtItem, styles.yellowTxtItem]}>Pending</Txt>
          </View>
          <View style={styles.typeItem}>
            <Txt style={[styles.txtItem, styles.blueTxtItem]}>New</Txt>
            <View style={[styles.item, styles.blueItem]} />
          </View>
        </View>
        <View style={styles.typeColor}>
          <View style={styles.typeItem}>
            <View style={[styles.item, styles.grayItem]} />
            <Txt style={[styles.txtItem, styles.grayTxtItem]}>Progress</Txt>
          </View>
          <View style={styles.typeItem}>
            <Txt style={[styles.txtItem, styles.greenTxtItem]}>Completed</Txt>
            <View style={[styles.item, styles.greenItem]} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChartCircle;

const styles = StyleSheet.create({
  containerEmpty: {
    backgroundColor: Colors.Color_F8FFFD,
    height: scaleSize(270),
  },
  containerEmptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeightSize(15),
  },
  imgNextIc: {
    width: Constants.Dimension.ScreenWidth(0.9),
    height: scaleSize(250),
  },

  container: {
    backgroundColor: Colors.Color_F8FFFD,
    height: height / 2 - 40,
  },

  typeColor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(15),
    marginBottom: scaleSize(5),
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: scaleSize(60),
    height: scaleSize(25),
    borderRadius: scaleSize(20),
  },
  txtItem: {
    fontWeight: '500',
    fontSize: scaleFont(16),
  },
  yellowItem: {
    backgroundColor: Colors.Color_FFB800,
    marginRight: scaleSize(7),
  },
  yellowTxtItem: {
    color: Colors.Color_FFB800,
  },
  blueItem: {
    backgroundColor: Colors.Color_007EC5,
    marginLeft: scaleSize(7),
  },
  blueTxtItem: {
    color: Colors.Color_007EC5,
  },
  grayItem: {
    backgroundColor: Colors.Color_B4B7B4,
    marginRight: scaleSize(7),
  },
  grayTxtItem: {
    color: Colors.Color_B4B7B4,
  },
  greenItem: {
    backgroundColor: Colors.Color_329901,
    marginLeft: scaleSize(7),
  },
  greenTxtItem: {
    color: Colors.Color_329901,
  },
});
