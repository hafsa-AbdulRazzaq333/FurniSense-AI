
/**
 * Download an image from a data URL or base64 string
 * @param {string} imageUrl - Image URL or data URL
 * @param {string} filename - Desired filename (without extension)
 */
export const downloadImage = async (imageUrl, filename = "furniture-design") => {
    try {
        const link = document.createElement("a");
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase();

        if (imageUrl.startsWith("data:image/svg+xml")) {
            link.href = imageUrl;
            link.download = `${sanitizedFilename}.svg`;
        } else {
            link.href = imageUrl;
            link.download = `${sanitizedFilename}.png`;
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return true;
    } catch (error) {
        console.error("Download failed:", error);
        throw new Error("Failed to download image");
    }
};

/**
 * Download all images from a furniture set
 * @param {Array} furnitureSetItems - Array of {name, images} objects
 */
export const downloadFurnitureSet = async (furnitureSetItems) => {
    for (const item of furnitureSetItems) {
        if (item.images && item.images.length > 0) {
            // Download first image for each furniture item
            await downloadImage(item.images[0], item.name);
            // Small delay to prevent browser issues
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }
};

/**
 * Download all images from a single furniture or room generation
 * @param {Array} images - Array of image URLs
 * @param {string} baseName - Base filename (e.g., "chair", "living-room")
 */
export const downloadMultipleImages = async (images, baseName = "design") => {
    for (let i = 0; i < images.length; i++) {
        await downloadImage(images[i], `${baseName}-${i + 1}`);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
};
