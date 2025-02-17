import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/ColorConstants'
import SelectTheme from './SelectTheme';
import { themes } from '@/ThemeColor';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '@/firebaseConfiguration';
import Toast from 'react-native-toast-message';
import showToast from '@/Functions/showToast';
import LoadingModal from './LoadingModal';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Theme = () => {
    const {userData}  = useSelector((state: any)=> state.loadUserData)
    const [selectedTheme, setSelectedTheme] = useState<string>(userData?.theme);
    const  [loading, setLoading] = useState(false)

    const onSave = async () => {
        try {
            // Await the asynchronous call to get the user value
            const user: any = await AsyncStorage.getItem('user');

            // Optionally, handle the case where user might be null
            if (!user) {
                console.log("No user found in AsyncStorage");
                return;
            }
            const db = getFirestore(app);
            const docRef = doc(db, 'users', user);
            setLoading(true)
            await updateDoc(docRef, {
                theme: selectedTheme
            });
            setLoading(false)
            showToast('Theme Saved!', 'success')
            console.log('sss')
        } catch (error) {
            console.log(error)
        }
    }
    const keys = Object.keys(themes)
    return (
        <>
            <LoadingModal visibility={loading} />

            <View style={styles.slide}>

                <View style={styles.themeContainer}>
                    <Text style={styles.themeTitle}>Select Theme</Text>
                    <View style={styles.themeList}>
                        {
                            keys.map((item, index) => (
                                <View key={index}>
                                    <SelectTheme
                                        index={index}
                                        theme={item}
                                        selectedTheme={selectedTheme}
                                        setSelectedTheme={setSelectedTheme}
                                    />

                                </View>
                            ))
                        }
                        <TouchableOpacity onPress={onSave} activeOpacity={0.6} style={styles.saveBtn}>
                            <Text style={styles.saveBtnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.toastContainer}>
                
                <Toast />
            </View>
        </>
    )
}

export default Theme

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
    themeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },
    themeTitle: {
        fontFamily: 'poetsen',
        fontSize: hp(3),
        color: Colors.Black,
        marginBottom: 20,
    },
    themeList: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 30,
    },
    saveBtn: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: Colors.Primary,
        borderRadius: 15
    },
    saveBtnText: {
        fontFamily: 'montserratMed',
        color: Colors.White
    },
    toastContainer: {
        position: 'absolute',
        bottom: hp(0),
        right: wp(50),
        zIndex: 1000,
    },
})