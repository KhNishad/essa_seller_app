import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import StepIndicator from 'react-native-step-indicator';

// components

// img
import Requisition from "../services/RequisitionServices";
import OfferModal from '../components/OfferModal'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const apiImagepath = 'http://103.119.71.9:4400/media';
// pull refresh  function
function wait(time: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default function RequisitionDetail() {

    // const [currentPosition, setcurrentPosition] = useState(0)


    let labels = ["Requisition Created", "Processing", "Order Placed"];


    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#ec1d25',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#ec1d25',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#ec1d25',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#ec1d25',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#ec1d25',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 10,
        currentStepLabelColor: '#ec1d25',

    }

    const [allRequisition, setallRequisition] = useState([]);

    const [refreshing, setrefreshing] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false)
    const [requisitionNo, setrequisitionNo] = useState('')


    const refresh = React.useCallback(() => {
        setrefreshing(true);
        wait(1000).then(() => {
            setrefreshing(false);
        });
    }, [refreshing]);

    const navigation = useNavigation();
    const route = useRoute();
    const { id }: any = route.params;




    useEffect(() => {
        Requisition.getRequisitionDetails(id)
            .then((res) => {
                // console.log('..........', res);

                setallRequisition(res?.data);
                setrequisitionNo(res?.data?.requisitionDetails[0]?.id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refreshing]);

console.log('.........requisitionNo',requisitionNo);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF9411" />

            <SafeAreaView>

                <View style={styles.container1}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <AntDesign
                            onPress={() => navigation.goBack()}
                            name="left"
                            size={25}
                            color={"black"}
                        ></AntDesign>
                        <Text
                            style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
                        >
                            Requisition Details
                        </Text>
                        <View></View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>

                        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                            {/* <View style={styles.card}>
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 18, paddingHorizontal: 15 }}>Address</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>Division : {allRequisition?.dlvrDivision}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>District : {allRequisition?.dlvrDistrict}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>City : {allRequisition?.dlvrCity}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>Area : {allRequisition?.dlvrArea}</Text>
                                </View>
                            </View> */}
                            {allRequisition?.requisitionDetails?.map((item: any, index: number) =>
                                <View style={styles.card} key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                        <View style={{ width: 100 }}>
                                            <Image style={styles.img} source={{ uri: `${apiImagepath}/${item?.product?.images[0].url}` }} />
                                        </View>
                                        <View style={{ width: deviceWidth / 3 }}>
                                            <Text>{item?.product?.title} </Text>
                                            <Text>TK: {item?.price}</Text>
                                        </View>


                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <StepIndicator stepCount={3} customStyles={customStyles} currentPosition={item?.status == 'createRequisition' ? 0 : item?.status == 'processing' ? 1 : 2} labels={labels} />
                                    </View>
                                    <View style={{width:deviceWidth/2.5,paddingVertical:5,paddingHorizontal:10}}>
                                    <TouchableOpacity onPress={()=>setModalOpen(true)} style={{ backgroundColor: '#1C6E7A', borderRadius: 10,alignItems:'center' }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold',padding:10 }}>Offer Product</Text>
                                    </TouchableOpacity>
                                    </View>
                                    
                                </View>
                            )}
                            <View style={[styles.card, { marginTop: 10, paddingHorizontal: 10 }]}>
                                <Text>Total : TK {allRequisition?.cSubTotalAmount}</Text>
                                <Text>Quantity : {allRequisition?.cQuantity}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {ModalOpen ?
                <OfferModal requisitionNo={requisitionNo} setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: "#FF9411",
        borderBottomWidth: 0.5,
    },
    deleverd: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    card: {
        //    width:deviceWidth/1.1,
        backgroundColor: '#fff',
        elevation: 7,
        borderRadius: 5,
        paddingVertical: 5,
        marginBottom: 10,
    },

    img: {
        width: 80,
        height: 80
    }


});
