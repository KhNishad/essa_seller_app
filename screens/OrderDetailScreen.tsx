import * as React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../components/Header';


const apiImagepath = 'https://api.ebhubon.com/media/images';
// const apiImagepath ='http://192.168.0.17:3000/media/images';
const deviceWidth = Math.floor(Dimensions.get('window').width)


let Color = '';


const orderDetail = () => {


  const navigation = useNavigation();






  return (

    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor="#FF9411" />
        <Header />
        {/* <View style={styles.container}> */}
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Details</Text>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Id: #22324</Text>
          </View>
        </View>
        {/* </View> */}
        <View style={{ paddingLeft: 20, paddingVertical: 10, flexDirection:'row',alignItems:'center'}}>
          <View>
            <Text style={{ color: '#010101', fontSize: 20 }}>Order By:</Text>
            <Text style={{ color: '#010101', fontSize: 15, marginTop: 5 }}>Name:<Text style={{ color: '#818181', fontWeight: 'bold' }}>Mithu Korim</Text></Text>
            <Text style={{ color: '#010101', fontSize: 15, marginTop: 5 }}>Pho No: <Text style={{ color: '#818181', fontWeight: 'bold' }}>01827525487</Text></Text>
            <Text style={{ color: '#010101', fontSize: 15, marginTop: 5 }}>Address: <Text style={{ color: '#818181', fontWeight: 'bold' }}>Gazipur,Dhaka</Text></Text>
          </View>
          <View style={[styles.tableColumn2,{marginLeft:35}]}>
            <Text style={{ color: '#818181', fontSize: 15 }}>Order Status</Text>
            <Text style={{ color: '#FF9415', fontWeight: 'bold', fontSize: 18, }}>Dispatched</Text>
          </View>

        </View>
        <View>
          <View style={[styles.listContainer, { backgroundColor: Color }]}>
            <View style={styles.tableColumn1} >
              <Image style={styles.productImg} source={require('../assets/images/smart-phone-half-block.jpg')} />
            </View>

            <View style={styles.tableColumn2}>
              <Text style={{ color: '#818181', fontWeight: 'bold', fontSize: 15 }}>Samsung Galaxy</Text>
              <Text style={{ color: '#818181', fontWeight: 'bold', fontSize: 15 }}>Samsung</Text>

            </View>
            <View style={styles.tableColumn3}>
              <Text style={styles.infoText}>Order On:
                <Text style={{ fontSize: 15 }}>24-02-22</Text>
              </Text>
              <Text style={styles.infoText}>Qnt:
                <Text style={{ fontSize: 15 }}>2</Text>
              </Text>
              <Text style={styles.infoText}>Price:
                <Text style={{ fontSize: 15 }}>$30</Text>
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={[styles.listContainer1, { backgroundColor: '#ffff' }]}>
         
          <View style={styles.tableColumn2}>
            <Text style={{ color: '#818181', fontSize: 15 }}>Payment Mode</Text>
            <Text style={{ color: '#818181', fontWeight: 'bold', fontSize: 18 }}>Cash On Delevery</Text>
          </View>
          
        </View> */}

        <View style={{ backgroundColor: '#ffff' }}>
          <View style={{ paddingLeft: 20, paddingVertical: 10, paddingRight: 10 }}>
            <View style={styles.delevery}>
              <Text style={{ color: '#010101', fontSize: 20, fontWeight: 'bold' }}>Delevery Fee</Text>
              <Text style={{ color: '#010101', fontSize: 20 }}>$4.50</Text>
            </View>
            <View style={styles.delevery}>
              <Text style={{ color: '#010101', fontSize: 20, fontWeight: 'bold' }}>Discount</Text>
              <Text style={{ color: '#010101', fontSize: 20 }}>$4.50</Text>
            </View>
            <View style={styles.delevery}>
              <Text style={{ color: '#010101', fontSize: 20, fontWeight: 'bold' }}>Amount To Pay</Text>
              <Text style={{ color: '#010101', fontSize: 20 }}>$4.50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default orderDetail;

const styles = StyleSheet.create({

  container: {

    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    //   backgroundColor:'#FAFAFA',
    borderBottomColor: '#FF9411',
    borderBottomWidth: .5

  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  listContainer1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  tableColumn1: {
    width: (deviceWidth / 3) - 15,
    flexDirection: 'column',
    paddingHorizontal: 2,
    alignItems: 'flex-start',


  },
  tableColumn2: {
    width: (deviceWidth / 3) - 10,
    flexDirection: 'column',
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  tableColumn3: {
    width: (deviceWidth / 3) + 10,
    flexDirection: 'column',
    paddingHorizontal: 2,
    marginLeft: 5,
    alignItems: "flex-start",
    justifyContent:'center'

  },
  textColor: {
    color: '#7B7B7B',
  },
  infoText: {
    color: '#7B7B7B',
    fontSize: 16,
    // fontWeight: 'bold'
  },
  productImg: {
    width: 80,
    height: 80,
    // borderWidth:0.5,
    // borderColor:'#1234',
    // resizeMode:'center'
  },

  delevery: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }



})