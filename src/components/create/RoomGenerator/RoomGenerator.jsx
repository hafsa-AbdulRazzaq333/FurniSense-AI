import React from "react";
import { motion } from "framer-motion";
import {
  Bed,
  Sofa,
  Coffee,
  Briefcase,
  CheckCircle,
  Plus,
  Wand2,
  Sparkles,
  Sun,
  Palette,
  Home,
  Table,
  BoxIcon,
  Tv2,
  Book,
  Table2Icon,
  TableColumnsSplit,
  MirrorRound,
} from "lucide-react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { MdChairAlt, MdDining, MdIron } from "react-icons/md";
import { PiDress, PiDresser } from "react-icons/pi";
import { BsSafe2 } from "react-icons/bs";
import { BiChair } from "react-icons/bi";
import { GiStandingPotion } from "react-icons/gi";
import { FaKitchenSet } from "react-icons/fa6";

const roomTypes = [
  { id: "Living Room", icon: Sofa, label: "Living Room" },
  { id: "Master Bedroom", icon: Bed, label: "Bedroom" },
  { id: "Home Office", icon: Briefcase, label: "Office" },
  { id: "Dining Room", icon: MdDining, label: "Dining" },
  { id: "Kitchen", icon: FaKitchenSet , label: "Kitchen" },
];

const interiorStyles = [
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
const colorThemes = [
  "Light & Bright",
  "Warm & Cozy",
  "Luxury White",
  "Modern Black",
  "Soft Grey",
  "Natural Wood",
  "Elegant Neutral",
];
const lightingOptions = [
  "Natural Light",
  "Warm Ambient",
  "Cool Modern",
  "Dim & Cozy",
  "Statement Lighting",
];
const furnitureItemsList = [
  { name: "Sofa", icon: Sofa },
  { name: "Armchair", icon: MdChairAlt },
  { name: "Coffee Table", icon: Coffee },
  { name: "Side Table", icon: Table },
  { name: "Dining Table", icon: MdDining },
  { name: "Chairs", icon: BiChair },
  { name: "Bed", icon: Bed },
  { name: "Nightstand", icon: GiStandingPotion },
  { name: "Bookshelf", icon: Book },
  { name: "TV Stand", icon: Tv2 },
  { name: "Lamp", icon: Sun },
  { name: "Wardrobe", icon: PiDress },
  { name: "Dresser", icon: MirrorRound },
  { name: "Iron Stand", icon: MdIron },
];

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

const RoomGenerator = ({
  selectedRoomItems,
  setSelectedRoomItems,
  handleGenerate,
  isGenerating,
  selectedRoomType,
  setSelectedRoomType,
  styleSearch,
  setStyleSearch,
  colorTheme,
  setColorTheme,
  lighting,
  setLighting,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  material,
  setMaterial,
  roomSize,
  setRoomSize,
  specialInstructions,
  setSpecialInstructions,
}) => {
  return (
    <motion.div
      key="Room Generator"
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
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
              Room Identity
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-3">
              {roomTypes.map((type) => {
                const isActive = selectedRoomType === type.id;
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => setSelectedRoomType(type.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 min-h-25 ${
                      isActive
                        ? "border-[#8B5E3C] bg-[#8B5E3C]/5"
                        : "border-[#E8DED3] bg-white hover:border-[#C89B6D]"
                    }`}
                  >
                    <type.icon
                      size={28}
                      className={isActive ? "text-[#8B5E3C]" : "text-[#5F5F5F]"}
                    />
                    <span
                      className={`text-sm font-medium text-center ${
                        isActive ? "text-[#8B5E3C]" : "text-[#2D2D2D]"
                      }`}
                    >
                      {type.label}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle size={16} className="text-[#8B5E3C]" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
              Room Appearance
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
                    list="room-style-list"
                  />
                  <datalist id="room-style-list">
                    {interiorStyles.map((style) => (
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
                    placeholder="e.g., Wood, Fabric, Leather..."
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Primary Color
                </label>
                <input
                  type="text"
                  placeholder="e.g., Warm Beige"
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
                  placeholder="e.g., Walnut Brown"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Room Size (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 4x5 meters"
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Lighting
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select lighting..."
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED3] bg-white text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent transition-all duration-200"
                    list="lighting-list"
                  />
                  <datalist id="lighting-list">
                    {lightingOptions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colorThemes.map((theme) => {
                    const isActive = colorTheme === theme;
                    return (
                      <motion.button
                        key={theme}
                        onClick={() => setColorTheme(theme)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center justify-between gap-2 p-4 rounded-xl border-2 transition-all duration-300 min-h-15 ${
                          isActive
                            ? "border-[#8B5E3C] bg-[#8B5E3C]/5"
                            : "border-[#E8DED3] bg-white hover:border-[#C89B6D]"
                        }`}
                      >
                        <Palette
                          size={20}
                          className={
                            isActive ? "text-[#8B5E3C]" : "text-[#5F5F5F]"
                          }
                        />
                        <span
                          className={`text-sm font-medium flex-1 text-left ${isActive ? "text-[#8B5E3C]" : "text-[#2D2D2D]"}`}
                        >
                          {theme}
                        </span>
                        {isActive && (
                          <CheckCircle size={16} className="text-[#8B5E3C]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
              Furniture Items
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {furnitureItemsList.map((item) => {
                const isSelected = selectedRoomItems.includes(item.name);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() =>
                      setSelectedRoomItems((prev) => {
                        if (prev.includes(item.name)) {
                          return prev.filter((i) => i !== item.name);
                        } else {
                          return [...prev, item.name];
                        }
                      })
                    }
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 min-h-22.5 ${
                      isSelected
                        ? "border-[#8B5E3C] bg-[#8B5E3C]/5"
                        : "border-[#E8DED3] bg-white hover:border-[#C89B6D]"
                    }`}
                  >
                    <item.icon
                      size={24}
                      className={
                        isSelected ? "text-[#8B5E3C]" : "text-[#5F5F5F]"
                      }
                    />
                    <span
                      className={`text-sm font-medium text-center ${
                        isSelected ? "text-[#8B5E3C]" : "text-[#2D2D2D]"
                      }`}
                    >
                      {item.name}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle size={14} className="text-[#8B5E3C]" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Special Instructions
            </label>
            <textarea
              placeholder="Add any special requirements or design preferences..."
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
              {isGenerating ? "Creating Your Design..." : "Generate Room"}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RoomGenerator;
