
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import * as SecureStore from 'expo-secure-store';

// components
import Header from '../components/Header'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {

    const navigation = useNavigation();


    const [email, setemail] = useState('')
    const [passWord, setpassWord] = useState('')
const logout = ()=>{
 
SecureStore.deleteItemAsync('accessToken')
}

  return (

    <View style={styles.container}>
        <StatusBar backgroundColor="#FF9411"/>
        <Header />

        <SafeAreaView>
          <ScrollView>

            <View style={{borderTopColor:'#171717',marginBottom:5}}>
                
                <View style={{alignItems:'center'}}>
                  <LineChart
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                          ]
                        }
                      ]
                    }}
                    width={deviceWidth-20} // from react-native
                    height={180}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#3CACFE",
                      backgroundGradientFrom: "#3CACFE",
                      backgroundGradientTo: "#3CACFE",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      // style: {
                      //   borderRadius: 16
                      // },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 5
                    }}
                  />
                </View>

                <Text style={{paddingVertical:10,fontSize:15,fontWeight:'bold'}}>Total Summary</Text>

                <View style={styles.cardContainer}>

                    <TouchableOpacity onPress={()=>logout()} style={styles.card}>
                      <Text style={{color:'#fff'}}>New Order</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </TouchableOpacity>

                    <View style={[styles.card,{backgroundColor:'#4BD97B'}]}>
                      <Text style={{color:'#fff'}}>Products</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>250</Text>
                    </View>

                    <View style={[styles.card,,{backgroundColor:'#9156FF'}]}>
                      <Text style={{color:'#fff'}}>Profit</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>
                    
                    <View style={[styles.card,{backgroundColor:'#FDB45C'}]}>
                      <Text style={{color:'#fff'}}>New Order</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Products</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Profit</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>
                    <View style={[styles.card,{backgroundColor:'#FDB45C'}]}>
                      <Text style={{color:'#fff'}}>New Order</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Products</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Profit</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>
                    <View style={[styles.card,{backgroundColor:'#FDB45C'}]}>
                      <Text style={{color:'#fff'}}>New Order</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Products</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>250</Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{color:'#fff'}}>Profit</Text>
                      <Text style={{paddingTop:15,color:'#fff'}}>BDT.250</Text>
                    </View>
                </View>

                <Text style={{paddingVertical:10,fontSize:15,fontWeight:'bold'}}></Text>


            </View>

          </ScrollView>
        </SafeAreaView>
       
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  title: {
    fontSize: 30,
    color:'#171717',
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
  cardContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
    // paddingHorizontal:10,
    width:deviceWidth-20,
    justifyContent:'space-between'
  },
  card:{
    backgroundColor:'#3CACFE',
    width:deviceWidth/3-10,
    alignItems:'flex-start',
    paddingVertical:15,
    paddingLeft:10,
    borderRadius:5,
    marginBottom:10
  }
});
