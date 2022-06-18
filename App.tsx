import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import { useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';



// navigations

import { TabNav } from "./navigation/TabNavigator";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from './screens/DashboardScreen';
import AddProducts from './screens/AddProductScreen';
import OrderList from './screens/OrderList'
import RequisitionDetails from './screens/requisitionDetails'
import OrderDetails from './screens/OrderDetailsScreen'





const Stack = createStackNavigator();

export default function App() {

  const [Token, setToken] = useState('')



 useEffect(() => {

  SecureStore.getItemAsync('accessToken').then(res =>{

    if(res){
      setToken(res)
      
    }else{
      setToken('noToken')
    }
}).catch(err=> SecureStore.deleteItemAsync('accessToken'))

 }, [])


  return (
    <NavigationContainer>
      {Token == 'noToken'?
      <Stack.Navigator initialRouteName={"LoginScreen"}>

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ header: () => null }}
      />

     

      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ header: () => null }}
      />


    </Stack.Navigator>     
      :
      <>
      {Token?
      <Stack.Navigator initialRouteName={"TabNav"}>

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ header: () => null }}
      />

     

      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="RequisitionDetails"
        component={RequisitionDetails}
        options={{ header: () => null }}
      />


    </Stack.Navigator>     
      :null}
      </>
      }

     
       <FlashMessage style={{alignItems:'center'}}  duration={3000} position="top" />
    </NavigationContainer>

  );
}
