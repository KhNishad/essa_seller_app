import React, { useState } from 'react';
import { StyleSheet, Text, View,  TextInput, Dimensions, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
// import { Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';

const deviceWidth = Dimensions.get('window').width

export default function App() {

  const [productName, setproductName] = useState('');
  const [category, setcategory] = useState('');
  const [quantity, setquantity] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('')
  const [number, setnumber] = useState('')
  const [selectedValue, setSelectedValue] = useState("java");
  const [Image, setImage] = useState('')


  const createProduct = () => {
    console.log('Hi')
  }

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
      setImage(result.uri);
    }
  };


  return (
      <SafeAreaView>
       <ScrollView >

    <View style={{marginHorizontal:10}}>

      <View style={{padding: 10, alignItems: 'center' }}>
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
            style={{  height:50}}
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
            style={{  height:50,alignItems:'center',justifyContent:'center'}}
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
        <Text style={styles.labelText}>Stock</Text>
        <TextInput
          style={styles.input}
          onChangeText={setquantity}
          placeholder="Quantity"
          value={quantity}
        />
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
        <Text style={styles.labelText}>Description</Text>
        <TextInput
          style={[styles.input,{height:100}]}
          onChangeText={setdescription}
          placeholder="Description"
          multiline={true}
          numberOfLines={6}
          value={description}
        />
        
      </View>
      <View style={{ padding: 5}}>
        <Text style={styles.labelText}>Add Product Image</Text>
        <FontAwesome5 onPress={()=>pickImage()} style={{ fontSize: 30, padding: 5 }} name='camera'></FontAwesome5>
      </View>
      <View style={{  alignItems: 'center', marginVertical: 10 }}>
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
    width: deviceWidth-20,
    borderColor: '#1239',
    borderWidth: 1,
    borderRadius: 5,
  },
  labelText:{
    fontWeight: 'bold',
     padding: 5 
  }
});