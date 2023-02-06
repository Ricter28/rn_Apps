import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {navigationRef} from './RootNavigation';

import ImageLoading from 'components/ImageLoading';
import Colors from 'common/Colors';
import Images from 'common/Images';
import Constants from 'common/Constants';
import {scaleHeightSize, scaleSize} from 'common/mixins';
import {selectNew} from 'slices';

import HomeScreen from 'screens/HomeScreen';
import DashboardScreen from 'screens/DashboardScreen';
import CreateTaskScreen from 'screens/CreateTaskScreen';
import NewsScreen from 'screens/NewsScreen';
import NewDetailScreen from 'screens/NewDetailScreen';
import CalendarScreen from 'screens/CalendarScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="CreateTaskScreen"
        component={CreateTaskScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewsScreen"
      screenOptions={{
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="NewDetailScreen"
        component={NewDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator
      initialRouteName="CalendarScreen"
      screenOptions={{
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="CreateTaskScreenOnCalendar"
        component={CreateTaskScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

const TabArr = [
  {
    route: 'News',
    label: 'Tin tức',
    activeImage: Images.newsActiveIc,
    inactiveImage: Images.newsInactiveIc,
    component: NewsStack,
  },
  {
    route: 'Home',
    label: 'Trang chủ',
    activeImage: Images.homeActiveIc,
    inactiveImage: Images.homeInactiveIc,
    component: HomeStack,
  },
  {
    route: 'Calendar',
    label: 'Lịch',
    activeImage: Images.calendarActiveIc,
    inactiveImage: Images.calendarInactiveIc,
    component: CalendarStack,
  },
];

function TabButton(props: any) {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.bottomTabBtn}>
      <ImageLoading
        resizeMode="contain"
        source={focused ? item.activeImage : item.inactiveImage}
        iconStyle={styles.bottomTabImg}
      />
    </TouchableOpacity>
  );
}

function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const newReducer = useSelector(selectNew);

  const {loading} = newReducer;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {loading && (
        <View style={styles.layoutLoading}>
          <ActivityIndicator
            size="large"
            color={Colors.Color_329901}
            style={styles.loading}
          />
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomTabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleHeightSize(50),
  },
  bottomTabImg: {
    width: Constants.isIOS ? scaleSize(28) : scaleSize(24),
    height: Constants.isIOS ? scaleSize(28) : scaleSize(24),
    marginTop: scaleSize(10),
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    backgroundColor: Colors.Color_D9D9D9,
  },
  layoutLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    margin: -scaleSize(50),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
