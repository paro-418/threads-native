/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserType} from '../context/userContext';

const HomeScreen = () => {
  const {setUserId} = useContext(UserType);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('threadAuthToken');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        console.log('decoded userId', userId);
        setUserId(userId);
      } catch (error) {
        console.log('error fetching user FE', error);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
