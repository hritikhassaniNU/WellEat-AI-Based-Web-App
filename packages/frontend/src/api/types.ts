export interface FitnessGoal {
  goalType: string;
  targetDate: Date;
}

export interface MedicalProfile {
  allergies: string[];
  previousAilments: string[];
}

export interface DietaryPreference {
  foodPreferences: string[];
}

export interface GroceryItem {
  name: string;
  brand: string;
  category: string;
  nutritionalScore: Number;
  ingredients: string[];
  pros: string[];
  cons: string[];
  ingredientImg: string;
  coverImg: string;
}

export interface Recipe {
  _id: string;
  name: string;
  instructions: string[];
  difficultyLevel: string;
  prepTime: string;
  calories: string;
  nutritionalInfo: {
    carbs: string;
    protein: string;
    fat: string;
    fiber: string;
  };
  servings: string;
  ingredients: string[];
  coverImg: string;
}

export interface UserList {
  _id: string;
  name: string;
  groceryItems: GroceryItem[];
  createdDate: Date;
  isFavorite: boolean;
}

export interface Recommendation {
  _id: string;
  type: string;
  recipe: Recipe;
  groceryItem: GroceryItem;
  isFavorite: boolean;
}

export interface User {
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  picture?: string;
  phone?: string;
  dateOfBirth?: string;
  currentCity?: string;
  country?: string;
  state?: string;
  fitnessGoal?: FitnessGoal;
  medicalProfile?: MedicalProfile;
  dietaryPreferences?: string[]; //changed this to string array
  userLists?: UserList[];
  recommendations?: Recommendation[];
}
