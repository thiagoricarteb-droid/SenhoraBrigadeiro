/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { 
  Cookie, 
  MapPin, 
  Instagram, 
  Send as WhatsApp, 
  Menu, 
  X,
  ChevronDown,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Animation wrapper component
const FadeIn = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const contactWhatsApp = (assunto: string) => {
    const phone = "5584994180426";
    const msg = encodeURIComponent(`Olá Areta! Vim pelo site da Senhora Brigadeiro e gostaria de saber sobre: ${assunto}.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="font-inter text-slate-800 bg-warm-cream min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#inicio" 
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src="https://i.postimg.cc/XYyWct1b/Whats-App-Image-2026-03-01-at-10-00-18.jpg" 
              alt="Logo" 
              className="w-12 h-12 rounded-full border-2 border-brand-pink object-cover shadow-sm" 
            />
            <div className="text-xl md:text-2xl font-playfair font-extrabold text-choco-brown tracking-tight">
              Senhora<span className="text-brand-pink">Brigadeiro</span>
            </div>
          </a>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#inicio" className="text-choco-brown hover:text-brand-pink font-medium transition">Início</a>
            <a href="#vitrine" className="text-choco-brown hover:text-brand-pink font-medium transition">Nossos Doces</a>
            <a href="#areta" className="text-choco-brown hover:text-brand-pink font-medium transition">Sobre Areta</a>
            <button 
              onClick={() => contactWhatsApp('Encomenda Geral')} 
              className="bg-brand-pink text-white px-6 py-2 rounded-full font-bold hover:bg-pink-400 transition shadow-md flex items-center gap-2"
            >
              <WhatsApp size={18} /> Encomendar
            </button>
          </div>

          {/* Botão Mobile */}
          <button 
            className="md:hidden text-choco-brown text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t border-gray-100 flex flex-col p-6 space-y-4 shadow-lg text-center"
          >
            <a href="#inicio" className="font-medium text-choco-brown" onClick={() => setIsMobileMenuOpen(false)}>Início</a>
            <a href="#vitrine" className="font-medium text-choco-brown" onClick={() => setIsMobileMenuOpen(false)}>Nossos Doces</a>
            <a href="#areta" className="font-medium text-choco-brown" onClick={() => setIsMobileMenuOpen(false)}>Sobre Areta</a>
            <button 
              onClick={() => {
                contactWhatsApp('Encomenda Geral');
                setIsMobileMenuOpen(false);
              }} 
              className="bg-brand-pink text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <WhatsApp size={18} /> Falar no WhatsApp
            </button>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section 
          id="inicio" 
          className="min-h-screen flex items-center pt-20 relative overflow-hidden"
          style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://i.postimg.cc/MGSGcW6r/Whats-App-Image-2026-03-01-at-10-12-22.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-6 text-center md:text-left relative z-10">
            <FadeIn className="md:w-2/3">
              <span className="bg-brand-pink text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg inline-block mb-6">
                Doceria Gourmet por Areta Martins
              </span>
              <h1 className="text-5xl md:text-7xl font-playfair font-extrabold text-white leading-tight">
                A Doçura que <span className="text-brand-pink">Encanta</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed italic">
                Artesanal, sofisticado e feito com amor. Descubra sabores inesquecíveis em Natal/RN.
              </p>
              <div className="mt-10">
                <button 
                  onClick={() => contactWhatsApp('Encomenda')} 
                  className="bg-brand-pink text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl flex items-center gap-3"
                >
                  <WhatsApp /> Fazer um Pedido
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Seção Vitrine de Produtos */}
        <section id="vitrine" className="py-24 bg-warm-cream">
          <div className="container mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-choco-brown italic">Nossa Vitrine Gourmet</h2>
              <p className="text-gray-500 mt-4 text-lg italic">Qualidade artesanal para momentos inesquecíveis.</p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Brigadeiros Premium */}
              <FadeIn className="bg-white rounded-3xl overflow-hidden shadow-lg group">
                <div className="h-80 overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/KkRRSbVW/Whats-App-Image-2026-02-21-at-18-02-07.jpg" 
                    alt="Brigadeiros" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-playfair font-bold text-choco-brown mb-3 border-b-2 border-brand-pink inline-block italic">Brigadeiros Premium</h3>
                  <p className="text-gray-600 text-sm mt-4 leading-relaxed italic">
                    Sabor intenso e texturas delicadas, boleados um a um com os melhores ingredientes. Do tradicional ao pistache, cada unidade é uma joia da confeitaria artesanal.
                  </p>
                </div>
              </FadeIn>

              {/* Ovos de Colher 2026 */}
              <FadeIn className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-pink/20 group relative transform md:-translate-y-6">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src="https://i.postimg.cc/MGSGcW6r/Whats-App-Image-2026-03-01-at-10-12-22.jpg" 
                    alt="Ovos de Colher" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  <span className="absolute top-4 left-4 bg-brand-pink text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">Páscoa 2026</span>
                </div>
                <div className="p-8 text-center bg-soft-pink/30">
                  <h3 className="text-2xl font-playfair font-bold text-brand-pink uppercase tracking-widest mb-3 italic">Ovos de Colher</h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed italic">
                    A nossa coleção de Páscoa 2026 une a delicadeza visual com recheios extremamente cremosos. Uma experiência sensorial completa.
                  </p>
                  <button 
                    onClick={() => contactWhatsApp('Tabela de Páscoa')} 
                    className="w-full py-4 bg-brand-pink text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-lg text-sm uppercase tracking-widest"
                  >
                    Solicitar Tabela
                  </button>
                </div>
              </FadeIn>

              {/* Presentes Luxo */}
              <FadeIn className="bg-white rounded-3xl overflow-hidden shadow-lg group">
                <div className="h-80 overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/R6NN5m8D/Whats-App-Image-2026-02-21-at-18-02-08-(1).jpg" 
                    alt="Presentes" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-playfair font-bold text-choco-brown mb-3 border-b-2 border-brand-pink inline-block italic">Presentes Luxo</h3>
                  <p className="text-gray-600 text-sm mt-4 leading-relaxed italic">
                    Embalagens sofisticadas e edições limitadas para presentear quem você ama com exclusividade e o verdadeiro sabor do afeto.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Seção Sobre Areta Martins (MANIFESTO) */}
        <section id="areta" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
              {/* Foto 1:1 Estilo Instagram High-Res */}
              <FadeIn className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md group">
                  <div className="absolute -inset-4 bg-soft-pink rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-700 opacity-60"></div>
                  <img 
                    src="https://i.postimg.cc/dVgLFzxc/Whats-App-Image-2026-03-01-at-11-08-24.jpg" 
                    alt="Areta Martins" 
                    className="relative w-full rounded-[1.5rem] shadow-2xl border-4 border-white aspect-square object-cover"
                    style={{
                      filter: 'contrast(1.08) saturate(1.15) brightness(1.02)'
                    }}
                  />
                </div>
              </FadeIn>
              
              {/* Bio Manifesto */}
              <FadeIn className="md:w-1/2">
                <h2 className="text-4xl font-playfair font-bold text-choco-brown mb-8 uppercase tracking-tighter italic">Quem provou, sabe...</h2>
                
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p className="font-bold text-choco-brown italic">Docinhos feitos para encantar, sem exageros...</p>
                  
                  <p className="italic">É sabido que os docinhos Senhora são preparados para quem aprecia sabor de verdade: equilibrados, delicados e jamais enjoativos. Cada receita é pensada para proporcionar uma experiência leve e marcante a cada mordida.</p>
                  
                  <p className="italic">Utilizamos ingredientes selecionados e de alta qualidade, respeitando cada etapa do preparo com extremo cuidado. A higiene, a segurança alimentar e o carinho artesanal fazem parte do nosso compromisso em entregar não apenas beleza mas excelência.</p>
                  
                  <p className="italic">Aqui, cada docinho é feito para ser lembrado — pelo sabor, pela textura macia e pela sensação de querer mais porque paladar não retrocede.</p>
                  
                  <p className="text-brand-pink font-extrabold text-xl font-playfair italic">Senhora Brigadeiro: a vida é mais doce aqui!</p>
                  
                  <div className="pt-6">
                    <p className="text-gray-500 italic">Com amor e doçura,</p>
                    <p className="text-2xl font-playfair font-bold text-choco-brown italic">Areta Martins</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Chamada de Contato */}
        <section className="py-24 bg-choco-brown relative overflow-hidden text-center text-white">
          <div className="container mx-auto px-6 relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8 italic">Paladar não retrocede. Experimente a excelência.</h2>
              <button 
                onClick={() => contactWhatsApp('Encomenda')} 
                className="bg-green-500 hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto"
              >
                <WhatsApp size={24} /> Encomendar via WhatsApp
              </button>
              <div className="mt-12">
                <a 
                  href="https://www.instagram.com/senhorabrigadeiro.natal/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-brand-pink transition flex items-center justify-center gap-2"
                >
                  <Instagram size={20} /> @senhorabrigadeiro.natal
                </a>
              </div>
            </FadeIn>
          </div>
          {/* Decoração */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink opacity-10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-pink-100 text-center">
        <div className="container mx-auto px-6">
          <img 
            src="https://i.postimg.cc/XYyWct1b/Whats-App-Image-2026-03-01-at-10-00-18.jpg" 
            alt="Logo" 
            className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-brand-pink object-cover shadow-sm" 
          />
          <div className="text-2xl font-playfair font-extrabold text-choco-brown mb-4 italic italic">Senhora Brigadeiro</div>
          <p className="text-gray-400 text-sm mb-6 italic italic">&copy; 2026 Senhora Brigadeiro | Natal-RN. By Areta Martins.</p>
          
          <div className="flex justify-center space-x-8 text-choco-brown mb-8">
            <a href="https://www.instagram.com/senhorabrigadeiro.natal/" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition">
              <Instagram size={28} />
            </a>
            <a href="https://wa.me/5584994180426" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition">
              <WhatsApp size={28} />
            </a>
          </div>
          
          {/* Webmaster Eudoxmedia */}
          <div className="mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Webmaster: <a href="https://eudoxmedia.com.br/" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition">Eudoxmedia</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

