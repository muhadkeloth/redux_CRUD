import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/',
    prepareHeaders:(headers,{getState})=>{
        const {auth}=getState();
        const userToken = auth?.userInfo?.token;
        const  adminToken = auth?.adminInfo?.token;
        const token = adminToken || userToken;
        
        if(token){
            headers.set('Authorization',`Bearer ${token}`);
        }
        console.log('tolen',token,'adminToken',auth)



        // if (headers.get('Is-Admin')) {
        //   console.log('adminif')
        //     if (adminToken) {
        //       headers.set('Authorization', `Bearer ${adminToken}`);
        //     }
        //   } else {
        //     if (userToken) {
        //       headers.set('Authorization', `Bearer ${userToken}`);
        //     }
        //   }

      //   console.log('Is-Admin header:', headers.get('Is-Admin'));

      //   if (!headers.has('Authorization') && userToken) {
      //     headers.set('Authorization', `Bearer ${userToken}`);
      //   }
        
      //   // Handle admin token
      //   if (headers.get('Is-Admin') && adminToken) {
      //   console.log('adminif')
      //     headers.set('Authorization', `Bearer ${adminToken}`);
      // }

        return headers;
    }
 });

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder) => ({})
})
