import { configureStore } from '@reduxjs/toolkit'
import authUser from './authSlice'
import category from './categorySlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const authUserConfig = {
    key: 'authUser',
    storage,
    stateReconciler: hardSet,
}

export const store = configureStore({
    reducer: {
        authenUser: persistReducer(authUserConfig,authUser),
        category: category,
    },
})

export const persistor = persistStore(store)