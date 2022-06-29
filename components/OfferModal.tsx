
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';


const deviceWidth = Dimensions.get('window').width

import RequisitionService from '../services/RequisitionServices';
import React from 'react';

export default function ModalScreen({ setModalOpen, ModalOpen, requisitionNo }: any) {

  const [productNo, setproductNo] = useState('')
 const [offerPrice, setofferPrice] = useState('')
 const [retailPrice, setretailPrice] = useState('')
 const [quantity, setquantity] = useState('')





  const offerProduct = async () => {
    if (offerPrice) {
      const data = {
        requisitionDetailsId: requisitionNo,
        productNo:productNo ,
        offerPrice: Number(offerPrice),
        retailPrice: Number(retailPrice),
        offerQty: Number(quantity),
      }

      
      try {
        let res = await RequisitionService.offerProduct(data)
        showMessage({
          message: `${res?.message}`,
          type: "success",
        });
        setModalOpen(false)

      } catch (error) {
        setModalOpen(false)
        console.log('err in send otp', error);
        showMessage({
          message: `${error?.message}`,
          type: "danger",
        });

      }
    } else {
      alert('Offer Price Required')
    }
  }


  return (
    <View style={styles.container}>
      <Modal isVisible={ModalOpen} style={{ alignItems: 'center' }}>
        <View style={{ width: deviceWidth - 50, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center', borderRadius: 10, paddingVertical: 10 }}>



          <View>
            <TextInput
              style={styles.input}
              onChangeText={setproductNo}
              value={productNo}

              placeholder="Product No"
            />

            <TextInput
              style={styles.input}
              onChangeText={setofferPrice}
              value={offerPrice}

              placeholder="offer Price"
            />


            <TextInput
              style={styles.input}
              onChangeText={setretailPrice}
              value={retailPrice}
              placeholder="Retaile Price"
            />
            <TextInput
              style={styles.input}
              onChangeText={setquantity}
              value={quantity}
              placeholder="Offer Quantity"
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-around", width: deviceWidth / 1.5 }}>
            <TouchableOpacity onPress={() => setModalOpen(false)} style={{ backgroundColor: '#1C6E7A', borderRadius: 10 }}>
              <Text style={{ color: '#fff', paddingHorizontal: 20, paddingVertical: 10, fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => offerProduct()} style={{ backgroundColor: '#1C6E7A', borderRadius: 10 }}>
              <Text style={{ color: '#fff', paddingHorizontal: 20, paddingVertical: 10, fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>

          </View>


        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'#FF9411',
    // paddingTop:deviceHeight/6
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: "normal",
  },
  input: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 12,
    borderWidth: .5,
    padding: 10,
    borderColor: '#BBE5EB',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  mainBanner: {
    width: 40,
    height: 40,
    borderWidth: .1,
    borderColor: '#fff',
    borderRadius: 5,
    resizeMode: 'stretch'
  },
  CardContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  card: {
    width: deviceWidth / 3 - 15,
    height: 300,
    borderWidth: .5,
    borderRadius: 10

  },
  icons: {
    alignItems: 'center',
    width: deviceWidth / 6 - 2,
    textAlign: 'center'

  },
  ProductSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});

