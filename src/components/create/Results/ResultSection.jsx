// File Location: src/components/create/Results/ResultSection.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  RefreshCw,
  Download,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import {
  downloadFurnitureSet,
  downloadMultipleImages,
} from "../../../utils/imageDownloader";
import { GENERATION_TYPES } from "../../../services/generationService";

const generatingSteps = [
  "Analyzing your design requirements",
  "Selecting premium materials",
  "Preparing furniture composition",
  "Rendering your unique pieces",
  "Generating final images",
];

const ResultSection = ({
  isGenerating,
  generatedResult,
  error,
  activeTab,
  onGenerateAgain,
  generationItems = [],
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (isGenerating) {
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep((prev) =>
          Math.min(prev + 1, generatingSteps.length - 1),
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  React.useEffect(() => {
    if (generatedResult) {
      console.log("Furnisense API Raw Result:", generatedResult);
    }
  }, [generatedResult]);

  const normalizeFurnitureItem = (item, index) => {
    if (!item) return { name: `Item ${index + 1}`, images: [], image: "" };
    let rawImg = "";
    let cleanName = `Furniture Item ${index + 1}`;

    if (typeof item === "string") {
      if (
        item.startsWith("data:") ||
        item.startsWith("http") ||
        item.startsWith("/")
      ) {
        rawImg = item;
      } else {
        cleanName = item;
      }
    } else if (typeof item === "object") {
      cleanName = item.name || item.title || item.label || cleanName;
      rawImg =
        item.image ||
        item.imageUrl ||
        item.url ||
        item.img ||
        item.src ||
        item.base64 ||
        (item.images && Array.isArray(item.images)
          ? item.images[0]
          : typeof item.images === "string"
            ? item.images
            : "");
    }

    // STRICT CHECK: Safely filter out static green/purple sofa placeholders if they are mock URLs
    const isPlaceholder =
      rawImg &&
      (rawImg.includes("sofa") ||
        (rawImg.includes("unsplash.com") && !generatedResult));

    return {
      name: cleanName,
      images: rawImg && !isPlaceholder ? [rawImg] : [],
      image: rawImg && !isPlaceholder ? rawImg : "",
      imageUrl: rawImg && !isPlaceholder ? rawImg : "",
    };
  };

  const normalizeResult = (result) => {
    if (!result) {
      return { isFurnitureSet: false, furnitureItems: [], imagesToShow: [] };
    }

    if (Array.isArray(result)) {
      return {
        isFurnitureSet: true,
        furnitureItems: result.map(normalizeFurnitureItem),
        imagesToShow: [],
      };
    }

    const candidateItems =
      result.items ||
      result.generatedResults?.items ||
      result.results ||
      result.data;

    if (
      result.type === GENERATION_TYPES.FURNITURE_SET ||
      Array.isArray(candidateItems)
    ) {
      const itemsToMap = Array.isArray(candidateItems)
        ? candidateItems
        : result.items
          ? [result.items]
          : [];
      return {
        isFurnitureSet: true,
        furnitureItems: itemsToMap.map(normalizeFurnitureItem),
        imagesToShow: [],
      };
    }

    let singleImgList = [];
    const singleImgCandidate =
      result.image ||
      result.imageUrl ||
      result.url ||
      result.img ||
      result.src ||
      result.base64;

    if (result.images) {
      singleImgList = Array.isArray(result.images)
        ? result.images
        : [result.images];
    } else if (singleImgCandidate) {
      singleImgList = [singleImgCandidate];
    } else if (
      typeof result === "string" &&
      (result.startsWith("data:") || result.startsWith("http"))
    ) {
      singleImgList = [result];
    }

    return {
      isFurnitureSet: false,
      furnitureItems: [],
      imagesToShow: singleImgList.filter(Boolean),
    };
  };

  const { isFurnitureSet, furnitureItems, imagesToShow } =
    normalizeResult(generatedResult);

  const handleDownload = async () => {
    if (isFurnitureSet) {
      await downloadFurnitureSet(furnitureItems);
    } else {
      await downloadMultipleImages(
        imagesToShow,
        activeTab.toLowerCase().replace(/\s+/g, "-"),
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="p-4 lg:p-6 bg-white/80 backdrop-blur-md border border-[#E8DED3]/60 shadow-sm rounded-2xl">
        {/* Error state */}
        {error && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1">
              Something went wrong
            </h3>
            <p className="text-xs text-[#5F5F5F] mb-4">{error}</p>
            <Button onClick={onGenerateAgain} icon={RefreshCw} size="sm">
              Try Again
            </Button>
          </motion.div>
        )}

        {/* State 1: Ready */}
        {!isGenerating && !generatedResult && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-[#8B5E3C]" />
            </div>
            <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1">
              Ready to Create
            </h3>
            <p className="text-xs text-[#5F5F5F] max-w-xs leading-relaxed">
              Your AI design assistant is ready to bring your vision to life.
            </p>
          </motion.div>
        )}

        {/* State 2: Generating */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 1. Header Status */}
            <div className="flex flex-col items-center text-center py-2">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-14 h-14 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mb-3"
              >
                <Sparkles size={28} className="text-[#8B5E3C]" />
              </motion.div>
              <h3 className="text-md font-bold text-[#2D2D2D]">
                Creating Your Custom Design
              </h3>
              <p className="text-[11px] text-[#7A7A7A] max-w-sm mt-0.5">
                Your rendering canvas is starting. Preview cards will populate.
              </p>
            </div>

            {/* 2. Progress Timeline Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-y border-[#E8DED3]/50 py-4">
              {generatingSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.35,
                    x: 0,
                  }}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      index < currentStep
                        ? "bg-[#8B5E3C] border-[#8B5E3C]"
                        : index === currentStep
                          ? "border-[#8B5E3C] bg-white"
                          : "border-[#E8DED3] bg-white"
                    }`}
                  >
                    {index < currentStep && (
                      <CheckCircle size={10} className="text-white" />
                    )}
                    {index === currentStep && (
                      <motion.div
                        animate={{ scale: [0.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-[#8B5E3C]"
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-[#2D2D2D] font-medium truncate">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 3. Grid Loader (Rendering Cards) */}
            {activeTab === "Furniture Set" && generationItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generationItems.map((item, index) => (
                  <div
                    key={`${item.name || item}-${index}`}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between px-0.5">
                      <p className="text-[11px] font-bold text-[#2D2D2D] capitalize truncate max-w-27.5">
                        {item.name || item}
                      </p>
                      <Loader2
                        size={11}
                        className="animate-spin text-[#8B5E3C]"
                      />
                    </div>
                    <div className="rounded-xl border border-[#E8DED3]/80 bg-[#FCF8F3]/50 aspect-square flex flex-col items-center justify-center gap-2">
                      <Loader2
                        size={18}
                        className="animate-spin text-[#8B5E3C]"
                      />
                      <span className="text-[10px] font-semibold text-[#8B5E3C]/85">
                        Rendering...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[0, 1].map((placeholderIndex) => (
                  <div
                    key={placeholderIndex}
                    className="rounded-xl border border-[#E8DED3]/80 bg-[#FCF8F3]/50 aspect-square flex flex-col items-center justify-center gap-2"
                  >
                    <Loader2
                      size={18}
                      className="animate-spin text-[#8B5E3C]"
                    />
                    <span className="text-[10px] font-semibold text-[#8B5E3C]/85">
                      Generating...
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* State 3: Generated */}
        {!isGenerating && generatedResult && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* GRID LAYOUT FOR FURNITURE SET */}
            {isFurnitureSet ? (
              <div className="grid grid-cols-2 gap-4">
                {furnitureItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-1.5 flex flex-col">
                    {item.name && (
                      <h4 className="text-[11px] font-extrabold text-[#2D2D2D] capitalize px-1 tracking-wide truncate">
                        {item.name}
                      </h4>
                    )}
                    {item.image ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: itemIndex * 0.08 }}
                        whileHover={{ scale: 1.01 }}
                        className="rounded-xl overflow-hidden aspect-square border border-[#E8DED3] shadow-sm relative group bg-[#FCF8F3]"
                      >
                        <img
                          src={item.image}
                          alt={`Generated ${item.name}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                          onError={(e) => {
                            console.error(
                              "Failed to load image for:",
                              item.name,
                            );
                          }}
                        />
                      </motion.div>
                    ) : (
                      /* LUXURY FALLBACK NO IMAGE CARD (NO SOFAS IN BED) */
                      <div className="rounded-xl border border-[#E8DED3] bg-[#FCF8F3]/55 aspect-square flex flex-col items-center justify-center gap-2 text-[#8B5E3C]/60">
                        <ImageIcon size={20} className="stroke-[1.5]" />
                        <span className="text-[10px] font-bold tracking-wide text-stone-500">
                          Ready to Render
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Single Furniture Layout */
              <div className="grid grid-cols-2 gap-4">
                {imagesToShow.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-xl overflow-hidden aspect-square border border-[#E8DED3] shadow-sm bg-[#FCF8F3]"
                  >
                    <img
                      src={img}
                      alt={`Generated design ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Actions Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E8DED3]/40">
              <Button
                onClick={onGenerateAgain}
                icon={RefreshCw}
                className="w-full text-xs py-2 shadow-sm font-semibold"
              >
                Generate Again
              </Button>
              <Button
                variant="secondary"
                icon={Download}
                className="w-full text-xs py-2 border-[#8B5E3C]/35 text-[#8B5E3C] hover:bg-[#8B5E3C]/5 font-semibold"
                onClick={handleDownload}
              >
                Download All
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default ResultSection;
