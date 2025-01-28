import { Dispatch } from "redux";
import { BOTTOM_SHEET_STATUS } from "../ReduxConstants";

export const bottomSheetStatus = (status:boolean, value:string | null = null): any => async(dispatch: Dispatch)=>{
    dispatch({
        type: BOTTOM_SHEET_STATUS,
        payload: {status, value}
    })
}