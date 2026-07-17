// Image utility functions

/**
 * Convert base64 image to Blob
 * @param {string} base64 - Base64 encoded image
 * @param {string} mimeType - MIME type (default: image/png)
 * @returns {Blob} Blob object
 */
export function base64ToBlob(base64, mimeType = 'image/png') {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

/**
 * Create object URL from base64 image
 * @param {string} base64 - Base64 encoded image
 * @param {string} mimeType - MIME type
 * @returns {string} Object URL
 */
export function base64ToObjectURL(base64, mimeType = 'image/png') {
  const blob = base64ToBlob(base64, mimeType);
  return URL.createObjectURL(blob);
}

/**
 * Revoke object URL to free memory
 * @param {string} url - Object URL to revoke
 */
export function revokeObjectURL(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

/**
 * Extract base64 data from response
 * @param {Object} response - Gemini API response
 * @returns {string[]} Array of base64 images
 */
export function extractBase64Images(response) {
  const images = [];
  
  if (response?.candidates) {
    for (const candidate of response.candidates) {
      if (candidate?.parts) {
        for (const part of candidate.parts) {
          if (part?.inlineData?.data) {
            images.push(part.inlineData.data);
          }
        }
      }
    }
  }
  
  return images;
}

/**
 * Convert base64 images to object URLs
 * @param {string[]} base64Images - Array of base64 images
 * @returns {string[]} Array of object URLs
 */
export function convertToObjectURLs(base64Images) {
  return base64Images.map(base64 => {
    return `data:image/png;base64,${base64}`;
  });
}
