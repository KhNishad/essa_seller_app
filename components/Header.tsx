
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function TabTwoScreen() {

    const navigation = useNavigation();
    const logout = ()=>{
 
      SecureStore.deleteItemAsync('accessToken')
      navigation.navigate('LoginScreen')
      }

  return (

    <View style={styles.container}>
      <View style={styles.headerBar}>
         <View>

         </View>
         <Image style={{width:120,height:40,marginRight:10,resizeMode:'center'}} source={require('../assets/images/ESSA_Logo_PNG.png')}></Image>
        
         <Ionicons onPress={()=>logout()} name='log-in-outline'  color={'#fff'} size={35}></Ionicons>

      </View>
                
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor:'#FF9411',
    width:deviceWidth,
    borderTopColor:'#fff',
    borderTopWidth:.2,
    paddingVertical:5,
    paddingHorizontal:10
  },
  headerBar:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
 
 
});
