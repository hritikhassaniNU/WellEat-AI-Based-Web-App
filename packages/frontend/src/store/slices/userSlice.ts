import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  height: string;
  country: string;
  state: string;
  currentCity: string;
  dietaryPreferences: string[];
  allergies: string[];
  fitnessGoals: string;
  picture: string;
  language: 'en' | 'chn';
}

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  height: '',
  country: '',
  state: '',
  currentCity: '',
  dietaryPreferences: [],
  allergies: [],
  fitnessGoals: '',
  picture: '',
  language: 'en',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.height = action.payload.height;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.currentCity = action.payload.currentCity;
      state.dietaryPreferences = action.payload.dietaryPreferences;
      state.allergies = action.payload.allergies;
      state.fitnessGoals = action.payload.fitnessGoals;
      state.picture = action.payload.picture;
    },
    updateProfilePicture(state, action) {
      state.picture = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const {
  setUserDetails: setUserDetailsDispatchFn,
  updateProfilePicture: updateProfilePictureDispatchFn,
  setLanguage: setLanguageDispatchFn,
} = userSlice.actions;

export default userSlice.reducer;
