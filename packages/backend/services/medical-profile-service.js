import { MedicalProfileModel } from '../models/MedicalProfile';

export const saveMedicalProfile = async (newMedicalProfile) => {
  const newMedicalProfile = new MedicalProfileModel(newMedicalProfile);
  return newMedicalProfile.save();
};
