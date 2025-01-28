import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Colors from '@/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheetComponent from './BottomSheetComponent'
import { useDispatch, useSelector } from 'react-redux'
import { bottomSheetStatus } from '@/Redux/Actions/BottomSheetStatus'
import SectionPage from './SectionPage'
import Ionicons from '@expo/vector-icons/Ionicons'

const { width, height } = Dimensions.get('window');

interface Props {
  setIsOpen: any
}

const AddSections: React.FC<Props> = ({ setIsOpen }) => {

  const dispatch = useDispatch()
  const handleSnapPress = useCallback(() => {
    dispatch(bottomSheetStatus(true, 'addSection'))
  }, [])

  const userSectionData = useSelector((state:any)=> state.loadSectionData.sectionData)

  
  const [isSectionPage, setIsSectionPage] = React.useState(false)

  useEffect(()=>{
    if(userSectionData != null){
      setIsSectionPage(true)
    }
  },[userSectionData])

  return (
    <View style={[styles.slide, { paddingTop: isSectionPage ? 0 : hp(10), alignItems: isSectionPage ? 'flex-start' : 'center' }]} >

{isSectionPage ? (
  <>
  <SectionPage setIsSectionPage={setIsSectionPage} />
  <TouchableOpacity style={styles.addIcon} onPress={handleSnapPress}>
  <Ionicons name="add" size={30} color={Colors.White} />
  </TouchableOpacity>
  </>
) : (
  <>
  <Image style={styles.image} source={require('@/assets/images/add-section.webp')} />
  <Text style={styles.text}>Every great portfolio tells a story. Add sections to showcase your skills, projects, achievements, or anything that sets you apart. Each section is a chapter in your unique journey.</Text>
  <TouchableOpacity onPress={handleSnapPress} activeOpacity={0.7} style={styles.addSectionBtn}>
    <Text style={styles.btnText}>Add your first section</Text>
  </TouchableOpacity>
  </>
)}
    </View>
    
  )
}

export default AddSections

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    gap: 20,
    zIndex: 20,
    position: 'relative'
  },
  image: {
    width: wp(60),
    height: hp(30)
  },
  text: {
    textAlign: 'center',
    color: Colors.DarkGreyText,
    fontSize: hp(1.2),
    fontFamily: 'montserratMed',
  },
  addSectionBtn: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 10
  },
  btnText: {
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
    color: Colors.White
  },
  addIcon:{
    position: 'absolute',
    bottom: 100,
    right: 20,
    padding: 15,
    borderRadius: 50,
    backgroundColor: Colors.Primary,
  }
})