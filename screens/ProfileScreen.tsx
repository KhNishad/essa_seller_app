import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, TextInput, SafeAreaView, Image, Alert } from 'react-native';
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
import ProductService from '../services/ProductService';
import { showMessage } from 'react-native-flash-message';

const deviceWidth = Math.floor(Dimensions.get('window').width)


const apiImagepath ='http://103.119.71.9:4400';


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
  const [nidImg, setnidImg] = useState('')
  const [passportImg, setpassportImg] = useState('')
  const [birthImg, setbirthImg] = useState('')
  const [tinImg, settinImg] = useState('')
  const [profileImg, setprofileImg] = useState('')
  const [sellerId, setsellerId] = useState('')
  // const [first, setfirst] = useState(second)

  // data from back
  const [zones, setzones] = useState<any>([])
  const [regions, setregions] = useState<any>([])
  const [teritories, setteritories] = useState<any>([])



  

  // image upload
  const reviewImg =  async () =>{


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

      // console.log('............result',result);
      
    if (!result.cancelled) {

      let formdata = new FormData();
      formdata.append('file', {
        uri: result.uri ,
        type: `image/${result.uri.split('.').pop()}`, 
        name: result.uri.split('/').pop()
       })
       
      // console.log('.................fromdata',formdata);
      
       ProductService.ImageUpload(formdata).then(res=>{
        if(res.hasOwnProperty("error") && res.error != ""){
          Alert.alert(
            "Image upload failed!",
            "Image size too large, maximum allowed image size 5MB",
            [{ text: "OK", onPress: () => '' }],
            { cancelable: false }
          );
        }else{
        
        //  console.log('.........res',res);
         
        }
        // CheckImg = res 
      }).catch(err=>{console.log('err in img up',err)})
      
    }
  }


// get address zone 

useEffect(() => {
  
 const getZone = async ()=>{
   try {
   let res = await AddressService.getZone()
     if(res){
      setzones(res?.data)
    //  console.log('zone.............',res);

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



useEffect(() => {
   const getProfile = async()=>{
     try {
     let res =  await   AddressService.getSellerProfile()

        // console.log('=res=============',res);
     setfullname(res?.data?.name)
     setemail(res?.data?.email)
     setphone(res?.data?.phone)
     setwhatsapp(res?.data?.socialMedia?.whatsapp?.number)
     setfacebook(res?.data?.socialMedia?.facebook?.url)
     setNid(res?.data?.documents?.nid?.number)
     settin(res?.data?.documents?.tin?.number)
     setpassport(res?.data?.documents?.passport?.number)
     setbirthCertificate(res?.data?.documents?.birthCertificate?.number)
     setselectedZone(res?.data?.address?.zone?.id)
     setselectedRegion(res?.data?.address?.region?.id)
     setselectedTeritory(res?.data?.address?.tarrritory?.id)
     setsellerId(res?.data?.id)

     } catch (error) {
       
     }
   }
   getProfile()
}, [isFocused])



const submit = async()=>{

  let zone  = zones.findIndex((el:any)=> el.id == selectedZone)
  let region  = regions.findIndex((el:any)=> el.id == selectedRegion)
  let teriory  = regions.findIndex((el:any)=> el.id == selectedTeritory)


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
        id: zones[zone]?.id,
        title: zones[zone]?.title
      },
      region: {
        id: regions[region]?.id,
        title: regions[region]?.title
      },
      tarrritory: {
        id: teritories[teriory]?.id,
        title: teritories[teriory]?.title
      },
      more: "string"
    }
  }
  // console.log('====================================payload',data);

  try {
    let res  = await AddressService.updateSellerProfile(sellerId,data)
    // console.log('====================================ress',res);
    showMessage({
      message: `${res.message}`,
      type: "success",
    });
  } catch (error) {
    showMessage({
      message: `${res.message}`,
      type: "success",
    });
  }
  
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
            {/* <View>
              <Image style={styles.img} source={{ uri: `${apiImagepath}/${profileImg}` }}>

              </Image>
              <FontAwesome5 onPress={()=>reviewImg()} color='#FF9411' style={styles.cam} name='camera'></FontAwesome5>


            </View> */}
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{fullname}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {email}</Text>
          </View>
          <View style={{ marginHorizontal: 15,backgroundColor:'#fff' }}>
            <View >
              <Text style={styles.labelText}>Phone Number</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setphone}
                placeholder="Phn No"
                value={phone}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Name</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setfullname}
                placeholder="Full Name"
                value={fullname}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setemail}
                placeholder="Email"
                value={email}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Whatsapp</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setwhatsapp}
                placeholder="WhatsApp Number"
                value={whatsapp}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Facebook</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setfacebook}
                placeholder="Facebook Url"
                value={facebook}
              />
            </View>
            <View >
              <Text style={styles.labelText}>NID</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setNid}
                placeholder="NID No"
                value={Nid}
              />
            </View>
            {/* <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
              <View  style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:`${apiImagepath}/${nidImg}` }}></Image>
             </View>
          
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => reviewImg()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View> */}
            <View >
              <Text style={styles.labelText}>Passport</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setpassport}
                placeholder="NID No"
                value={passport}
              />
            </View>
            {/* <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:`${apiImagepath}/${passportImg}` }}></Image>
             </View>
          
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => reviewImg()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View> */}
            <View >
              <Text style={styles.labelText}>Birth Certificate</Text>
              <TextInput
                style={styles.input}
                // onChangeText={setbirthCertificate}
                placeholder="NID No"
                value={birthCertificate}
              />
            </View>
            {/* <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
              <View  style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:`${apiImagepath}/${birthImg}` }}></Image>
             </View>
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => reviewImg()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View> */}
            <View >
              <Text style={styles.labelText}>TIN</Text>
              <TextInput
                style={styles.input}
                // onChangeText={settin}
                placeholder="NID No"
                value={tin}
              />
            </View>
            {/* <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
              <View  style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:`${apiImagepath}/${tinImg}` }}></Image>
             </View>
            
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => reviewImg()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View> */}
          <View >
            <Text style={styles.labelText}>Adress</Text>
            <View style={[styles.navPicker,{marginBottom:10}]}>
              <Picker
                selectedValue={selectedZone}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>  setselectedZone(itemValue)}
                
              >
                {/* <Picker.Item  label='Select Zone' value={'unselctable'} /> */}
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
                 {/* <Picker.Item  label='Select Region' value={'unselctable'} /> */}
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
                {/* <Picker.Item  label='Select Territory' value={'unselctable'} /> */}

                 {teritories?.map((item:any,index:number)=>
                    <Picker.Item key={index} label={item?.title} value={item?.id} />
                 )}

              </Picker>
            </View>

          </View>
            {/* <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity onPress={()=>submit()} style={styles.btn}>
                    <Text style={[styles.title,{fontSize:16}]}>Update</Text>
                </TouchableOpacity>
            </View> */}
           
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


