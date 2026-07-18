import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import heroImg from "../assets/images/hero.jfif";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    // FIXED: overflow-x-hidden aur w-full ko yahan apply kiya hai taake screen responsive lock ho jaye
    <section className="relative w-full min-h-screen sm:h-svh flex items-center overflow-x-hidden overflow-y-hidden py-20 sm:py-0 ">
      {/* Background Image */}
      <motion.img
        src={heroImg}
        alt="Furniture"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
        className="absolute inset-0 block h-full w-full object-cover object-center blur-[1.5px]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative Blur */}
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#C89B6D]/30 blur-[150px]" />

      {/* Main Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-[#f8f8ec] sm:text-5xl lg:text-6xl pt-10">
            <span className="text-[#dcd5c9]">Transform Your</span>
            <br />
            <span className="text-[#1a1a19]">
              Dream Living Space Into Reality
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-white/90">
            Create beautiful, personalized furniture concepts with the power of
            AI. Transform your ideas into elegant, functional designs that
            perfectly complement your space and lifestyle.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/create"
              className="rounded-full bg-[#9c673f] px-6 sm:px-8 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C] hover:shadow-2xl flex items-center gap-2"
            >
              Explore Collection <ArrowRight size={18} />
            </NavLink>

            <NavLink
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 sm:px-8 py-3 font-medium text-white backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D8BE8A] hover:bg-white hover:text-[#2D2D2D] hover:shadow-xl"
            >
              Contact Us
            </NavLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

