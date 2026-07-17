// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import {
//   Sofa,
//   Armchair,
//   Table,
//   Home,
//   Layers,
//   Layout,
//   Lamp,
// } from "lucide-react";
// import CreateTabs from "../components/create/CreateTabs";
// import FurnitureSet from "../components/create/FurnitureSet/FurnitureSet";
// import SingleFurniture from "../components/create/SingleFurniture/SingleFurniture";
// import RoomGenerator from "../components/create/RoomGenerator/RoomGenerator";
// import ResultSection from "../components/create/Results/ResultSection";
// import Navbar from "../components/layout/Navbar";
// import { useImageGeneration } from "../hooks/useImageGeneration";
// import { GENERATION_TYPES } from "../services/generationService";

// const Create = () => {
//   const [activeTab, setActiveTab] = useState("Furniture Set");

//   // Common state
//   const [selectedItems, setSelectedItems] = useState([
//     { name: "Sofa", icon: Sofa, quantity: 1 },
//   ]);
//   const [selectedRoomItems, setSelectedRoomItems] = useState([]);
//   const [previewImage, setPreviewImage] = useState(null);

//   // FIX: Local Storage se data read karne wali states taake page switch par images save rahein
//   const [furnitureSetResult, setFurnitureSetResult] = useState(() => {
//     const saved = localStorage.getItem("fs_result");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [singleFurnitureResult, setSingleFurnitureResult] = useState(() => {
//     const saved = localStorage.getItem("sf_result");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [roomGeneratorResult, setRoomGeneratorResult] = useState(() => {
//     const saved = localStorage.getItem("rg_result");
//     return saved ? JSON.parse(saved) : null;
//   });

//   // Furniture Set specific state
//   const [fsSelectedCategory, setFsSelectedCategory] = useState("Living Room");
//   const [fsStyleSearch, setFsStyleSearch] = useState("");
//   const [fsMaterialSearch, setFsMaterialSearch] = useState("");
//   const [fsPrimaryColor, setFsPrimaryColor] = useState("Warm Beige");
//   const [fsSecondaryColor, setFsSecondaryColor] = useState("Walnut Brown");
//   const [fsSpecialInstructions, setFsSpecialInstructions] = useState("");

//   // Single Furniture specific state
//   const [sfStyleSearch, setSfStyleSearch] = useState("");
//   const [sfMaterialSearch, setSfMaterialSearch] = useState("");
//   const [sfPrimaryColor, setSfPrimaryColor] = useState("Warm Beige");
//   const [sfSecondaryColor, setSfSecondaryColor] = useState("");
//   const [sfSpecialInstructions, setSfSpecialInstructions] = useState("");
//   const [sfFurnitureType, setSfFurnitureType] = useState("");
//   const [sfDimensions, setSfDimensions] = useState("");
//   const [sfDescription, setSfDescription] = useState("");

//   // Room Generator specific state
//   const [rgSelectedRoomType, setRgSelectedRoomType] = useState("Living Room");
//   const [rgStyleSearch, setRgStyleSearch] = useState("");
//   const [rgColorTheme, setRgColorTheme] = useState("Elegant Neutral");
//   const [rgLighting, setRgLighting] = useState("Natural Light");
//   const [rgPrimaryColor, setRgPrimaryColor] = useState("");
//   const [rgSecondaryColor, setRgSecondaryColor] = useState("");
//   const [rgMaterial, setRgMaterial] = useState("");
//   const [rgRoomSize, setRgRoomSize] = useState("");
//   const [rgSpecialInstructions, setRgSpecialInstructions] = useState("");

//   // Use our image generation hook
//   const { isGenerating, error, generate, reset } = useImageGeneration();

//   // FIX: Page Reload/Refresh hone par Local Storage ko saaf (clear) karne ke liye effect
//   useEffect(() => {
//     const handleUnload = () => {
//       localStorage.removeItem("fs_result");
//       localStorage.removeItem("sf_result");
//       localStorage.removeItem("rg_result");
//     };
    
//     // browser tab close ya refresh hone par yeh chalega
//     window.addEventListener("beforeunload", handleUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, []);

//   // Dynamically compute correct items to show in loader per tab
//   const activeGenerationItems = useMemo(() => {
//     if (activeTab === "Furniture Set") {
//       return selectedItems;
//     }
//     if (activeTab === "Single Furniture") {
//       return [{ name: sfFurnitureType || "Single Piece" }];
//     }
//     if (activeTab === "Room Generator") {
//       return selectedRoomItems.length > 0
//         ? selectedRoomItems.map((item) => ({ name: item }))
//         : [{ name: rgSelectedRoomType || "Room View" }];
//     }
//     return [];
//   }, [
//     activeTab,
//     selectedItems,
//     selectedRoomItems,
//     sfFurnitureType,
//     rgSelectedRoomType,
//   ]);

//   // Handle generate
//   const handleGenerate = useCallback(async () => {
//     try {
//       reset();
//       setPreviewImage(null);

//       if (activeTab === "Furniture Set") {
//         const itemsToSend = selectedItems.map((item) => item.name);

//         const result = await generate(GENERATION_TYPES.FURNITURE_SET, {
//           items: itemsToSend,
//           style: fsStyleSearch || "Modern",
//           material: fsMaterialSearch || "Wood",
//           primaryColor: fsPrimaryColor,
//           secondaryColor: fsSecondaryColor,
//           specialInstructions: fsSpecialInstructions,
//         });
        
//         // State update aur local storage mein save
//         setFurnitureSetResult(result);
//         localStorage.setItem("fs_result", JSON.stringify(result));
//       } else if (activeTab === "Single Furniture") {
//         const result = await generate(GENERATION_TYPES.SINGLE_FURNITURE, {
//           item: sfFurnitureType || "Chair",
//           style: sfStyleSearch || "Modern",
//           material: sfMaterialSearch || "Wood",
//           primaryColor: sfPrimaryColor,
//           secondaryColor: sfSecondaryColor,
//           specialInstructions: sfSpecialInstructions,
//           dimensions: sfDimensions,
//           description: sfDescription,
//         });

//         // State update aur local storage mein save
//         setSingleFurnitureResult(result);
//         localStorage.setItem("sf_result", JSON.stringify(result));
//       } else if (activeTab === "Room Generator") {
//         const result = await generate(GENERATION_TYPES.ROOM, {
//           roomType: rgSelectedRoomType,
//           selectedItems: selectedRoomItems.map((name) => ({
//             name,
//             quantity: 1,
//           })),
//           style: rgStyleSearch || "Modern",
//           material: rgMaterial || "Wood",
//           primaryColor: rgPrimaryColor || "Warm Beige",
//           secondaryColor: rgSecondaryColor,
//           specialInstructions: rgSpecialInstructions,
//           roomSize: rgRoomSize,
//           lightingPreference: rgLighting,
//         });

//         // State update aur local storage mein save
//         setRoomGeneratorResult(result);
//         localStorage.setItem("rg_result", JSON.stringify(result));
//       }
//     } catch (err) {
//       console.error("Generation failed:", err);
//     }
//   }, [
//     activeTab,
//     selectedItems,
//     selectedRoomItems,
//     generate,
//     reset,
//     fsStyleSearch,
//     fsMaterialSearch,
//     fsPrimaryColor,
//     fsSecondaryColor,
//     fsSpecialInstructions,
//     sfFurnitureType,
//     sfStyleSearch,
//     sfMaterialSearch,
//     sfPrimaryColor,
//     sfSecondaryColor,
//     sfSpecialInstructions,
//     sfDimensions,
//     sfDescription,
//     rgSelectedRoomType,
//     rgStyleSearch,
//     rgMaterial,
//     rgPrimaryColor,
//     rgSecondaryColor,
//     rgSpecialInstructions,
//     rgRoomSize,
//     rgLighting,
//   ]);

//   // Current active tab ka sahi result read karne ke liye memo check
//   const currentTabResult = useMemo(() => {
//     if (activeTab === "Furniture Set") return furnitureSetResult;
//     if (activeTab === "Single Furniture") return singleFurnitureResult;
//     if (activeTab === "Room Generator") return roomGeneratorResult;
//     return null;
//   }, [activeTab, furnitureSetResult, singleFurnitureResult, roomGeneratorResult]);

//   return (
//     <div className="h-screen flex flex-col bg-[#F8F5F0] overflow-hidden">
//       <Navbar />
//       <CreateTabs activeTab={activeTab} setActiveTab={setActiveTab}>
//         <div key={activeTab} className="flex-1 flex flex-col min-h-0">
//           {/* Mobile Layout */}
//           <div className="lg:hidden flex-1 overflow-y-auto px-4 sm:px-6 py-18">
//             <div className="mx-auto max-w-4xl space-y-6">
//               {activeTab === "Furniture Set" && (
//                 <div className="min-w-0 w-full">
//                   <FurnitureSet
//                     selectedItems={selectedItems}
//                     setSelectedItems={setSelectedItems}
//                     handleGenerate={handleGenerate}
//                     isGenerating={isGenerating}
//                     selectedCategory={fsSelectedCategory}
//                     setSelectedCategory={setFsSelectedCategory}
//                     styleSearch={fsStyleSearch}
//                     setStyleSearch={setFsStyleSearch}
//                     materialSearch={fsMaterialSearch}
//                     setMaterialSearch={setFsMaterialSearch}
//                     primaryColor={fsPrimaryColor}
//                     setPrimaryColor={setFsPrimaryColor}
//                     secondaryColor={fsSecondaryColor}
//                     setSecondaryColor={setFsSecondaryColor}
//                     specialInstructions={fsSpecialInstructions}
//                     setSpecialInstructions={setFsSpecialInstructions}
//                   />
//                 </div>
//               )}
//               {activeTab === "Single Furniture" && (
//                 <div className="min-w-0 w-full">
//                   <SingleFurniture
//                     previewImage={previewImage}
//                     setPreviewImage={setPreviewImage}
//                     handleGenerate={handleGenerate}
//                     isGenerating={isGenerating}
//                     styleSearch={sfStyleSearch}
//                     setStyleSearch={setSfStyleSearch}
//                     materialSearch={sfMaterialSearch}
//                     setMaterialSearch={setSfMaterialSearch}
//                     primaryColor={sfPrimaryColor}
//                     setPrimaryColor={setSfPrimaryColor}
//                     secondaryColor={sfSecondaryColor}
//                     setSecondaryColor={setSfSecondaryColor}
//                     specialInstructions={sfSpecialInstructions}
//                     setSpecialInstructions={setSfSpecialInstructions}
//                     furnitureType={sfFurnitureType}
//                     setFurnitureType={setSfFurnitureType}
//                     dimensions={sfDimensions}
//                     setDimensions={setSfDimensions}
//                     description={sfDescription}
//                     setDescription={setSfDescription}
//                   />
//                 </div>
//               )}
//               {activeTab === "Room Generator" && (
//                 <div className="min-w-0 w-full">
//                   <RoomGenerator
//                     selectedRoomItems={selectedRoomItems}
//                     setSelectedRoomItems={setSelectedRoomItems}
//                     handleGenerate={handleGenerate}
//                     isGenerating={isGenerating}
//                     selectedRoomType={rgSelectedRoomType}
//                     setSelectedRoomType={setRgSelectedRoomType}
//                     styleSearch={rgStyleSearch}
//                     setStyleSearch={setRgStyleSearch}
//                     colorTheme={rgColorTheme}
//                     setColorTheme={setRgColorTheme}
//                     lighting={rgLighting}
//                     setLighting={setRgLighting}
//                     primaryColor={rgPrimaryColor}
//                     setPrimaryColor={setRgPrimaryColor}
//                     secondaryColor={rgSecondaryColor}
//                     setSecondaryColor={setRgSecondaryColor}
//                     material={rgMaterial}
//                     setMaterial={setRgMaterial}
//                     roomSize={rgRoomSize}
//                     setRoomSize={setRgRoomSize}
//                     specialInstructions={rgSpecialInstructions}
//                     setSpecialInstructions={setRgSpecialInstructions}
//                   />
//                 </div>
//               )}
//               <div className="min-w-0 w-full pb-8">
//                 <ResultSection
//                   isGenerating={isGenerating}
//                   generatedResult={currentTabResult}
//                   error={error}
//                   activeTab={activeTab}
//                   onGenerateAgain={handleGenerate}
//                   generationItems={activeGenerationItems}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Desktop Two-Panel Layout */}
//           <div className="hidden lg:flex flex-1 overflow-hidden">
//             {/* Left Panel - Forms */}
//             <div className="w-2/5 border-r border-[#E8DED3] flex flex-col overflow-hidden">
//               <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//                 <div className="max-w-xl mx-auto">
//                   {activeTab === "Furniture Set" && (
//                     <FurnitureSet
//                       selectedItems={selectedItems}
//                       setSelectedItems={setSelectedItems}
//                       handleGenerate={handleGenerate}
//                       isGenerating={isGenerating}
//                       selectedCategory={fsSelectedCategory}
//                       setSelectedCategory={setFsSelectedCategory}
//                       styleSearch={fsStyleSearch}
//                       setStyleSearch={setFsStyleSearch}
//                       materialSearch={fsMaterialSearch}
//                       setMaterialSearch={setFsMaterialSearch}
//                       primaryColor={fsPrimaryColor}
//                       setPrimaryColor={setFsPrimaryColor}
//                       secondaryColor={fsSecondaryColor}
//                       setSecondaryColor={setFsSecondaryColor}
//                       specialInstructions={fsSpecialInstructions}
//                       setSpecialInstructions={setFsSpecialInstructions}
//                     />
//                   )}
//                   {activeTab === "Single Furniture" && (
//                     <SingleFurniture
//                       previewImage={previewImage}
//                       setPreviewImage={setPreviewImage}
//                       handleGenerate={handleGenerate}
//                       isGenerating={isGenerating}
//                       styleSearch={sfStyleSearch}
//                       setStyleSearch={setSfStyleSearch}
//                       materialSearch={sfMaterialSearch}
//                       setMaterialSearch={setSfMaterialSearch}
//                       primaryColor={sfPrimaryColor}
//                       setPrimaryColor={setSfPrimaryColor}
//                       secondaryColor={sfSecondaryColor}
//                       setSecondaryColor={setSfSecondaryColor}
//                       specialInstructions={sfSpecialInstructions}
//                       setSpecialInstructions={setSfSpecialInstructions}
//                       furnitureType={sfFurnitureType}
//                       setFurnitureType={setSfFurnitureType}
//                       dimensions={sfDimensions}
//                       setDimensions={setSfDimensions}
//                       description={sfDescription}
//                       setDescription={setSfDescription}
//                     />
//                   )}
//                   {activeTab === "Room Generator" && (
//                     <RoomGenerator
//                       selectedRoomItems={selectedRoomItems}
//                       setSelectedRoomItems={setSelectedRoomItems}
//                       handleGenerate={handleGenerate}
//                       isGenerating={isGenerating}
//                       selectedRoomType={rgSelectedRoomType}
//                       setSelectedRoomType={setRgSelectedRoomType}
//                       styleSearch={rgStyleSearch}
//                       setStyleSearch={setRgStyleSearch}
//                       colorTheme={rgColorTheme}
//                       setColorTheme={setRgColorTheme}
//                       lighting={rgLighting}
//                       setLighting={setRgLighting}
//                       primaryColor={rgPrimaryColor}
//                       setPrimaryColor={setRgPrimaryColor}
//                       secondaryColor={rgSecondaryColor}
//                       setSecondaryColor={setRgSecondaryColor}
//                       material={rgMaterial}
//                       setMaterial={setRgMaterial}
//                       roomSize={rgRoomSize}
//                       setRoomSize={setRgRoomSize}
//                       specialInstructions={rgSpecialInstructions}
//                       setSpecialInstructions={setRgSpecialInstructions}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Panel - Results */}
//             <div className="w-3/5 flex flex-col overflow-hidden">
//               <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//                 <div className="max-w-2xl mx-auto">
//                   <ResultSection
//                     isGenerating={isGenerating}
//                     generatedResult={currentTabResult}
//                     error={error}
//                     activeTab={activeTab}
//                     onGenerateAgain={handleGenerate}
//                     generationItems={activeGenerationItems}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </CreateTabs>
//     </div>
//   );
// };

// export default Create;

// File Location: src/pages/Create.jsx

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Sofa,
  Armchair,
  Table,
  Home,
  Layers,
  Layout,
  Lamp,
} from "lucide-react";
import CreateTabs from "../components/create/CreateTabs";
import FurnitureSet from "../components/create/FurnitureSet/FurnitureSet";
import SingleFurniture from "../components/create/SingleFurniture/SingleFurniture";
import RoomGenerator from "../components/create/RoomGenerator/RoomGenerator";
import ResultSection from "../components/create/Results/ResultSection";
import Navbar from "../components/layout/Navbar";
import { useImageGeneration } from "../hooks/useImageGeneration";
import { GENERATION_TYPES } from "../services/generationService";

const Create = () => {
  // Helpers for Local Storage read/write
  const getStoredItem = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };

  const setStoredItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Active Tab State
  const [activeTab, setActiveTabState] = useState(() => getStoredItem("active_tab", "Furniture Set"));
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setStoredItem("active_tab", tab);
  };

  // --- Common state ---
  const [selectedItems, setSelectedItemsState] = useState(() => 
    getStoredItem("selected_items", [{ name: "Sofa", icon: Sofa, quantity: 1 }])
  );
  const setSelectedItems = (val) => {
    // Custom handling if function update is passed to state setter
    const newVal = typeof val === 'function' ? val(selectedItems) : val;
    setSelectedItemsState(newVal);
    // Remove icon property from localStorage to avoid circular structures
    const cleanItems = newVal.map(item => ({ name: item.name, quantity: item.quantity }));
    setStoredItem("selected_items", cleanItems);
  };

  const [selectedRoomItems, setSelectedRoomItemsState] = useState(() => getStoredItem("selected_room_items", []));
  const setSelectedRoomItems = (val) => {
    const newVal = typeof val === 'function' ? val(selectedRoomItems) : val;
    setSelectedRoomItemsState(newVal);
    setStoredItem("selected_room_items", newVal);
  };

  const [previewImage, setPreviewImage] = useState(null);

  // --- Image Results States ---
  const [furnitureSetResult, setFurnitureSetResult] = useState(() => getStoredItem("fs_result", null));
  const [singleFurnitureResult, setSingleFurnitureResult] = useState(() => getStoredItem("sf_result", null));
  const [roomGeneratorResult, setRoomGeneratorResult] = useState(() => getStoredItem("rg_result", null));

  // --- Furniture Set specific state ---
  const [fsSelectedCategory, setFsSelectedCategoryState] = useState(() => getStoredItem("fs_category", "Living Room"));
  const setFsSelectedCategory = (val) => { setFsSelectedCategoryState(val); setStoredItem("fs_category", val); };

  const [fsStyleSearch, setFsStyleSearchState] = useState(() => getStoredItem("fs_style", ""));
  const setFsStyleSearch = (val) => { setFsStyleSearchState(val); setStoredItem("fs_style", val); };

  const [fsMaterialSearch, setFsMaterialSearchState] = useState(() => getStoredItem("fs_material", ""));
  const setFsMaterialSearch = (val) => { setFsMaterialSearchState(val); setStoredItem("fs_material", val); };

  const [fsPrimaryColor, setFsPrimaryColorState] = useState(() => getStoredItem("fs_primary_color", "Warm Beige"));
  const setFsPrimaryColor = (val) => { setFsPrimaryColorState(val); setStoredItem("fs_primary_color", val); };

  const [fsSecondaryColor, setFsSecondaryColorState] = useState(() => getStoredItem("fs_secondary_color", "Walnut Brown"));
  const setFsSecondaryColor = (val) => { setFsSecondaryColorState(val); setStoredItem("fs_secondary_color", val); };

  const [fsSpecialInstructions, setFsSpecialInstructionsState] = useState(() => getStoredItem("fs_special_instructions", ""));
  const setFsSpecialInstructions = (val) => { setFsSpecialInstructionsState(val); setStoredItem("fs_special_instructions", val); };

  // --- Single Furniture specific state ---
  const [sfStyleSearch, setSfStyleSearchState] = useState(() => getStoredItem("sf_style", ""));
  const setSfStyleSearch = (val) => { setSfStyleSearchState(val); setStoredItem("sf_style", val); };

  const [sfMaterialSearch, setSfMaterialSearchState] = useState(() => getStoredItem("sf_material", ""));
  const setSfMaterialSearch = (val) => { setSfMaterialSearchState(val); setStoredItem("sf_material", val); };

  const [sfPrimaryColor, setSfPrimaryColorState] = useState(() => getStoredItem("sf_primary_color", "Warm Beige"));
  const setSfPrimaryColor = (val) => { setSfPrimaryColorState(val); setStoredItem("sf_primary_color", val); };

  const [sfSecondaryColor, setSfSecondaryColorState] = useState(() => getStoredItem("sf_secondary_color", ""));
  const setSfSecondaryColor = (val) => { setSfSecondaryColorState(val); setStoredItem("sf_secondary_color", val); };

  const [sfSpecialInstructions, setSfSpecialInstructionsState] = useState(() => getStoredItem("sf_special_instructions", ""));
  const setSfSpecialInstructions = (val) => { setSfSpecialInstructionsState(val); setStoredItem("sf_special_instructions", val); };

  const [sfFurnitureType, setSfFurnitureTypeState] = useState(() => getStoredItem("sf_furniture_type", ""));
  const setSfFurnitureType = (val) => { setSfFurnitureTypeState(val); setStoredItem("sf_furniture_type", val); };

  const [sfDimensions, setSfDimensionsState] = useState(() => getStoredItem("sf_dimensions", ""));
  const setSfDimensions = (val) => { setSfDimensionsState(val); setStoredItem("sf_dimensions", val); };

  const [sfDescription, setSfDescriptionState] = useState(() => getStoredItem("sf_description", ""));
  const setSfDescription = (val) => { setSfDescriptionState(val); setStoredItem("sf_description", val); };

  // --- Room Generator specific state ---
  const [rgSelectedRoomType, setRgSelectedRoomTypeState] = useState(() => getStoredItem("rg_room_type", "Living Room"));
  const setRgSelectedRoomType = (val) => { setRgSelectedRoomTypeState(val); setStoredItem("rg_room_type", val); };

  const [rgStyleSearch, setRgStyleSearchState] = useState(() => getStoredItem("rg_style", ""));
  const setRgStyleSearch = (val) => { setRgStyleSearchState(val); setStoredItem("rg_style", val); };

  const [rgColorTheme, setRgColorThemeState] = useState(() => getStoredItem("rg_color_theme", "Elegant Neutral"));
  const setColorTheme = (val) => { setRgColorThemeState(val); setStoredItem("rg_color_theme", val); };

  const [rgLighting, setRgLightingState] = useState(() => getStoredItem("rg_lighting", "Natural Light"));
  const setLighting = (val) => { setRgLightingState(val); setStoredItem("rg_lighting", val); };

  const [rgPrimaryColor, setRgPrimaryColorState] = useState(() => getStoredItem("rg_primary_color", ""));
  const setRgPrimaryColor = (val) => { setRgPrimaryColorState(val); setStoredItem("rg_primary_color", val); };

  const [rgSecondaryColor, setRgSecondaryColorState] = useState(() => getStoredItem("rg_secondary_color", ""));
  const setRgSecondaryColor = (val) => { setRgSecondaryColorState(val); setStoredItem("rg_secondary_color", val); };

  const [rgMaterial, setRgMaterialState] = useState(() => getStoredItem("rg_material", ""));
  const setRgMaterial = (val) => { setRgMaterialState(val); setStoredItem("rg_material", val); };

  const [rgRoomSize, setRgRoomSizeState] = useState(() => getStoredItem("rg_room_size", ""));
  const setRgRoomSize = (val) => { setRgRoomSizeState(val); setStoredItem("rg_room_size", val); };

  const [rgSpecialInstructions, setRgSpecialInstructionsState] = useState(() => getStoredItem("rg_special_instructions", ""));
  const setRgSpecialInstructions = (val) => { setRgSpecialInstructionsState(val); setStoredItem("rg_special_instructions", val); };


  // Use our image generation hook
  const { isGenerating, error, generate, reset } = useImageGeneration();

  // FIX: Page Reload/Refresh hone par POORA localStorage empty (clear) karne ke liye hook
  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };
    
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // Dynamically compute correct items to show in loader per tab
  const activeGenerationItems = useMemo(() => {
    if (activeTab === "Furniture Set") {
      return selectedItems;
    }
    if (activeTab === "Single Furniture") {
      return [{ name: sfFurnitureType || "Single Piece" }];
    }
    if (activeTab === "Room Generator") {
      return selectedRoomItems.length > 0
        ? selectedRoomItems.map((item) => ({ name: item }))
        : [{ name: rgSelectedRoomType || "Room View" }];
    }
    return [];
  }, [
    activeTab,
    selectedItems,
    selectedRoomItems,
    sfFurnitureType,
    rgSelectedRoomType,
  ]);

  // Handle generate
  const handleGenerate = useCallback(async () => {
    try {
      reset();
      setPreviewImage(null);

      if (activeTab === "Furniture Set") {
        const itemsToSend = selectedItems.map((item) => item.name);

        const result = await generate(GENERATION_TYPES.FURNITURE_SET, {
          items: itemsToSend,
          style: fsStyleSearch || "Modern",
          material: fsMaterialSearch || "Wood",
          primaryColor: fsPrimaryColor,
          secondaryColor: fsSecondaryColor,
          specialInstructions: fsSpecialInstructions,
        });
        
        setFurnitureSetResult(result);
        setStoredItem("fs_result", result);
      } else if (activeTab === "Single Furniture") {
        const result = await generate(GENERATION_TYPES.SINGLE_FURNITURE, {
          item: sfFurnitureType || "Chair",
          style: sfStyleSearch || "Modern",
          material: sfMaterialSearch || "Wood",
          primaryColor: sfPrimaryColor,
          secondaryColor: sfSecondaryColor,
          specialInstructions: sfSpecialInstructions,
          dimensions: sfDimensions,
          description: sfDescription,
        });

        setSingleFurnitureResult(result);
        setStoredItem("sf_result", result);
      } else if (activeTab === "Room Generator") {
        const result = await generate(GENERATION_TYPES.ROOM, {
          roomType: rgSelectedRoomType,
          selectedItems: selectedRoomItems.map((name) => ({
            name,
            quantity: 1,
          })),
          style: rgStyleSearch || "Modern",
          material: rgMaterial || "Wood",
          primaryColor: rgPrimaryColor || "Warm Beige",
          secondaryColor: rgSecondaryColor,
          specialInstructions: rgSpecialInstructions,
          roomSize: rgRoomSize,
          lightingPreference: rgLighting,
        });

        setRoomGeneratorResult(result);
        setStoredItem("rg_result", result);
      }
    } catch (err) {
      console.error("Generation failed:", err);
    }
  }, [
    activeTab,
    selectedItems,
    selectedRoomItems,
    generate,
    reset,
    fsStyleSearch,
    fsMaterialSearch,
    fsPrimaryColor,
    fsSecondaryColor,
    fsSpecialInstructions,
    sfFurnitureType,
    sfStyleSearch,
    sfMaterialSearch,
    sfPrimaryColor,
    sfSecondaryColor,
    sfSpecialInstructions,
    sfDimensions,
    sfDescription,
    rgSelectedRoomType,
    rgStyleSearch,
    rgMaterial,
    rgPrimaryColor,
    rgSecondaryColor,
    rgSpecialInstructions,
    rgRoomSize,
    rgLighting,
  ]);

  // Current active tab ka sahi result read karne ke liye memo check
  const currentTabResult = useMemo(() => {
    if (activeTab === "Furniture Set") return furnitureSetResult;
    if (activeTab === "Single Furniture") return singleFurnitureResult;
    if (activeTab === "Room Generator") return roomGeneratorResult;
    return null;
  }, [activeTab, furnitureSetResult, singleFurnitureResult, roomGeneratorResult]);

  return (
    <div className="h-screen flex flex-col bg-[#F8F5F0] overflow-hidden">
      <Navbar />
      <CreateTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <div key={activeTab} className="flex-1 flex flex-col min-h-0">
          {/* Mobile Layout */}
          <div className="lg:hidden flex-1 overflow-y-auto px-4 sm:px-6 py-18">
            <div className="mx-auto max-w-4xl space-y-6">
              {activeTab === "Furniture Set" && (
                <div className="min-w-0 w-full">
                  <FurnitureSet
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    handleGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    selectedCategory={fsSelectedCategory}
                    setSelectedCategory={setFsSelectedCategory}
                    styleSearch={fsStyleSearch}
                    setStyleSearch={setFsStyleSearch}
                    materialSearch={fsMaterialSearch}
                    setMaterialSearch={setFsMaterialSearch}
                    primaryColor={fsPrimaryColor}
                    setPrimaryColor={setFsPrimaryColor}
                    secondaryColor={fsSecondaryColor}
                    setSecondaryColor={setFsSecondaryColor}
                    specialInstructions={fsSpecialInstructions}
                    setSpecialInstructions={setFsSpecialInstructions}
                  />
                </div>
              )}
              {activeTab === "Single Furniture" && (
                <div className="min-w-0 w-full">
                  <SingleFurniture
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    handleGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    styleSearch={sfStyleSearch}
                    setStyleSearch={setSfStyleSearch}
                    materialSearch={sfMaterialSearch}
                    setMaterialSearch={setSfMaterialSearch}
                    primaryColor={sfPrimaryColor}
                    setPrimaryColor={setSfPrimaryColor}
                    secondaryColor={sfSecondaryColor}
                    setSecondaryColor={setSfSecondaryColor}
                    specialInstructions={sfSpecialInstructions}
                    setSpecialInstructions={setSfSpecialInstructions}
                    furnitureType={sfFurnitureType}
                    setFurnitureType={setSfFurnitureType}
                    dimensions={sfDimensions}
                    setDimensions={setSfDimensions}
                    description={sfDescription}
                    setDescription={setSfDescription}
                  />
                </div>
              )}
              {activeTab === "Room Generator" && (
                <div className="min-w-0 w-full">
                  <RoomGenerator
                    selectedRoomItems={selectedRoomItems}
                    setSelectedRoomItems={setSelectedRoomItems}
                    handleGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    selectedRoomType={rgSelectedRoomType}
                    setSelectedRoomType={setRgSelectedRoomType}
                    styleSearch={rgStyleSearch}
                    setStyleSearch={setRgStyleSearch}
                    colorTheme={rgColorTheme}
                    setColorTheme={setColorTheme}
                    lighting={rgLighting}
                    setLighting={setLighting}
                    primaryColor={rgPrimaryColor}
                    setPrimaryColor={setRgPrimaryColor}
                    secondaryColor={rgSecondaryColor}
                    setSecondaryColor={setRgSecondaryColor}
                    material={rgMaterial}
                    setMaterial={setRgMaterial}
                    roomSize={rgRoomSize}
                    setRoomSize={setRgRoomSize}
                    specialInstructions={rgSpecialInstructions}
                    setSpecialInstructions={setRgSpecialInstructions}
                  />
                </div>
              )}
              <div className="min-w-0 w-full pb-8">
                <ResultSection
                  isGenerating={isGenerating}
                  generatedResult={currentTabResult}
                  error={error}
                  activeTab={activeTab}
                  onGenerateAgain={handleGenerate}
                  generationItems={activeGenerationItems}
                />
              </div>
            </div>
          </div>

          {/* Desktop Two-Panel Layout */}
          <div className="hidden lg:flex flex-1 overflow-hidden">
            {/* Left Panel - Forms */}
            <div className="w-2/5 border-r border-[#E8DED3] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="max-w-xl mx-auto">
                  {activeTab === "Furniture Set" && (
                    <FurnitureSet
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      handleGenerate={handleGenerate}
                      isGenerating={isGenerating}
                      selectedCategory={fsSelectedCategory}
                      setSelectedCategory={setFsSelectedCategory}
                      styleSearch={fsStyleSearch}
                      setStyleSearch={setFsStyleSearch}
                      materialSearch={fsMaterialSearch}
                      setMaterialSearch={setFsMaterialSearch}
                      primaryColor={fsPrimaryColor}
                      setPrimaryColor={setFsPrimaryColor}
                      secondaryColor={fsSecondaryColor}
                      setSecondaryColor={setFsSecondaryColor}
                      specialInstructions={fsSpecialInstructions}
                      setSpecialInstructions={setFsSpecialInstructions}
                    />
                  )}
                  {activeTab === "Single Furniture" && (
                    <SingleFurniture
                      previewImage={previewImage}
                      setPreviewImage={setPreviewImage}
                      handleGenerate={handleGenerate}
                      isGenerating={isGenerating}
                      styleSearch={sfStyleSearch}
                      setStyleSearch={setSfStyleSearch}
                      materialSearch={sfMaterialSearch}
                      setMaterialSearch={setSfMaterialSearch}
                      primaryColor={sfPrimaryColor}
                      setPrimaryColor={setSfPrimaryColor}
                      secondaryColor={sfSecondaryColor}
                      setSecondaryColor={setSfSecondaryColor}
                      specialInstructions={sfSpecialInstructions}
                      setSpecialInstructions={setSfSpecialInstructions}
                      furnitureType={sfFurnitureType}
                      setFurnitureType={setSfFurnitureType}
                      dimensions={sfDimensions}
                      setDimensions={setSfDimensions}
                      description={sfDescription}
                      setDescription={setSfDescription}
                    />
                  )}
                  {activeTab === "Room Generator" && (
                    <RoomGenerator
                      selectedRoomItems={selectedRoomItems}
                      setSelectedRoomItems={setSelectedRoomItems}
                      handleGenerate={handleGenerate}
                      isGenerating={isGenerating}
                      selectedRoomType={rgSelectedRoomType}
                      setSelectedRoomType={setRgSelectedRoomType}
                      styleSearch={rgStyleSearch}
                      setStyleSearch={setRgStyleSearch}
                      colorTheme={rgColorTheme}
                      setColorTheme={setColorTheme}
                      lighting={rgLighting}
                      setLighting={setLighting}
                      primaryColor={rgPrimaryColor}
                      setPrimaryColor={setRgPrimaryColor}
                      secondaryColor={rgSecondaryColor}
                      setSecondaryColor={setRgSecondaryColor}
                      material={rgMaterial}
                      setMaterial={setRgMaterial}
                      roomSize={rgRoomSize}
                      setRoomSize={setRgRoomSize}
                      specialInstructions={rgSpecialInstructions}
                      setSpecialInstructions={setRgSpecialInstructions}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Results */}
            <div className="w-3/5 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="max-w-2xl mx-auto">
                  <ResultSection
                    isGenerating={isGenerating}
                    generatedResult={currentTabResult}
                    error={error}
                    activeTab={activeTab}
                    onGenerateAgain={handleGenerate}
                    generationItems={activeGenerationItems}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CreateTabs>
    </div>
  );
};

export default Create;