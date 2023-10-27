/* eslint-disable prettier/prettier */
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

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
            Register to your account
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
            <Ionicons
              style={{marginLeft: 8}}
              name="person"
              size={25}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholder="your name"
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
              marginTop: 28,
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
              marginTop: 28,
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
          </View>
        </View>

        <View style={{marginTop: 45}} />

        <Pressable
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
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#000',
            }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
