import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "./ui/Button";

import previewImage from "../assets/images/design.png";

export default function Cta() {
  return (
    <section className="px-6 py-16 sm:px-8 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#F8F5F0] px-8 py-12 lg:px-14 lg:py-16">
        {/* Background Glow */}

        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#C89B6D]/20 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#8B5E3C]/10 blur-3xl" />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8DED3] bg-white px-4 py-2">
              <Sparkles size={15} className="text-[#8B5E3C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B5E3C]">
                AI Furniture Studio
              </span>
            </div>

            <h2 className="mt-7 max-w-xl text-4xl font-bold leading-tight text-[#2D2D2D] sm:text-5xl">
              Design Spaces That Feel
              <span className="text-[#8B5E3C]"> Uniquely Yours</span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#5F5F5F]">
              Turn your imagination into refined furniture concepts with
              intelligent AI assistance built for modern interiors.
            </p>

            <Button
              to="/create"
              icon={ArrowRight}
              className="mt-8 bg-[#2D2D2D] text-white hover:bg-[#8B5E3C]"
            >
              Start Designing
            </Button>
          </motion.div>

          {/* Right Preview */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Floating Card */}

            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-[35px] bg-[#C89B6D]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-4xl border border-white/50 bg-white p-4 shadow-[0_30px_70px_rgba(45,45,45,0.15)]">
                <div className="relative h-80 overflow-hidden rounded-[25px]">
                  <img
                    src={previewImage}
                    alt="AI Furniture Preview"
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#E8DED3]">
                      AI Generated
                    </p>

                    <h3>
                      <span className="mt-2 text-2xl font-bold text-white">
                        Design Space
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Mini AI Tag */}

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#5F5F5F]">
                    Premium Concept
                  </span>

                  <span className="rounded-full bg-[#F8F5F0] px-4 py-2 text-xs font-semibold text-[#8B5E3C]">
                    Generated ✨
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
