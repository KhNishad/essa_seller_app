import * as React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity,RefreshControl} from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


const apiImagepath = "http://103.119.71.9:4400/media";
const deviceWidth = Math.floor(Dimensions.get('window').width)


let Color = '';


const Table = ({userProducts,setrefreshing,refreshing}:any) => {
 

   console.log('.............res',userProducts[0]?.images[0]);
   

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

  const navigation = useNavigation(); 

 
   
  return (

    <SafeAreaView>
        <ScrollView style={{height:'90%'}} refreshControl={ <RefreshControl  refreshing={refreshing} onRefresh={refresh}/>}>
     <View style={{flex:1}}>
           <View  style={{marginBottom:25}} >
                {userProducts?.map((item:any,index:number)=>
                  <View key={index}>
                  {index%2 === 0?
                  <Text   style={{display:'none'}}> {Color ='#FFFFFF'}</Text>
                  :
                  <Text  style={{display:'none'}}>{Color ='#F9F9FF'}</Text>
                  }
                   <TouchableOpacity onPress={()=>navigation.navigate('AddProducts',{id:item?.id})}>
                       <View  style={[styles.listContainer,{backgroundColor:Color}]}>   
                            {item?.images?.length>0?   
                              <View style={styles.tableColumn1} >
                                <Image style={styles.productImg} source={{uri:`${apiImagepath}/${item?.images[0]}`}} /> 
                              </View> 
                            :
                            <View style={styles.tableColumn1} >
                               <Image style={styles.productImg} source={require('../assets/images/essa-logo.png')} /> 
                             </View>
                            }
                           
                             <View style={styles.tableColumn2}>
                            
                                <Text style={{color:'#818181',fontWeight:'bold'}}>{item?.title}</Text>
                            </View> 
                           <View style={styles.tableColumn3}>
                                <Text style={styles.infoText}>Sale Price:
                                     <Text   style={{fontWeight:'bold'}}>Tk{item?.productVariation[0]?.salePrice}</Text> 
                                </Text>
                                <Text style={styles.infoText}>Quantity:
                                     <Text style={{fontWeight:'bold',fontSize:12}}>02</Text>
                                </Text>
                                 <Text style={styles.infoText}>Category:
                                   <Text  style={{fontWeight:'bold'}}>{item?.category?.title}</Text> 
                                </Text>
                                <Text style={styles.infoText}>Status:
                                   <Text  style={{fontWeight:'bold'}}>{item?.activeStatus == 1?'Published':item?.activeStatus == 2?'Pending':item?.activeStatus == 3?'Rejected':item?.activeStatus == 4?'Draft':item?.activeStatus ==5?'Archive':''}</Text> 
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
    resizeMode:'center'
  },
  listContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:20
  }

 


})