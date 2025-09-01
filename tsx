// app/page.tsx
'use client'
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState('sobre')

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-marinhoto-900 to-verde-montanha-800 text-white font-sans">
      {/* Header com onda carioca */}
      <header className="relative bg-gradient-to-r from-amarelo-sol-500 via-laranja-poesunset-600 to-rosa-poesunset-700 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-verde-montanha-800 font-bold text-xl">PS</span>
            </div>
            <h1 className="text-2xl font-bold drop-shadow-lg">Patrick Sonata</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {['sobre', 'projetos', 'creditos', 'carioca', 'contato'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-verde-montanha-800 shadow-lg' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Onda carioca */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  opacity=".25" 
                  className="fill-azul-marinhoto-900"></path>
            <path d="M0,0 V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                  opacity=".5" 
                  className="fill-azul-marinhoto-800"></path>
            <path d="M0,0 V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                  className="fill-azul-marinhoto-700"></path>
          </svg>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-12">
        {/* Seção Sobre */}
        {activeTab === 'sobre' && (
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amarelo-sol-500 to-laranja-poesunset-600 bg-clip-text text-transparent">
                Da Cidade de Deus para o Mundo
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                Nascido e criado na <strong className="text-amarelo-sol-400">Cidade de Deus</strong>, 
                Rio de Janeiro, aprendi desde cedo a transformar desafios em oportunidades. 
                Minha jornada me levou das ruas vibrantes do Rio para os estúdios da Globo, 
                unindo <strong className="text-verde-montanha-400">tecnologia</strong> e 
                <strong className="text-laranja-poesunset-400"> criatividade</strong>.
              </p>
              
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4 text-amarelo-sol-300">Jornada Criativa</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-verde-montanha-400 rounded-full mr-3"></span>
                    Escritor no <strong>Humor Negro</strong> e <strong>Zorra</strong> (TV Globo)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-azul-marinhoto-400 rounded-full mr-3"></span>
                    Desenvolvedor Full Stack especializado em Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-laranja-poesunset-400 rounded-full mr-3"></span>
                    Produtor de conteúdo com raízes na cultura carioca
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-azul-marinhoto-600 to-verde-montanha-700 p-1 rounded-2xl">
                <div className="bg-azul-marinhoto-900 rounded-2xl p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-amarelo-sol-500 to-laranja-poesunset-600 rounded-full flex items-center justify-center">
                    <span className="text-azul-marinhoto-900 text-4xl font-bold">PS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-amarelo-sol-300">Patrick Sonata</h3>
                  <p className="text-verde-montanha-300">Criador de Possibilidades</p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amarelo-sol-400">5+</div>
                      <div className="text-sm text-verde-montanha-300">Anos de Experiência</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amarelo-sol-400">50+</div>
                      <div className="text-sm text-verde-montanha-300">Projetos Entregues</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Adicione as outras seções aqui... */}
      </main>

      {/* Adicione o CSS personalizado no globals.css */}
      <style jsx global>{`
        :root {
          --azul-marinhoto-900: #1a3a5f;
          --azul-marinhoto-800: #2a4b6a;
          --azul-marinhoto-700: #3a5c7a;
          --azul-marinhoto-600: #4a6d8a;
          --verde-montanha-800: #2d5a4d;
          --verde-montanha-700: #3d6b5d;
          --verde-montanha-600: #4d7c6d;
          --verde-montanha-400: #6d9e8d;
          --verde-montanha-300: #8dbead;
          --amarelo-sol-500: #ffd700;
          --amarelo-sol-400: #ffe74c;
          --amarelo-sol-300: #fff799;
          --laranja-poesunset-600: #ff6b35;
          --laranja-poesunset-500: #ff8c5a;
          --laranja-poesunset-400: #ffad8a;
          --rosa-poesunset-700: #d44d7a;
        }
        
        .bg-azul-marinhoto-900 { background-color: var(--azul-marinhoto-900); }
        .bg-azul-marinhoto-800 { background-color: var(--azul-marinhoto-800); }
        .bg-azul-marinhoto-700 { background-color: var(--azul-marinhoto-700); }
        .bg-azul-marinhoto-600 { background-color: var(--azul-marinhoto-600); }
        
        .bg-verde-montanha-800 { background-color: var(--verde-montanha-800); }
        .bg-verde-montanha-700 { background-color: var(--verde-montanha-700); }
        .bg-verde-montanha-600 { background-color: var(--verde-montanha-600); }
        
        .text-verde-montanha-400 { color: var(--verde-montanha-400); }
        .text-verde-montanha-300 { color: var(--verde-montanha-300); }
        
        .bg-amarelo-sol-500 { background-color: var(--amarelo-sol-500); }
        .text-amarelo-sol-500 { color: var(--amarelo-sol-500); }
        .text-amarelo-sol-400 { color: var(--amarelo-sol-400); }
        .text-amarelo-sol-300 { color: var(--amarelo-sol-300); }
        
        .bg-laranja-poesunset-600 { background-color: var(--laranja-poesunset-600); }
        .text-laranja-poesunset-600 { color: var(--laranja-poesunset-600); }
        .text-laranja-poesunset-500 { color: var(--laranja-poesunset-500); }
        .text-laranja-poesunset-400 { color: var(--laranja-poesunset-400); }
        
        .bg-rosa-poesunset-700 { background-color: var(--rosa-poesunset-700); }
      `}</style>
    </div>
  )
}
