/* eslint-disable prettier/prettier */
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserType} from '../context/userContext';
import axios from 'axios';
import {BASE_URL} from '../constants';

const ThreadScreen = () => {
  const [content, setContent] = useState('');
  const {userId} = useContext(UserType);

  const handlePostSubmit = async () => {
    const postData = {
      userId,
      content,
    };
    try {
      const res = await axios.post(`${BASE_URL}/post/create`, postData);
      console.log('post response FE', res.data);
      setContent('');
    } catch (error) {
      console.log('post error FE', error);
    }
  };
  return (
    <View style={{padding: 10}}>
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
        <Text>paro_418</Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 12}}>
        <TextInput
          onChangeText={text => setContent(text)}
          value={content}
          placeholder="type your message..."
          placeholderTextColor="gray"
          multiline
        />
      </View>
      <View style={{marginTop: 20}}>
        <Button onPress={handlePostSubmit} title="Share Post" />
      </View>
    </View>
  );
};

export default ThreadScreen;

const styles = StyleSheet.create({});
