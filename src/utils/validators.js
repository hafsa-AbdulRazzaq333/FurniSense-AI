// Validation functions for AI generation requests

/**
 * Validate furniture set generation data
 * @param {Object} data - Generation data
 * @returns {Object} Validation result { isValid, errors }
 */
export function validateFurnitureSetData(data) {
  const errors = [];

  if (!data.selectedItems || !Array.isArray(data.selectedItems) || data.selectedItems.length === 0) {
    errors.push('Please select at least one furniture item');
  }

  if (!data.style) {
    errors.push('Please select a design style');
  }

  if (!data.material) {
    errors.push('Please select a material');
  }

  if (!data.primaryColor) {
    errors.push('Please select a primary color');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate single furniture generation data
 * @param {Object} data - Generation data
 * @returns {Object} Validation result { isValid, errors }
 */
export function validateSingleFurnitureData(data) {
  const errors = [];

  if (!data.furnitureType) {
    errors.push('Please select a furniture type');
  }

  if (!data.style) {
    errors.push('Please select a design style');
  }

  if (!data.material) {
    errors.push('Please select a material');
  }

  if (!data.primaryColor) {
    errors.push('Please select a primary color');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate room generator data
 * @param {Object} data - Generation data
 * @returns {Object} Validation result { isValid, errors }
 */
export function validateRoomData(data) {
  const errors = [];

  if (!data.selectedItems || !Array.isArray(data.selectedItems) || data.selectedItems.length === 0) {
    errors.push('Please select at least one furniture item for the room');
  }

  if (!data.roomType) {
    errors.push('Please select a room type');
  }

  if (!data.style) {
    errors.push('Please select a design style');
  }

  if (!data.material) {
    errors.push('Please select a material');
  }

  if (!data.primaryColor) {
    errors.push('Please select a primary color');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate API key presence
 * @param {string} apiKey - API key to validate
 * @returns {boolean} True if valid
 */
export function validateApiKey(apiKey) {
  return typeof apiKey === 'string' && apiKey.trim().length > 0;
}

/**
 * Validate prompt string
 * @param {string} prompt - Prompt to validate
 * @returns {boolean} True if valid
 */
export function validatePrompt(prompt) {
  return typeof prompt === 'string' && prompt.trim().length >= 10;
}
