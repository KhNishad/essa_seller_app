import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

// components
import Header from '../components/Header';
// service
import AddressService from '../services/AddressService';

const deviceWidth = Math.floor(Dimensions.get('window').width)

const ViewProduct = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [phone, setphone] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [img, setimg] = useState('')
  const [whatsapp, setwhatsapp] = useState('');
  const [facebook, setfacebook] = useState('');
  const [Nid, setNid] = useState('');
  const [Imagee, setImagee] = useState([]);
  const [passport, setpassport] = useState('');
  const [birthCertificate, setbirthCertificate] = useState('');
  const [tin, settin] = useState('');
  const [selectedZone, setselectedZone] = useState("Zone");
  const [selectedTeritory, setselectedTeritory] = useState('Teritory')
  const [selectedRegion, setselectedRegion] = useState('Region')

  // data from back
  const [zones, setzones] = useState<any>([])
  const [regions, setregions] = useState<any>([])
  const [teritories, setteritories] = useState<any>([])


  //   image upload
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setimg(result.uri);
  }
};

// get address zone 

useEffect(() => {
  
 const getZone = async ()=>{
   try {
   let res = await AddressService.getZone()
     if(res){
      setzones(res?.data)
     }
     
   } catch (error) {
     
   }
 }
 getZone()
 
}, [])

// get region by zone 

useEffect(() => {
  
  const getRegionbyZone = async ()=>{
    setselectedRegion('')
    try {
        let res = await AddressService.getRegionByZone(selectedZone)
        setregions(res?.data?.children)
    } catch (error) {
      
    }
  }
  getRegionbyZone()
  
 }, [selectedZone])

 useEffect(() => {
  setselectedTeritory('')
  const getTeritoryByregion = async ()=>{
    try {
        let res = await AddressService.getTeritoryByregion(selectedRegion)
        setteritories(res?.data?.children)
    } catch (error) {
      
    }
  }
  getTeritoryByregion()
  
 }, [selectedRegion])




const submit = async()=>{
 const data =  {
    name:fullname,
    email: email,
    phone: phone,
    logo: '',
    socialMedia: {
      whatsApp: {
        number: whatsapp
      },
      facebook: {
        url: facebook
      }
    },
    documents: {
      nid: {
        number: Nid,
        photoUrl: "string"
      },
      passport: {
        number: passport,
        photoUrl: "string"
      },
      birthCertificate: {
        number: birthCertificate,
        photoUrl: "string"
      },
      tin: {
        number:tin,
        photoUrl: "string"
      }
    },
    address: {
      zone: {
        id: selectedZone,
        title: "string"
      },
      region: {
        id: selectedRegion,
        title: "string"
      },
      tarrritory: {
        id: selectedTeritory,
        title: "string"
      },
      more: "string"
    }
  }
  console.log('====================================payload',data);
  
}


  return (
    <SafeAreaView>
      <ScrollView >
        <View style={{backgroundColor:'#fff'}}>
          <Header />
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Account Info</Text>
            </View>
          </View>
          <View style={styles.uploadimage}>
            <View>
              <Image style={styles.img} source={{ uri: 'https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1' }}>

              </Image>
              <FontAwesome5 onPress={()=>pickImage()} color='#FF9411' style={styles.cam} name='camera'></FontAwesome5>


            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Mithu Korim</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Dhaka</Text>
          </View>
          <View style={{ marginHorizontal: 15,backgroundColor:'#fff' }}>
            <View >
              <Text style={styles.labelText}>Phone Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setphone}
                placeholder="Phn No"
                value={phone}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setfullname}
                placeholder="Full Name"
                value={fullname}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setemail}
                placeholder="Email"
                value={email}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Whatsapp</Text>
              <TextInput
                style={styles.input}
                onChangeText={setwhatsapp}
                placeholder="WhatsApp Number"
                value={whatsapp}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Facebook</Text>
              <TextInput
                style={styles.input}
                onChangeText={setfacebook}
                placeholder="Facebook Url"
                value={facebook}
              />
            </View>
            <View >
              <Text style={styles.labelText}>NID</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNid}
                placeholder="NID No"
                value={Nid}
              />
            </View>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
            {Imagee?.length>0 && Imagee?.map((item,index)=>
              <View key={index} style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:item }}></Image>
             </View>
            )}
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => pickImage()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View>
            <View >
              <Text style={styles.labelText}>Passport</Text>
              <TextInput
                style={styles.input}
                onChangeText={setpassport}
                placeholder="NID No"
                value={passport}
              />
            </View>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
            {Imagee?.length>0 && Imagee?.map((item,index)=>
              <View key={index} style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:item }}></Image>
             </View>
            )}
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => pickImage()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View>
            <View >
              <Text style={styles.labelText}>Birth Certificate</Text>
              <TextInput
                style={styles.input}
                onChangeText={setbirthCertificate}
                placeholder="NID No"
                value={birthCertificate}
              />
            </View>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
            {Imagee?.length>0 && Imagee?.map((item,index)=>
              <View key={index} style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:item }}></Image>
             </View>
            )}
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => pickImage()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View>
            <View >
              <Text style={styles.labelText}>Passport</Text>
              <TextInput
                style={styles.input}
                onChangeText={settin}
                placeholder="NID No"
                value={tin}
              />
            </View>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
            {Imagee?.length>0 && Imagee?.map((item,index)=>
              <View key={index} style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:item }}></Image>
             </View>
            )}
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => pickImage()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View>
          <View >
            <Text style={styles.labelText}>Adress</Text>
            <View style={[styles.navPicker,{marginBottom:10}]}>
              <Picker
                selectedValue={selectedZone}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setselectedZone(itemValue)}
                
              >
                <Picker.Item  label='Select Zone' value={'unselctable'} />
                {zones?.map((item:any,index:number)=>
                    <Picker.Item key={index} label={item?.title} value={item?.id} />
                )}

              </Picker>
            </View>

          </View>
          <View >
            
            <View style={[styles.navPicker,{marginBottom:10}]}>
              <Picker
                selectedValue={selectedRegion}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setselectedRegion(itemValue)}
              >
                 <Picker.Item  label='Select Region' value={'unselctable'} />
                {regions?.map((item:any,index:number)=>
                    <Picker.Item key={index} label={item?.title} value={item?.id} />
                )}

              </Picker>
            </View>

          </View>
          <View >
            
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedTeritory}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                
                onValueChange={(itemValue, itemIndex) => setselectedTeritory(itemValue)}
              >
                <Picker.Item  label='Select Territory' value={'unselctable'} />

                 {teritories?.map((item:any,index:number)=>
                    <Picker.Item key={index} label={item?.title} value={item?.id} />
                 )}

              </Picker>
            </View>

          </View>
            <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity onPress={()=>submit()} style={styles.btn}>
                    <Text style={[styles.title,{fontSize:16}]}>Update</Text>
                </TouchableOpacity>
            </View>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default ViewProduct;
const styles = StyleSheet.create({


  container: {

    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'#FAFAFA',
    borderBottomColor: '#FF9411',
    borderBottomWidth: .5

  },
  uploadimage: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30

  },
  img: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    // resizeMode:'contain',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FF9411',
    borderRadius: 100,

  },
  cam: {
    fontSize: 30,
    padding: 5,
    position: 'absolute',
    zIndex: 99,
    bottom: 10,
    right: -10
  },
  labelText: {
    fontWeight: 'bold',
    padding: 5
  },
  navPicker: {
    width: deviceWidth - 30,
    borderColor: '#1239',
    borderWidth: 1,
    borderRadius: 5,
  },
  
  input: {
    // width: deviceWidth / 1.1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    borderColor:'#FF9411'

  },
  title: {
    fontSize: 30,
    color:'#fff',
    fontWeight:"normal" ,
  },
  btn:{
    backgroundColor:'#FF9411',
    padding:10,
    width:deviceWidth/1.1,
    alignItems:'center',
    borderRadius:5
  }










})


