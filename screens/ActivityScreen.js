/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {UserType} from '../context/userContext';
import axios from 'axios';
import {BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import User from '../components/User';
import {useFocusEffect} from '@react-navigation/native';

const ActivityScreen = () => {
  const [selectedButton, setSelectedButton] = useState('people');
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState('People Content');
  const {userId} = useContext(UserType);

  const handleButtonClick = buttonName => {
    setSelectedButton(buttonName);
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${userId}`);
      console.log('received user response FE', res.data);
      setUsers(res.data.users);
    } catch (error) {
      console.log('error fetching user ActivityScreen FE', error);
    }
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Activity</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 12,
          }}>
          <TouchableOpacity
            onPress={() => handleButtonClick('people')}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                borderColor: '#d0d0d0',
                borderWidth: 0.7,
              },
              selectedButton === 'people' ? {backgroundColor: '#000'} : null,
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
                selectedButton === 'people' ? {color: '#fff'} : {color: '#000'},
              ]}>
              People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonClick('all')}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                borderColor: '#d0d0d0',
                borderWidth: 0.7,
              },
              selectedButton === 'all' ? {backgroundColor: '#000'} : null,
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
                selectedButton === 'all' ? {color: '#fff'} : {color: '#000'},
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonClick('request')}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                borderColor: '#d0d0d0',
                borderWidth: 0.7,
              },
              selectedButton === 'request' ? {backgroundColor: '#000'} : null,
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
                selectedButton === 'request'
                  ? {color: '#fff'}
                  : {color: '#000'},
              ]}>
              Requests
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {selectedButton === 'people' && (
            <View style={{marginTop: 20}}>
              {users?.map((user, index) => (
                <User key={index} item={user} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
