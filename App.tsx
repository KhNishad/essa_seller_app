import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";



// navigations

import { TabNav } from "./navigation/TabNavigator";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from './screens/DashboardScreen';
import AddProducts from './screens/AddProductScreen';
import OrderList from './screens/OrderList'
import OrderDatail from './screens/OrderDetailScreen';




const Stack = createStackNavigator();

export default function App() {



  return (
    <NavigationContainer>
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

        {/* <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ header: () => null }}
            /> */}

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
          name="OrderDatail"
          component={OrderDatail}
          options={{ header: () => null }}
        />


      </Stack.Navigator>     
       <FlashMessage style={{alignItems:'center'}}  duration={3000} position="top" />
    </NavigationContainer>

  );
}
