import React from "react";
import { motion } from "framer-motion";

const furnitureStyles = [
  "Modern",
  "Luxury",
  "Minimal",
  "Classic",
  "Traditional",
  "Contemporary",
  "Elegant",
  "Royal",
  "Premium",
  "Cozy",
];
const materials = [
  "Solid Oak",
  "Walnut Wood",
  "Velvet",
  "Linen",
  "Leather",
  "Marble",
  "Brass",
  "Steel",
];

const VisualAppearance = ({
  styleSearch,
  setStyleSearch,
  materialSearch,
  setMaterialSearch,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  specialInstructions,
  setSpecialInstructions,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
        Visual Appearance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Style
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search or type style..."
              value={styleSearch}
              onChange={(e) => setStyleSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
              list="style-list"
            />
            <datalist id="style-list">
              {furnitureStyles.map((style) => (
                <option key={style} value={style} />
              ))}
            </datalist>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Material
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search or type material..."
              value={materialSearch}
              onChange={(e) => setMaterialSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
              list="material-list"
            />
            <datalist id="material-list">
              {materials.map((material) => (
                <option key={material} value={material} />
              ))}
            </datalist>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Primary Color
          </label>
          <input
            type="text"
            placeholder="e.g. Warm Beige"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Secondary Color
          </label>
          <input
            type="text"
            placeholder="e.g. Walnut Brown"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
          Special Instructions
        </label>
        <textarea
          placeholder="Add any special requirements or design preferences..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200 min-h-24 resize-none"
        />
      </div>
    </div>
  );
};

export default VisualAppearance;
