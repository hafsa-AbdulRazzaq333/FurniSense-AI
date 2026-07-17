import React from "react";
import { motion } from "framer-motion";
import {
  Bed,
  Sofa,
  Coffee,
  Briefcase,
  Home,
  CheckCircle,
} from "lucide-react";
import { FaKitchenSet } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";

// Updated categories data with 'Hall'
const categories = [
  { id: "Bedroom", icon: Bed, label: "Bedroom" },
  { id: "Living Room", icon: Sofa, label: "Living Room" },
  { id: "Dining Room", icon: Coffee, label: "Dining" },
  { id: "Office", icon: Briefcase, label: "Office" },
  { id: "Kitchen", icon: FaKitchenSet , label: "Kitchen" },
  { id: "Hall", icon: BiHome , label: "Hall" },
];

const DesignIdentity = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">
        Design Identity
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 min-h-27.5 ${
                isActive
                  ? "border-[#8B5E3C] bg-[#8B5E3C]/5"
                  : "border-[#E8DED3] bg-white hover:border-[#C89B6D]"
              }`}
            >
              <category.icon
                size={28}
                className={isActive ? "text-[#8B5E3C]" : "text-[#5F5F5F]"}
              />
              <span
                className={`text-sm font-medium text-center ${
                  isActive ? "text-[#8B5E3C]" : "text-[#2D2D2D]"
                }`}
              >
                {category.label}
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
    </div>
  );
};

export default DesignIdentity;
