import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/ColorConstants'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import delSectionData from '@/Functions/DelSectionData'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'
import LoadingModal from './LoadingModal'

const SkillsData = () => {
  const [loading, setLoading] = useState(false)
  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()

  const handleDelete = async (item: any) => {
    setLoading(true)
    await delSectionData(item, 'Skills')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    dispatch(loadSectionData())
  }
  return (
    <View style={styles.container}>
      <View style={styles.skillContainer}>

        <FlatList
          data={sectionData.Skills}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
          renderItem={({ item, index }) => (
            <>
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillText}>{item}</Text>

              </View>
              <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteIcon}>
                <Ionicons name="remove-circle-sharp" size={24} color='red' />
              </TouchableOpacity>
            </>
          )}
        />
        <LoadingModal visibility={loading} />

      </View>
    </View>
  )
}

export default SkillsData

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '100%',


  },
  skillContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10
  },
  skillText: {
    fontFamily: 'montserratMed',
    fontSize: hp('1.4%'),
    color: Colors.White
  },
  skillItem: {
    backgroundColor: Colors.Primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  deleteIcon: {
    position: 'absolute',
    right: -5,
    top: -10,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 100,
  }
})