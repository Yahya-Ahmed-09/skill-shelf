import { LOAD_SECTION_DATA_ERROR, LOAD_SECTION_DATA_SUCCESS } from "../ReduxConstants";

const initialState = {
    sectionData: null,
    error: null
}

const loadSectionDataReducer = (state = initialState, action:any) => {
    switch(action.type){
        case LOAD_SECTION_DATA_SUCCESS:
            return {
                ...state,
                sectionData: action.payload,
            }
        case LOAD_SECTION_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default loadSectionDataReducer;