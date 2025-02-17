import { Alert, BackHandler, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StartScreen from '@/Components/StartScreen'
import Colors from '@/ColorConstants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectName from '@/Components/SelectName'
import { googleSignOut } from '@/Redux/Actions/GoogleSignOutAction'
import auth from '@react-native-firebase/auth'
import AddSections from '@/Components/AddSections'
import BottomSheetComponent from '@/Components/BottomSheetComponent'
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction'
import LoadingModal from '@/Components/LoadingModal'
import { loadUserData } from '@/Redux/Actions/LoadUserDataAction'
import Theme from '@/Components/Theme'
import ContactInfo from '@/Components/ContactInfo'


const { width, height } = Dimensions.get('window');
const OnBoardingSetup = () => {
    const [loading, setLoading] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const {status} = useSelector((state:any)=> state.bottomSheetStatus)
    const [isOpen, setIsOpen] = React.useState(status)

    useEffect(() => {
        setIsOpen(status);
    }, [status]);
    const handleScrollToNext = (index: any) => {
        scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
        setCurrentIndex(index)
    };
    const dispatch = useDispatch()
    const router = useRouter()
    const handleSignOut = async () => {
                dispatch(googleSignOut())
                auth()
          .signOut()
          .then(() => console.log('User signed out!'));
                router.navigate('/SignUp')
    }


    useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 2000)
        dispatch(loadSectionData(), loadUserData())
        const backAction = ()=>{
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
                {text: 'YES', onPress: () => BackHandler.exitApp()},
              ]);
              return true;
            
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          );

        
        const loadOnBoarding = async () => {
            await AsyncStorage.setItem('steps', JSON.stringify(false))
        }
        loadOnBoarding()

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
            setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
            setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            backHandler.remove()
        };
        
    }, [])
    return (

        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                scrollEnabled={false} // Disable manual swiping
                showsHorizontalScrollIndicator={false}
            >
                <StartScreen />
                <SelectName />
                <AddSections setIsOpen={setIsOpen}/>
                <ContactInfo />
                <Theme />

            </ScrollView>
            {!keyboardVisible && (
            <View style={styles.buttonContainer}>
                
                <View>
                    
                    {currentIndex !== 0 ? (<TouchableOpacity activeOpacity={0.7} style={styles.prevBtn} onPress={() => handleScrollToNext(currentIndex - 1)}>
                        <Text style={styles.prevBtnText}>Previous</Text>
                    </TouchableOpacity>) : null}
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.nextBtn} onPress={() => handleScrollToNext(currentIndex + 1)}>
                        <Text style={styles.nextBtnText}>{currentIndex == 0 ? 'Create Your Shelf' : 'Next'}</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity activeOpacity={0.7} style={styles.nextBtn} onPress={handleSignOut}>
                        <Text style={styles.nextBtnText}>{currentIndex == 0 ? 'logout' : 'Next'}</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            )}
            {isOpen && (<BottomSheetComponent />)}
            <LoadingModal visibility={loading} />
        </View>

    )
}

export default OnBoardingSetup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        position: 'relative'
    },
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width,
        padding: 20,
        position: 'relative'
    },
    nextBtn: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.Primary
    },
    nextBtnText: {
        fontFamily: 'montserratMed',
        color: Colors.White,
        fontSize: hp(1.4)
    },
    prevBtn: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.Primary
    },
    prevBtnText: {
        fontFamily: 'montserratMed',
        color: Colors.Primary,
        fontSize: hp(1.4)
    }

})