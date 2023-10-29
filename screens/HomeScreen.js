/* eslint-disable prettier/prettier */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserType} from '../context/userContext';
import axios from 'axios';
import {BASE_URL} from '../constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const {setUserId, userId} = useContext(UserType);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('threadAuthToken');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        console.log('decoded userId', userId);
        setUserId(userId);
      } catch (error) {
        console.log('error fetching user HomeScreen FE', error);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/post/all-posts`);
      setPosts(res.data.posts);
      console.log('all posts', res.data.posts);
    } catch (error) {
      console.log('failed to fetch post FE HS', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, []),
  );

  const handleLike = async postId => {
    try {
      const res = await axios.put(`${BASE_URL}/post/${postId}/${userId}/like`);
      console.log('like response', res.data);
      const updatedPost = res.data;
      const updatedPosts = posts?.map(post =>
        post?._id === updatedPost?._id ? updatedPost : post,
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log('error liking post FE HomesScreen');
    }
  };
  const handleDisLike = async postId => {
    try {
      const res = await axios.put(
        `${BASE_URL}/post/${postId}/${userId}/unlike`,
      );
      console.log('like response', res.data);
      const updatedPost = res.data;
      const updatedPosts = posts?.map(post =>
        post?._id === updatedPost?._id ? updatedPost : post,
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log('error liking post FE HomesScreen');
    }
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <FontAwesome6 name="at" size={50} color="#000" />
      </View>

      <View style={{marginTop: 20}}>
        {posts?.map((post, index) => (
          <View
            key={index}
            style={{
              padding: 15,
              borderColor: '#d0d0d0',
              borderTopWidth: 1,
              flexDirection: 'row',
              gap: 10,
            }}>
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
            </View>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 3}}>
                {post?.user?.name}
              </Text>
              <Text>{post?.content}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 15,
                }}>
                {post?.likes?.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDisLike(post._id)}
                    name="hearto"
                    size={30}
                    color="red"
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(post._id)}
                    name="hearto"
                    size={30}
                    color="black"
                  />
                )}

                <FontAwesome name="comment-o" size={30} color="black" />
                <Ionicons name="share-social-outline" size={30} color="black" />
              </View>
              <Text style={{marginTop: 4, color: 'gray'}}>
                {post?.likes?.length} likes . {post?.replies?.length} replies
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
