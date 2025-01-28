import { combineReducers } from "redux";
import authReducer from "./Reducers/GoogleSignUpReducer";
import loadUserDataReducer from "./Reducers/LoadUserDataReducer";
import setBottomSheetStatus from "./Reducers/BottomSheetStatusReducer";
import loadSectionDataReducer from "./Reducers/LoadSectionDataReducer";
 

export default combineReducers({
    auth: authReducer,
    loadUserData: loadUserDataReducer,
    bottomSheetStatus: setBottomSheetStatus,
    loadSectionData: loadSectionDataReducer
})