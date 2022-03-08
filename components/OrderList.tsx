import * as React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


const apiImagepath ='https://api.ebhubon.com/media/images';
// const apiImagepath ='http://192.168.0.17:3000/media/images';
const deviceWidth = Math.floor(Dimensions.get('window').width)


let Color = '';


const Table = ({userProducts}:any) => {
 

  const navigation = useNavigation(); 

 
   let arr = ['','','','','','','','','',]

   



   
  return (

    <SafeAreaView>
        <ScrollView>
     <View>
           <View  style={{marginBottom:25}} >
                {arr?.map((item,index)=>
                  <View key={index}>
                  {index%2 === 0?
                  <Text   style={{display:'none'}}> {Color ='#FFFFFF'}</Text>
                  :
                  <Text  style={{display:'none'}}>{Color ='#F9F9FF'}</Text>
                  }
                   <TouchableOpacity onPress={()=>navigation.navigate('OrderDatail')}>
                       <View  style={[styles.listContainer,{backgroundColor:Color}]}>      
                            <View style={styles.tableColumn1} >
                                <Image style={styles.productImg} source={require('../assets/images/smart-phone-half-block.jpg')} /> 
                            </View> 
                           
                             <View style={styles.tableColumn2}>
                             <Text style={{color:'#818181',fontWeight:'bold'}}>Order Id :001</Text>
                                <Text style={{color:'#818181',fontWeight:'bold'}}>Samsung Galaxy </Text>
                            </View> 
                           <View style={styles.tableColumn3}>
                                <Text style={styles.infoText}>Total Price:
                                     <Text   style={{fontWeight:'bold'}}>$250</Text> 
                                </Text>
                                <Text style={styles.infoText}>Quantity:
                                     <Text style={{fontWeight:'bold',fontSize:12}}>02</Text>
                                </Text>
                                 <Text style={styles.infoText}>Category:
                                   <Text  style={{fontWeight:'bold'}}>Mobile</Text> 
                                </Text>
                            </View> 
                     </View>
                  </TouchableOpacity>
             </View>
            )}
        </View>     
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

export default Table;

const styles = StyleSheet.create({
  
  tableColumn1:{
    width:(deviceWidth/3)-15,
    flexDirection:'column',
    paddingHorizontal:2,
    alignItems:'flex-start',
    
  },
  tableColumn2:{
    width:(deviceWidth/3)-10,
    flexDirection:'column',
    paddingHorizontal:2,
    alignItems:'center',
  },
  tableColumn3:{
    width:(deviceWidth/3)+10,
    flexDirection:'column',
    paddingHorizontal:2,
    marginLeft:5,
    alignItems:"flex-start",
    
  },
  textColor:{
    color:'#7B7B7B',
  },
  infoText:{
    color:'#7B7B7B',
    fontSize:12
  },
  productImg:{
    width:80,
    height:80,
    // borderWidth:0.5,
    // borderColor:'#1234',
    // resizeMode:'center'
  },
  listContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:20
  }

 


})