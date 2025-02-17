import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/ColorConstants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ContactModal from './ContactModal';
import LoadingModal from './LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '@/firebaseConfiguration';
import showToast from '@/Functions/showToast';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '@/Redux/Actions/LoadUserDataAction';

const { width, height } = Dimensions.get('window');

const ContactInfo = () => {
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [indicatorLoading, setIndicatorLoading] = useState(false)
    const [inputData, setInputData] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const dispatch = useDispatch()
    const { userData } = useSelector((state: any) => state.loadUserData)
    // console.log(keys)


    const isValidUrl = (url: string) => {
        return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url);
    };
    const handleOnSave = async (item: string, contact: string) => {
        if (item != '') {
            if (isValidUrl(item)) {
                try {
                    setLoading(false)
                    setIndicatorLoading(true)

                    const user: any = await AsyncStorage.getItem('user')
                    const db = getFirestore(app)
                    const docRef = doc(db, 'users', user)
                    // console.log(itemsArray)

                    const docSnap = await getDoc(docRef);
                    let existingData = docSnap.exists() ? docSnap.data() : {};

                    let updatedContacts = existingData.contact || {};

                    updatedContacts[contact] = item;

                    // Firestore document update karna
                    await updateDoc(docRef, {
                        contact: updatedContacts
                    });
                    setInputData('')
                    await dispatch(loadUserData())
                    setIndicatorLoading(false)

                } catch (error) {
                    console.log(error)
                    setIndicatorLoading(false)
                }
            } else {
                setErrorMessage('Please Enter Valid url!')
            }

        } else {
            setErrorMessage(`Url Can't be empty..`)
        }


    }
    const openModal = (item: string) => {
        setLoading(true)
        setLink(item)

        if(userData.contact[item] !== undefined){
            setInputData(userData.contact[item]);
        }else{
            setInputData("");
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await dispatch(loadUserData())
        }
        loadData()
    }, [])
    const contacts = [
        {
            name: 'FaceBook',
            icon: 'logo-facebook',
            color: '#1877F2'
        },
        {
            name: 'Instagram',
            icon: 'logo-instagram',
            color: '#E1306C'
        },
        {
            name: 'LinkedIn',
            icon: 'logo-linkedin',
            color: '#0077B5'
        },
        {
            name: 'Twitter',
            icon: 'logo-twitter',
            color: '#1DA1F2'
        },
        {
            name: 'Youtube',
            icon: 'logo-youtube',
            color: '#FF0000'
        }
    ]

    return (
        <View style={styles.slide}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Link your online accounts</Text>
                <Text style={styles.subtitle}>Connecting accounts will improve your portfolio and also will help
                    viewer to see all your network at a single</Text>
            </View>

            <View style={styles.bottomContainer}>
                {
                    contacts.map((item: any, index: any) => (
                        <TouchableOpacity style={styles.button} key={index} onPress={() => openModal(item.name)}>
                            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                                <Ionicons name={item.icon} size={24} color={item.color} />
                                <Text style={styles.buttonText}>{item.name}</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-forward" size={24} color={Colors.White} />
                            </View>

                        </TouchableOpacity>
                    ))
                }


            </View>
            <ContactModal value={inputData} errorMsg={errorMessage} setErrorMsg={setErrorMessage} inputData={inputData} setInputData={setInputData} contact={link} saveFunc={handleOnSave} visibility={loading} setVisibility={setLoading} />
            <LoadingModal visibility={indicatorLoading} />


        </View>
    )
}

export default ContactInfo

const styles = StyleSheet.create({
    slide: {
        width,
        height,
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        gap: 20,
        zIndex: 20,
        position: 'relative',
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(5),
        paddingHorizontal: 10,
    },
    title: {
        fontSize: hp(2.8),
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'poetsen'
    },
    subtitle: {
        fontSize: hp(1.4),
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontFamily: 'montserratMed'
    },
    bottomContainer: {
        gap: 20
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.Light,
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: 'montserratMed',
        color: Colors.White
    },


})