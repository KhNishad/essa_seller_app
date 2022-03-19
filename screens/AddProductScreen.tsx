import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button,Image,TouchableOpacity } from 'react-native';
import { FontAwesome5,Ionicons,Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
// import { Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';

const deviceWidth = Dimensions.get('window').width

import Modal from '../components/categoryModal'

// service 
import brandService from '../services/brandService';

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

  // category info
  const [selectedCategoryId, setselectedCategoryId] = useState(null);
  const [selectedCategoryTitle, setselectedCategoryTitle] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState(null);

  const createProduct = () => {
    const data = {
      title: productName,
      description:description,
      images: Imagee,
      // "attachments": [
      //   {
      //     "url": "string"
      //   }
      // ],
      deliveryInfo: {
        estDlvrTimeIn: delTimeIn,
        estDlvrTimeOut: delTimeOut,
        delChargIn: insideCity,
        delChargOut: outSideCity,
        maxOrderLimit: orderLimit
      },
      categories: [
        selectedCategoryId
      ],
      brandId: selectedBrand,
      // "attributes": [
      //   {
      //     "id": 0,
      //     "value": [
      //       "string"
      //     ]
      //   }
      // ],
      variations: [
        {
          sku: sku,
          regularPrice: price,
          salePrice: salePrice,
          // "isNagotiable": true,
          discountType: selectedValue,
          discountAmount: amount,
          quantity:quantity,
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
    console.log('........................,',data)
  }

  //   image upload
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // base64:true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
     let img = Imagee
    if (!result.cancelled) {
      img.push(result.uri)
      setImagee(img)
      setrenderMe(!renderMe)
      // setImage(result.uri);
    }
  };

  // category modal
  const openCategoryModal = () => {
    setopenModal(true);
  };

  // get all brand
  useEffect(() => {
    const getBrands = async()=>{
      try {
        let res  = await brandService.getAllBrand()
        setbrandList(res?.data)        

      } catch (error) {
        
      }

    }
    getBrands()

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
          <View >
            <Text style={styles.labelText}>Stock</Text>
            <TextInput
              style={styles.input}
              onChangeText={setstock}
              placeholder="Quantity"
              value={stock}
            />
          </View>
          <View>

          </View>

          <Text style={styles.labelText}>Add Product Image</Text>
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
            <Text style={styles.labelText}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={setprice}
              placeholder="$ Price"
              value={price}
            />
          </View>
          <View >
            <Text style={styles.labelText}>Discount Type</Text>
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
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
              placeholder="$ Amount"
              value={amount}
              onBlur={()=>{
                if(selectedValue == 'fixed'){
                  setsalePrice(price-amount)
                }else{
                  setsalePrice((price*amount)/100)
                }
              }}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Sale Price</Text>
            <TextInput
              style={styles.input}
              placeholder="$ Sale Price"
              value={salePrice.toString()}
              editable={false}
            />
          </View>
          <View >
            <Text style={styles.labelText}>SKU</Text>
            <TextInput
              style={styles.input}
              onChangeText={setsku}
              placeholder=" SKU"
              value={sku}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Quantity</Text>
            <TextInput
              style={styles.input}
              onChangeText={setquantity}
              placeholder="$ Quantity"
              value={quantity}

            />
          </View>
          <View >
            
            <Text style={styles.labelText}>Delevery Time(In City)</Text>
            {/* <TextInput
              style={styles.input}
              onChangeText={setdelTimeIn}
              placeholder="selected Delevery Time(In City)"
              value={delTimeIn}

            /> */}
            <View style={styles.navPicker}>
             <Picker
                selectedValue={delTimeIn}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setdelTimeIn(itemValue)}
              >
                    <Picker.Item  label='1 hour' value={'1'} />
                    <Picker.Item  label='2 hour' value={'2'} />
                    <Picker.Item  label='3 hour' value={'3'} />
                    <Picker.Item  label='4 hour' value={'4'} />
                    <Picker.Item  label='5 hour' value={'5'} />
                    <Picker.Item  label='6 hour' value={'6'} />
                    <Picker.Item  label='7 hour' value={'7'} />
                    <Picker.Item  label='8 hour' value={'8'} />
                

              </Picker>
              </View>
          </View>
          <View >
            <Text style={styles.labelText}>Delevery Time(Out City)</Text>
            {/* <TextInput
              style={styles.input}
              onChangeText={setdelTimeOut}
              placeholder="selected Delevery Time(Out City)"
              value={delTimeOut}

            /> */}
             <View style={styles.navPicker}>
             <Picker
                selectedValue={delTimeOut}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setdelTimeOut(itemValue)}
              >
                    <Picker.Item  label='1 hour' value={'1'} />
                    <Picker.Item  label='2 hour' value={'2'} />
                    <Picker.Item  label='3 hour' value={'3'} />
                    <Picker.Item  label='4 hour' value={'4'} />
                    <Picker.Item  label='5 hour' value={'5'} />
                    <Picker.Item  label='6 hour' value={'6'} />
                    <Picker.Item  label='7 hour' value={'7'} />
                    <Picker.Item  label='8 hour' value={'8'} />
                

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
          </View>
          <View >
            <Text style={styles.labelText}>Maximum Order Limit</Text>
            <TextInput
              style={styles.input}
              onChangeText={setorderLimit}
              placeholder="Limit"
              value={orderLimit}

            />
          </View>

          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Button
              onPress={()=>createProduct()}
              title="Add Product"
              color="#FF9411"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

        </View>
      </ScrollView>
      {openModal ? (
            <Modal
              setopenModal={setopenModal}
              setparentCategoryId={setparentCategoryId}
              setselectedCategoryId={setselectedCategoryId}
              setselectedCategoryTitle={setselectedCategoryTitle}
              // setAttribute={setAttribute}
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