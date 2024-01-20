import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  CommonActions,
  StackActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { ROUTE_PATHS } from "../../src/constants/routes";
import Login from "../../src/screens/Login";
import { auth } from "../config/firebaseConfig";
import { Colors } from "../constants/pallete";
//import useChangeLang from "../hooks/useChangeLang";
import useMainColors from "../hooks/useMainColors";
import { disableLoading } from "../slicer/general/general.actions";
import { checkUserSession } from "../slicer/user/user.actions";
import { i18n } from "../translations/i18n";
import {
  BookReaderScreen,
  BookScreen,
  CartScreen,
  CheckoutScreen,
  FavoritesScreen,
  HomeScreen,
  MainMenuScreen,
  OfferScreen,
  SettingsScreen,
  ShelvesScreen,
  ShelvesScreenConfig,
  ShopBookScreen,
  ShopCollectionScreen,
  ShopCollectionsScreen,
  ShopMenuScreen,
  ShopScreen,
  ShopSearchScreen,
} from "./Screens";
import { stylesScreens } from "./styles";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={ROUTE_PATHS.LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};
const HomeStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTE_PATHS.MAIN_HOME }],
        }),
      });
    }
  }, [navigation, isFocused]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTE_PATHS.MAIN_HOME}
    >
      <Stack.Screen name={ROUTE_PATHS.MAIN_HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTE_PATHS.SHELVES} component={ShelvesScreen} />
      <Stack.Screen
        name={ROUTE_PATHS.SHELVES_CONFIG}
        component={ShelvesScreenConfig}
      />
      <Stack.Screen
        name={ROUTE_PATHS.BOOK_READER}
        component={BookReaderScreen}
      />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTE_PATHS.FAVORITES }],
        }),
      });
    }
  }, [navigation, isFocused]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTE_PATHS.FAVORITES}
    >
      <Stack.Screen name={ROUTE_PATHS.FAVORITES} component={FavoritesScreen} />
      <Stack.Screen name={ROUTE_PATHS.CART} component={CartScreen} />
      <Stack.Screen name={ROUTE_PATHS.CHECKOUT} component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

const OfferStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTE_PATHS.OFFER}
    >
      <Stack.Screen name={ROUTE_PATHS.OFFER} component={OfferScreen} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTE_PATHS.MAIN_MENU }],
        }),
      });
    }
  }, [navigation, isFocused]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTE_PATHS.MAIN_MENU}
    >
      <Stack.Screen name={ROUTE_PATHS.MAIN_MENU} component={MainMenuScreen} />
      <Stack.Screen name={ROUTE_PATHS.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const ShopStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTE_PATHS.SHOP }],
        }),
      });
    }
  }, [navigation, isFocused]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTE_PATHS.SHOP}
    >
      <Stack.Screen name={ROUTE_PATHS.SHOP} component={ShopScreen} />
      <Stack.Screen name={ROUTE_PATHS.SHOP_MENU} component={ShopMenuScreen} />
      <Stack.Screen
        name={ROUTE_PATHS.SHOP_SEARCH}
        component={ShopSearchScreen}
      />
      <Stack.Screen
        name={ROUTE_PATHS.SHOP_COLLECTIONS}
        component={ShopCollectionsScreen}
      />
      <Stack.Screen
        name={ROUTE_PATHS.SHOP_COLLECTION}
        component={ShopCollectionScreen}
      />
      <Stack.Screen name={ROUTE_PATHS.CART} component={CartScreen} />
      <Stack.Screen name={ROUTE_PATHS.CHECKOUT} component={CheckoutScreen} />
      <Stack.Screen name={ROUTE_PATHS.BOOK_SHOP} component={ShopBookScreen} />
    </Stack.Navigator>
  );
};

const Screens = () => {
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useMainColors();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  //useChangeLang();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state changes when the component unmounts
  }, []);

  useEffect(
    () => {
      dispatch(checkUserSession());
      dispatch(disableLoading());
    },
    // eslint-disable-next-line
    []
  );

  if (!isAuthenticated) {
    return <AuthScreens />;
  }

  return (
    <Tab.Navigator
      initialRouteName={ROUTE_PATHS.HOME} // Set the default tab to "Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTitleStyle: {
          fontSize: 16, // Adjust the font size as needed
          color: textColor,
        },
        headerTitleContainerStyle: {},
        headerTintColor: Colors.darkGrey, // Change the color of the text here
        tabBarShowLabel: false,
        tabBarStyle: {
          ...stylesScreens.shadow,
        },
      }}
    >
      <Tab.Screen
        name={i18n.t("bottomMenu.favorites")}
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "white" : undefined,

                width: 55,
                height: 55,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={"star-outline"}
                size={27}
                color={focused ? Colors.tealc : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={i18n.t("bottomMenu.offer")}
        component={OfferStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "white" : undefined,

                width: 55,
                height: 55,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SimpleLineIcons
                name={"present"}
                size={27}
                color={focused ? Colors.tealc : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTE_PATHS.HOME}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "white" : undefined,

                width: 55,
                height: 55,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={"home-outline"}
                size={27}
                color={focused ? Colors.tealc : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={i18n.t("bottomMenu.shop")}
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "white" : undefined,

                width: 55,
                height: 55,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={"folder-outline"}
                size={27}
                color={focused ? Colors.tealc : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={i18n.t("bottomMenu.more")}
        component={SettingsStack}
        options={{
          // tabBarStyle: {
          //   display: "none"
          // },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "white" : undefined,

                width: 55,
                height: 55,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={"menu-outline"}
                size={27}
                color={focused ? Colors.tealc : "white"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Screens;
