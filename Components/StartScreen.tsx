import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/ColorConstants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window')

const StartScreen = () => {
  return (
    <View style={styles.slide}>
      
      
        <Image source={require('@/assets/images/Start-Screen.webp')} style={styles.image}/>
        <Text style={styles.heading}>SKill Shelf</Text>
        <Text style={styles.subHeading}>A Shelf Full of Your Potential</Text>
        <Text style={styles.text} >Imagine a space where your talents shine, your achievements inspire, and opportunities find you. Skill Shelf is the ultimate stage for your story—crafted by you, for the world.</Text>
    </View>
  )
}

export default StartScreen

const styles = StyleSheet.create({
    
      slide: {
        width,
        height,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        gap: 10,
        paddingTop: hp(8)
      },
      image:{
        width: wp(80),
        height: hp(40)
      },
      heading:{
        fontFamily: 'poetsen',
        fontSize: hp(3.6),
        color: Colors.Primary
      },
      subHeading:{
        fontFamily: 'monitoricaBold',
        fontSize: hp(1.6)
      },
      text:{
        fontFamily: 'montserratMed',
        textAlign: 'center',
        color: Colors.DarkGreyText
      }
})