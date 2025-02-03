import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Colors from '@/ColorConstants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { sectionData } from '@/sectionsData'
import Ionicons from '@expo/vector-icons/Ionicons';

import { useDispatch } from 'react-redux'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'
import LoadingModal from './LoadingModal'
import { bottomSheetStatus } from '@/Redux/Actions/BottomSheetStatus'
import MediaData from './MediaData'
import ExperienceData from './ExperienceData'
import EducationData from './EducationData'
import ProjectsData from './ProjectsData'
import TestimonialData from './TestimonialData'
import CertificationsData from './CertificationsData'
import SkillsData from './SkillsData'

interface Props {
    title: string,
    length: number,
    handleDelete: any,
    loader: boolean
}

const Data: React.FC<Props> = ({ title, handleDelete, loader }) => {
    const dispatch = useDispatch()
    const handleSnapPress = useCallback((item:string) => {
        dispatch(bottomSheetStatus(true, item))
        console.log(item)
      }, [])
    
console.log(title)
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topInnerContainer}>
                    <Ionicons name={
                        sectionData.find((item) => item.name === title)?.icon
                    } size={24} color={Colors.Dark} />
                    <Text style={{ fontFamily: 'montserratBold', color: Colors.Dark }}>{title}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>handleDelete(title)}>
                    <Ionicons style={styles.icon} name="close" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>handleSnapPress(title)}  activeOpacity={0.7} style={styles.bottomContainer}>
                <Ionicons name={sectionData.find((item) => item.name === title)?.icon} size={26} color={Colors.Primary} />
                <Text style={{ fontFamily: 'montserratMed' }}>Add New {title}</Text>
                <Ionicons name="add-circle-outline" size={26} color={Colors.Primary} />
            </TouchableOpacity>
                {
                    title === 'Media' ? <MediaData /> :
                    title === 'Experiences' ? <ExperienceData /> :
                    title === 'Educations' ? <EducationData /> :
                    title === 'Projects' ? <ProjectsData /> :
                    title === 'Testimonial' ? <TestimonialData /> :
                    title === 'Certifications' ? <CertificationsData /> :
                    title === 'Skills' ? <SkillsData /> :
                    null
                }
            <LoadingModal visibility={loader} />
        </View>
    )
}


export default Data

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        width: '100%',
        padding: 20,
        gap: 20,
        paddingBottom: 30,
        borderRadius: 15
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    icon: {
        backgroundColor: Colors.White,
        padding: 5,
        borderRadius: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.White,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 15
    }
})