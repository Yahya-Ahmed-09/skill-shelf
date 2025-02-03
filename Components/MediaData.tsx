import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Ionicons from '@expo/vector-icons/Ionicons';
import delSectionData from '@/Functions/DelSectionData';
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction';
import LoadingModal from './LoadingModal';


const MediaData = () => {
    const { sectionData } = useSelector((state: any) => state.loadSectionData)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleDelete = async(item:any) => {
        setLoading(true)
        await delSectionData(item, 'Media')
        setTimeout(()=>{
            setLoading(false)
            
        }, 1000)
        dispatch(loadSectionData())
    }
    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={sectionData.Media}
                contentContainerStyle={{ gap: 15 }}
                renderItem={({ item, index }) =>
                    <View >
                        <Image style={styles.imageContainer} source={{ uri: item }} key={index} />
                        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteIcon}>
                            <Ionicons name="remove-circle-sharp" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            />
        <LoadingModal visibility={loading} />
        </View>
    )
}

export default MediaData

const styles = StyleSheet.create({
    container: {
        gap: 20,
        width: "100%",
    },
    imageContainer: {
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 10,
    },
    deleteIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 100,
        padding: 5,
    }
})