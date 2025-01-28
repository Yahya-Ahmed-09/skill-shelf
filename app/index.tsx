import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfiguration";
import { loadUserData } from "@/Redux/Actions/LoadUserDataAction";


export default function Index() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const [checkOnBordScreen, setCheckOnBordScreen] = useState<boolean | null>(null)
  

  const dispatch = useDispatch()
  const loadStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  };
  const loadOnBoardingScreen = async()=>{
    const screen  = await AsyncStorage.getItem('steps')
    if(screen !== null){
      setCheckOnBordScreen(true)
    }else{
      false
    }
  }


  useEffect(()=>{

    loadStorage();
    loadOnBoardingScreen()
  },[])




  return (
    <View>
      {userLoggedIn !== null && (
        <Redirect href={userLoggedIn ? checkOnBordScreen ? '/OnBoardingSetup' : '/(tabs)' : '/SignUp'} />
      )}
    </View>
  );
}
