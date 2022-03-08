import * as React from 'react';
import {StyleSheet,View,Text,ScrollView,RefreshControl,TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {useState,useEffect} from 'react';
import { useIsFocused } from "@react-navigation/native";



// components
import Header from '../components/Header';
import Table from '../components/OrderList';

const deviceWidth =Math.floor(Dimensions.get('window').width)



let product:any[];
const OrderList = () =>{

  const navigation = useNavigation(); 
  const isFocused = useIsFocused();
 
  const [refreshing, setrefreshing] = useState(false)
  const [userProducts, setuserProducts] = useState()
  const [openTable, setopenTable] = useState()
  const [selectedItems, setselectedItems] = useState([])

  const orderDatils = async ()=>{

    navigation.navigate('orderDetail')
  }

     // pull refresh  function
  function wait (time:any){
    return new Promise(resolve =>{
      setTimeout(resolve,time)
    })
  }
  const refresh = React.useCallback (()=>{
    setrefreshing(true)
    wait(1000).then(()=>{
      setrefreshing(false)
      
    })
  },[refreshing])

    
    return  (
      <View >
          <Header/>
            <View style={styles.container}> 
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Order List</Text>
                </View>
            </View>
            <View>
            <View style={styles.container3}>
                    <View style={styles.tableRow}>
                       <Text style={{fontSize:15,fontWeight:'bold'}}>Image</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>Title</Text>
                    </View>
                    <View >
                        <Text style={{fontSize:15,fontWeight:'bold'}}>Info</Text>
                    </View>
                </View>
            {/* <ScrollView style={{marginBottom:350}} refreshControl={ <RefreshControl  refreshing={refreshing} onRefresh={refresh}/>}> */}
               
                    <TouchableOpacity  onPress={()=>orderDatils()}>
                        <Table userProducts={userProducts} setrefreshing={setrefreshing}/>
                    </TouchableOpacity>
                    
              {/* </ScrollView> */}
           </View>
        </View>

    )
}
export default OrderList;
const styles = StyleSheet.create({
 

    container:{
      
      paddingHorizontal:20,
      paddingVertical:10,
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-between',
    //   backgroundColor:'#FAFAFA',
      borderBottomColor:'#FF9411',
      borderBottomWidth:.5

    },
    addProduct:{
      backgroundColor:'#FF9411',
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:2,
      flexDirection:'row'
    },
    entries:{
      flexDirection:'row',
    },
    container2:{
      paddingHorizontal:10,
      paddingVertical:10,
      flexDirection:"row",
      justifyContent: 'space-between',
      borderBottomWidth:0.8,
      borderBottomColor:"#C0C0C0",
      backgroundColor:"#FFFFFF",
    
    },
  
    container3:{
      flexDirection:'row',
      paddingHorizontal:20,  
      paddingVertical:10,
      // justifyContent:'space-around',
      backgroundColor:'#F8F8F8',
      alignItems:'center'

    },
    tableRow:{
      flexDirection:'column',
      width:deviceWidth/3,
      alignItems:'flex-start'
    },
    picker:{
      height: 30, 
      width:(deviceWidth/3)+30,
    },

   
  

    
    
  })


