import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/ColorConstants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const MonthYear = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1925 + 1 }, (_, i) => (1925 + i).toString());
  return (
    <View>
      <View style={styles.MonthYearContainer}>
        <TouchableOpacity style={styles.monthContainer}>
          <Text style={styles.text} >Month</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.monthContainer}>
          <Text style={styles.text}>Year</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>
      </View>
        {/* <Modal
        transparent={true}
          style={styles.modal}
          visible={true}
        >
          <Text>dsa</Text>
        </Modal> */}
    </View>



  )
}

export default MonthYear

const styles = StyleSheet.create({
  MonthYearContainer: {
    flexDirection: 'row',
    gap: 20
  },
  text: {
    fontFamily: 'montserratMed',
    fontSize: hp(1.1),
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
    backgroundColor: 'rgba(0, 0, 0, 1)', // Semi-transparent background
  },
  modalContent: {
    width: '80%', // Adjust width as needed
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  }
})