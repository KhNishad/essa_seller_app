import React from 'react';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";


// services
import { Alert } from 'react-native';

// navigations 
import Dashboard from '../screens/DashboardScreen';
import ProductScreen from '../screens/ProductListScreen'
import ProfileScreen from '../screens/ProfileScreen'
import OrderList from '../screens/OrderList';
import RequisitionScreen from '../screens/RequisitionScreen'
import MyOrderList from '../screens/MyOrdersScreen'



export function TabNav() {


   // const netFunction = ()=>{
   //   NetworkUtils.isNetworkAvailable().then(res=>{
   //     if(!res){
   //       Alert.alert(
   //         "Something Went Wrong!",
   //         "Please Check Your Internet Connection",
   //         [
   //           {
   //             text: "Cancel",
   //             onPress: () => console.log("Cancel Pressed"),
   //             style: "cancel"
   //           },
   //           { text: "Try Again", onPress: () => netFunction() }
   //         ]
   //       );
   //     }
   //   })
   // }
   // netFunction()


   const [totalItems, settotalItems] = useState(0)
   const [renderMe, setrenderMe] = useState(false)


   const Tab = createBottomTabNavigator();


   return (
      <Tab.Navigator>

         <Tab.Screen name="Dashboard" component={Dashboard}
            options={{
               tabBarLabel: "Dashboard",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <Ionicons name="home-outline" size={25} color={focused ? '#BB2227' : color} />,
            }}

         />


         <Tab.Screen name="Products" component={ProductScreen}

            options={{
               tabBarIcon: ({ focused, color }) =>
                  <Ionicons name="gift-outline" size={25} color={focused ? '#BB2227' : color} />,
               header: () => null,
            }}


         />
          <Tab.Screen name="MyOrderList" component={MyOrderList}
            options={{
               tabBarLabel: "Order",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="shoppingcart" size={25} color={focused ? '#BB2227' : color} />,
            }}

         />

         <Tab.Screen name="RequisitionScreen" component={RequisitionScreen}
            options={{
               tabBarLabel: "Requisition",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="user" size={25} color={focused ? '#BB2227' : color} />,
            }}

         />
         <Tab.Screen name="ProfileScreen" component={ProfileScreen}
            options={{
               tabBarLabel: "Profile",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="user" size={25} color={focused ? '#BB2227' : color} />,
            }}

         />
         



         {/* 
            <Tab.Screen name="Profile"  component={AddProducts}
            
             options={{
                tabBarLabel: "Profile",
                // unmountOnBlur: true,
                header: () => null,
               
             tabBarIcon: ({focused, color }) =>  
             <FontAwesome name="user-o" size={25} color={focused? '#BB2227': color} />,
             }} 
             
            //  listeners={({ navigation, route }) => ({
            //   tabPress: e => {
            //     setrenderMe(!renderMe)
            //     navigation.reset({
            //       index: 0,
            //       routes: [{name: 'Categories'}],
            //     });
              
            //     },
             
            //   })}
           /> */}






      </Tab.Navigator>

   );
}