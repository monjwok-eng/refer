import React from 'react';
import { motion } from 'motion/react';

// Use static path pointing to the public folder
const showcaseImage = "/showcase.png";

export default function DashboardShowcase() {
  return (
    <div className="relative w-full overflow-hidden bg-[#050505] pt-12 pb-20 px-4 md:px-8 flex flex-col items-center border-b border-white/[0.02]">
      {/* Radial ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[750px] h-[350px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-blue-500/5 blur-[110px] rounded-full pointer-events-none" />

      {/* Main Image Wrapper Container */}
      <div className="relative w-full max-w-[1000px] mx-auto flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-xl overflow-hidden border border-white/[0.08]"
          style={{
            boxShadow: "0 25px 55px -12px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset"
          }}
        >
          <img 
            src={showcaseImage} 
            alt="Referr Dashboard Showcase" 
            className="w-full h-auto object-cover block"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
}
