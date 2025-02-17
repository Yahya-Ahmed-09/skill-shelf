import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '@/ColorConstants'
import * as ImagePicker from 'expo-image-picker';
import LoadingModal from './LoadingModal'
import addSectionData from '@/Functions/AddSectionData'
import { useDispatch, useSelector } from 'react-redux'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'

interface Props {
  closeModal: () => void
}

const AddMedia: React.FC<Props> = ({ closeModal }) => {

  const { sectionData } = useSelector((state: any) => state.loadSectionData)
  const dispatch = useDispatch()

  const API_KEY = 'e5487a236481fb7b994dbfacb28e5ff6'
  const [image, setImage] = useState<string[] | null>([]);
  const [imageUrl, setImageUrl] = useState<string[] | null>(sectionData.Media)
  const [loading, setLoading] = useState(false)

  const PickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage((prev: any) => [...prev, ...result.assets.map((a: any) => a.uri)])
      }
    }
  }
  const handleAddMedia = async () => {

    const uris = image?.map((url: any) => url);
    try {
      const uploadPromises: any = uris?.map(async (url: any) => {
        setLoading(true);
        const formData: any = new FormData();
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        const mimeType = 'image/jpeg';
        formData.append('image', {
          uri: url,
          name: fileName,
          type: mimeType
        });

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const data = jsonResponse.data.url;
        setImageUrl((prev: any) => {
          if (!prev.includes(data)) {
            return [...prev, data];
          } else {
            return prev;
          }
        });
      });

      await Promise.all(uploadPromises);

      // Now call addSectionData after all images have been processed

      closeModal();
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    } 
  };
  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      addSectionData(imageUrl, 'Media');
    }
    dispatch(loadSectionData())
  }, [imageUrl]);
  return (
    <View style={styles.conatiner}>
      <Text style={styles.Heading}>Media Files</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {image ? image?.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.image} />
        )) : null}
        <TouchableOpacity onPress={PickImage} activeOpacity={0.8} style={styles.iconContainer}>
          <MaterialCommunityIcons name="image-plus" size={34} color={Colors.Dark} />
        </TouchableOpacity>


      </View>
      <Text style={styles.text}>Tap above button to add an image</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleAddMedia}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <LoadingModal visibility={loading} />
    </View>
  )
}

export default AddMedia

export const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: wp(100),
    paddingVertical: 20
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
  text: {
    textAlign: 'center',
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