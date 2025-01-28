import { BOTTOM_SHEET_STATUS } from "../ReduxConstants";

const initialState = {
    status: false,
    value: null
}

const setBottomSheetStatus = (state = initialState, action: any) => {
    switch (action.type) {
        case BOTTOM_SHEET_STATUS:
            return {
                ...state,
                status: action.payload.status,
                value: action.payload.value
            }
        default:
            return state
    }
}

export default setBottomSheetStatus