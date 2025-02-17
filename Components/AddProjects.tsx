import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/ColorConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import addSectionData from '@/Functions/AddSectionData';
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoadingModal from './LoadingModal';

interface Props {
  closeModal: () => void
}

const AddProjects = ({ closeModal }: Props) => {
  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()

  const API_KEY = 'e5487a236481fb7b994dbfacb28e5ff6'
  const [localImages, setLocalImages] = useState<string>('') // Local selected images
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [projectData, setProjectData] = useState<any[]>(sectionData.Projects || [])

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
    if (!description || !title || !link || localImages.length === 0) {
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
        image: uploadedUrl
      }

      // Update testimonial data
      setProjectData(prev => [...prev, newProject])
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
    if (projectData.length > 0) {
      addSectionData(projectData, 'Projects')
      dispatch(loadSectionData())
    }
  }, [projectData])
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
          <TextInput style={styles.textInput} placeholder='Title' onChangeText={(text) => setTitle(text)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} placeholder='Description' onChangeText={(text) => setDescription(text)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <TextInput style={styles.textInput} placeholder='Link' onChangeText={(text) => setLink(text)} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddMedia}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <LoadingModal visibility={loading} />
    </View>
  )
}

export default AddProjects

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    paddingVertical: 20,
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
  text: {
    textAlign: 'center',
    fontFamily: 'montserratMed',
    fontSize: hp(1.4)
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