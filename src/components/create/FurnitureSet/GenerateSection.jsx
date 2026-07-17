import React from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";
import Button from "../../ui/Button";

const GenerateSection = ({ handleGenerate, isGenerating }) => {
  return (
    <motion.div>
      <Button
        onClick={handleGenerate}
        className="w-full py-4 text-base"
        icon={isGenerating ? Sparkles : Wand2}
      >
        {isGenerating
          ? "Creating Your Design..."
          : "Generate Furniture Set"}
      </Button>
    </motion.div>
  );
};

export default GenerateSection;
