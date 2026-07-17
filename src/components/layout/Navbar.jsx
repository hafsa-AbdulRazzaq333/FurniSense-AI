import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Create", path: "/create" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#E8DED3] bg-[#F8F5F0] shadow-[0_8px_24px_rgba(45,45,45,0.04)] transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-tight text-[#2D2D2D]"
        >
          <h3 className=" text-2xl font-bold tracking-tight text-[#2D2D2D] sm:text-7xl lg:text-4xl">
            Furni
            <span className="text-[#8B5E3C]">Sense</span>
          </h3>
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={handleLinkClick}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#8B5E3C]"
                    : "text-[#5F5F5F] hover:text-[#8B5E3C]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="mt-1 block h-0.5 w-full rounded-full bg-[#8B5E3C]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button to="/create" size="sm">
            Get Started
          </Button>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8DED3] bg-white/80 text-[#2D2D2D] shadow-sm lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#2D2D2D]/45 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-[#E8DED3] bg-[#F8F5F0] p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#2D2D2D]">
                  Menu
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DED3] bg-white text-[#2D2D2D]"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={handleLinkClick}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-base font-medium ${
                        isActive
                          ? "bg-[#8B5E3C] text-white"
                          : "bg-white text-[#2D2D2D]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto">
                <Button to="/create" className="w-full justify-center">
                  Get Started
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
