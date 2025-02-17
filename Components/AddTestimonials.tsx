import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'
import addSectionData from '@/Functions/AddSectionData'
import LoadingModal from './LoadingModal'
import Ionicons from '@expo/vector-icons/Ionicons'

interface Props {
  closeModal: () => void
}

const AddTestimonials: React.FC<Props> = ({ closeModal }) => {

  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()

  const API_KEY = 'e5487a236481fb7b994dbfacb28e5ff6'
  const [localImages, setLocalImages] = useState<string>('') // Local selected images
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [testimonial, setTestimonial] = useState<string>('')
  const [testimonialData, setTestimonialData] = useState<any[]>(sectionData.Testimonials || [])

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
    if (!name || !title || !testimonial || localImages.length === 0) {
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
      const newTestimonial = {
        name,
        title,
        testimonial,
        image: uploadedUrl
      }

      // Update testimonial data
      setTestimonialData(prev => [...prev, newTestimonial])
      closeModal()

    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert('Failed to save testimonial')
    } finally {
      setLoading(false)
      setLocalImages('') // Clear local images after upload
    }
  }

  useEffect(() => {
    if (testimonialData.length > 0) {
      addSectionData(testimonialData, 'Testimonial')
      dispatch(loadSectionData())
    }
  }, [testimonialData])
  return (
    <View style={styles.conatiner}>
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Text style={styles.Heading}>Add Projects</Text>

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
        {!localImages ? <Text style={styles.text}>Tap above button to add an image</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} onChangeText={(name) => setName(name)} placeholder='Name' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} onChangeText={(title) => setTitle(title)} placeholder='Title/Designation' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} onChangeText={(testimonial) => setTestimonial(testimonial)} placeholder='Testimonial' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleAddMedia} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <LoadingModal visibility={loading} />
    </View>
  )
}

export default AddTestimonials

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
  textInput: {
    height: hp(6),
    paddingLeft: 20,
    fontFamily: 'montserratMed',
    fontSize: hp(1.4)
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
  image: {
    width: wp(20),
    aspectRatio: 1,
    height: hp(20),
    borderRadius: 15
  }
})