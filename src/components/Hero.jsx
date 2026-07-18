// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";
// import heroImg from "../assets/images/hero.jfif";
// import { ArrowRight } from "lucide-react";

// const Hero = () => {
//   return (
//     // Mobile landscape ke liye py-20 aur min-h lagaya hai taake text cut na ho, sm (desktop) par h-svh ho jayega
//     <section className="relative min-h-[600px] sm:h-svh flex items-center overflow-hidden py-20 sm:py-0">
//       {/* Background Image */}
//       <motion.img
//         src={heroImg}
//         alt="Furniture"
//         initial={{ scale: 1.08 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 8 }}
//         // object-cover image ko adjust rakhta hai bina distort kiye
//         className="absolute inset-0 h-full w-full object-cover blur-[1.5px]"
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Decorative Blur */}
//       <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#C89B6D]/30 blur-[150px]" />

//       {/* mx-auto ke saath px-4 (mobile ke liye) aur sm:px-8 lagaya hai taake text left se space le */}
//       <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 45 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-2xl w-full"
//         >
//           {/* Text colors ko light kiya hai taake dark background par readable ho */}
//           <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-[#f8f8ec] sm:text-6xl lg:text-7xl">
//             <span className="text-[#dcd5c9]">Transform Your</span>
//             <br />
//             <span className="text-[#e2dcd0]">
//               Dream Living Space Into Reality
//             </span>
//           </h1>
//           <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-white/90">
//             Create beautiful, personalized furniture concepts with the power of
//             AI. Transform your ideas into elegant, functional designs that
//             perfectly complement your space and lifestyle.
//           </p>

//           <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
//             <NavLink
//               to="/create"
//               className="rounded-full bg-[#9c673f] px-6 sm:px-8 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C] hover:shadow-2xl flex items-center gap-2"
//             >
//               Explore Collection <ArrowRight size={18} />
//             </NavLink>

//             <NavLink
//               to="/contact"
//               className="rounded-full border border-white/30 bg-white/10 px-6 sm:px-8 py-3 font-medium text-white backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D8BE8A] hover:bg-white hover:text-[#2D2D2D] hover:shadow-xl"
//             >
//               Contact Us
//             </NavLink>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import heroImg from "../assets/images/hero.jfif";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    // Height ko poori screen ka (h-svh) aur padding ko khatam kar ke 'py-0' kiya hai
    <section className="relative h-svh flex items-center overflow-hidden pt-12">
      {/* Background Image */}
      <motion.img
        src={heroImg}
        alt="Furniture"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
        className="absolute inset-0 h-full w-full object-cover blur-[1px]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Decorative Blur - thodi si intensity aur kam ki */}
      <div className="absolute -left-20 top-16 h-60 w-60 rounded-full bg-[#C89B6D]/20 blur-[120px]" />

      {/* Munasib padding 'px-5' aur landscape fix, flex items-center content ko vertical center rakhega */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl w-full"
        >
          {/* Text size munasib chota kiya hai (text-4xl) aur landscape/desktop me text-5xl/text-6xl tak jaye ga */}
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-[#f8f8ec] sm:text-5xl lg:text-6xl">
            <span className="text-[#dcd5c9]">Transform Your</span>
            <br />
            <span className="text-[#e2dcd0]">
              Dream Living Space Into Reality
            </span>
          </h1>

          {/* Paragraph ko text-base kiya hai clean readability ke liye */}
          <p className="mt-4 sm:mt-5 max-w-lg text-base leading-relaxed text-white/85">
            Create beautiful, personalized furniture concepts with the power of
            AI. Transform your ideas into elegant, functional designs that
            perfectly complement your space and lifestyle.
          </p>

          {/* Buttons spacing compact kar di hain */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/create"
              className="rounded-full bg-[#9c673f] px-6 sm:px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B5E3C] hover:shadow-lg flex items-center gap-2"
            >
              Explore Collection <ArrowRight size={16} />
            </NavLink>

            <NavLink
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 sm:px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8BE8A] hover:bg-white hover:text-[#2D2D2D] hover:shadow-lg"
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