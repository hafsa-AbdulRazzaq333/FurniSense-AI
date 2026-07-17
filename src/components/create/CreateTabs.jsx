import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sofa, Wand2, Layout } from "lucide-react";

const tabs = [
  {
    id: "Furniture Set",
    icon: Sofa,
    title: "Full Set",
    subtitle: "Complete room",
  },
  {
    id: "Single Furniture",
    icon: Wand2,
    title: "Single Piece",
    subtitle: "One item",
  },
  {
    id: "Room Generator",
    icon: Layout,
    title: "Entire Room",
    subtitle: "Full design",
  },
];

const CreateTabs = ({ activeTab, setActiveTab, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Compact Professional Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-20 z-40 bg-[#F8F5F0]/95 backdrop-blur-sm border-b border-[#E8DED3] px-4 py-3"
      >
        <motion.div
          initial={false}
          animate={{
            height: isScrolled ? "auto" : "auto",
            padding: isScrolled ? "0" : "0",
          }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-5xl"
        >
          <div className="flex items-center justify-center gap-3">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                  relative
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-center
                  gap-1
                  lg:gap-2
                  flex-1
                  min-w-0
                  rounded-xl
                  border-2
                  px-2
                  py-3
                  sm:px-3
                  lg:px-4
                  lg:py-2.5
                  min-h-22
                  lg:min-h-0
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "border-[#8B5E3C] bg-white shadow-[0_4px_12px_rgba(139,                 94,60,0.1)]"
                      : "border-[#E8DED3] bg-white hover:border-[#C89B6D]                  hover:shadow-sm"
                  }
                `}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <tab.icon
                      size={18}
                      className={isActive ? "text-[#8B5E3C]" : "text-[#5F5F5F]"}
                    />
                  </motion.div>

                  <div className="text-center min-w-0">
                    <p
                      className={`text-sm font-semibold leading-tight truncate ${
                        isActive ? "text-[#8B5E3C]" : "text-[#2D2D2D]"
                      }`}
                    >
                      {tab.title}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Tab Content Wrapper */}
      {/* 
        Yahan pehle sirf default block element div thi jo flex layout ko lock kar rahi thi.
        Ab flex-1 flex flex-col min-h-0 dene se desktop par bachi hui poori vertical height render hogi 
        aur children panels independent scroll ho payenge.
      */}
      <div className="flex-1 flex flex-col min-h-0 pt-4 lg:pt-15">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </div>
    </>
  );
};

export default CreateTabs;
