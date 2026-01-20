
import React from 'react';
import { motion } from 'framer-motion';

const LogoShowcase: React.FC<{ dark: boolean }> = ({ dark }) => {
  const logos = [
    {
      name: 'The Monogram',
      render: (isDark: boolean) => (
        <div className={`p-10 rounded-3xl flex flex-col items-center gap-4 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl border ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-blue-500/30 overflow-hidden relative group cursor-pointer">
            <span className="relative z-10">TR</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight dark:text-white">TERRA RISE</span>
        </div>
      )
    },
    {
      name: 'The Foundation',
      render: (isDark: boolean) => (
        <div className={`p-10 rounded-3xl flex flex-col items-center gap-4 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl border ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
           <div className="flex gap-1.5 items-end h-16">
              <div className="w-4 h-8 bg-blue-400 rounded-full"></div>
              <div className="w-4 h-14 bg-blue-600 rounded-full"></div>
              <div className="w-4 h-11 bg-amber-500 rounded-full"></div>
           </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase dark:text-white">TERRA RISE</span>
        </div>
      )
    },
    {
      name: 'Modern Pinnacle',
      render: (isDark: boolean) => (
        <div className={`p-10 rounded-3xl flex flex-col items-center gap-4 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl border ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
               <path d="M10 80 L50 20 L90 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
               <rect x="35" y="55" width="30" height="25" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter dark:text-white italic">TERRA<span className="text-blue-600">RISE</span></span>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 dark:text-white">Brand Identity</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Three visual concepts for the Terra Rise ecosystem.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {logos.map((logo, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              {logo.render(dark)}
              <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{logo.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
