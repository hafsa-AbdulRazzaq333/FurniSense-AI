// Configuration constants for the AI Furniture Generator
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002';
export const MAX_GENERATION_ATTEMPTS = 3;

// Default generation quality settings
export const DEFAULT_QUALITY = 'ultra';
export const DEFAULT_STYLE = 'photorealistic';

// Image generation instructions
export const BASE_IMAGE_INSTRUCTIONS = `
- Ultra realistic, 8K resolution, photorealistic
- Professional studio lighting
- Premium materials and textures
- Pinterest-quality, interior design magazine worthy
- Modern composition
- No watermark, no logo, no text, no people
`;

export const SINGLE_FURNITURE_INSTRUCTIONS = `
- Isolated furniture item only
- Clean white background
- Product photography style
- Multiple angles visible if applicable
- Perfect for furniture catalog
`;

export const ROOM_SCENE_INSTRUCTIONS = `
- Complete room scene with natural environment
- Professional interior design layout
- Natural daylight or warm ambient lighting
- Realistic shadows and reflections
- Cozy, inviting atmosphere
- Furniture arranged naturally with proper spacing
`;

// Furniture type map for consistent naming
export const FURNITURE_TYPES = {
  sofa: 'Sofa',
  armchair: 'Armchair',
  coffeeTable: 'Coffee Table',
  sideTable: 'Side Table',
  diningTable: 'Dining Table',
  chairs: 'Chairs',
  bed: 'Bed',
  nightstand: 'Nightstand',
  bookshelf: 'Bookshelf',
  tvStand: 'TV Stand',
  lamp: 'Lamp',
  rug: 'Rug',
};
