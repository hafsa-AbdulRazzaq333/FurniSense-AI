import { InferenceClient } from "@huggingface/inference";

const MODEL = "black-forest-labs/FLUX.1-schnell";

// Handles secure image generation on the server.
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "METHOD_NOT_ALLOWED",
            message: "Only POST requests are allowed.",
        });
    }

    const token = process.env.HF_TOKEN;

    if (!token) {
        return res.status(500).json({
            error: "SERVER_CONFIG_ERROR",
            message: "Hugging Face token is not configured.",
        });
    }

    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({
            error: "INVALID_PROMPT",
            message: "A valid image prompt is required.",
        });
    }

    try {
        const client = new InferenceClient(token);

        const image = await client.textToImage({
            provider: "auto",
            model: MODEL,
            inputs: prompt,
            parameters: {
                width: 800,
                height: 800,
            },
        });

        const buffer = Buffer.from(await image.arrayBuffer());

        return res.status(200).json({
            image: `data:${image.type || "image/png"};base64,${buffer.toString(
                "base64"
            )}`,
        });
    } catch (error) {
        console.error("HF image generation error:", error);

        const status =
            error?.statusCode ||
            error?.status ||
            error?.response?.status ||
            500;

        if (status === 429) {
            return res.status(429).json({
                error: "RATE_LIMITED",
                message:
                    "Image generation limit reached. Please try again later.",
            });
        }

        if (status === 402) {
            return res.status(402).json({
                error: "QUOTA_EXHAUSTED",
                message:
                    "Image generation quota has been reached. Please try again later.",
            });
        }

        if (status >= 500) {
            return res.status(503).json({
                error: "PROVIDER_UNAVAILABLE",
                message:
                    "Image generation service is temporarily unavailable. Please try again later.",
            });
        }

        return res.status(500).json({
            error: "IMAGE_GENERATION_FAILED",
            message:
                "We couldn't generate the image right now. Please try again.",
        });
    }
}