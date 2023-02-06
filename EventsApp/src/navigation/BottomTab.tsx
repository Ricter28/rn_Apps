import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Text from "components/native/Text";
import FastImage from "react-native-fast-image";
import images from "assets/images";
import { getBottomSpace, ifIphoneX } from "react-native-iphone-x-helper";
import { useSelector } from "react-redux";
import layout from "contant/layout";


import colors from "contant/colors";


const Tab = createBottomTabNavigator();
interface BottomTabProps {}
function textTab(focused: boolean) {
  var style = {
    fontSize: layout.isPad ? 16 : 13,
    color: "#746955",
    marginTop: layout.isPad ? 40 : 4,
    left: layout.isPad ? -32 : 0,
    fontWeight: "bold",
  };
  if (focused) {
    // style.color = "red";
    // style.fontWeight = 'bold';
  }
  return style;
}

const BottomTab = (props: BottomTabProps) => {
  const store = useSelector((state: any) => state.storeReducer?.info);
  // React.useEffect(() => {
  //   if (store?.phone && store?.id) connectPayme(store.phone, store.id);
  // }, [store]);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 10,
          height: layout.isPad
            ? 80
            : Platform.OS === "ios"
            ? getBottomSpace() + 50
            : 60,
          ...ifIphoneX(
            {},
            {
              paddingTop: 4,
            }
          ),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <View
                style={{
                  width: "50%",
                  height: 1,
                  backgroundColor: focused ? "black" : undefined,
                  bottom: 10,
                }}
              />
              <FastImage
                resizeMode="contain"
                source={focused ? images.HOMEON : images.HOME}
                style={styles.icon}
              />
            </>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[textTab(focused), { fontWeight: "bold", fontSize: 13 }]}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="OrderProduct"
        component={Mynetwork}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <View
                style={{
                  width: "50%",
                  height: 1,
                  backgroundColor: focused ? "black" : undefined,
                  bottom: 8.5,
                }}
              />
              <FastImage
                resizeMode="contain"
                source={focused ? images.NETWORKON : images.NETWORK}
                style={styles.icon}
              />
            </>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[textTab(focused), { fontWeight: "bold", fontSize: 13 }]}
            >
              My Network
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Postman"
        component={Post}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate("Post");
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.wrapHome}>
              <View
                style={{
                  width: 63,
                  height: 63,
                  backgroundColor: colors.TXT,
                  // borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                  overflow: "hidden",
                  borderRadius: 35,
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FastImage
                    resizeMode="contain"
                    source={focused ? images.POST : images.POST}
                    style={[styles.icon, { height: 35, width: 35 }]}
                  />
                </View>
              </View>
            </View>
          ),
          tabBarLabel: ({ color, focused }) => (
            // <Text
            //   style={[textTab(focused), { fontWeight: "bold", fontSize: 13.5 }]}
            // >
            //   Post
            // </Text>
            <View></View>
          ),
        }}
      />
      <Tab.Screen
        name="Direction"
        component={Feed}
        // listeners={({ navigation, route }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     navigation.navigate("ProductSell");
        //   },
        // })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <View
                style={{
                  width: "50%",
                  height: 1,
                  backgroundColor: focused ? "black" : undefined,
                  bottom: 8.5,
                }}
              />
              <FastImage
                resizeMode="contain"
                source={focused ? images.FEEDON : images.FEED}
                style={[styles.icon]}
              />
            </>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[textTab(focused), { fontWeight: "bold", fontSize: 13 }]}
            >
              Feed
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Deals}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <View
                style={{
                  width: "50%",
                  height: 1,
                  backgroundColor: focused ? "black" : undefined,
                  bottom: 8.5,
                }}
              />
              <FastImage
                resizeMode="contain"
                source={focused ? images.DEALSON : images.DEALS}
                style={styles.icon}
              />
            </>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={[textTab(focused), { fontWeight: "bold", fontSize: 13 }]}
            >
              Deals
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Noti}
        options={{
          tabBarButton: () => null,
          // tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ViewProfile}
        options={{
          tabBarButton: () => null,
          // tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: layout.isPad ? 50 : 30,
    height: layout.isPad ? 34 : 24,
    marginBottom: layout.isPad ? 20 : 0,
  
  },
  wrapHome: {
    width: 73,
    height: 73,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 73 / 2,
    marginBottom: layout.heightScreen * 0.05,
  },
});
