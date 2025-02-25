import OpenAI from 'openai';
import dotenv from 'dotenv';
import { BlobServiceClient } from '@azure/storage-blob';
import fetch from 'node-fetch';

dotenv.config();

const enableOpenAIImageGeneration = process.env.ENABLE_OPEN_AI_IMAGE_GENERATION;

let DEFAULT_DUMMY_IMAGE =
  'https://fastly.picsum.photos/id/351/256/256.jpg?hmac=wN6itJBDfhm194aAZX8DvoyiJ9xLURGjIqL0x6Rmdoo';

const openai = new OpenAI({
  organization: process.env.OPEN_AI_ORG_KEY,
  project: process.env.OPEN_AI_PROJ_KEY,
  apiKey: process.env.OPEN_AI_API_KEY,
});

const MODEL = process.env.OPEN_AI_MODEL; //dont change this

/**
 * Function to generate an image using OpenAI's DALL-E model and upload it to Azure Blob Storage.
 * @param {string} prompt - The text prompt for generating the image.
 * @returns {string} - URL of the uploaded image in Azure Blob Storage.
 */
async function OpenAIImageGenerator(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-2', //dont change this
      prompt: prompt,
      n: 1,
      size: '256x256',
    });

    const image_url = response.data[0].url;

    // Fetch the image from the returned URL
    const res = await fetch(image_url);
    if (!res.ok) {
      throw new Error(`Failed to fetch image from OpenAI: ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Instantiate the BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to the container
    const containerClient =
      blobServiceClient.getContainerClient('welleatcoverimg');

    // Generate a unique name for the blob (e.g., timestamp + something descriptive)
    const blobName = `${Date.now()}-generated.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the buffer to the blob
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: 'image/png' },
    });

    // Return the URL of the uploaded blob
    const url = blockBlobClient.url;

    return url;
  } catch (error) {
    throw new Error(`Error in OpenAIImageGenerator: ${error.message}`);
  }
}

/**
 * Function to analyze a product based on its ingredients list.
 * @param {string} url - URL of the image containing the ingredients list.
 * @returns {object} - Extracted product information in JSON format.
 */
export async function OpenAIAnalyse(url) {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are an AI assistant that extracts product information from an ingredients list. Provide the output strictly in JSON format using this schema:
              {
                "name": String,          // e.g., "Almond Milk"
                "brand": String,         // e.g., "Brand Name"
                "category": String,      // e.g., "Dairy Alternative"
                "nutritionalScore": Number, // A score out of 10
                "ingredients": [String], // List of ingredients
                "pros": [String],        // Advantages of the ingredients
                "cons": [String]         // Disadvantages of the ingredients
              } Important: Do not include any markdown formatting, code fences, or comments. Only output the JSON object.`,
            },
            {
              type: 'image_url',
              image_url: { url: url },
            },
          ],
        },
      ],
      max_completion_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content);

    //Generate Images
    if (enableOpenAIImageGeneration === 'true') {
      let result_img = await OpenAIImageGenerator(
        `Generate an image of the product ${result.name}`
      );

      return {
        ...result,
        coverImg: result_img,
      };
    }

    return { ...result, coverImg: DEFAULT_DUMMY_IMAGE };
  } catch (error) {
    throw new Error('Error in OpenAIAnalyse : ', error);
  }
}

export async function OpenAIRecipeRecommendationGeneration(
  fitnessGoal = '',
  allergies = [],
  ailments = [],
  dietaryPreferences = []
) {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are a culinary and nutrition AI assistant. Given a "Medical Profile" with a fitness goal, allergies, previous ailments, and dietary preferences, produce 5 recipes that align with the provided constraints.

              Fitness Goal: ${fitnessGoal}
              Allergies: ${allergies.join(', ')}
              Previous Ailments: ${ailments.join(', ')}
              Dietary Preferences: ${dietaryPreferences.join(', ')}
  
              Provide the output strictly in JSON format using this schema:
              {
                "name": String,
                "instructions": [String],
                "difficultyLevel": String,
                "prepTime": String,
                "calories": String;
                "nutritionalInfo": {
                  carbs: String,
                  protein: String,
                  fat: String,
                  fiber: String,
                };
                "servings": String;
                "ingredients": [String] // top 5 essential ingredients
              }
              Important: Do not include any markdown formatting, code fences, or comments. Only output the JSON Array of Objects.`,
            },
          ],
        },
      ],
      max_completion_tokens: 1200,
    });

    const result = JSON.parse(response.choices[0].message.content);

    let finalResult = result;
    //Generate Images
    if (enableOpenAIImageGeneration === 'true') {
      finalResult = await Promise.all(
        result.map(async (re) => {
          let result_img = await OpenAIImageGenerator(
            `Generate an image of the recipe ${re.name}`
          );
          return {
            ...re,
            coverImg: result_img,
          };
        })
      );
    } else {
      finalResult = result.map((re) => {
        return {
          ...re,
          coverImg: DEFAULT_DUMMY_IMAGE,
        };
      });
    }

    return await finalResult;
  } catch (error) {
    throw new Error('Error in OpenAIRecipeRecommendationGeneration: ', error);
  }
}
