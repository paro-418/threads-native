/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {UserType} from '../context/userContext';
import axios from 'axios';
import {BASE_URL} from '../constants';

const User = ({item}) => {
  const {userId} = useContext(UserType);

  const [requestSent, setReqSent] = useState(false);
  const sendFollow = async (currentUserId, selectedUserId) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/follow`, {
        currentUserId,
        selectedUserId,
      });
      console.log(res.data);

      if (res.statusText === 'ok') {
        setReqSent(true);
      }
    } catch (error) {
      console.log('send follow failed FE', error);
    }
  };

  const handleUnFollow = async targetId => {
    try {
      const res = await axios.post(`${BASE_URL}/user/unfollow`, {
        targetUserId: targetId,
        loggedInUserId: userId,
      });
      if (res.status === 200) {
        setReqSent(false);
        console.log('un-followed successfully');
      }
    } catch (error) {
      console.log('un-follow request error FE', error);
    }
  };
  useEffect(() => {
    // Reset the requestSent state whenever the userId or item prop changes
    setReqSent(false);
  }, [userId, item]);
  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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

        <Text style={{fontSize: 15, fontWeight: '500', flex: 1}}>
          {item?.name}
        </Text>

        {requestSent || item?.followers?.includes(userId) ? (
          <Pressable
            onPress={() => handleUnFollow(item?._id)}
            style={{
              borderColor: '#D0D0D0',
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 8,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
              Following
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFollow(userId, item._id)}
            style={{
              borderColor: '#D0D0D0',
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 8,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
              Follow
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
