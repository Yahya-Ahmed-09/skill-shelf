import { StyleSheet, Text, View, Animated, useAnimatedValue, Pressable } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import { bottomSheetStatus } from '@/Redux/Actions/BottomSheetStatus';
import SelectSections from './SelectSections';
import AddProjects from './AddProjects';
import AddExperience from './AddExperience';
import AddMedia from './AddMedia';
import AddSkills from './AddSkills';
import AddCertifications from './AddCertifications';
import AddEducation from './AddEducation';




const BottomSheetComponent = () => {
  const  {value} = useSelector((state:any)=> state.bottomSheetStatus)
    const slide = useAnimatedValue(value === 'addSection' ? hp(65) :value === 'Media' ? hp(35) :
    value === 'Projects' ? hp(55) :
    
    hp(0));
    const dispatch = useDispatch()
    
    // console.log(value)

    const sildeUp = () => {
        Animated.timing(slide, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
    
      const slideDown = () => {
        Animated.timing(slide, {
          toValue: value === 'addSection' ? hp(65) :value === 'Media' ? hp(35) :
          value === 'Projects' ? hp(55) :
          
          hp(0),
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

      React.useEffect(()=>{
        sildeUp()
      },[])

      const closeModal =()=>{
        slideDown()
        setTimeout(()=>{
            dispatch(bottomSheetStatus(false))
        }, 250)

      }
  return (
    <Pressable  onPress={closeModal} style={styles.backdrop}>
        <Pressable style={{height: value === 'addSection' ? hp(65) : value === 'Media' ? hp(35) : value === 'Projects' ? hp(55) : hp(0), width: wp(100)}}>
      <Animated.View style={[styles.bottomSheet, {transform: [{translateY: slide}]}]}>
            {value === 'addSection' ? <SelectSections closeModal={closeModal} /> :
            value === 'Projects' ? <AddProjects /> :
            value === 'Experiences' ? <AddExperience />  :
            value === 'Media' ? <AddMedia /> :
            value === 'Skills' ? <AddSkills /> :
            value === 'Certifications' ? <AddCertifications /> :
            value === 'Education' ? <AddEducation /> :
            null}
      </Animated.View>
      </Pressable>
    </Pressable>
  )
} 

export default BottomSheetComponent

const styles = StyleSheet.create({
    backdrop:{
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: wp(100),
        height: hp(100),
        zIndex: 100,
        justifyContent: 'flex-end'
    },
    bottomSheet:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        zIndex: 1000
    }
})