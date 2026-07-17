import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const reasons = [
  "AI understands your style and design preferences.",
  "Furniture recommendations stay visually consistent.",
  "Generate elegant concepts in just a few seconds.",
  "Save your favorite ideas for future inspiration.",
];

const WhyChoose = () => {
  return (
    <section className="bg-white py-15">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-[#2D2D2D] lg:text-5xl">
            Designed Around
            <br />
            Your Creativity.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-[#5F5F5F]">
            Every recommendation is generated to make furniture selection
            smarter, faster and beautifully coordinated.
          </p>
        </motion.div>

        {/* Reasons */}

        <div className="mx-auto mt-5 max-w-4xl">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="group border-b border-[#ECE6DD] py-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-[#E0D6CA] transition duration-300 group-hover:text-[#8B5E3C]">
                    0{index + 1}
                  </span>

                  <h3 className="text-lg font-medium text-[#2D2D2D] transition duration-300 group-hover:translate-x-2">
                    {item}
                  </h3>
                </div>

                <ArrowRight
                  size={20}
                  className="text-[#8B5E3C] opacity-0 transition duration-300 group-hover:translate-x-2 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
