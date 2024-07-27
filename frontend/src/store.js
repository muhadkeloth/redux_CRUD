import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import adminReducer from './slices/adminSlice';
import {apiSlice} from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth:authReducer,
        admin: adminReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;