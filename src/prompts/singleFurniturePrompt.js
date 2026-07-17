import { BASE_IMAGE_INSTRUCTIONS, SINGLE_FURNITURE_INSTRUCTIONS } from '../utils/constants';

/**
 * Build a premium prompt for a single furniture item
 * @param {Object} data - Generation data
 * @returns {string} Complete prompt
 */
export function buildSingleFurniturePrompt(data) {
  const { 
    furnitureType, 
    style, 
    material, 
    primaryColor, 
    secondaryColor, 
    specialInstructions,
    dimensions,
    description
  } = data;

  let prompt = `Create a premium, high-end ${furnitureType} `;
  prompt += `in ${style} style. `;
  prompt += `Material: ${material}. `;
  prompt += `Primary color: ${primaryColor}. `;
  
  if (secondaryColor) {
    prompt += `Secondary accent color: ${secondaryColor}. `;
  }
  
  if (dimensions) {
    prompt += `Approximate dimensions: ${dimensions}. `;
  }
  
  if (description) {
    prompt += `Additional details: ${description}. `;
  }
  
  prompt += `This is a luxury furniture piece with exceptional craftsmanship, `;
  prompt += `attention to detail, ergonomic design, and premium build quality. `;
  
  if (specialInstructions) {
    prompt += `Special design requirements: ${specialInstructions}. `;
  }

  prompt += `\n\nIMAGE REQUIREMENTS:\n`;
  prompt += BASE_IMAGE_INSTRUCTIONS;
  prompt += SINGLE_FURNITURE_INSTRUCTIONS;
  
  return prompt;
}
