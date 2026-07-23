import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Compass,
  HeartHandshake,
  Palette,
  Sofa,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Hero from "../components/Hero";
import Navbar from "../components/layout/Navbar";
import WhyChoose from "../components/WhyChoose";
import WhatCanCreate from "../components/WhatCanCreate";
import HowItWorks from "../components/HowItWorks";
import DesignShowcase from "../components/DesignShowcase";
import Cta from "../components/Cta";

const Home = () => {
  return (

    <div id="home" className="w-full min-h-screen overflow-x-hidden block">
      <Navbar />
      <Hero />
      <WhatCanCreate />
      <WhyChoose />
      <HowItWorks />
      <DesignShowcase />
      <Cta />
    </div>
  );
};

export default Home;
