import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/ColorConstants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface MonthYearProps {
  showPresentCheckbox?: boolean;
  setStartMonth?: any;
  setStartYear?: any;
  setEndMonth?: any;
  setEndYear?: any;
  setCheckbox?: any;
  checkbox?: any;
}

const MonthYear:React.FC<MonthYearProps> = ({ 
  showPresentCheckbox = false, 
  setStartMonth, 
  setStartYear, 
  setEndMonth, 
  setEndYear ,
  setCheckbox,
  checkbox
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1930 + 1 }, (_, i) => (1930 + i).toString());
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  // const [checkbox, setCheckbox] = useState(false);


  const handleMonthPress = (value: string) => {
    setSelectedMonth(value);
    setIsMonthModalVisible(false);
    if (setStartMonth) setStartMonth(value);
    if (setEndMonth) setEndMonth(value);

    
  }
  const handleYearPress = (value: string) => {
    setSelectedYear(value);
    setIsYearModalVisible(false);
    if (setStartYear) setStartYear(value); 
    if (setEndYear) setEndYear(value);

  }
useEffect(()=>{
  console.log(checkbox)
},[checkbox])
  return (
    <View>
      <View style={styles.MonthYearContainer}>


        <TouchableOpacity disabled={checkbox} style={styles.monthContainer} onPress={() => setIsMonthModalVisible(true)}>
          <Text style={styles.text} >{checkbox ? '---' : selectedMonth ? selectedMonth  : 'Month'}</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>


        <TouchableOpacity disabled={checkbox} style={styles.monthContainer} onPress={() => setIsYearModalVisible(true)}>
          <Text style={styles.text}>{checkbox ? '---':selectedYear ? selectedYear :'Year'}</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>
        <View>  
            {
              showPresentCheckbox && (
                <View style={styles.presentCheckbox}>
                  <TouchableOpacity onPress={()=> setCheckbox(!checkbox)}>
                    {
                      checkbox ? (<Ionicons name="checkbox" size={24} color={Colors.Dark} />):(<View style={styles.checkbox}></View>)
                    }
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'montserratMed', paddingTop: 5, fontSize: hp(1.2)}}>Present</Text>
                </View>
              )
            }
          </View>
      </View>

      <Modal
        transparent={true}
        visible={isMonthModalVisible}
      >
        <Pressable style={styles.modal} onPress={() => setIsMonthModalVisible(false)}>
          <Pressable style={styles.modalContent}>
            <Text style={styles.selectMonth}>Select Month</Text>

            <FlatList 
            data={months}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleMonthPress(item)}>
                <Text style={styles.MonthYearText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            />
          </Pressable>
        </Pressable>
      </Modal>

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
  MonthYearText: {
    marginBottom: 20,
    padding:10,
    paddingHorizontal: 10,
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
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
  presentCheckbox:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    padding: 10,
  },
  checkbox:{
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.Dark,
    borderRadius: 3,
  }






})