import { BASE_IMAGE_INSTRUCTIONS, ROOM_SCENE_INSTRUCTIONS } from '../utils/constants';

/**
 * Build a premium prompt for a complete room scene
 * @param {Object} data - Room generation data
 * @returns {string} Complete prompt
 */
export function buildRoomPrompt(data) {
  const { 
    roomType, 
    selectedItems, 
    style, 
    material, 
    primaryColor, 
    secondaryColor, 
    specialInstructions,
    roomSize,
    lightingPreference
  } = data;

  let prompt = `Create a luxury ${roomType} interior design scene in ${style} style. `;
  
  if (roomSize) {
    prompt += `Room size: ${roomSize}. `;
  }

  prompt += `\n\nFURNITURE IN THE ROOM:\n`;
  selectedItems.forEach((item, index) => {
    prompt += `${index + 1}. ${item.name}`;
    if (item.quantity && item.quantity > 1) {
      prompt += ` (x${item.quantity})`;
    }
    prompt += `\n`;
  });

  prompt += `\nDESIGN SPECIFICATIONS:\n`;
  prompt += `- All furniture must match in ${style} style\n`;
  prompt += `- Primary material: ${material}\n`;
  prompt += `- Primary color palette: ${primaryColor}\n`;
  
  if (secondaryColor) {
    prompt += `- Secondary accent color: ${secondaryColor}\n`;
  }
  
  if (lightingPreference) {
    prompt += `- Lighting: ${lightingPreference}\n`;
  }

  prompt += `- Cohesive design with consistent aesthetic across all pieces\n`;
  prompt += `- Professional interior design layout with natural furniture arrangement\n`;
  prompt += `- Proper spacing and flow between furniture items\n`;
  prompt += `- Luxury, high-end feel with premium materials and finishes\n`;

  if (specialInstructions) {
    prompt += `\nSPECIAL REQUIREMENTS:\n${specialInstructions}\n`;
  }

  prompt += `\n\nIMAGE REQUIREMENTS:\n`;
  prompt += BASE_IMAGE_INSTRUCTIONS;
  prompt += ROOM_SCENE_INSTRUCTIONS;
  
  return prompt;
}
