import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/ColorConstants';
import { sectionData } from '@/sectionsData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '@/firebaseConfiguration';
import { arrayUnion, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import LoadingModal from './LoadingModal';
import { useDispatch } from 'react-redux';
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction';
import Toast from 'react-native-toast-message';
import showToast from '@/Functions/showToast';

interface Props { 
    closeModal: any
}

const SelectSections:React.FC<Props> = ({closeModal}) => {
    const [isLoading, setIsloading]= React.useState(false)
    const [allSections, setAllSections] = React.useState<any[]>(sectionData)
    const [selectedSection, setSelectedSection] = React.useState<string[] | any>([])

    const filteredItems = React.useMemo(() => {
        if (!allSections) return [];
        return sectionData.filter((item) => !selectedSection?.includes(item.name));
      }, [sectionData, selectedSection]);
      
    const handleSelectSection = async(item:string) => {
        setIsloading(true)
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const db = getFirestore(app);
                const docRef = doc(db, 'Section-Data', user);
                const docSnap = await getDoc(docRef);
                

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    const repeated = Object.keys(data).find((title:any)=> title === item)
                    if(repeated){
                        showToast('The Section is already added', 'info')
                        return 
                    }else{
                        await updateDoc(docRef, {
                            [item]: arrayUnion()
                        });
                    }
                    
                } else {
                    await setDoc(docRef, {
                        [item]: []
                    }, {merge: true});
                    
                }
                setSelectedSection([item]);
                closeModal()
                
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    if (doc.exists()) {
                    }
                });
    
                return () => unsubscribe();
            }
        } catch (error) {
            console.error('Error writing document: ', error);
        }finally {
            setIsloading(false);
          }
    }  




    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchData = async()=>{
            await dispatch(loadSectionData())
        }
        fetchData()
        
    },[!isLoading])

    return (
        <View >
            <Text style={styles.heading}>Add new section</Text>
            <View style={styles.toastContainer}><Toast  /></View>
    
            {filteredItems.map((item:any, index:any) => {
                return (
                    
                    <TouchableOpacity activeOpacity={0.8} key={index} onPress={()=>handleSelectSection(item.name)}>
                    <View style={styles.sectionContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={item.icon} size={26} color={Colors.Dark} />
                        </View>
                        <View style={styles.dataContainer} >
                            <Text style={styles.sectionName} >{item.name}</Text>
                            <Text style={styles.sectionDescription}>{item.description}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                        <Ionicons name="chevron-forward" size={20} color={Colors.Dark} />
                        </View>
                    </View>
                    </TouchableOpacity>
                )
            })}
            {isLoading && (<LoadingModal visibility={isLoading}/>)}
        </View>
    )
}

export default SelectSections

const styles = StyleSheet.create({

    heading: {
        fontFamily: 'poetsen',
        fontSize: hp(2.2),
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    toastContainer: {
        position: 'absolute',
        bottom: -10,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width: wp(95)
    },
    iconContainer: {
        width: wp(10),
        // height: hp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataContainer: {
        fontFamily: 'montserratMed',
        fontSize: hp(1.8),
        width: wp(65)
    },
    arrowContainer: {
        width: wp(10),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionName:{
        fontFamily: 'montserratMed',
        fontSize: hp(1.4),
        color: Colors.Dark
    },
    sectionDescription:{
        fontFamily: 'montserratMed',
        fontSize: hp(1.2),
        color: Colors.DarkGreyText
    }
})