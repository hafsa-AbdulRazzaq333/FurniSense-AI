// Generates furniture images through our secure server-side API.
export async function generateImages(prompt) {
  try {
    const searchPrompt = prompt || "modern luxury furniture";

    const cleanPrompt = `${searchPrompt},
photorealistic product design,
high-end luxury furniture catalog,
realistic studio lighting,
clean solid background,
3D render style,
high detail,
professional furniture photography,
strictly no green,
no people,
no text,
no watermark`;

    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: cleanPrompt,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(
        data?.message || "Image generation failed."
      );

      error.code = data?.error || "IMAGE_GENERATION_FAILED";
      error.status = response.status;

      throw error;
    }

    if (!data?.image) {
      throw new Error("No image was returned by the image service.");
    }

    return data.image;
  } catch (error) {
    console.error("Single image generation error:", error);
    throw error;
  }
}


// Generates multiple requested furniture images one by one.
export async function generateMultipleImages(promptObjects) {
  const results = [];

  if (!Array.isArray(promptObjects) || promptObjects.length === 0) {
    return results;
  }

  for (let i = 0; i < promptObjects.length; i++) {
    const itemObj = promptObjects[i];

    const itemName =
      itemObj && typeof itemObj === "object"
        ? itemObj.name || `Item ${i + 1}`
        : `Furniture Item ${i + 1}`;

    const itemPrompt =
      itemObj && typeof itemObj === "object"
        ? itemObj.prompt
        : itemObj;

    try {
      console.log(`Generating image for ${itemName}...`);

      const image = await generateImages(itemPrompt);

      results.push({
        name: itemName,
        images: [image],
      });
    } catch (error) {
      console.error(`Failed to generate ${itemName}:`, error);

      // Stop the batch when the API reports a limit or service failure.
      throw error;
    }

    // Adds a short gap between image requests.
    if (i < promptObjects.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  return results;
}