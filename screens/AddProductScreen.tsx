import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button,Image,TouchableOpacity } from 'react-native';
import { FontAwesome5,Ionicons,Entypo, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
// import { Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { NavigationRouteContext, useNavigation,useRoute } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width
const apiImagepath = "http://103.119.71.9:4400/media";

import Modal from '../components/categoryModal'
import AttrbuteMOdal from '../components/productAttributesModal'

// service 
import brandService from '../services/brandService';
import categoryServices from '../services/categoryServices';
import ProductAttributes from '../components/productAttributesModal';
import ProductService from '../services/ProductService';

export default function App() {

  const [productName, setproductName] = useState('');
  const [category, setcategory] = useState('');
  const [brandList, setbrandList] = useState<any>([])
  const [quantity, setquantity] = useState('');
  const [stock, setstock] = useState('')
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('')
  const [number, setnumber] = useState('')
  const [selectedValue, setSelectedValue] = useState("java");
  const [Imagee, setImagee] = useState([])
  const [renderMe, setrenderMe] = useState(false);
  const [amount, setamount] = useState('')
  const [salePrice, setsalePrice] = useState('');
  const [sku, setsku] = useState('')
  const [insideCity, setinsideCity] = useState('');
  const [outSideCity, setoutSideCity] = useState('')
  const [orderLimit, setorderLimit] = useState('')
  const [openModal, setopenModal] = useState(false);
  const [delTimeIn, setdelTimeIn] = useState('')
  const [delTimeOut, setdelTimeOut] = useState('')
  const [selectedBrand, setselectedBrand] = useState('')
  const [attributeModal, setattributeModal] = useState(false);
  const [isNegotiable, setisNegotiable] = useState(false)
  const [productDetails, setproductDetails] = useState({})
  const [images, setimages] = useState([])

  // category info
  const [selectedCategoryId, setselectedCategoryId] = useState(null);
  const [selectedCategoryTitle, setselectedCategoryTitle] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState([]);
  const [AtributesData, setAtributesData] = useState([]);


  const [loader, setloader] = useState(false)

  const route = useRoute();

  const { id } = route.params;
  const navigation = useNavigation(); 

 

  const createProduct = async (value:any) => {
    
    const data = {
      title: productName,
      description:description,
      images: images?.length>0?images:Imagee,
      attachments: [],
      deliveryInfo: {
        estDlvrTimeIn: '',
        estDlvrTimeOut: '',
        delChargIn: '',
        delChargOut: '',
        maxOrderLimit:''
      },
      categories: parentCategoryId,
      brandId: selectedBrand,
      attributes: AtributesData,
      activeStatus: value,
      variations: [
        {
          SKU: sku,
          regularPrice: Number(price) ,
          salePrice: Number(salePrice),
          isNagotiable: isNegotiable,
          discountType: selectedValue,
          discountAmount: Number(amount),
          quantity: Number(quantity),
          
          // "images": [
          //   {
          //     "url": "string",
          //     "alt": "string"
          //   }
          // ],
          // "var1TermId": 0,
          // "var1TermValueId": 0,
          // "var2TermId": 0,
          // "var2TermValueId": 0
        }
      ]
    }
    if(value == 5){
      data['id'] = id
    }
    
    if(value == 5){
      try {
        let res = await ProductService.productUpdate(id,data)
        showMessage({
          message: `${res.message}`,
          type: "success",
        });
          
        } catch (error) {
          showMessage({
            message: `${error.message}`,
            type: "danger",
          });
    
        }
    }else{
      try {
        let res = await ProductService.ProductUp(data)
        navigation.navigate('Products')
        showMessage({
          message: `${res.message}`,
          type: "success",
        });
          
        } catch (error) {
          showMessage({
            message: `${error.message}`,
            type: "success",
          });
    
        }
    }

  }

  //   image upload
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64:true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
     let img = Imagee
    if (!result.cancelled) {
      // console.log(".......img",result.uri);

      const data  = {
        file : `data:${`image/${result.uri.split('.').pop()}`};base64,${result.base64}`,
        folderPath:'appImages'
      }

      try {
      let res = await ProductService.ImageUpload(data)
        if(res){
          img.push(res)
          setImagee(img)
          setrenderMe(!renderMe)
        }
      } catch (error) {
        console.log("err in img up",error);
      }
    }
  };        

  // category modal
  const openCategoryModal = () => {
    setopenModal(true);
  };

  

  useEffect(() => {
    const getProductDetails =async ()=>{
      try {
       let res  = await ProductService.ProductDetails(id)
      //  console.log('res.................xx',res);
       
        if(res){
          setproductDetails(res?.data)
          setproductName(res?.data?.title)
          setselectedBrand(res?.data?.brand?.id)
          setdescription(res?.data?.description)
          setprice(res?.data?.variations[0]?.regularPrice)
          setSelectedValue(res?.data?.variations[0]?.discountType)
          setamount(res?.data?.variations[0]?.discountAmount)
          setsalePrice(res?.data?.variations[0]?.salePrice)
          setsku(res?.data?.variations[0]?.SKU)
          setquantity(res?.data?.variations[0]?.quantity)
          setisNegotiable(res?.data?.variations[0]?.isNagotiable)
          setorderLimit(res?.data?.deliveryInfo?.maxOrderQty)
          setselectedCategoryTitle(res?.data?.category?.title)
          setselectedCategoryId(res?.data?.category?.id)
          setparentCategoryId(res?.data?.categories)
          setImagee(res?.data?.images)
        }
        
      } catch (error) {
        
      }

    }
    getProductDetails()
   
  }, [id])
  
  // get all brand
  useEffect(() => {
    const getBrands = async()=>{
      try {
        let res  = await brandService.getAllBrand()
        setbrandList(res?.data)        

      } catch (error) {
        console.log('err in brand',error);
        
      }

    }
    getBrands()

    const getAttributes = async()=>{
      try {
        let res  = await categoryServices.getAttributeByCategory(selectedCategoryId)
        console.log('...............atrr',res);
        
      } catch (error) {
        
      }

    }
    getAttributes()

  }, [])
  

  return (
    <SafeAreaView>
      <ScrollView >

        <View style={{ marginHorizontal: 10 }}>

          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Product</Text>
          </View>


          <View >
            <Text style={styles.labelText}>Product Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setproductName}
              placeholder="Name"
              value={productName}
            />
          </View>

          
            <View style={styles.container2}>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => openCategoryModal()}
                  disabled={selectedCategoryTitle ? true : false}
                >
                  <View style={styles.addCatgory}>
                    <Ionicons
                      style={{ color: "#FFFFFF", fontSize: 25 }}
                      name="ios-add-circle-outline"
                    ></Ionicons>
                    <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                      {" "}
                      Add Category
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                {selectedCategoryTitle != "" ? (
                  <View style={styles.categoryField}>
                    <Text>{selectedCategoryTitle}</Text>
                    <View>
                      <Entypo
                        onPress={() => {
                          setselectedCategoryTitle(""),
                            // setAttribute(false),
                            setselectedCategoryId(null)
                            // (brands = []),
                        }}
                        style={{ paddingLeft: 2 }}
                        name="cross"
                        color="red"
                        size={20}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
          <View >
            <Text style={styles.labelText}>Brands</Text>
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedBrand}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setselectedBrand(itemValue)}
              >
                {brandList?.length>0 && brandList?.map((item:any,index:number)=>
                    <Picker.Item key={index} label={item?.title} value={item?.id} />
                )}

              </Picker>
            </View>

          </View>
          <View >
            <Text style={styles.labelText}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              onChangeText={setdescription}
              placeholder="Description"
              multiline={true}
              numberOfLines={6}
              value={description}
            />

          </View>
          {/* <View >
            <Text style={styles.labelText}>Stock</Text>
            <TextInput
              style={styles.input}
              onChangeText={setstock}
              placeholder="Quantity"
              value={stock}
            />
          </View> */}
          <View>

          </View>

          <Text style={styles.labelText}>Add Product Image</Text>
          <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:deviceWidth-20,alignItems:"center",paddingHorizontal:10}}>
           {Imagee?.length>0 && Imagee?.map((item,index)=> 
              <View key={index} style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <Image style={{height:100,width:deviceWidth/3-25}} source={{ uri:`${apiImagepath}/${item}` }}></Image>
             </View>
            )} 
              <View style={{backgroundColor:'#1234',height:100,width:deviceWidth/3-25,alignItems:'center',justifyContent:'center',margin:5}}>
                <FontAwesome5  onPress={() => pickImage()} style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
              </View>

          </View>
         
          <View >
            <Text style={styles.labelText}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={setprice}
              placeholder="Tk Price"
              value={price?price.toString():''}
            />
          </View>
          <View >
            <Text style={styles.labelText}>Discount Type</Text>
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Fixed" value="fixed" />
                <Picker.Item label="Percentage" value="percentage" />

              </Picker>
            </View>

          </View>
          <View >
            <Text style={styles.labelText}>Dis. Amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={setamount}
              placeholder=" Amount"
              value={amount}
              onBlur={()=>{
                if(selectedValue == 'fixed'){
                  setsalePrice(price-amount)
                }else{
                  setsalePrice((price-(price*amount)/100))
                }
              }}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Sale Price</Text>
            <TextInput
              style={styles.input}
              placeholder=" Sale Price"
              value={salePrice.toString()}
              editable={false}
            />
          </View>
          {/* <View >
            <Text style={styles.labelText}>SKU</Text>
            <TextInput
              style={styles.input}
              onChangeText={setsku}
              placeholder=" SKU"
              value={sku?sku.toString():''}

            />
          </View> */}
          {/* <View >
            <Text style={styles.labelText}>Quantity</Text>
            <TextInput
              style={styles.input}
              onChangeText={setquantity}
              placeholder=" Quantity"
              value={quantity?quantity.toString():''}

            />
          </View> */}
          {/* <View >
            
            <Text style={styles.labelText}>Delevery Time(In City)</Text>
          
            <View style={styles.navPicker}>
              <Picker
                  selectedValue={delTimeIn}
                  style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                  // itemStyle={{paddingBottom:20}}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => setdelTimeIn(itemValue)}
                >
                      <Picker.Item  label='1. 1-3 hrs' value={'1|1-3 hrs'} />
                      <Picker.Item  label='2. 1-24 hrs' value={'2|1-24 hrs'} />
                      <Picker.Item  label='3. 1-2 days' value={'3|1-2 days'} />
                      <Picker.Item  label='4. 1-3 days' value={'4|1-3 days'} />
                      <Picker.Item  label='5. 1-5 days' value={'5|1-5 days'} />
                      <Picker.Item  label='6. 1-7 days' value={'6|1-7 days'} />
                      <Picker.Item  label='7. 1-10 days' value={'7|1-10 days'} />
                      <Picker.Item  label='8. 7-15 days' value={'8|7-15 days'} />
                      <Picker.Item  label='9. 7-21 days' value={'9|7-21 days'} />
                      <Picker.Item  label='10. 15-21 days' value={'10|15-21 days'} />
                      <Picker.Item  label='11. 15-30 days' value={'11|15-30 days'} />
                      <Picker.Item  label='12. 21-30 days' value={'12|21-30 days'} />
                      <Picker.Item  label='13. 21-45 days' value={'13|21-45 days'} />
                      <Picker.Item  label='14. 30-45 days' value={'14|30-45 days'} />
                      <Picker.Item  label='15. 45-60 days' value={'15|45-60 days'} />
                      <Picker.Item  label='16. 60-90 days' value={'16|60-90 days'} />
                </Picker>
            </View>
          </View>
          <View >
            <Text style={styles.labelText}>Delevery Time(Out City)</Text>
            
             <View style={styles.navPicker}>
             <Picker
                selectedValue={delTimeOut}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setdelTimeOut(itemValue)}
              >
                    <Picker.Item  label='1. 1-3 hrs' value={'1|1-3 hrs'} />
                    <Picker.Item  label='2. 1-24 hrs' value={'2|1-24 hrs'} />
                    <Picker.Item  label='3. 1-2 days' value={'3|1-2 days'} />
                    <Picker.Item  label='4. 1-3 days' value={'4|1-3 days'} />
                    <Picker.Item  label='5. 1-5 days' value={'5|1-5 days'} />
                    <Picker.Item  label='6. 1-7 days' value={'6|1-7 days'} />
                    <Picker.Item  label='7. 1-10 days' value={'7|1-10 days'} />
                    <Picker.Item  label='8. 7-15 days' value={'8|7-15 days'} />
                    <Picker.Item  label='9. 7-21 days' value={'9|7-21 days'} />
                    <Picker.Item  label='10. 15-21 days' value={'10|15-21 days'} />
                    <Picker.Item  label='11. 15-30 days' value={'11|15-30 days'} />
                    <Picker.Item  label='12. 21-30 days' value={'12|21-30 days'} />
                    <Picker.Item  label='13. 21-45 days' value={'13|21-45 days'} />
                    <Picker.Item  label='14. 30-45 days' value={'14|30-45 days'} />
                    <Picker.Item  label='15. 45-60 days' value={'15|45-60 days'} />
                    <Picker.Item  label='16. 60-90 days' value={'16|60-90 days'} />
                

              </Picker>
              </View>
          </View>
          <View >
            <Text style={styles.labelText}>Inside City</Text>
            <TextInput
              style={styles.input}
              onChangeText={setinsideCity}
              placeholder="Inside City"
              value={insideCity}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Out SideCity</Text>
            <TextInput
              style={styles.input}
              onChangeText={setoutSideCity}
              placeholder="Out Side City"
              value={outSideCity}

            />
          </View> */}

          {/* <View >
            <Text style={styles.labelText}>Maximum Order Limit</Text>
            <TextInput
              style={styles.input}
              onChangeText={setorderLimit}
              placeholder="Limit"
              value={orderLimit?orderLimit.toString():''}

            />
           
          </View> */}
          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:20}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginRight:10}}>Negotiable</Text>
            {isNegotiable?
             <AntDesign onPress={()=>setisNegotiable(false)} name='checksquare' size={25}></AntDesign>
             :
             <AntDesign onPress={()=>setisNegotiable(true)}  name='checksquareo' size={25}></AntDesign>
            }

          </View>
          <View style={{backgroundColor:'#FF9411',alignItems:'center',paddingVertical:10}}>
            {AtributesData?.length?
              <Text style={{color:'#fff'}} onPress={()=>setattributeModal(true)}>Attribute Added </Text>
              :
              <Text style={{color:'#fff'}} onPress={()=>setattributeModal(true)}>Add Attribute</Text>
            }

            </View>
          {Object.keys(productDetails)?.length>0 && id?
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                <TouchableOpacity  onPress={()=>createProduct(5)} style={{backgroundColor:'#FF9411',alignItems:'center',paddingVertical:10,marginVertical:10,width:deviceWidth-20}}>
                  <Text style={{color:'#fff'}}>Update</Text>
                </TouchableOpacity>
            </View>
          :
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
              <TouchableOpacity  onPress={()=>createProduct(2)} style={{backgroundColor:'#FF9411',alignItems:'center',paddingVertical:10,marginVertical:10,width:deviceWidth/2-20}}>
                <Text style={{color:'#fff'}}>Request for QC</Text>
              </TouchableOpacity>

              <TouchableOpacity  onPress={()=>createProduct(4)} style={{backgroundColor:'#FF9411',alignItems:'center',paddingVertical:10,marginVertical:10,width:deviceWidth/2-20}}>
                <Text style={{color:'#fff'}}>Draft</Text>
              </TouchableOpacity>
          </View>
          }
        
        </View>
      </ScrollView>
      {openModal ? (
            <Modal
              setopenModal={setopenModal}
              setparentCategoryId={setparentCategoryId}
              setselectedCategoryId={setselectedCategoryId}
              setselectedCategoryTitle={setselectedCategoryTitle}
              parentCategoryId={parentCategoryId}
            />
          ) : null}
          {attributeModal && selectedCategoryId ? (
                <AttrbuteMOdal
                  setAtributesData={setAtributesData}
                  selectedCategoryId={selectedCategoryId}
                  setattributeModal={setattributeModal}
                  productTermValues={productDetails?.attributes}
                />
              ) : null}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    // width: deviceWidth / 1.1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,

  },

  navPicker: {
    width: deviceWidth - 20,
    borderColor: '#1239',
    borderWidth: 1,
    borderRadius: 5,
  },
  labelText: {
    fontWeight: 'bold',
    padding: 5
  },
  container2: {
    // paddingLeft: 20,
    paddingVertical: 10,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addCatgory: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BB2025",
    borderRadius: 5,
    backgroundColor: "#BB2025",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  categoryField: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});