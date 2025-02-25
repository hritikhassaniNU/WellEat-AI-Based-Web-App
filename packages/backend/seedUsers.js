// seedUsers.js

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('./models/User'); // Adjust the path if necessary

async function seedUsers() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas.');

    // Clear existing users
    await User.deleteMany({});
    console.log('Existing users deleted.');

    // Generate mock users
    const users = [];

    for (let i = 0; i < 10; i++) {
      const user = new User({
        UserID: faker.string.uuid(),
        LastName: faker.person.lastName(),
        FirstName: faker.person.firstName(),
        Picture: faker.image.avatar(),
        DateOfBirth: faker.date.birthdate({
          min: 1950,
          max: 2003,
          mode: 'year',
        }),
        CurrentCity: faker.location.city(),
        Country: faker.location.country(),
        State: faker.location.state(),
        FitnessGoal: {
          GoalType: faker.helpers.arrayElement([
            'Weight Loss',
            'Muscle Gain',
            'Endurance',
          ]),
          TargetDate: faker.date.future(),
        },
        // Add other fields as needed
      });

      users.push(user);
    }

    // Insert mock users into the database
    await User.insertMany(users);
    console.log('Mock users inserted into the database.');

    // Close the connection
    mongoose.connection.close();
    console.log('Connection closed.');
  } catch (err) {
    console.error('An error occurred:', err.message);
    mongoose.connection.close();
  }
}

seedUsers();
