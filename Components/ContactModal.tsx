import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/ColorConstants'
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'


interface Props {
    contact: string,
    saveFunc: (item: string, contact: string) => void,
    visibility: any,
    setVisibility: any,
    inputData: any,
    setInputData: any,
    errorMsg: any,
    setErrorMsg: any,
    value: string
}

const ContactModal: React.FC<Props> = ({ visibility, contact, saveFunc, setVisibility, inputData, setInputData, errorMsg, setErrorMsg , value}) => {

    const handleOnType = (text:string)=>{
        setInputData(text)
        setErrorMsg('')
    }

    const closeModal = ()=>{
        setVisibility(false)
        setErrorMsg('')
    }
    return (
        <Modal transparent={true} visible={visibility}>
             
            <Pressable style={styles.overlay} onPress={closeModal}>
                <Pressable style={styles.container}>
                    <Text style={styles.title}>Please insert your {contact} account link</Text>
                    <TouchableOpacity style={styles.input}>
                        <TextInput value={inputData} style={styles.textInput} onChangeText={(newText) => handleOnType(newText)} placeholder='Enter url here..' />
                    </TouchableOpacity>
                    
                    {
                        errorMsg? <Text style={{textAlign:'left', color: 'red', fontFamily: 'montserratMed', fontSize: 12}}>{errorMsg}</Text> : null
                        
                    }
                                        <TouchableOpacity style={styles.button} onPress={() => saveFunc(inputData, contact)}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </Pressable>
               
            </Pressable>
        </Modal>
    )
}

export default ContactModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.White,
        padding: 20,
        gap: 20,
        width: '80%',
        borderRadius: 20,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'montserratBold',
        color: Colors.Black,
        textAlign: 'center',
        fontSize: hp(1.2)
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
        fontSize: hp(1.4),
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
})