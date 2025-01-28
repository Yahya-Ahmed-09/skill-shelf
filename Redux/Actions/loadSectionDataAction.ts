import { Dispatch } from "redux";
import { LOAD_SECTION_DATA_ERROR, LOAD_SECTION_DATA_SUCCESS, LOAD_USER_DATA_SUCCESS } from "../ReduxConstants";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfiguration";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadSectionData = ():any  =>async (dispatch: Dispatch)=>{
    try {
        const user:any = await AsyncStorage.getItem('user')
        if (user) {
            const db = getFirestore(app);
            const userDocRef = doc(db, 'Section-Data', user);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                dispatch({
                    type: LOAD_SECTION_DATA_SUCCESS,
                    payload : userDoc.data()
                })
              // console.log('Section data:', userDoc.data());
            } else {
              console.log('No such document!');
            }
          } else {
            console.log('No user found in AsyncStorage');
          }
  
    } catch (error:any) {
        dispatch({
            type: LOAD_SECTION_DATA_ERROR,
            payload: error.message
        })
    }
}