
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

// service 
import LoginService from '../services/LoginService';
import React from 'react';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {

    const navigation = useNavigation<any>();


    const [email, setemail] = useState('')
    const [passWord, setpassWord] = useState('')
    const [loading, setloading] = useState(false)


    const LoginSubmit = async ()=>{
      setloading(true)
      const data  = {
        emailOrPhone:email,
        password: passWord
      }

     if(data?.emailOrPhone && data?.password){
          try {
            const res = await LoginService.Login(data)
              
            if(res?.statusCode == 200){
              setloading(false)

              showMessage({
                message: `${res.message}`,
                type: "success",
              });
              SecureStore.setItemAsync('accessToken',res?.data?.token?.accessToken);
              navigation.navigate('TabNav');
            }
           

          } catch (error) {
            
            setloading(false)
            showMessage({
              message: `${error.message}`,
              type: "danger",
            });
          }

     }else{
      setloading(false)

      showMessage({
            message: `Both Fields are Required !`,
            type: "danger",
          });
     }
      
       
      }


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#FF9411"/>
        <SafeAreaView>
            <View style={{borderTopColor:'#fff',alignItems:'center',marginBottom:40}}>
                <FontAwesome name='user-circle' size={90} color={'#fff'}/>
                {/* <Image style={{width:deviceWidth/3,height:80,resizeMode:'contain'}} source={require('../assets/images/essa-logo.jpeg')}></Image> */}
                <Text style={styles.title}>Login</Text>
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setemail}
                    value={email}
                    placeholder="email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setpassWord}
                    value={passWord}
                    placeholder="Password"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity style={{alignItems:'center',paddingBottom:10}}>
                <Text style={[styles.title,{fontSize:14}]}>Forgot Your Password?</Text>
            </TouchableOpacity>
            <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity onPress={()=>LoginSubmit()} style={{backgroundColor:'#001E42',padding:10,width:deviceWidth/1.2,alignItems:'center',borderRadius:5}}>
                   {loading?<ActivityIndicator style={{marginLeft:5}} size="small" color="#FFF" />
                   :
                   <Text style={[styles.title,{fontSize:16}]}>Login</Text>
                   }
                    
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
       
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#FF9411',
    paddingTop:deviceHeight/6
  },
  title: {
    fontSize: 30,
    color:'#fff',
    fontWeight:"normal" ,
  },
  input: {
    height: 40,
    width:deviceWidth/1.2,
    margin: 12,
    borderWidth: .5,
    padding: 10,
    borderColor:'#fff',
    borderRadius:5,
    backgroundColor:'#fff'
  },
});
