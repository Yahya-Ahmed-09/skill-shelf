import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'

const AddMedia = () => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.Heading}>Media Files</Text>
    
        <TouchableOpacity activeOpacity={0.8}style={styles.iconContainer}>
          <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
        </TouchableOpacity>
    
      <Text style={styles.text}>Tap above button to add an image</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddMedia

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: wp(100),
    paddingVertical: 20
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
  text: {
    textAlign: 'center',
    fontFamily: 'montserratMed',
    fontSize: hp(1.4)
  },
    button: {
      backgroundColor: Colors.Primary,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText:{
    color: Colors.White,
    fontFamily: 'montserratMed',
  }
})