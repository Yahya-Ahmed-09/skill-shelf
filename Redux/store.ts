import {configureStore} from '@reduxjs/toolkit'
import RootReducer from './RootReducer'

const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            thunk: true
        })
})

export default store

