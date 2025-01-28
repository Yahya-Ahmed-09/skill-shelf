import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/ColorConstants'
import MonthYear from './MonthYear'

const AddExperience = () => {
  return (
    <View style={styles.conatiner}>
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
        <Text style={styles.Heading}>Add Experience</Text>
      </View>

      <View style={styles.topContainer}>
        <Text style={styles.subHeading}>Start Time</Text>
        <MonthYear />
      </View>

      <View style={styles.topContainer}>
        <Text style={styles.subHeading}>End Time</Text>
          <MonthYear />
      </View>

      
    </View>
  )
}

export default AddExperience

const styles = StyleSheet.create({
  conatiner: {
    gap: 20,
    width: '100%',
    paddingVertical: 20,
  },
  Heading: {
    fontSize: hp(2.5),
    fontFamily: 'poetsen',
    textAlign: 'center',
  },
  topContainer:{
    gap: 10
  },
  subHeading:{
    fontSize: hp(1.4),
    fontFamily: 'montserratBold',

  },
  MonthYearContainer:{
    flexDirection: 'row',
    gap: 20
  },
  text:{
    fontFamily: 'montserratMed',
    fontSize: hp(1.1),
  },
  monthContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.Dark,
    padding: 10,
    borderRadius: 10,
  }
})