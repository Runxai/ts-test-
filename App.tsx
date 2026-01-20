
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from './types';
import { translations } from './translations';
import Calculator from './components/Calculator';
import IntersectionBlock from './components/IntersectionBlock';
import DetailsPage from './components/DetailsPage';
import BlueprintVisual from './components/BlueprintVisual';
import LogoShowcase from './components/LogoShowcase';
import { 
  Sun, Moon, ChevronRight, MapPin, 
  Sparkles, Hammer, Key, 
  DollarSign, Ruler, X, Check, ArrowUpRight, FileText,
  Home, Menu, ArrowUp, Cpu, Mic
} from 'lucide-react';

// Fix: Correctly extending JSX IntrinsicElements within the React namespace to ensure custom elements are recognized by TypeScript in newer React environments.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
      }
    }
  }
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<'home' | 'details'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startAICall = () => {
    const widget = document.querySelector('elevenlabs-convai') as any;
    if (!widget) {
      console.error("Widget not found");
      return;
    }

    const shadow = widget.shadowRoot;
    if (shadow) {
      // Try multiple selectors to find the trigger button inside the widget's shadow DOM
      const trigger = shadow.querySelector('button') || shadow.querySelector('[role="button"]') || shadow.querySelector('div[aria-label*="Start"]');
      if (trigger) {
        trigger.click();
        return;
      }
    }
    
    // Fallback: Click the widget itself
    widget.click();
  };

  const handleNavigateToDetails = () => {
    setView('details');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsIcons = [
    <DollarSign size={18} />,
    <MapPin size={18} />,
    <Ruler size={18} />,
    <Hammer size={18} />,
    <Key size={18} />
  ];

  const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full border border-slate-200 dark:border-slate-700 ${mobile ? 'scale-90 md:scale-100' : ''}`}>
      {['en', 'uk', 'ru'].map((l) => (
        <button 
          key={l}
          onClick={() => setLang(l as Language)}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-full text-[9px] md:text-[10px] font-bold uppercase transition-all flex items-center justify-center ${lang === l ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-500 overflow-x-hidden font-sans">
      <elevenlabs-convai agent-id="agent_4401kfcv805xfb1bp5vbtnnwhv57"></elevenlabs-convai>

      <nav className="fixed top-0 w-full z-[100] glass border-b border-slate-200/50 dark:border-slate-800/50 px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={handleBackToHome}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden relative">
            <motion.div
              whileHover={{ y: -4, scale: 1.15, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative z-10"
            >
              <Home size={24} strokeWidth={2.5} />
            </motion.div>
          </div>
          <span className="font-display font-bold text-base md:text-xl tracking-tighter dark:text-white uppercase">TERRA RISE</span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-4">
          <LanguageSwitcher mobile={true} />
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-slate-900 dark:text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-white dark:bg-slate-950 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Home size={20} />
                </div>
                <span className="font-display font-bold text-lg dark:text-white uppercase tracking-tighter">TERRA RISE</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={28} className="dark:text-white" /></button>
            </div>
            <div className="flex flex-col gap-8 flex-grow">
              <div className="flex flex-col gap-6">
                {['About', 'Price', 'Styles', 'Chat'].map((item) => (
                  <button key={item} className="text-4xl font-display font-black text-left dark:text-white tracking-tight" onClick={() => setIsMenuOpen(false)}>{item}</button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="pt-24 md:pt-44 pb-12 md:pb-28 px-4 md:px-6 relative overflow-hidden bg-white dark:bg-brand-dark">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
                    <Sparkles size={14} className="animate-pulse" />
                    {t.badCredit}
                  </div>
                  <h1 className="text-4xl md:text-7xl font-display font-black leading-[1.1] mb-8 dark:text-white tracking-tight">
                    {t.hero.title.split('.').map((s, i) => i === 0 ? <span key={i}>{s}.<br/></span> : <span key={i} className="text-blue-600">{s}</span>)}
                  </h1>
                  <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">{t.hero.subtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button onClick={handleNavigateToDetails} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                      {t.hero.cta}
                      <ChevronRight size={20} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={startAICall} 
                      className="px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 shadow-sm group/ai"
                    >
                      <Mic size={20} className="text-blue-600 group-hover/ai:scale-110 transition-transform" />
                      {t.hero.ai}
                    </button>
                  </div>
                </motion.div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" className="relative rounded-[2rem] md:rounded-[3rem] shadow-2xl border-8 border-white dark:border-slate-800 z-10 object-cover aspect-[4/3] lg:aspect-auto" alt="Home" />
                </div>
              </div>
            </section>

            <section id="about" className="py-16 md:py-32 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/10 flex flex-col items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-12 md:mb-20">
                  <h2 className="text-4xl md:text-6xl font-display font-black mb-6 dark:text-white tracking-tight">{t.steps.title}</h2>
                  <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="relative flex flex-col gap-4 md:grid md:grid-cols-5 md:gap-6 md:items-start">
                  {[1, 2, 3, 4, 5].map((num, i) => (
                    <motion.div key={num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true, margin: "-50px" }} className="flex md:flex-col gap-5 md:gap-8 items-center md:items-center relative z-10">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 relative transition-transform hover:scale-110">
                        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-slate-800">{num}</span>
                        <div className="text-blue-600 md:scale-125">{stepsIcons[i]}</div>
                      </div>
                      <div className="flex-grow md:text-center">
                        <h3 className="text-sm md:text-lg font-display font-black dark:text-white uppercase tracking-tight mb-1 leading-tight">{t.steps[`step${num}`].title}</h3>
                        <p className="text-[11px] md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed md:px-4">{t.steps[`step${num}`].desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <Calculator lang={lang} />
            <IntersectionBlock lang={lang} onNavigate={handleNavigateToDetails} />
            <LogoShowcase dark={isDark} />
          </motion.main>
        ) : (
          <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DetailsPage />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 md:py-28 px-4 md:px-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-[1.2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl">
          <Home size={30} />
        </div>
        <h3 className="text-3xl md:text-5xl font-display font-black mb-6 dark:text-white tracking-tight uppercase">Terra Rise.</h3>
        <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.4em]">© 2025 Architectural Unit. Chicago Standards.</p>
      </footer>
    </div>
  );
};

export default App;
