import { motion } from "framer-motion";

import living from "../assets/images/living-room.png";
import bedroom from "../assets/images/bedroom.png";
import sofa from "../assets/images/sofa.png";
import dining from "../assets/images/dining.png";

const designs = [
  {
    title: "Luxury Living Room",
    category: "Featured",
    image: living,
    featured: true,
  },
  {
    title: "Minimal Sofa",
    category: "Furniture",
    image: sofa,
  },
  {
    title: "Modern Bedroom",
    category: "Bedroom",
    image: bedroom,
  },
  {
    title: "Elegant Dining",
    category: "Dining",
    image: dining,
  },
];

export default function DesignShowcase() {
  return (
    <section className="bg-white py-18">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mt-6 text-5xl font-bold text-[#2D2D2D]">
            Inspired Spaces,
            <br />
            Generated Beautifully.
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#5F5F5F]">
            Explore a collection of elegant AI-inspired furniture concepts
            designed to spark your imagination.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Featured Image */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-4xl lg:col-span-2"
          >
            <div className="relative h-105 lg:h-105 overflow-hidden">
              <img
                src={designs[0].image}
                alt={designs[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/20 to-transparent" />

              <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white backdrop-blur-md">
                AI FEATURED DESIGN
              </div>

              <div className="absolute bottom-8 left-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[#E8DED3]">
                  {designs[0].category}
                </p>

                <h3>
                  <span className="text-3xl font-bold text-white">
                    {designs[0].title}
                  </span>
                </h3>

                <p className="mt-3 max-w-md text-white/80">
                  Elegant furniture composition generated with a warm luxury
                  aesthetic.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}

          <div className="space-y-6">
            {designs.slice(1).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[26px]"
              >
                <div className="relative h-31.25 lg:h-32">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-r from-black/45 to-transparent" />

                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#E8DED3]">
                      {item.category}
                    </span>

                    <h3>
                      <span className="text-1.5xl font-bold text-white">
                        {item.title}
                      </span>
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
