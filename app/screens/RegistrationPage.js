import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, KeyboardAvoidingView, ImageBackground, TextInput, StyleSheet, Image, onPress } from 'react-native'
import AppButton from '../components/AppButton';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/core';
import UserPermissions from '../../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';

import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"


function RegistrationPage(props) {
  const [email,setEmail] = useState('')
  const [password1,setPassword1] = useState('')
  const [password2,setPassword2] = useState('')
  const [username,setUsername] = useState('')
  const [avatar, setAvatar] = useState(null)
  
  const navigation = useNavigation()


  const signUp = () => {
    if (password1 === password2) {
    
    createUserWithEmailAndPassword(auth,email,password2)
    .then(userInfo => {
      const user = userInfo.user;
      navigation.replace("Home")
      console.log(user.email) //testing
    })
    .catch(error => alert(error.message))
    } else {
      console.log("wrong password")
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };
  
    return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
       <ImageBackground 
          style = {styles.imageContainer}
          blurRadius = {8}
          source = {require('../assets/homepage.jpg')}>
        <View style = {styles.backIcon}>
                    <MaterialCommunityIcons name='arrow-left-bold' 
                    color={colors.primary}
                    size={35}
                    onPress={() => navigation.replace("login")} />
        </View>
        <View>
            <Text style = {styles.registrationTextTop}>Hello!</Text>
            <Text style = {styles.registrationTextBottom}>Sign up to get started!</Text>
        </View>

        <View style = {styles.AddProfilePicContainer}>
        <TouchableOpacity style = {styles.avatarPlaceholder} onPress={pickImage}>
          {avatar == null && <Image 
            source = {require('../assets/AddProfilePic.png')}
            style = {styles.AddProfilePic}  />}
          {avatar != null && <Image 
            source = {{ uri: avatar }}
            style = {styles.AddProfilePic}
          />}
        </TouchableOpacity>
        </View>
        
            
        <View style={styles.inputContainer}>
          <TextInput
            placeholder = "Username" 
            style = {styles.input}
            value = {username}
            onChangeText = {text => setUsername(text)}>
          </TextInput>
          <TextInput
            placeholder = "Email" 
            style = {styles.input}
            value = {email}
            onChangeText = {text => setEmail(text)}>
          </TextInput>
          <TextInput
          placeholder="Password"
          style={styles.input}
          value = {password1}
          onChangeText = {text => setPassword1(text)}>
         </TextInput>
         <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value = {password2}
          onChangeText = {text => setPassword2(text)}>
         </TextInput>
      </View>
      <View style={styles.container}>
           <AppButton title = 'Register' onPress = {signUp} />
      </View>
          
        </ImageBackground> 
        
 </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
        imageContainer: {
          height: '100%',
          width: '100%',
  
        },
        button: {
          position: 'absolute',
          bottom: 0,
          opacity: 1,
        },
        bottom: {
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36
        },
        inputContainer: {
          width: '80%',
          alignSelf: 'center',
          
        
        },
        input: {
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
         
        },
        backIcon:{
            top: 40,
            paddingLeft: 15
        },
        registrationTextTop:{
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            top: 60,
            paddingLeft: 30,
            alignContent: 'center',
        },
        registrationTextBottom: {
          fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            top: 60,
            paddingLeft: 30,
            paddingBottom: 100,
            alignContent: 'center',
        },
        AddProfilePic: {
          alignSelf:'center',
          height: 150,
          width: 150,
          borderRadius: 79,
        },
        AddProfilePicContainer: {
          paddingBottom: 30,
        },
        avatarPlaceholder:{
          width: 150,
          height: 150,
          borderRadius: 79,
          alignSelf: 'center',
        
        }
})

export default RegistrationPage;