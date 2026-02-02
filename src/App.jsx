import React, { useState } from 'react';
import { Globe, BookOpen, Users, Mail, ChevronDown, CheckCircle2, Calendar, Sun, Moon, User, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { content as rawContent } from './data/content';
import heroBg from './assets/hero_background.png';

const mergeDeep = (target, source) => {
  if (source === undefined) return target;
  const isObject = (item) => (item && typeof item === 'object');

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  if (Array.isArray(target)) {
    if (!Array.isArray(source)) return source;
    return target.map((item, i) => mergeDeep(item, source[i]));
  }

  const output = Object.assign({}, target);
  Object.keys(source).forEach(key => {
    if (key in target) {
      output[key] = mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

const content = {
  de: rawContent.de,
  fr: mergeDeep(rawContent.de, rawContent.fr)
};

const Navbar = ({ lang, setLang, theme, toggleTheme }) => {
  const t = content[lang].nav;
  return (
    <nav className="fixed w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-serif font-bold text-text-primary tracking-wider transition-colors">Poésie<span className="text-brand-red">.</span></span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['home', 'about', 'contributors', 'timeline', 'team'].map((item) => (
                <a key={item} href={`#${item}`} className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t[item]}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-glass hover:bg-glass-strong transition-all text-text-primary border border-border-subtle mr-2 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setLang(lang === 'de' ? 'fr' : 'de')}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-glass hover:bg-glass-strong transition-all text-sm font-bold border border-border-subtle text-text-primary cursor-pointer"
            >
              <Globe size={16} />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang }) => {
  const t = content[lang].hero;
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/60 to-bg-primary transition-colors duration-300" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-10 font-light tracking-wide transition-colors">
            {t.subtitle}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Removed Primary CTA as per user request */}
            <a href="#about" className="btn-secondary">
              {t.cta_secondary}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-text-primary/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const About = ({ lang }) => {
  const t = content[lang].about;
  return (
    <section id="about" className="py-20 bg-bg-primary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-text-primary flex items-center justify-center sm:justify-start gap-3 transition-colors">
              <BookOpen className="text-brand-blue" />
              {t.title}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed transition-colors">
              {t.description}
            </p>
          </motion.div>

          <div className="w-full h-px bg-border-subtle" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-brand-gold flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle2 size={24} />
              {t.goals_title}
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed transition-colors">
              {t.goals}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contributors = ({ lang }) => {
  const t = content[lang].contributors;

  const PersonCard = ({ person, index }) => {
    const isTBA = person.name === "TBA" || person.name === "À annoncer";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className={`
          p-3 rounded-lg border transition-all duration-300
          ${isTBA
            ? 'bg-bg-primary/20 border-border-subtle/30 opacity-50'
            : 'bg-glass border-border-subtle hover:border-brand-gold/40'
          }
        `}
      >
        <h3 className={`font-semibold mb-1 transition-colors text-sm ${isTBA ? 'text-text-secondary/60' : 'text-text-primary'}`}>
          {person.name}
        </h3>
        <p className={`text-xs transition-colors ${isTBA ? 'text-text-secondary/40' : 'text-text-secondary'}`}>
          {person.bio}
        </p>
        {person.website && (
          <a
            href={person.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-gold text-xs mt-2 transition-colors"
          >
            Website <ExternalLink size={12} />
          </a>
        )}
      </motion.div>
    );
  };

  return (
    <section id="contributors" className="py-16 bg-bg-primary/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3 text-text-primary inline-flex items-center gap-3 transition-colors">
            <User className="text-brand-red" size={28} />
            {t.title}
          </h2>
          <p className="text-base text-text-secondary">{t.subtitle}</p>
        </motion.div>

        <div className="space-y-6">
          {/* German Authors */}
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-40 flex-shrink-0"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {t.germanAuthors.title}
                <span className="text-xs font-normal text-text-secondary ml-2">({t.germanAuthors.count})</span>
              </h3>
            </motion.div>
            <div className="flex-1 grid md:grid-cols-3 gap-3">
              {t.germanAuthors.people.map((person, idx) => (
                <PersonCard key={idx} person={person} index={idx} />
              ))}
            </div>
          </div>

          {/* French Authors */}
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-40 flex-shrink-0"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {t.frenchAuthors.title}
                <span className="text-xs font-normal text-text-secondary ml-2">({t.frenchAuthors.count})</span>
              </h3>
            </motion.div>
            <div className="flex-1 grid md:grid-cols-3 gap-3">
              {t.frenchAuthors.people.map((person, idx) => (
                <PersonCard key={idx} person={person} index={idx} />
              ))}
            </div>
          </div>

          {/* Translators */}
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-40 flex-shrink-0"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {t.translators.title}
                <span className="text-xs font-normal text-text-secondary ml-2">({t.translators.count})</span>
              </h3>
            </motion.div>
            <div className="flex-1 grid md:grid-cols-3 gap-3">
              {t.translators.people.map((person, idx) => (
                <PersonCard key={idx} person={person} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Timeline = ({ lang }) => {
  const t = content[lang].timeline;
  return (
    <section id="timeline" className="py-20 bg-bg-primary/30 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-text-primary text-center flex items-center justify-center gap-3 transition-colors"
        >
          <Calendar className="text-brand-red" />
          {t.title}
        </motion.h2>

        {t.note && (
          <p className="text-center text-text-secondary mb-16 italic">
            {t.note}
          </p>
        )}

        <div className="space-y-12">
          {t.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-0"
            >
              {/* Line connecting steps */}
              {idx !== t.steps.length - 1 && (
                <div className="absolute left-[11px] sm:left-1/2 top-8 bottom-[-48px] w-0.5 bg-border-subtle transform sm:-translate-x-1/2" />
              )}

              <div className={`flex flex-col sm:flex-row items-start ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-8 group`}>
                <div className="flex-1 w-full">
                  <div className={`card h-full ${idx % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} bg-glass hover:border-brand-blue/20`}>
                    <div className="text-brand-gold font-bold mb-2">{step.date}</div>
                    <h3 className="text-xl font-bold text-text-primary mb-3 transition-colors">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed transition-colors">{step.description}</p>
                  </div>
                </div>

                <div className="absolute left-0 sm:static flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-brand-blue border-4 border-bg-secondary z-10 group-hover:bg-brand-red transition-colors duration-300" />
                </div>

                <div className="hidden sm:block flex-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = ({ lang }) => {
  const t = content[lang].team;
  return (
    <section id="team" className="py-20 bg-bg-primary/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-text-primary inline-flex items-center gap-3 transition-colors"
        >
          <Users className="text-brand-red" />
          {t.title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card group hover:border-brand-blue/30 overflow-hidden p-0"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-bg-secondary">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-6xl font-serif font-bold text-gray-200">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2 transition-colors">{member.name}</h3>
                <p className="text-brand-gold font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => {
  const t = content[lang].footer;
  return (
    <footer id="contact" className="bg-bg-secondary py-12 border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-6 mb-8">
          <Mail size={24} className="text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
          {/* Add more social icons here */}
        </div>
        <p className="text-text-secondary text-sm transition-colors">
          {t.rights}
        </p>
      </div>
    </footer>
  );
};

function App() {
  const [lang, setLang] = useState(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang?.toLowerCase().startsWith('fr') ? 'fr' : 'de';
  });
  // Initialize from system preference
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  // Listen for system preference changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'light' : 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-brand-red selection:text-white transition-colors duration-300">
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Contributors lang={lang} />
        <Timeline lang={lang} />
        <Team lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default App;
