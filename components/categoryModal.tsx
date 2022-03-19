import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons,MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {useState,useEffect} from 'react';
// import { useForm } from "react-hook-form";

import categoryService from '../services/categoryServices';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function categoryModal({setopenModal,setselectedCategoryId,setselectedCategoryTitle,setparentCategoryId}:any) {
  // const { register, handleSubmit, setValue } = useForm();
    const [allCategory, setallCategory] = useState<any>([])
    const [productStatus, setproductStatus] = useState('')
    const navigation = useNavigation(); 
    
    const [showSubCat, setshowSubCat] = useState(false)
    const [arrowIcon, setarrowIcon] = useState(false)
    const [parentCatId, setparentCatId] = useState('')
    const [subCatId, setsubCatId] = useState('')
    const [subSubCatId, setsubSubCatId] = useState()
    const [showSubSubCat, setshowSubSubCat] = useState(false)
    const [showsubCatIcon, setshowsubCatIcon] = useState(false)

//   get all categories
      useEffect(() => {
          // get seller products
          categoryService.getAllCategories().then(data=>{
            
             setallCategory(data?.data)
            //  console.log("...............cats",data);
    
        }).catch(err=>console.log(err));
        }, [1])



  // control modal
    const showModal = () =>{
            setopenModal(false)
        }

    const SelectparentCat = (id:any,title:any,child:any)=>{
      setparentCatId(id)
      setparentCategoryId(id)
    if(showSubCat === id){
      setshowSubCat(false)
      // setArrow('right')
      setarrowIcon(false)
      
  }else{
      setshowSubCat(id)
      // setArrow('down')
      setarrowIcon(true)
  }
  if(!child){
    setopenModal(false)
    setselectedCategoryTitle(title)
    setselectedCategoryId(id)
  }
     
     
   }

// select sub category 
    const SelectSubCat = (id:any,title:any,child:any)=>{
    setsubCatId(id)

    // console.log("SUb Cat........",title,id);

    if(showSubSubCat == id){
      setshowSubSubCat(false)
      setshowsubCatIcon(false)
      
    }else{
      setshowSubSubCat(id)
      setshowsubCatIcon(true)
    }
    if(!child){
      setopenModal(false)
      setselectedCategoryTitle(title)
      setselectedCategoryId(id)
    }
   
 }

//  select sub sub cat 
    const selectsubsubcat = (id:any,title:any)=>{
      //  console.log("sub sub cat........",title,id);
       setselectedCategoryId(id)
       setselectedCategoryTitle(title)
       setopenModal(false)
      
    }






  return (
    <View style={styles.centeredView}>
     
      <Modal
        animationType="fade"
        transparent={true}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.Header}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',paddingHorizontal:20}}>
                       <View>
                          <Text style={styles.modalText}>Select Category</Text>
                       </View>
                        <View  style={{justifyContent:'center',alignItems:'center',paddingTop:5}}>
                            <Ionicons name="close-circle-outline" 
                                color='white'
                                size={28}
                                onPress={()=> showModal()}
                             />
                        </View>
                  </View>   
              </View>
              <View style={styles.body}>
              <ScrollView>
                  {allCategory.map((item:any,index:number)=>
                    
                  <View key={index}>
                      <TouchableOpacity onPress={()=>SelectparentCat(item?.id,item?.title,item?.children)}>
                          <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                              <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                              {item?.children?.length?
                              <>
                             
                              {arrowIcon && parentCatId == item?.id?
                                    <MaterialIcons key={index} name="keyboard-arrow-down" 
                                        color='#000000'
                                        size={20}
                                        onPress={()=> showModal()}
                                   />
                                      :
                                    <MaterialIcons key={index} name="keyboard-arrow-right" 
                                        color='#000000'
                                        size={20}
                                        onPress={()=> showModal()}
                                    />
                                }
                                </>
                                :null}
                        </View>
                      </TouchableOpacity>
                      {showSubCat && parentCatId == item?.id?
                      <>
                      {item?.children?.map((subCat:any,index:number)=>
                      <View key={index}>
                       <TouchableOpacity  onPress={()=>SelectSubCat(subCat?.id,subCat?.title,subCat?.children)} >
                         <View style={{borderLeftWidth:1,borderLeftColor:'red',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingVertical:5}}>
                              <Text>{subCat.title}</Text>
                              <>
                              {subCat.children?
                                 <>
                                  {showsubCatIcon && subCat.id == subCatId?
                                    
                                      <MaterialIcons   name="keyboard-arrow-down" 
                                          color='#808080'
                                          size={20}
                                      />
                                      :
                                      <MaterialIcons  name="keyboard-arrow-right" 
                                          color='#808080'
                                          size={20}
                                    />
                                    }
                                    </>
                                 :null}
                                </>
                              
                        </View>
                       </TouchableOpacity>
                       {subCat.children && showSubSubCat && subCatId == subCat.id?
                       <>
                       {subCat.children.map((subsubCat:any,index:number)=>
                          <TouchableOpacity key={index} onPress={()=> selectsubsubcat(subsubCat.id,subsubCat.title)} >
                             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:50,paddingVertical:5}}>
                                <Text>{subsubCat.title}</Text>
                             </View>
                         </TouchableOpacity>
                        )}
                        </>
                        :null}
                     
                       </View>
                       )}
                       </>
                     :null}
                      
                </View> 
                    
                     )}
                </ScrollView>  
                     
              </View>
          </View>
        </View>
      </Modal>
     
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height:deviceHeight-200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    paddingVertical:10,
    color:"white",
    fontSize:16,
  },
  submitButton: {
    backgroundColor: '#BB2025',
    alignItems:'center',
    borderRadius:5,
    paddingHorizontal:deviceWidth/4-60,
 

 },
 submitButton_NO: {
    alignItems:'center',
    borderRadius:5,
    paddingHorizontal:deviceWidth/4-60,
    backgroundColor:'#D08184'

 },
 submitButtonText:{
    color: 'white',
    fontSize:16,
    paddingVertical:5,
    paddingHorizontal:20,
    
 },

 Header:{
    backgroundColor:'#BB2227',
    width:deviceWidth-60,
   
    zIndex:9999,
    borderTopRightRadius:10,
    borderTopLeftRadius:10
 },
 body:{
    backgroundColor:'#FFFFFF',
    width:deviceWidth-60,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
 },



 
});