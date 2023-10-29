/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {UserType} from '../context/userContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {userId} = useContext(UserType);
  const [user, setUser] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/profile/${userId}`);
      console.log('get user res FE PS', res.data);
      setUser(res.data.user);
    } catch (error) {
      console.log('error fetching post', error);
    }
  };
  useEffect(() => {
    fetchProfile;
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  const handleLogout = async () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('threadAuthToken');
    console.log('cleared auth token');
    navigation.replace('Login');
  };
  return (
    <ScrollView style={{padding: 15}}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user?.name}</Text>
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: '#d0d0d0',
            }}>
            <Text>Threads.net</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginTop: 15,
          }}>
          <View>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 15, fontWeight: '400'}}>BTech.</Text>
            <Text style={{fontSize: 15, fontWeight: '400'}}>Footballer</Text>
            <Text style={{fontSize: 15, fontWeight: '400'}}>
              Listen to your soul
            </Text>
          </View>
        </View>
        <Text style={{color: 'gray', marginTop: 10, fontSize: 15}}>
          {user?.followers?.length} followers
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
          }}>
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text>Edit Profile</Text>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text>Log out</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
