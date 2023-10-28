/* eslint-disable prettier/prettier */
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, user);

      const {token} = res.data;
      await AsyncStorage.setItem('threadAuthToken', token);

      console.log('success login response  FE', res.data);
      Alert.alert('Successful', 'Login successful');
      setEmail('');
      setPassword('');
      navigation.replace('Main');
    } catch (error) {
      console.log('error login response FE', error);
      Alert.alert('Un-Successful', 'Login un-successful');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('threadAuthToken');
        if (token) {
          setTimeout(() => {
            navigation.replace('Main');
          }, 400);
        }
      } catch (error) {
        console.log('error fetching stored token', error);
      }
    };
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
      <View>
        <FontAwesome6 name="at" size={100} color="#000" />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 17, fontWeight: 'bold', marginTop: 20}}>
            Login to your account
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <FontAwesome6
              style={{marginLeft: 8}}
              name="at"
              size={25}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholder="your email"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#d0d0d0',
              borderWidth: 1,

              borderRadius: 5,
              marginTop: 30,
            }}>
            <AntDesign
              style={{marginLeft: 8}}
              name="lock"
              size={25}
              color="gray"
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholderTextColor="gray"
              placeholder="your password"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text>Keep me logged in</Text>
            <Text style={{fontWeight: '500', color: '#007fff'}}>
              Forgot password
            </Text>
          </View>
        </View>

        <View style={{marginTop: 45}} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: 'black',
            padding: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              color: '#fff',
            }}>
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{
            marginTop: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#000',
            }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
