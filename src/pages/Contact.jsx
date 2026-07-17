import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ContactInfo from "../components/ContactInfo"

export default function Contact() {
  return (
    <section>
      <Navbar />
      <section className="relative mb-20 overflow-hidden bg-[#FCFAF7] pt-28 pb-10 mt-10">
        {/* Background Blur */}

        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#C89B6D]/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#8B5E3C]/10 blur-[140px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-[#2D2D2D] sm:text-6xl lg:text-7xl"
          >
            Let's Build Something
            <span className="block text-[#8B5E3C]">Beautiful Together.</span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-7 mb-15 max-w-2xl text-lg leading-8 text-[#666]"
          >
            Have an idea, feedback, or collaboration in mind? I'd love to hear
            from you. Fill out the form below and let's start creating something
            meaningful.
          </motion.p>
        </div>
      </section>
      <ContactInfo/>
    </section>
  );
}
