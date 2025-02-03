import { StyleSheet, Text, View, TouchableOpacity, TextInput,Modal, Pressable, FlatList  } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'


const AddCertifications = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1930 + 1 }, (_, i) => (1930 + i).toString());


  const handleYearPress = (value: string) => {
    setSelectedYear(value);
    setIsYearModalVisible(false);
  }
  return (
    <View style={styles.conatiner}>


      <View style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
      <Text style={styles.Heading}>Add Certifications</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
        <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
      </TouchableOpacity>
      <Text style={styles.text}>Tap above button to add an image</Text>
      <TouchableOpacity  style={styles.monthContainer} onPress={() => setIsYearModalVisible(true)}>
          <Text style={styles.text}>{selectedYear ? 'Year:' + " " + selectedYear :'Year'}</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>
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

      <Modal
        transparent={true}
        visible={isYearModalVisible}
      >
        <Pressable style={styles.modal} onPress={() => setIsYearModalVisible(false)}>
          <Pressable style={styles.selectYearModal}>
            <Text style={styles.selectMonth}>Select Year</Text>

            <FlatList
              data={years}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.yearItem} onPress={() => handleYearPress(item)}>
                  <Text style={[styles.MonthYearText, {backgroundColor: item === '2025' ? Colors.Primary : 'transparent', color: item === '2025' ? Colors.White : Colors.Dark, borderRadius: 20,}]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              numColumns={4} 
              showsVerticalScrollIndicator={false}
              inverted
              contentContainerStyle={{flexDirection: 'column-reverse'}}
            />


          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default AddCertifications

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
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.Dark,
    padding: 10,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalContent: {
    width: '60%',
    height: '40%', // Adjust width as needed
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  selectMonth: {
    fontFamily: 'montserratBold',
    fontSize: hp(1.6),
    textAlign: 'center',
    marginBottom: 10,
  },
  selectYearModal: {
    width: '80%',
    height: '40%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  yearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  yearItem: {
    width: '25%', // Adjust width to fit three items per row
    marginBottom: 10, // Add some space between rows
    alignItems: 'center',
  },
  MonthYearText: {
    marginBottom: 20,
    padding:10,
    paddingHorizontal: 10,
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
  },
})