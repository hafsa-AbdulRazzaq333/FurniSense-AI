import React from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  X,
  Sparkles,
  Wand2,
  Sparkle,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

// Data
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SingleFurniture = ({
  previewImage,
  setPreviewImage,
  handleGenerate,
  isGenerating,
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
  furnitureType,
  setFurnitureType,
  dimensions,
  setDimensions,
  description,
  setDescription,
}) => {
  return (
    <motion.div
      key="Single Furniture"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-6 lg:p-8">
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                Furniture Type
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Sofa, Chair, Table..."
                  value={furnitureType}
                  onChange={(e) => setFurnitureType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                Upload Reference
              </h3>
              {!previewImage ? (
                <label className="flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed border-[#E8DED3] bg-[#F8F5F0] hover:border-[#C89B6D] hover:bg-[#E8DED3]/30 cursor-pointer transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 p-5">
                    <UploadCloud size={48} className="text-[#C89B6D] mb-4" />
                    <p className="mb-2 text-sm text-[#2D2D2D]">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-[#5F5F5F]">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) =>
                          setPreviewImage(event.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8DED3] flex items-center justify-center text-[#5F5F5F] hover:text-[#8B5E3C] hover:bg-white transition-all duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </motion.div>

            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                  Design Details
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="sm:col-span-2">
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
                  <div className="sm:col-span-2">
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                  Additional Details
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Dimensions (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 200x90x85 cm"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      placeholder="Additional details or description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200 min-h-20 resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Special Instructions
                </label>
                <textarea
                  placeholder="Describe your perfect piece..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200 min-h-24 resize-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={handleGenerate}
                  className="w-full py-4 text-base"
                  icon={isGenerating ? Sparkles : Wand2}
                  disabled={isGenerating}
                >
                  {isGenerating
                    ? "Creating Your Design..."
                    : "Generate Single Piece"}
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SingleFurniture;
