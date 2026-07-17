import { useState, useCallback } from 'react';
import { generate, GENERATION_TYPES } from '../services/generationService';

/**
 * Custom hook for managing image generation state
 * @returns {Object} Hook interface
 */
export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Start image generation
   * @param {string} type - Generation type
   * @param {Object} data - Generation data
   */
  const generateImages = useCallback(async (type, data) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedResult(null);

    try {
      const result = await generate(type, data);
      setGeneratedResult(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred during generation';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Reset generation state
   */
  const reset = useCallback(() => {
    setIsGenerating(false);
    setGeneratedResult(null);
    setError(null);
  }, []);

  return {
    isGenerating,
    generatedResult,
    error,
    generate: generateImages,
    reset,
    GENERATION_TYPES
  };
}
