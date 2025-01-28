import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_IN_CANCELLED, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_OUT_ERROR, SIGN_OUT_SUCCESS } from "../ReduxConstants";

const initialState = {
    user: null,
    error: null,
    cancelledSignIn: false
}
 
const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            console.log('SIGN_IN_SUCCESS action payload:', action.payload);
            console.log('Previous state:', state);
            console.log('New state:', {
                ...state,
                user: action.payload,
            });
            return {
                ...state,
                user: action.payload,
                cancelledSignIn: false,
                
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                error: action.payload
            };
            case SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case SIGN_OUT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SIGN_IN_CANCELLED:
            return{
                ...state,
                cancelledSignIn: true
            }
        default:
            return state
    }
}


export default authReducer