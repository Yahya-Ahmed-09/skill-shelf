import { LOAD_USER_DATA_ERROR, LOAD_USER_DATA_SUCCESS } from "../ReduxConstants";

const initialState = {
    userData: null,
    error: null,
}

const loadUserDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload
            }

        case LOAD_USER_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export default loadUserDataReducer