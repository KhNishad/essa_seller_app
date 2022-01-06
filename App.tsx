import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



// navigations

import { TabNav } from "./navigation/TabNavigator";
import LoginScreen from "./screens/LoginScreen";
// import DashboardScreen from './screens/DashboardScreen';
import  AddProducts  from './screens/AddProductScreen';



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
              name="DashboardScreen"
              component={DashboardScreen}
              options={{ header: () => null }}
            /> */}

            <Stack.Screen
              name="AddProducts"
              component={AddProducts}
              options={{ header: () => null }}
            />
           
           
          </Stack.Navigator>
        </NavigationContainer>
     
  );
}
