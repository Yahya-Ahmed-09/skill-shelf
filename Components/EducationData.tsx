import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/ColorConstants'
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import delSectionData from '@/Functions/DelSectionData';
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction';
import LoadingModal from './LoadingModal';

const EducationData = () => {
    const { sectionData } = useSelector((state: any) => state.loadSectionData)
    const data = sectionData.Educations

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = async(item:any) => {
        setLoading(true)
        await delSectionData(item, 'Educations')
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
        dispatch(loadSectionData())
    }
    return (
        <>
            {
                data.map((item: any, index: number) => (
                    <View style={styles.container} key={index}>
                        <View style={styles.topContainer}>
                            <Text style={styles.text}>{item.institute}</Text>
                            <Text style={styles.text}>{item.field}</Text>
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.text}>{item.startMonth} {item.startYear}</Text>

                            <View style={{ width: 1, height: '100%', backgroundColor: Colors.DarkGreyText }}></View>

                            <Text style={styles.text}>{item.present ? 'Present' : `${item.endMonth} ${item.endYear}`}</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>{item.board}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteIcon}>
                            <Ionicons name="remove-circle-sharp" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))
            }
            <LoadingModal visibility={loading} />
        </>

    )
}

export default EducationData

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 15,
        width: '100%',

    },
    topContainer: {
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 20
    },
    description: {
        fontSize: hp(1.4),
        fontFamily: 'montserratMed',
        color: Colors.DarkGreyText,

    },
    text: {
        fontSize: hp(1.4),
        fontFamily: 'montserratMed',

    },
    deleteIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 100,
        padding: 5,
    }
})