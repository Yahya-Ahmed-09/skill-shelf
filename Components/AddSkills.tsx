import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import Ionicons from '@expo/vector-icons/Ionicons'
import addSectionData from '@/Functions/AddSectionData'
import LoadingModal from './LoadingModal'
import { useDispatch, useSelector } from 'react-redux'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'

interface AddSkillsProps {
  closeModal: any;
}

const AddSkills = ({ closeModal }: AddSkillsProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillVal, setSkillVal] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {sectionData} = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()

  const handleAddSkill = (skill: string) => {
    if(skill !== ''){
      setSkills([...skills, skill]);
      setSkillVal('');
    }else{
      setError('Please enter a skill');
    }
  }
const handleChangeSkill = (text: string) => {
  setSkillVal(text);
  if(text !== ''){
    setError('');
  }
}

const handleSave = () => {
  setLoading(true)
  const duplicateskills = sectionData.Skills.find((item:any)=> skills.includes(item))
  if(!duplicateskills){
    addSectionData(skills, 'Skills')
    closeModal()
    setLoading(false)
    dispatch(loadSectionData())
  }else{
    setError('Skill already exists')
    setLoading(false)
  }
  
  
  
}
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((item)=> item !== skill))
  }

  return (
    <View style={styles.conatiner}>
      <Text style={styles.Heading}>Add Skills</Text>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.inputContainer}>
          <TextInput value={skillVal} onChangeText={handleChangeSkill}   placeholder='Add your Skills' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAddSkill(skillVal)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          error && <Text style={styles.errorText}>{error}</Text>
        }
      </View>


      <View style={styles.skillsContainer}>
        {
          skills.map((item, index)=>(
            
            <View key={index}>
            <View  style={styles.skillContainer}>
              <TouchableOpacity onPress={() => handleRemoveSkill(item)} style={styles.closeIcon}>
            <Ionicons name='close' size={15} color={Colors.White}  />
            </TouchableOpacity>
              <Text style={styles.skillText}>{item.toUpperCase()}</Text>
            </View>
            </View>
            
          ))

        }

      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <LoadingModal visibility={loading} />
    </View>
  )
}

export default AddSkills

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
  topContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 40,
    width: '100%',
  },
  inputContainer:{
    borderWidth: 1,
    borderColor: Colors.Light,
    borderRadius: 15,
    padding: 20,
    width: '100%'
  },
  addButton:{
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText:{
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
    color: Colors.White,
  },

  saveButton:{
    padding: 15,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    
  },
  saveButtonText:{
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
    color: Colors.White,
  },
  skillsContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,

  },
  skillContainer:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: Colors.Black,
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  skillText:{
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
    color: Colors.White,
  },
  closeIcon:{
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    padding: 2,
    borderRadius: 5,
  },
  errorText:{
    color: 'red',
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
  }







})