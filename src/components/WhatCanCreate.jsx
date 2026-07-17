import { motion } from "framer-motion";
import { Home, Sofa, ImagePlus, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Home,
    title: "Complete Room",
    desc: "Generate a beautifully coordinated furniture set for your entire room.",
    accent: "from-[#8B5E3C] to-[#A87850]",
    rotate: "-rotate-2",
  },
  {
    icon: Sofa,
    title: "Single Furniture",
    desc: "Design one perfect furniture piece with AI assistance.",
    accent: "from-[#C89B6D] to-[#D8AF82]",
    rotate: "rotate-2",
  },
  {
    icon: ImagePlus,
    title: "Style Match",
    desc: "Upload an image and discover matching furniture ideas instantly.",
    accent: "from-[#B88A61] to-[#8B5E3C]",
    rotate: "-rotate-1",
  },
];

export default function WhatCanCreate() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0] py-18">
      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-[#C89B6D]/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#8B5E3C]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold leading-tight text-[#2D2D2D] lg:text-5xl">
            One AI.
            <br />
            Endless Furniture Possibilities.
          </h2>

          <p className="mt-3 text-lg leading-8 text-[#5F5F5F]">
            Whether you're designing an entire room or a single statement piece,
            FurniSense AI helps you create elegant furniture ideas in seconds.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="relative flex h-65 flex-col overflow-hidden rounded-[28px] border border-[#E7DDD2] bg-white p-8 transition-all duration-500 hover:border-[#C89B6D]/50 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)]">
                  {/* Gradient Glow */}
                  <div
                    className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-linear-to-br ${card.accent} opacity-10 blur-3xl transition-all duration-500 group-hover:scale-125`}
                  />

                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F5F0] text-[#8B5E3C] transition-all duration-500 group-hover:bg-[#8B5E3C] group-hover:text-white">
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <div className="mt-8 flex-1">
                    <h3 className="text-2xl font-semibold text-[#2D2D2D]">
                      {card.title}
                    </h3>

                    <p className="mt-4 leading-7 text-[#5F5F5F]">{card.desc}</p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#8B5E3C]">
                      AI Assisted
                    </span>

                    <div className="h-0.5 w-12 rounded-full bg-[#C89B6D] transition-all duration-500 group-hover:w-20" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
