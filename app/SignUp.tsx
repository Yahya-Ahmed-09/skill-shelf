import {  Image, ImageBackground,  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '@/ColorConstants';
import Ionicons from '@expo/vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'
import 'firebase/auth';

import { googleSignIn } from '@/Redux/Actions/GoogleSignUpAction';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { SIGN_IN_CANCELLED, SIGN_IN_SUCCESS } from '@/Redux/ReduxConstants';
import LoadingModal from '@/Components/LoadingModal';

const SignUp = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>(null);
    
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSignIn = async () => {
        try {
            setTimeout(()=> setIsLoading(true), 300) 
            const result = await dispatch(googleSignIn());
            if(result.type === SIGN_IN_CANCELLED){
                // setIsLoading(false)
                return ;
            }else if(result.type === SIGN_IN_SUCCESS){
               
                if(user){
                    // setIsLoading(false)
                    router.push('/(tabs)')
                }else{
                    // setIsLoading(false)
                    router.push('/OnBoardingSetup')
                }
            }
        } catch (error) {
            console.log(error)
        }finally{
            setTimeout(()=> setIsLoading(false), 0)
        }
     
    }

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={require('@/assets/images/Signup-bg-image.webp')} style={styles.ImageBGContainer}>
                <View style={styles.overlay}>
                    <View style={styles.DataContainer}>
                        <Text style={styles.heading}>Welcome to Skill Shelf</Text>
                        <Text style={styles.subText}> A platform to show your work to the world, start now and create an amaxing portfolio in just few steps</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
                            <Image style={styles.googleImage} source={require('@/assets/images/Google.webp')} />
                            <Text style={styles.buttonText}>Continue with Google</Text>
                            <Ionicons name="chevron-forward" size={24} color={Colors.Black} />
                        </TouchableOpacity>
                        <View style={styles.bottomContainer}>
                            <Ionicons name="lock-closed" size={24} color={Colors.White} />
                            <Text style={styles.secureText}>Your data is secure with us</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
             {/* Loading Modal */}
             <LoadingModal visibility={isLoading} />
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    loaderOverlay: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Ensure it appears above other components
    },
    mainContainer: {
        flex: 1
    },
    ImageBGContainer: {
        width: wp(100),
        height: hp(100)
    },
    overlay: {
        height: hp(100),
        backgroundColor: '#00000070',
        justifyContent: 'flex-end'
    },
    DataContainer: {
        padding: hp(2),
        gap: 10,
        marginBottom: 40
    },
    heading: {
        fontFamily: 'poetsen',
        color: Colors.White,
        fontSize: 26
    },
    subText: {
        fontFamily: 'montserratMed',
        color: Colors.GreyText,
        fontSize: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.White,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    googleImage: {
        width: wp(6),
        height: hp(4)
    },
    buttonText: {
        fontFamily: 'montserratMed',
        color: Colors.Black
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },
    secureText: {
        fontFamily: 'monitoricaBold',
        color: Colors.White,
        fontSize: 16
    }
})