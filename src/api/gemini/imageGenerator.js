// File Location: src/api/gemini.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 1. Single Image Generator (Pollinations AI + Base64)
 */
export async function generateImages(prompt) {
  try {
    const searchPrompt = prompt || "modern luxury furniture";
    const uniqueSeed = Math.floor(Math.random() * 999999) + Date.now();

    // Strict clean prompt so we get real photorealistic furniture, absolutely NO abstract shapes or green colors
    const cleanPrompt = `${searchPrompt}, photorealistic product design, high-end luxury furniture catalog, realistic studio lighting, clean solid background, 3d render style, strictly no green, 8k resolution`;

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=800&height=800&nologo=true&seed=${uniqueSeed}`;

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Image download failed");

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Returns "data:image/jpeg;base64,..."
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error("Single image generation error:", error);
    // Safe Unsplash fallback if everything fails
    return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800";
  }
}

/**
 * 2. Multiple Image Generator (Specifically formatted to return an array of Base64 images)
 */
export async function generateMultipleImages(promptObjects) {
  try {
    const results = [];

    for (let i = 0; i < promptObjects.length; i++) {
      const itemObj = promptObjects[i];
      const itemName = itemObj && typeof itemObj === 'object' ? (itemObj.name || `Item ${i + 1}`) : "Furniture Item";
      const itemPrompt = itemObj && typeof itemObj === 'object' ? itemObj.prompt : itemObj;

      console.log(`Generating unique base64 for ${itemName}`);

      try {
        const base64Data = await generateImages(itemPrompt);
        results.push({
          name: itemName,
          images: [base64Data] // Wrapped in array to match exactly what frontend expects
        });
      } catch (err) {
        console.error(`Failed to generate ${itemName}:`, err);
        results.push({
          name: itemName,
          images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"]
        });
      }

      if (i < promptObjects.length - 1) {
        await delay(800); // 800ms delay to keep requests safe
      }
    }

    return results;
  } catch (error) {
    console.error("Batch image generation failed entirely:", error);
    return promptObjects.map((itemObj, idx) => ({
      name: itemObj && typeof itemObj === 'object' ? itemObj.name : `Item ${idx + 1}`,
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"]
    }));
  }
}