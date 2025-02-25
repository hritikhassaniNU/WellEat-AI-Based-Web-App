import { UserModel as User } from '../models/User.js';
import { UserListModel as UserList } from '../models/UserList.js';
import { DietaryPreferenceModel as DietaryList } from '../models/DietaryPreference.js';
import { GroceryItemModel as GroceryItem } from '../models/GroceryItem.js';
import { BlobServiceClient } from '@azure/storage-blob';
import { OpenAIAnalyse } from '../services/openai_service.js';

// Get a list of all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-Password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-Password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    ).select('-Password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    // Instantiate BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to the container
    const containerClient =
      blobServiceClient.getContainerClient('welleatprofile');

    // Generate a unique name for the blob
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload data to the blob
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    // Get the URL of the uploaded blob
    const url = blockBlobClient.url;

    await User.findByIdAndUpdate(
      req.params.userId,
      {
        picture: url,
      },
      { new: true }
    ).select('-Password');

    // Respond with the URL
    res.json({ url });
  } catch (error) {
    console.error('Error uploading to Azure Blob Storage:', error);
    res.status(500).send('Error uploading image');
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's medical profile
export const getMedicalProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      'medicalProfile'
    );
    res.json(user.medicalProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user's medical profile
export const updateMedicalProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.medicalProfile = req.body;
    await user.save();
    res.json(user.medicalProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's dietary preferences
export const getDietaryPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      'dietaryPreferences'
    );
    res.json(user.dietaryPreferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a dietary preference
export const addDietaryPreference = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    //
    const dietaryPreferencesData = req.body;
    const dietaryPreferences = new DietaryList(dietaryPreferencesData);
    await dietaryPreferences.save();
    user.dietaryPreferences.push(req.body);
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//TODO
// Delete a dietary preference
export const deleteDietaryPreference = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.dietaryPreferences.id(req.params.preferenceId).remove();
    await user.save();
    res
      .status(204)
      .json({ message: 'Dietary preference deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's lists
export const getUserLists = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.userLists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user list
export const createUserList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //TODO: Refer this
    const userListData = req.body;
    const userList = new UserList(userListData);
    await userList.save();

    user.userLists.push(req.body);
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markUserListAsFavorite = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the list within the user's lists
    const list = user.userLists.id(req.params.listId);

    // Check if the list exists
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Toggle the isFavorite flag
    list.isFavorite = !list.isFavorite;

    // Save the updated user
    await user.save();

    // Return the updated list
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific user list
export const getUserListById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('userLists');
    const userList = user.userLists.id(req.params.listId);
    if (!userList) return res.status(404).json({ message: 'List not found' });
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//TODO
// Delete a user list
export const deleteUserListById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.userLists.pull({ _id: req.params.listId });

    await user.save();
    res.status(204).json({ message: 'User list deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get grocery items in a user list
export const getGroceryItemsInList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('userLists');
    const userList = user.userLists.id(req.params.listId);
    if (!userList) return res.status(404).json({ message: 'List not found' });
    res.json(userList.groceryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a grocery item to a user list
export const addGroceryItemToList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userList = user.userLists.id(req.params.listId);
    if (!userList) return res.status(404).json({ message: 'List not found' });
    const groceryItem = new GroceryItem(req.body);
    await groceryItem.save();
    userList.groceryItems.push(req.body);
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Analyze a grocery item from an image
export const analyzeGroceryItemFromImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    // Instantiate BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to the container
    const containerClient =
      blobServiceClient.getContainerClient('welleatanalyze');

    // Generate a unique name for the blob
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    const url = blockBlobClient.url;

    const result = await OpenAIAnalyse(url);

    const analyzedData = {
      ...result,
      ingredientImg: url,
    };

    // **Find the user in the database**
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send('User not found.');
      return;
    }

    // **Get today's date without time**
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // **Find or create the userList for today**
    let userList = user.userLists.find((list) => {
      const listDate = new Date(list.createdDate);
      listDate.setHours(0, 0, 0, 0);
      return listDate.getTime() === today.getTime();
    });

    if (!userList) {
      userList = {
        name: 'My Shopping List',
        groceryItems: [],
        createdDate: new Date(),
      };
      userList.groceryItems.push(analyzedData);
      user.userLists.push(userList);
    } else {
      userList.groceryItems.push(analyzedData);
    }

    // **Add the analyzed item to the groceryItems array**

    // **Save the updated user document**
    await user.save();

    res.status(201).json({ analyzedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
