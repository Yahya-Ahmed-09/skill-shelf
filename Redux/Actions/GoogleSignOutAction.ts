import auth  from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Dispatch } from "redux";
import { SIGN_OUT_ERROR, SIGN_OUT_SUCCESS } from "../ReduxConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const googleSignOut = (): any => async(dispatch: Dispatch)=>{
    try {
       // Clear the user's uid from AsyncStorage
       await AsyncStorage.removeItem('user'); 
        dispatch({
          type: SIGN_OUT_SUCCESS,
        });
        console.log('signout');
      } catch (error: any) {
        console.error(error);
        dispatch({
          type: SIGN_OUT_ERROR,
          payload: error.message,
        });
      }

      
}