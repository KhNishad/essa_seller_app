import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button,Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
// import { Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome} from '@expo/vector-icons'

const deviceWidth = Dimensions.get('window').width

export default function App() {

  const [productName, setproductName] = useState('');
  const [category, setcategory] = useState('');
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



  const createProduct = () => {
    console.log('Hi')
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

          <View >
            <Text style={styles.labelText}>Categories</Text>
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50 }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Mobile" value="java" />
                <Picker.Item label="Bike" value="js" />
                <Picker.Item label="Fashion" value="js" />
              </Picker>
            </View>

          </View>
          <View >
            <Text style={styles.labelText}>Brands</Text>
            <View style={styles.navPicker}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}
                // itemStyle={{paddingBottom:20}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Samsung" value="java" />
                <Picker.Item label="Honda" value="js" />
                <Picker.Item label="Suzuki" value="js" />

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
          {/* <View >
            <Text style={styles.labelText}>Status</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              <View style={{flexDirection:'row',paddingHorizontal:5}}>
              <FontAwesome name="circle-thin" size={18}/>
              <Text style={{marginLeft:5}}>Publish</Text>
              </View>
              <View style={{flexDirection:'row', paddingHorizontal:10}}>
              <FontAwesome name="circle-thin" size={18}/>
              <Text style={{marginLeft:5}}>Unpublish</Text>
              </View>
            </View>
          </View> */}


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
                <Picker.Item label="Samsung" value="java" />
                <Picker.Item label="Honda" value="js" />
                <Picker.Item label="Suzuki" value="js" />

              </Picker>
            </View>

          </View>
          <View >
            <Text style={styles.labelText}>Ammount</Text>
            <TextInput
              style={styles.input}
              onChangeText={setamount}
              placeholder="$ Amount"
              value={amount}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Sale Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={setsalePrice}
              placeholder="$ Sale Price"
              value={salePrice}

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
            <TextInput
              style={styles.input}
              onChangeText={setprice}
              placeholder="selected Delevery Time(In City)"
              // value={price}

            />
          </View>
          <View >
            <Text style={styles.labelText}>Delevery Time(Out City)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setprice}
              placeholder="selected Delevery Time(Out City)"
              // value={price}

            />
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
              onPress={createProduct}
              title="Add Product"
              color="#FF9411"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

        </View>
      </ScrollView>

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
  }
});