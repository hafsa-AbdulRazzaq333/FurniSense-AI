// File Location: src/services/generationService.js

import { generateImages, generateMultipleImages } from '../api/gemini';

export const GENERATION_TYPES = {
  FURNITURE_SET: 'furnitureSet',
  SINGLE_FURNITURE: 'singleFurniture',
  ROOM: 'room'
};

/**
 * Generate furniture set images (Sofa, Bed, Wardrobe, Dresser)
 */
export async function generateFurnitureSet(data) {
  const style = data.style || "Luxury";
  const material = data.material || "Linen";
  const primaryColor = data.primaryColor || "black";
  const secondaryColor = data.secondaryColor || "white";
  const items = data.items || ['sofa', 'bed', 'wardrobe', 'dresser'];

  // Generating strict prompts using current style/color choices
  const promptObjects = items.map((item) => {
    const itemName = typeof item === 'string' ? item : (item.name || "furniture");
    return {
      name: itemName,
      prompt: `a highly detailed single professional product studio shot of a modern ${style} ${material} ${itemName} in pure elegant ${primaryColor} color, with fine ${secondaryColor} details and trim, isolated clean background, 3d render style`
    };
  });

  const results = await generateMultipleImages(promptObjects);

  // Clean normalization to ensure frontend gets the EXACT correct fields
  const normalizedResults = (results || []).map((item) => {
    const imagesArray = Array.isArray(item?.images) ? item.images : [item?.images || item];
    return {
      name: item?.name || "Furniture",
      images: imagesArray,
      image: imagesArray[0], // fallback single string property
      imageUrl: imagesArray[0] // backup property name
    };
  });

  return {
    type: GENERATION_TYPES.FURNITURE_SET,
    items: normalizedResults
  };
}

/**
 * Generate single furniture image
 */
export async function generateSingleFurniture(data) {
  const style = data.style || "Luxury";
  const material = data.material || "Linen";
  const primaryColor = data.primaryColor || "black";
  const secondaryColor = data.secondaryColor || "white";
  const item = data.item || "sofa";

  const prompt = `a highly detailed single professional product studio shot of a modern ${style} ${material} ${item} in pure elegant ${primaryColor} color, with fine ${secondaryColor} details, isolated clean background`;

  const images = await generateImages(prompt);
  const normalizedImages = Array.isArray(images) ? images : [images];

  return {
    type: GENERATION_TYPES.SINGLE_FURNITURE,
    images: normalizedImages,
    imageUrl: normalizedImages[0]
  };
}

/**
 * Generate room scene image
 */
export async function generateRoom(data) {
  const style = data.style || "Luxury";
  const primaryColor = data.primaryColor || "black";
  const secondaryColor = data.secondaryColor || "white";
  const roomType = data.roomType || "Bedroom";

  const prompt = `a luxurious, modern, highly-detailed interior design photo of a ${roomType} using ${primaryColor} and ${secondaryColor} theme furniture, architectural photography, 8k resolution`;

  const images = await generateImages(prompt);
  const normalizedImages = Array.isArray(images) ? images : [images];

  return {
    type: GENERATION_TYPES.ROOM,
    images: normalizedImages,
    imageUrl: normalizedImages[0]
  };
}

export async function generate(type, data) {
  switch (type) {
    case GENERATION_TYPES.FURNITURE_SET:
      return await generateFurnitureSet(data);
    case GENERATION_TYPES.SINGLE_FURNITURE:
      return await generateSingleFurniture(data);
    case GENERATION_TYPES.ROOM:
      return await generateRoom(data);
    default:
      throw new Error(`Unknown generation type: ${type}`);
  }
}