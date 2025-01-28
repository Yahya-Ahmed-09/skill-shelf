import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const AddProjects = () => {
  return (
    <View style={styles.conatiner}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
      <Text style={styles.Heading}>Add Projects</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
        <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
      </TouchableOpacity>
      </View>
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Title' />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Description' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <TextInput placeholder='Link' />
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddProjects

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    paddingVertical: 20,
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