import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: state.users.length + 1 });
    },
    editUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    }
  }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
