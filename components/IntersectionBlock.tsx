
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Map, Wind, ShieldCheck, Leaf, ArrowRight, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface IntersectionBlockProps {
  onNavigate?: () => void;
  lang: Language;
}

const IntersectionBlock: React.FC<IntersectionBlockProps> = ({ onNavigate, lang }) => {
  const [active, setActive] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = translations[lang].markers;

  const points = [
    { 
      id: 1, 
      x: '82%', 
      y: '62%', 
      icon: <Sun size={20} />, 
      title: t.green.title, 
      desc: t.green.desc,
      badge: t.green.badge
    },
    { 
      id: 2, 
      x: '45%', 
      y: '65%', 
      icon: <Map size={24} />, 
      title: t.plan.title, 
      desc: t.plan.desc,
      badge: t.plan.badge
    },
    { 
      id: 3, 
      x: '12%', 
      y: '55%', 
      icon: <ShieldCheck size={20} />, 
      title: t.security.title, 
      desc: t.security.desc,
      badge: t.security.badge
    },
    { 
      id: 4, 
      x: '75%', 
      y: '35%', 
      icon: <Wind size={20} />, 
      title: t.climate.title, 
      desc: t.climate.desc,
      badge: t.climate.badge
    },
  ];

  const handleMouseEnter = (id: number) => {
    if (window.innerWidth < 768) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActive(id);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setActive(null);
    }, 300);
  };

  const handlePointClick = (id: number) => {
    setActive(active === id ? null : id);
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
            <Leaf size={14} />
            Construction Innovation
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-black mb-4 dark:text-white tracking-tight">{t.title}</h2>
          <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] md:aspect-[21/9] z-10">
            
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white dark:border-slate-800 z-0">
              <img 
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=2000" 
                alt="Modern House" 
                className={`w-full h-full object-cover transition-all duration-1000 ${active !== null ? 'brightness-[0.4] scale-105' : 'brightness-100 scale-100'}`}
              />
              <div className="absolute inset-0 bg-blue-950/10 pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 z-20">
              {points.map((p) => (
                <div 
                  key={p.id} 
                  className="absolute" 
                  style={{ left: p.x, top: p.y }}
                  onMouseEnter={() => handleMouseEnter(p.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.button
                    onClick={() => handlePointClick(p.id)}
                    whileHover={{ scale: 1.15 }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-2xl ring-4 ring-white/20 backdrop-blur-md transition-all duration-500 relative z-30 ${active === p.id ? 'bg-blue-600 scale-110 ring-blue-500/50' : 'bg-slate-900/60'}`}
                  >
                    {p.icon}
                  </motion.button>
                  
                  {/* Unified Popup Logic for Mobile and Desktop */}
                  <AnimatePresence>
                    {active === p.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                        className="absolute bottom-full left-1/2 mb-4 md:mb-8 w-[280px] md:w-[420px] bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] z-[60] overflow-hidden border border-slate-100 dark:border-slate-800 p-6 md:p-10 text-left"
                      >
                        <div className="flex justify-between items-start mb-4 md:mb-8">
                          <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm">
                            {/* Fix: Cast icon to ReactElement<any> to allow dynamic prop injection */}
                            {React.cloneElement(p.icon as React.ReactElement<any>, { size: window.innerWidth < 768 ? 20 : 24 })}
                          </div>
                          <span className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#10b981] bg-[#ecfdf5] dark:bg-[#10b981]/10 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl">
                            {p.badge}
                          </span>
                        </div>
                        
                        <h4 className="text-xl md:text-3xl font-display font-black text-slate-900 dark:text-white mb-2 md:mb-4 tracking-tight leading-tight">
                          {p.title}
                        </h4>
                        
                        <p className="text-xs md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6 md:mb-10 font-medium">
                          {p.desc}
                        </p>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.();
                          }}
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs md:text-base uppercase tracking-widest group/btn"
                        >
                          LEARN MORE
                          <ArrowRight size={window.innerWidth < 768 ? 16 : 22} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                        </button>
                        
                        {/* Triangle - Hidden on mobile to keep centered nicely */}
                        <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white dark:border-t-slate-900"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile bottom hint instead of block */}
          <div className="md:hidden text-center mt-4">
            {!active && (
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? 'Tap markers to explore' : lang === 'uk' ? 'Натисніть на маркери' : 'Нажмите на маркеры'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntersectionBlock;
