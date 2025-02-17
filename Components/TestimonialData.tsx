import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/ColorConstants'
import { useDispatch, useSelector } from 'react-redux'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from '@expo/vector-icons/Ionicons'
import LoadingModal from './LoadingModal'
import delSectionData from '@/Functions/DelSectionData'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'

const TestimonialData = () => {

  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const data = sectionData.Testimonial

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleDelete = async(item:any) => {
    setLoading(true)
    await delSectionData(item, 'Testimonial')
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
    dispatch(loadSectionData())

  }
  return (
    <>
      <LoadingModal visibility={loading} />
      {
        data.map((item: any, index: any) => (
         
            <View style={styles.container} key={index}>
              <View style={styles.innerContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.testimonialText}>{item.testimonial}</Text>
                </View>
              </View>
              <View style={styles.deleteIcon}>
                <TouchableOpacity onPress={()=>handleDelete(item)} activeOpacity={0.8} >
                  <Ionicons name='remove-circle-sharp' size={24} color='red' />
                </TouchableOpacity>
              </View>
            </View>
         
        ))
      }
    </>
  )
}

export default TestimonialData

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '100%',
    position: 'relative', 
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 20
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  text: {
    fontSize: hp(1.4),
    color: Colors.Black,
    fontFamily: 'montserratBold'
  },
  testimonialText: {
    fontSize: hp(1.2),
    color: Colors.DarkGreyText,
    fontFamily: 'montserratMed'
  },
  deleteIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  }
})