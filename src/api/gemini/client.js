// Google AI Studio (Gemini) API client
import { GEMINI_API_KEY, GEMINI_IMAGE_MODEL } from '../../utils/constants';

/**
 * Create a Gemini API client instance
 * @returns {Object} API client
 */
export function createGeminiClient() {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your environment variables.');
  }

  const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  return {
    /**
     * Generate images using Gemini API
     * @param {string} prompt - Image generation prompt
     * @param {Object} options - Generation options
     * @returns {Promise<Object>} API response
     */
    async generateImages(prompt, options = {}) {
      const {
        model = GEMINI_IMAGE_MODEL,
        numberOfImages = 1
      } = options;

      const url = `${baseUrl}/models/${model}:generateImages?key=${GEMINI_API_KEY}`;

      const requestBody = {
        prompt,
        numberOfImages
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error?.message ||
            `API request failed with status ${response.status}`
          );
        }

        const responseData = await response.json();

        const base64Images = [];

        if (Array.isArray(responseData?.images)) {
          for (const image of responseData.images) {
            if (image?.image) {
              base64Images.push(image.image);
            } else if (image?.bytesBase64Encoded) {
              base64Images.push(image.bytesBase64Encoded);
            }
          }
        }

        if (base64Images.length === 0) {
          return responseData;
        }

        return {
          candidates: [{
            parts: base64Images.map((data) => ({
              inlineData: {
                mimeType: 'image/png',
                data
              }
            }))
          }]
        };
      } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network error: Please check your internet connection');
        }
        throw error;
      }
    }
  };
}

// Export default client instance
export const geminiClient = createGeminiClient();
