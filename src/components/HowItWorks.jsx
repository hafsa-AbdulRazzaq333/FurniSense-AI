import { motion } from "framer-motion";
import {
  FileText,
  BrainCircuit,
  Sparkles,
  Bookmark,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Describe",
    desc: "Tell AI what you want to design.",
  },
  {
    icon: BrainCircuit,
    number: "02",
    title: "AI Analysis",
    desc: "Your preferences are intelligently analyzed.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Generate",
    desc: "Receive elegant furniture recommendations.",
  },
  {
    icon: Bookmark,
    number: "04",
    title: "Save",
    desc: "Keep your favourite ideas for later.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F5F0] py-18">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-[#2D2D2D]">
            From Idea to Design
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-[#5F5F5F]">
            A simple four-step process that transforms your furniture ideas into
            elegant AI-powered recommendations.
          </p>
        </motion.div>

        <div className="relative mt-20 hidden lg:block">
          {/* Line */}

          <div className="absolute left-0 right-0 top-8 h-px bg-[#DED4C8]" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  className="relative text-center group"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white border border-[#E8DED3] text-[#8B5E3C] shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#8B5E3C] group-hover:text-white">
                    <Icon size={28} />
                  </div>

                  <span className="mt-6 block text-sm font-semibold tracking-[.25em] text-[#C89B6D]">
                    {step.number}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold text-[#2D2D2D]">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#5F5F5F]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Mobile */}

        <div className="mt-16 space-y-8 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#E8DED3] text-[#8B5E3C]">
                  <Icon size={24} />
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-[.25em] text-[#C89B6D]">
                    {step.number}
                  </span>

                  <h3 className="mt-1 text-lg font-semibold text-[#2D2D2D]">
                    {step.title}
                  </h3>

                  <p className="mt-2 leading-7 text-[#5F5F5F]">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}