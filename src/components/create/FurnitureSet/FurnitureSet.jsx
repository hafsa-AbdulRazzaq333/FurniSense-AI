import React from "react";
import { motion } from "framer-motion";
import { Sofa } from "lucide-react";
import Card from "../../ui/Card";
import DesignIdentity from "./DesignIdentity";
import VisualAppearance from "./VisualAppearance";
import FurnitureItems from "./FurnitureItems";
import GenerateSection from "./GenerateSection";

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

const FurnitureSet = ({
  selectedItems,
  setSelectedItems,
  handleGenerate,
  isGenerating,
  selectedCategory,
  setSelectedCategory,
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
  // Furniture items helpers
  const addItem = () => {
    setSelectedItems([...selectedItems, { name: "", icon: Sofa, quantity: 1 }]);
  };

  const updateItemName = (index, name) => {
    const newItems = [...selectedItems];
    newItems[index].name = name;
    setSelectedItems(newItems);
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    setSelectedItems(newItems);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      key="Furniture Set"
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
          <motion.div variants={itemVariants}>
            <DesignIdentity
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <VisualAppearance
              styleSearch={styleSearch}
              setStyleSearch={setStyleSearch}
              materialSearch={materialSearch}
              setMaterialSearch={setMaterialSearch}
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              secondaryColor={secondaryColor}
              setSecondaryColor={setSecondaryColor}
              specialInstructions={specialInstructions}
              setSpecialInstructions={setSpecialInstructions}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FurnitureItems
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              addItem={addItem}
              updateItemName={updateItemName}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GenerateSection
              handleGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FurnitureSet;
