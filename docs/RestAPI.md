## 1. /users

```
GET: Get a list of all users
POST: Create a new user
```

## 2. /users/{userId}

```
GET: Get a user by ID
PUT: Update a user by ID
DELETE: Delete a user by ID
```

## 3. /users/{userId}/medical-profile

```
GET: Get user's medical profile
PUT: Update user's medical profile
```

## 4. /users/{userId}/dietary-preferences

```
GET: Get user's dietary preferences
POST: Add a dietary preference
```

## 5. /users/{userId}/dietary-preferences/{preferenceId}

```
DELETE: Delete a dietary preference
```

## 6. /users/{userId}/user-lists

```
GET: Get user's lists
POST: Create a new user list
```

## 7. /users/{userId}/user-lists/{listId}

```
GET: Get a specific user list
DELETE: Delete a user list
```

## 8. /users/{userId}/user-lists/{listId}/grocery-items

```
GET: Get grocery items in a user list
POST: Add a grocery item to a user list
```

## 9. /users/{userId}/recommendations

```
GET: Get user's recommendations
POST: Create a new recommendation
```

## 10. /users/{userId}/recommendations/{recommendationId}

```
GET: Get a recommendation by ID
DELETE: Delete a recommendation
```

## 11. /grocery-items

```
GET: Get all grocery items
```

## 12. /grocery-items/{itemId}

```
GET: Get a grocery item by ID
DELETE: Delete a grocery item
```

## 13. /recipes

```
GET: Get all recipes
POST: Create a new recipe
```

## 14. /recipes/{recipeId}

```
GET: Get a recipe by ID
PUT: Update a recipe by ID
DELETE: Delete a recipe
```

## 15. /users/{userId}/grocery-items/analyze

```
POST: Create a new grocery items and add it to the user list
```
