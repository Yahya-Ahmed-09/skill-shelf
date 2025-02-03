import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/Redux/store";
import { loadUserData } from '@/Redux/Actions/LoadUserDataAction';
import { loadSectionData } from '@/Redux/Actions/loadSectionDataAction';

SplashScreen.preventAutoHideAsync();

const MainRootLayout = () => {
    const dispatch = useDispatch()
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const {sectionData} = useSelector((state:any)=>state.loadSectionData);
    const {userData} = useSelector((state:any)=>state.loadUserData);
    const [loaded, error] = useFonts({
        'monitoricaReg': require('../assets/fonts/monitoricaRg.ttf'),
        'monitoricaBold': require('../assets/fonts/monitoricaBd.ttf'),
        'poetsen': require('../assets/fonts/poetsenOne.ttf'),
        'montserratMed': require('../assets/fonts/Montserrat-Medium.ttf'),
        'montserratBold': require('../assets/fonts/Montserrat-Bold.ttf'),
      })
      useEffect(() => {
        const fetchUserData = async () => {
          await dispatch(loadUserData());
          await dispatch(loadSectionData())
          setIsDataLoaded(true);
        };
        fetchUserData();

        
      }, [dispatch]);
      useEffect(() => {
        if (loaded || error || isDataLoaded) {
            if(isDataLoaded){
                SplashScreen.hideAsync();
            }
        }
      }, [loaded, error, isDataLoaded]);
    
      if (!loaded && !error && !isDataLoaded) {
        return null;
      }
  return (
    <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="OnBoardingSetup" />
      </Stack>
  )
}

export default MainRootLayout

const styles = StyleSheet.create({})