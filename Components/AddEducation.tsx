import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/ColorConstants'
import MonthYear from './MonthYear'
import showToast from '@/Functions/showToast'
import Toast from 'react-native-toast-message'
import addSectionData from '@/Functions/AddSectionData'
import LoadingModal from './LoadingModal'
import { useDispatch } from 'react-redux'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'

interface Props{
  closeModal: () => void
}

const AddEducation = ({closeModal}:Props) => {
  const [startMonth, setStartMonth] = useState<any>(null)
  const [startYear, setStartYear] = useState<any>(null)
  const [endMonth, setEndMonth] = useState<any>(null)
  const [endYear, setEndYear] = useState<any>(null)
  const [present, setPresent] = useState<any>(null)
  const [field, setField] = useState<any>(null)
  const [institute, setInstitute] = useState<any>(null)
  const [board, setBoard] = useState<any>(null)
  const [checkbox, setCheckbox] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)

  const dispatch = useDispatch()

  const isAnyValueNull = (obj:Object) => {
    return Object.values(obj).some(value => value === null);
  };
  useEffect(()=>{
    if(checkbox){
      setPresent('Present')
    }
  },[checkbox])
  const handleSave = () => {
    
    if(checkbox){
      setPresent('Present')
    }
    setLoading(true)
    const pastData = {
      field: field,
      institute: institute,
      board: board,
      startMonth: startMonth,
      startYear: startYear,
      endMonth: endMonth,
      endYear: endYear,
    }
    const continueData = {
      field: field,
      institute: institute,
      board: board,
      startMonth: startMonth,
      startYear: startYear,
      present: present,
    }

    const finalData = checkbox ? continueData : pastData
    console.log(finalData)
    if(isAnyValueNull(finalData)){
      showToast('Please fill all the fields', 'error')
      setLoading(false)
    }else{
      addSectionData(finalData, 'Educations')
      setLoading(false)
      closeModal()
    }
    dispatch(loadSectionData())
  }
  return (
    <View style={styles.conatiner}>
  
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
          <Text style={styles.Heading}>Add Education</Text>
        </View>

        <View style={styles.topContainer}>
          <Text style={styles.subHeading}>Start Time</Text>
          <MonthYear 
          setStartMonth={setStartMonth} 
          setStartYear={setStartYear} 
          
          />
        </View>

        <View style={styles.topContainer}>
          <Text style={styles.subHeading}>End Time</Text>
          <View>
            <MonthYear 
            showPresentCheckbox={true} 
            setEndMonth={setEndMonth} 
            setEndYear={setEndYear} 
            setCheckbox={setCheckbox}
            checkbox={checkbox}
            />

          </View>
        </View>
   
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput onChangeText={newField => setField(newField)} placeholder='Field ex. Computer Science, Mathematics, etc.' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput onChangeText={newInstitue => setInstitute(newInstitue)} placeholder='Institute Name' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput onChangeText={newBoard => setBoard(newBoard)} placeholder='Board Name' />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Toast />
      </View>
      <LoadingModal visibility={loading} />
    </View>
  )
}

export default AddEducation

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 20,
    width: '100%',
    paddingVertical: 20,
  },
  Heading: {
    fontSize: hp(2.5),
    fontFamily: 'poetsen',
    textAlign: 'center',
  },
  topContainer: {
    gap: 10,
  },
  subHeading: {
    fontSize: hp(1.4),
    fontFamily: 'montserratBold',

  },
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
  inputContainer: {
    gap: 20,
    width: '100%'
  },
  input: {
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
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.White,
    fontFamily: 'montserratMed',
  }
})