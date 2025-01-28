import { Dispatch } from "redux";
import { LOAD_USER_DATA_ERROR, LOAD_USER_DATA_SUCCESS } from "../ReduxConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfiguration";

export const loadUserData = ():any  =>async (dispatch: Dispatch)=>{
  
    try {
        const user:any = await AsyncStorage.getItem('user')
        if (user) {
            const db = getFirestore(app);
            const userDocRef = doc(db, 'users', user);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                dispatch({
                    type: LOAD_USER_DATA_SUCCESS,
                    payload : userDoc.data()
                })
              // console.log('User data:', userDoc.data());
            } else {
              console.log('No such document!');
            }
          } else {
            console.log('No user found in AsyncStorage');
          }
  
    } catch (error:any) {
        dispatch({
            type: LOAD_USER_DATA_ERROR,
            payload: error.message
        })
    }
} 