import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Title,Drawer,Text,} from 'react-native-paper';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import { Ionicons,FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { useIsDrawerOpen } from '@react-navigation/drawer';




// servicess
import UserService from '../Services/userService'


const apiImagepath = 'https://api.ebhubon.com/media/images/';
let cnt=0;
export function DrawerContent(props:any) {

    

  const isDrawerOpen = useIsDrawerOpen();
  const [showModal, setshowModal] = useState(false)

//    logout  funtion 
    const logout  = async () =>{
       
        
    //   await  SecureStore.deleteItemAsync('accessToken')
    //   props.navigation.navigate('LoginScreen')
    //     // props.navigation.dispatch(
    //     //   CommonActions.reset({
    //     //     index: 1,
    //     //     routes: [
    //     //       { name: 'LoginScreen' },
    //     //     ]
    //     //     ,
    //     //   })
    //     // );
    //     console.log("logged out");
      
   
    //   }

    //   get RiderDetails
  
    let sellerInfo:any;
    const [RiderDetails, setRiderDetails] = useState([])
    const [Rider, setRider] = useState('')

    


    return(
        <View style={{flex:1,backgroundColor:'linear-gradient(90deg, hsla(202, 71%, 27%, 1) 0%, hsla(195, 43%, 41%, 1) 76%, hsla(187, 34%, 53%, 1) 91%, hsla(176, 45%, 66%, 1) 100%)'}}>
          
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                 
                    <View style={styles.userInfoSection}>
                      <TouchableOpacity  style={{paddingBottom:5}}>
                    
                        <View style={{flexDirection:'row',marginTop: 15}}>
                         
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Image style={styles.sellerImg} source={require('../assets/user.png')}/>
 
                               <Title style={styles.title}>Abdus Sattar</Title>    
                               <Title style={[styles.title,{fontSize:12}]}>01728897264</Title>   
                                                    
                            </View>
                       </View>
                    </TouchableOpacity>
                   </View>
                    
                    
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                           icon={({color, size}) => (
                            <Ionicons   name="home-outline"   color='#fff' size={size}  />
                            )}
                            label="Home"
                            labelStyle={{color:'#fff'}}
                            onPress={() => {props.navigation.navigate('Account')}}
                           />
                        <DrawerItem 
                            icon={({color, size}) => (
                            // <Ionicons  color='#fff' size={size}   name="gift-outline"></Ionicons>
                            <MaterialCommunityIcons  name="account-outline"    color='#fff'   size={size}  />

                            )}
                            label="Yolo Money"
                            labelStyle={{color:'#fff'}}
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                         <DrawerItem 
                        icon={({color, size}) => (
                        <MaterialCommunityIcons  name="format-list-checks"    color='#fff'   size={size}  />
                        )}
                        label="My Ride(s)"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {props.navigation.navigate('MyDeliveryScreen')}}
                    />
                      
                    </Drawer.Section>

                   
                      <DrawerItem 
                        icon={({color, size}) => (
                        <MaterialIcons  name="rate-review"   color='#fff' size={size}  />
                        )}
                        label="Notifications"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {props.navigation.navigate('CurrrentJobScreen')}}
                    />
                     <DrawerItem 
                        icon={({color, size}) => (
                        <MaterialIcons  name="rate-review"   color='#fff' size={size}  />
                        )}
                        label="Invite Friends & Earns"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {props.navigation.navigate('CurrrentJobScreen')}}
                    />
                     <DrawerItem 
                        icon={({color, size}) => (
                        <MaterialIcons  name="rate-review"   color='#fff' size={size}  />
                        )}
                        label="Support"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {props.navigation.navigate('CurrrentJobScreen')}}
                    />
                     <DrawerItem 
                        icon={({color, size}) => (
                        <MaterialIcons  name="rate-review"   color='#fff' size={size}  />
                        )}
                        label="My Places"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {props.navigation.navigate('CurrrentJobScreen')}}
                    />
                     <DrawerItem 
                        icon={({color, size}) => (
                            <FontAwesome5 name="sign-out-alt"  color="#fff"  size={size}  />
                        )}
                        label="Sign Out"
                        labelStyle={{color:'#fff'}}
                        onPress={() => {logout()}}
                    />
                 
                   
                </View>
               
                </DrawerContentScrollView>

              
                
           
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      // backgroundColor:'blue'
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingBottom:10,
      borderBottomWidth:0.5,
      borderBottomColor:'#f4f4f4',
      marginTop:50
    },
    title: {
      fontSize: 16,
      color:'#fff'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        backgroundColor:'blue'
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    sellerImg:{
     
      width:50,
      height:50,
      borderRadius:50
    }
  });