import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import Button from "../../ui/Button";

const FurnitureItems = ({
  selectedItems,
  addItem,
  updateItemName,
  updateQuantity,
  removeItem,
}) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-[#2D2D2D]">
        Furniture Items
      </h3>

      <div className="overflow-hidden rounded-2xl border border-[#E8DED3] bg-white">
        <div className="max-h-72 space-y-3 overflow-y-auto p-4">
          {selectedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-xl border border-[#E8DED3] bg-[#F8F5F0] p-3 sm:flex-row sm:items-center"
            >
              {/* Furniture Name */}
              <input
                type="text"
                placeholder="Enter item"
                value={item.name}
                onChange={(e) => updateItemName(index, e.target.value)}
                className="w-full flex-1 rounded-xl border border-[#E8DED3] bg-white px-4 py-3 text-sm text-[#2D2D2D] transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] sm:min-w-0"
              />

              {/* Right Controls */}
              <div className="flex shrink-0 items-center justify-end gap-3">
                <div className="flex shrink-0 items-center rounded-xl border border-[#E8DED3] bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, -1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F5F5F] transition hover:bg-[#E8DED3]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-10 text-center text-sm font-semibold text-[#2D2D2D]">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(index, 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F5F5F] transition hover:bg-[#E8DED3]"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#5F5F5F] transition-all duration-200 hover:bg-[#8B5E3C]/10 hover:text-[#8B5E3C]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-[#E8DED3] p-4">
          <Button
            variant="secondary"
            onClick={addItem}
            icon={Plus}
            className="w-full"
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureItems;
