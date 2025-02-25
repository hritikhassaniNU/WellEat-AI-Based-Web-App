import {UserModel} from '../models/User.js';

export const saveUser = async (newUser) => {
    const user = new UserModel(newUser);
    // const user = await newUser.save();
    return user.save();
}
