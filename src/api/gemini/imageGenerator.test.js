import test from "node:test";
import assert from "node:assert/strict";
import { generateImages, generateMultipleImages } from "./imageGenerator.js";

test("generateImages returns a browser-safe SVG data URL", async () => {
    const result = await generateImages("modern sofa");

    assert.match(result, /^data:image\/svg\+xml/);
});

test("generateMultipleImages returns one SVG image per item", async () => {
    const results = await generateMultipleImages([
        { name: "Sofa", prompt: "modern sofa" },
        { name: "Chair", prompt: "modern chair" },
    ]);

    assert.equal(results.length, 2);
    results.forEach((item) => {
        assert.equal(Array.isArray(item.images), true);
        assert.match(item.images[0], /^data:image\/svg\+xml/);
    });
});
