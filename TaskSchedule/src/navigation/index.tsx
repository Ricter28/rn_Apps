import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import {navigationRef} from './RootNavigation';

import ImageLoading from 'components/ImageLoading';
import Colors from 'common/Colors';
import Images from 'common/Images';
import {scaleFont, scaleHeightSize, scaleSize} from 'common/mixins';
import {selectUser} from 'slices';

import OnboardingScreen from 'screens/OnboardingScreen';
import HomeScreen from 'screens/HomeScreen';
import CreateContentScreen from 'screens/CreateContentScreen';
import CategoryDetailScreen from 'screens/CategoryDetailScreen';
import TaskDetailScreen from 'screens/TaskDetailScreen';
import CalendarScreen from 'screens/CalendarScreen';
import SettingsScreen from 'screens/SettingsScreen';

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
    </Stack.Navigator>
  );
}

function CreateCategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="CreateContentScreen"
      screenOptions={{
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="CreateContentScreen"
        component={CreateContentScreen}
        options={() => ({
          headerShown: false,
        })}
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
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

const TabArr = [
  {
    route: 'Home',
    label: 'Trang chủ',
    activeImage: Images.darkGridBottomIcon,
    inactiveImage: Images.whiteGridBottomIcon,
    component: HomeStack,
  },
  {
    route: 'AddCategory',
    label: 'Thêm mới thể loại',
    activeImage: Images.darkPlusBottomIcon,
    inactiveImage: Images.whitePlusBottomIcon,
    component: CreateCategoryStack,
  },
  {
    route: 'Calendar',
    label: 'Lịch',
    activeImage: Images.darkCalendarBottomIcon,
    inactiveImage: Images.whiteCalendarBottomIcon,
    component: CalendarStack,
  },
  {
    route: 'Settings',
    label: 'Cài đặt',
    activeImage: Images.darkSettingBottomIcon,
    inactiveImage: Images.whiteSettingBottomIcon,
    component: SettingsStack,
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
        resizeMode="cover"
        source={focused ? item.activeImage : item.inactiveImage}
        iconStyle={styles.bottomTabImg}
      />
    </TouchableOpacity>
  );
}

function AppStack() {
  return (
    <Tab.Navigator
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
  const user = useSelector(selectUser);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* {user.userName.length === 0 && (
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{
              headerShown: false,
            }}
          />
        )} */}
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategoryDetailScreen"
          component={CategoryDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskDetailScreen"
          component={TaskDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
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
    width: scaleSize(24),
    height: scaleSize(24),
    marginTop: scaleSize(10),
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    backgroundColor: Colors.white,
  },
});

export default AppNavigator;
