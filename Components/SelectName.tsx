import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window')

const SelectName = () => {

    const userName = useSelector((state:any)=> state.loadUserData.userData)

    return (
        <View style={styles.slide}>
            <Image source={require('@/assets/images/select-name-screen.webp')} style={styles.image} />
            
            <Text style={styles.heading}>What's Your Profile Name?</Text>
            <Text style={styles.text}>Your profile name is the first thing people will see—make it memorable! Choose a name that reflects your style, passion, or profession. This is your brand, your identity.</Text>
            <TouchableOpacity style={styles.textInputContainer}>
                <Text style={{backgroundColor: Colors.White, position: 'absolute', top:-12, width: 100,fontSize: 12, left: 20, fontFamily: 'montserratMed', textAlign: 'center'}}>Your Name</Text>
                <TextInput  style={styles.textInput}  value={userName?.displayName} />
            </TouchableOpacity>
            
        </View>
    )
}

export default SelectName

const styles = StyleSheet.create({

    slide: {
        width,
        height,
        alignItems: 'center',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingTop: hp(8),
    },
    image: {
        width: wp(80),
        height: hp(30)
    },
    heading: {
        fontFamily: 'poetsen',
        fontSize: hp(2.4),
        color: Colors.Primary
    },
    text:{
        fontSize: hp(1.2),
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'montserratMed',
        color: Colors.DarkGreyText
    },
    textInputContainer:{
        borderColor : Colors.Primary,
        borderWidth: 1,
        borderRadius: 10,
        height: hp(6),
        width: width - wp(10),
        marginTop: 20,
        justifyContent: 'center',
        padding: 10
    },
    textInput:{
        fontFamily: 'montserratMed'
    }
})