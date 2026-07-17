import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroImg from "../assets/images/hero.jfif";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <section className="relative h-svh overflow-hidden">
      {/* Background Image */}
      <motion.img
        src={heroImg}
        alt="Furniture"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
        className="absolute inset-0 h-full w-full object-cover blur-[1.5px] scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative Blur */}
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#C89B6D]/40 blur-[150px]" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center mt-8 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="mt-0 text-5xl font-bold leading-[1.08] tracking-tight text-[#f8f8ec] sm:text-6xl lg:text-7xl">
            <span className="text-[#dcd5c9]"> Transform Your</span>
            <br />
            <span className="text-[#242221f5]">
              Dream Living Space Into Reality
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
            Create beautiful, personalized furniture concepts with the power of
            AI. Transform your ideas into elegant, functional designs that
            perfectly complement your space and lifestyle.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Navlink
              to="/create"
              icon={ArrowRight}
              className="rounded-full bg-[#9c673f] px-8 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C] hover:shadow-2xl"
            >
              Explore Collection
            </Navlink>

            <Navlink
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-medium text-white backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D8BE8A] hover:bg-white hover:text-[#2D2D2D] hover:shadow-xl"
            >
              Contact Us
            </Navlink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
