import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create",
    path: "/create",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-12 pb-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[#E8DED3] pt-12"
        >
          {/* Top */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8B5E3C]">
                AI Furniture Studio
              </p>

              <h2 className="mt-4 text-6xl font-bold tracking-tight text-[#2D2D2D] sm:text-7xl lg:text-8xl">
                Furni
                <span className="text-[#8B5E3C]">Sense</span>
              </h2>
            </div>

            <Navlink
              to="/contact"
              className="group flex w-fit items-center gap-3 rounded-full border border-[#E8DED3] bg-[#F8F5F0] px-6 py-4 text-[#2D2D2D] transition-all duration-300 hover:bg-[#8B5E3C] hover:text-white"
            >
              <Mail size={18} />

              <span className="font-medium">Get In Touch</span>

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Navlink>
          </div>

          {/* Bottom */}

          <div className="mt-14 grid gap-10 border-t border-[#E8DED3] pt-8 md:grid-cols-3">
            <div>
              <p className="max-w-sm leading-7 text-[#5F5F5F]">
                Creating intelligent furniture experiences where imagination
                meets artificial intelligence.
              </p>
            </div>

            {/* Navigation */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B5E3C]">
                Navigation
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {links.map((item) => (
                  <Navlink
                    key={item.name}
                    to={item.path}
                    className="transition text-[#5F5F5F] hover:text-[#8B5E3C]"
                  >
                    {item.name}
                  </Navlink>
                ))}
              </div>
            </div>

            {/* Follow */}

            <div className="md:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B5E3C]">
                Connect
              </p>

              <div className="mt-4 flex gap-5 md:justify-end">
                <a
                  href="https://github.com/hafsa-AbdulRazzaq333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition text-[#5F5F5F] hover:text-[#8B5E3C]"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/hafsa-abdul-razaq-492b26322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition text-[#5F5F5F] hover:text-[#8B5E3C]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}

          <div className="mt-10 flex flex-col gap-3 border-t border-[#E8DED3] pt-6 text-sm text-[#777] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} FurniSense AI. All Rights Reserved.
            </p>

            <p>Designed & Developed by Hafsa Abdul Razaq ✨</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
