import { BASE_IMAGE_INSTRUCTIONS, SINGLE_FURNITURE_INSTRUCTIONS } from '../utils/constants';

/**
 * Build a premium prompt for a single furniture item from the set
 * @param {Object} data - Furniture data
 * @param {Object} furnitureItem - Individual furniture item
 * @returns {string} Complete prompt
 */
function buildSingleItemPrompt(data, furnitureItem) {
  const { name, quantity } = furnitureItem;
  const { style, material, primaryColor, secondaryColor, specialInstructions } = data;

  let prompt = `Create a premium, high-end ${name} `;
  
  if (quantity > 1) {
    prompt += `(set of ${quantity}) `;
  }
  
  prompt += `in ${style} style. `;
  prompt += `Material: ${material}. `;
  prompt += `Primary color: ${primaryColor}. `;
  
  if (secondaryColor) {
    prompt += `Secondary accent color: ${secondaryColor}. `;
  }
  
  prompt += `This is a luxury furniture piece with exceptional craftsmanship, `;
  prompt += `attention to detail, and premium build quality. `;
  
  if (specialInstructions) {
    prompt += `Special design requirements: ${specialInstructions}. `;
  }

  prompt += `\n\nIMAGE REQUIREMENTS:\n`;
  prompt += BASE_IMAGE_INSTRUCTIONS;
  prompt += SINGLE_FURNITURE_INSTRUCTIONS;
  
  return prompt;
}

/**
 * Build prompts for ALL furniture items in the set (one per item)
 * @param {Object} data - Complete furniture set data
 * @returns {Object[]} Array of { name, prompt } objects
 */
export function buildFurnitureSetPrompt(data) {
  const { selectedItems } = data;
  
  return selectedItems.map(item => ({
    name: item.name,
    prompt: buildSingleItemPrompt(data, item)
  }));
}
