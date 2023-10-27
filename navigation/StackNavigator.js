/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThreadScreen from '../screens/ThreadScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#000'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        component={ThreadScreen}
        name="Thread"
        options={{
          tabBarLabel: 'Create',
          tabBarLabelStyle: {color: '#000'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="create" size={24} color="black" />
            ) : (
              <Ionicons name="create-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        component={ActivityScreen}
        name="Activity"
        options={{
          tabBarLabel: 'Activities',
          tabBarLabelStyle: {color: '#000'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <AntDesign name="heart" size={24} color="black" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: '#000'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tabs.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
