import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Pressable, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import addSectionData from '@/Functions/AddSectionData'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'
import LoadingModal from './LoadingModal'

interface Props {
  closeModal: () => void
}

const AddCertifications: React.FC<Props> = ({ closeModal }) => {

  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()


  const API_KEY = 'e5487a236481fb7b994dbfacb28e5ff6'
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1930 + 1 }, (_, i) => (1930 + i).toString());
  const [localImages, setLocalImages] = useState<string>('') // Local selected images
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [certificationData, setCertificationData] = useState<any[]>(sectionData.Certifications || [])

  const PickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permission.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
        if (!result.canceled) {
          setLocalImages(result.assets[0].uri)
        }
      }
    } catch (error) {
      console.error("Image picker error:", error)
    }
  }

  const handleAddMedia = async () => {
    if (!selectedYear || !description || !title || !link || localImages.length === 0) {
      alert('Please fill all fields and select at least one image')
      return
    }

    try {
      setLoading(true)

      // Upload all images first
      const formData = new FormData()
      const fileName = localImages.split('/').pop()
      const type = 'image/jpeg'

      formData.append('image', {
        uri: localImages,
        name: fileName,
        type
      } as any)

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Image upload failed')
      const json = await response.json()
      const uploadedUrl = json.data.url

      // Create new testimonial with uploaded URLs
      const newProject = {
        title,
        description,
        link,
        image: uploadedUrl,
        year: selectedYear
      }

      // Update testimonial data
      setCertificationData(prev => [...prev, newProject])
      closeModal()

    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert('Failed to save testimonial')
    } finally {
      setLoading(false)
      setLocalImages('') // Clear local images after upload
    }
  }

  const handleYearPress = (value: string) => {
    setSelectedYear(value);
    setIsYearModalVisible(false);
  }

  useEffect(() => {
    if (certificationData.length > 0) {
      addSectionData(certificationData, 'Certifications')
      dispatch(loadSectionData())
    }
   
  }, [certificationData])
  return (
    <View style={styles.conatiner}>

    <LoadingModal visibility={loading} />
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Text style={styles.Heading}>Add Certifications</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {localImages ?
            <>
              <Image source={{ uri: localImages }} style={styles.image} />
              <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => setLocalImages('')} activeOpacity={0.8} >
                <Ionicons name="remove-circle-sharp" size={24} color='red' />
              </TouchableOpacity>
            </> :
            <TouchableOpacity onPress={PickImage} activeOpacity={0.8} style={styles.iconContainer}>
              <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
            </TouchableOpacity>
          }
        </View>
        {!localImages && <Text style={styles.text}>Tap above button to add an image</Text>}
        <TouchableOpacity style={styles.monthContainer} onPress={() => setIsYearModalVisible(true)}>
          <Text style={styles.text}>{selectedYear ? 'Year:' + " " + selectedYear : 'Year'}</Text>
          <Ionicons name='chevron-down' size={15} color={Colors.Dark} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} value={title} onChangeText={(text) => setTitle(text)} placeholder='Name' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput}   value={description} onChangeText={(text) => setDescription(text)} placeholder='Title/Designation' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} value={link} onChangeText={(text) => setLink(text)} placeholder='Link' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleAddMedia} style={styles.button}>
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
                  <Text style={[styles.MonthYearText, { backgroundColor: item === '2025' ? Colors.Primary : 'transparent', color: item === '2025' ? Colors.White : Colors.Dark, borderRadius: 20, }]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              inverted
              contentContainerStyle={{ flexDirection: 'column-reverse' }}
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
  inputContainer: {
    gap: 20,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.Light,
    borderRadius: 15,
    padding: 0,
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
    padding: 10,
    paddingHorizontal: 10,
    fontFamily: 'montserratMed',
    fontSize: hp(1.4),
  },
  textInput: {
    height: hp(6),
    paddingLeft: 20,
    fontFamily: 'montserratMed',
    fontSize: hp(1.4)
  },
  image: {
    width: wp(20),
    aspectRatio: 1,
    height: hp(20),
    borderRadius: 15
  }
})