import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Colors from '@/ColorConstants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Data from './Data'
import { useDispatch, useSelector } from 'react-redux'
import { arrayRemove, deleteDoc, deleteField, doc, FieldValue, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import app from '@/firebaseConfiguration'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'

const SectionPage = ({setIsSectionPage}:any) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const dispatch = useDispatch()

  const userSectionData = useSelector((state: any) => state.loadSectionData.sectionData)
  const data = Object.keys(userSectionData)

  const handleDelete = async(item:any)=>{
    setIsLoading(true)
    try {
        const user = await AsyncStorage.getItem('user');
        
    if(user){
        const db = getFirestore(app)
        const docRef  = doc(db, 'Section-Data', user)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            if(data.length === 1){
                await deleteDoc(docRef)
                setIsSectionPage(false)
            }else{
                await updateDoc(docRef, {
                    [item]: deleteField()
                })
            }
            
        }
    }
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
    
}

  useEffect(()=>{
    const fetchData = async()=>{
      await dispatch(loadSectionData())
    }
    fetchData()
    // console.log(userSectionData)
  },[!isLoading])
  return (
    <View style={{ width: '100%', height: '90%' }}>
      <Header title='Sections' />
      <View style={{ flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, height: '80%'}}>
        {data.map((item, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Data loader={isLoading} handleDelete={handleDelete} length={data.length} title={item} />
          </View>
        ))}
        </ScrollView>

      </View>
    </View>
  )
}

export default SectionPage

const styles = StyleSheet.create({


})