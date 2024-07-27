import { createSlice } from '@reduxjs/toolkit';
import { adminApiSlice } from './adminApiSlice';


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users:[],
    userToEdit: null,
    // other initial state
  },
  reducers: {
    setUserToEdit: (state, action) => {
      state.userToEdit = action.payload;
    },
    clearUserToEdit: (state) => {
      state.userToEdit = null;
    },
    setUsers(state, action) { 
      state.users = action.payload;
    },
    addUser(state, action) { 
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      adminApiSlice.endpoints.getUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      }
    );
  }
});

export const { setUserToEdit, clearUserToEdit, setUsers, addUser  } = adminSlice.actions;

export default adminSlice.reducer;
