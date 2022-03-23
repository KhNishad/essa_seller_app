import React from "react";
import {Modal, Text, View, TextInput,TouchableOpacity,StyleSheet,Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import {useState,useEffect} from 'react';


import CategoryService from '../services/categoryServices';

import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";




const deviceWidth = Dimensions.get('window').width
let attributeArray:any =[]
let multiValue:any = []
let cnt = 0;
export default function ProductAttributes({productTermValues,selectedCategoryId,setattributeModal,setAtributesData}:any) {
 
 
  const { control, handleSubmit, errors } = useForm();
  const [terms, setterms] = useState([])
  const [variation, setvariation] = useState([])
  const [multiSelectitemId, setmultiSelectitemId] = useState('')
  const [showMultiItem, setshowMultiItemet] = useState([])
  const [multivalueS, setmultivalueS] = useState([])
  const isFocused = useIsFocused();

         // get category wise term values
          useEffect(() => {
            CategoryService.getAttributeByCategory(selectedCategoryId).then(data=>{

            setterms(data?.data?.term)

            }).catch(err=>console.log(err));
          }, [selectedCategoryId])

          let attributes = terms
     
      //  close the attribute modal
          const closeModal = () =>{
          cnt=0
          setattributeModal(false)
          }

         // function to handle all the inputs selecting 
         const productTermValuesF = (title,id,item_id)=>{
            const attributes = {
              productTermValue:title,
              id : id,
              title : item_id
            }
      
            if(attributeArray.length > 0){
              attributeArray.map((item,index)=>{
                if(item.id == attributes.id){
                  attributeArray.splice(index,1)
                }
              })
            }
              attributeArray.push(attributes)
              setshowMultiItemet(attributes)
              
            }


         // submit attribute form
         const submitAttributes = (data) =>{
          
           setAtributesData(attributeArray)
         
           if(data){
            closeModal()
            attributeArray= []
           }
          }

          // open multiple option
         const openMultiSelect = (parentId) =>{
            if(parentId == multiSelectitemId){
              setmultiSelectitemId('')
            }else{
              setmultiSelectitemId(parentId)
            }
          }
          // select multiple option
          const selectmultiValue = (title,itemId,itemTitle)=>{
            setmultivalueS([...multivalueS, title])
        if(multiValue.length > 0){
          multiValue.map((item,index)=>{
            if(item == title){
              console.log('already exits');
              multiValue.splice(index,1)
            }
          })
        }
          multiValue.push(title)
      
        // console.log("......values",multiValue);
          }

          const submitMulti = (id,title)=>{
      // let id2 = id
            productTermValuesF(multiValue,id,title)
            multiValue=[]
            setmultiSelectitemId('')
          }

         // filtering and pushing selected items in the array coming from database
    //      if(cnt < 1 && attributes.length > 0 ){
    // for(let i = 0;i<productTermValues?.length;i++){
    //   for(let j = 0;j<attributes?.length;j++){
    //     if(productTermValues[i]?.ProductTermValue_termId == attributes[j]?.id ){
    //       if(productTermValues[i]?.term_type == 'multiple-choice'){
    //         attributes[j].selected = productTermValues[i].attributeValue
    //         productTermValuesF(productTermValues[i]?.attributeValue?.split(","),productTermValues[i].ProductTermValue_termId,productTermValues[i].ProductTermValue_termTitle)
    //         break;
    //       }else{
    //         attributes[j].selected = productTermValues[i].ProductTermValue_termValue
    //         productTermValuesF(productTermValues[i].ProductTermValue_termValue,productTermValues[i].ProductTermValue_termId,productTermValues[i].ProductTermValue_termTitle)
    //         break;
    //       }
    //      }
    //     }
    //   }
    //   cnt++;
     


  return (
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={styles.Header}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',paddingHorizontal:20}}>
                    <View>
                      <Text style={styles.modalText}>Add Product Attributes</Text>
                    </View>
                    <View  style={{justifyContent:'center',alignItems:'center',paddingTop:5}}>
                       <Ionicons name="close-circle-outline" 
                          color='white'
                          size={28}
                          onPress={()=>{ closeModal(),attributeArray=[]}}
                       />
                    </View>
                  </View>     
               </View>
       <ScrollView>
          <View style={styles.body}>
            <View style={{paddingHorizontal:20}}>
      
                 {terms?.map((item:any,index:number)=>
                 <View key={index}>          
                  <View  style={{paddingVertical:5}}>
                    <>
                      {item?.isRequired?
                        <Text style={{color:'#1239'}}>{item?.title}<Text style={{color:'red'}}>*</Text></Text>
                      :
                        <Text style={{color:'#1239'}}>{item?.title}</Text>
                      }
                    </>
                     {item?.type == 'single-choice'?                      
                      <View  style={{borderWidth:1,borderColor:'#1234'}}>
                          <Controller 
                          
                            key={index}
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                            <Picker
                               selectedValue={value}
                               onValueChange={(value, itemIndex) => {productTermValuesF(value,item?.id,item?.title), onChange(value)}}  
                              //  value={value.toString()}    
                            >
                          
                              <Picker.Item key={'unselectable'} label={'Select an Option'} value={''} />
                              
                               {item?.termValues?.map((values:any,index:any)=> 

                               <Picker.Item  key={index} label={values?.title} value={values?.title} />                                 
                               )}
                              
                            </Picker> 
                            )} 
                            name={item?.title}    
                            rules={{ required: false }}
                            //  item.required=='yes'?true:
                            defaultValue = {item?.selected? item?.selected : ''}
                           
                         />  
                        
                        {/* {errors.item?.title?.type === "required" && <Text style={{color:'red'}}>This is Required</Text>} */}
                      </View>
                      
                      : null}
             
                    <>
                      {item?.type == 'text'?
                         <TextInput
                            style={{paddingHorizontal: 10, borderWidth: 1, paddingVertical: 5,borderColor:"#1234"}}
                            onChangeText={value => productTermValuesF(value,item?.id,item?.title)}
                            // value={value}
                            placeholder={`Enter ${item.title}`}
                            placeholderTextColor="#1234"
                            defaultValue={item?.selected? item?.selected : ''}
                         />
                      :null}
                    </>
                    <>
                      {item?.type == 'multiple-choice'?

                  //     <ScrollView>
                        
                  //     <MultiSelect
                  //     // hideTags
              
                  //     items={item?.termValues}
                  //     uniqueKey='id'
                  //     ref={(component) => component }
                  //     onSelectedItemsChange={onSelectedItemsChange} 
                  //     selectedItems={selectedItems}
                  //     selectText="Pick Items"
                  //     searchInputPlaceholderText="Search Items..."
                  //     onChangeInput={()=>console.log("callled")}
                  //     tagRemoveIconColor="red"
                  //     tagBorderColor="red"
                  //     tagTextColor="red"
                  //     selectedItemTextColor="red"
                  //     selectedItemIconColor="red"
                  //     itemTextColor="red"
                  //     displayKey='title'
                  //     searchInputStyle={{ color: 'red' }}
                  //     submitButtonColor="red"
                  //     submitButtonText="Submit"

                  //   />
                  //  </ScrollView>

                        <View>
                          <View>
                               <Text style={styles.multiText}onPress={()=> openMultiSelect(item?.id)}>
                                  {attributeArray?.map((items,index)=>
                                     <View key={index}>     
                                        {item?.id == items?.id?
                                          <View style={{flexDirection:'row'}} key={index}>
                                              {items?.productTermValue?.map((selected,index)=>
                                              <Text key={index} style={{color:'black'}}>{selected}  </Text>
                                                )}
                                          </View>
                                            :
                                            <Text></Text>
                                            }
                                      </View>
                                      )}
                                      <>
                                        {item?.selected?
                                           null
                                          :
                                          <View>
                                              <Ionicons  style={{paddingLeft:50}}
                                                name="ios-caret-down" style={{color:'black',fontSize:15}}>
                                             </Ionicons>
                                          </View>
                                           
                                          }
                                      </>  
                                </Text>
                           </View>
                                 {multiSelectitemId == item.id?
                                    <>
                                        {item?.termValues?.map((value,index)=>
                                           <View style={{paddingVertical:5,paddingLeft:10,backgroundColor:'#F9FAFF'}} key={index}>
                                             <View style={{flexDirection:'row'}}>
                                               <TouchableOpacity onPress={()=> selectmultiValue(value.title,item?.id,item?.title)}>
                                                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                   <Text>{value.title}</Text>
                                                  </View>
                                               </TouchableOpacity>
                                              </View>                         
                                           </View>
                                         )}
                                       <TouchableOpacity onPress={()=>submitMulti(item?.id,item?.title)}>
                                         <View style={{alignItems:'center',backgroundColor:'#1239',paddingVertical:5}}>
                                            <Text style={{color:'#FFFFFF'}}>Submit</Text>
                                         </View>
                                      </TouchableOpacity>
                                    </>
                                  :null}
                         </View>
                      :null}
                      </>             
                </View>
          </View> 
        )}
    </View>
</View>
 </ScrollView>
              <TouchableOpacity onPress={handleSubmit(submitAttributes)}>
                <View style={{paddingVertical:10,paddingHorizontal:20,backgroundColor:'green',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Submit</Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#FFFF',
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
    borderBottomRightRadius:10,
    paddingTop:20
 },
 multiText:{
  paddingHorizontal: 10,
   borderWidth: 1,
   paddingVertical: 10,
   borderColor:"#1234"
 }



 
});