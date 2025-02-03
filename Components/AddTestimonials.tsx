import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


const AddTestimonials = () => {
  return (
    <View style={styles.conatiner}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
      <Text style={styles.Heading}>Add Projects</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
        <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
      </TouchableOpacity>
      <Text style={styles.text}>Tap above button to add an image</Text>
      </View>
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Name' />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Title/Designation' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Testimonial' />
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddTestimonials

const styles = StyleSheet.create({
    conatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        paddingVertical: 20,
      },
      text: {
        textAlign: 'center',
        fontFamily: 'montserratMed',
        fontSize: hp(1.4)
      },
      Heading: {
        fontSize: hp(2.5),
        fontFamily: 'poetsen',
        textAlign: 'center',
      },
      iconContainer: {
        padding: 30,
        backgroundColor: "#eeeeee",
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    
      },
      inputContainer:{
        gap: 20,
        width: '100%'
      },
      input:{
        borderWidth: 1,
        borderColor: Colors.Light,
        borderRadius: 15,
        padding: 20,
        width: '100%'
      },
      button: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        color: Colors.White,
        fontFamily: 'montserratMed',
      }
})