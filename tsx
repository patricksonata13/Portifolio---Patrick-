// app/page.tsx - Seção de Créditos Profissional
'use client'
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState('sobre')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Dados dos créditos
  const creditos = [
    {
      id: 1,
      programa: "Humor Negro - TV Globo",
      episodio: "T1:E5 - My Sista, Meus Brother",
      duracao: "26 min | 2023",
      descricao: "Abaixo o ciúme! No palco, Niny e Maíra destacam o que importa numa amizade. A dupla convidada, Marcelo Magano e Patrick Sonata, mostram situações que só a intimidade proporciona.",
      genero: "Humor, Stand-Up",
      imagem: "/humor-negro-creditos.png" // Substitua pelo caminho real da sua imagem
    },
    {
      id: 2,
      programa: "Zorra - TV Globo",
      episodio: "Equipe de Escritores",
      duracao: "Temporada 2023",
      descricao: "Programa escrito por equipe de talentosos comediantes e escritores, incluindo Patrick Sonata na equipe criativa.",
      genero: "Humor, Variedades",
      imagem: "/zorra-creditos.png" // Substitua pelo caminho real da sua imagem
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Seção de Créditos */}
      {activeTab === 'creditos' && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Créditos na TV
            </h2>
            <p className="text-gray-300 text-lg">
              Minha trajetória nos programas de humor da TV Globo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {creditos.map((credito) => (
              <div key={credito.id} className="group relative">
                {/* Card Principal */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 group-hover:border-amber-400/30">
                  {/* Header do Card */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-amber-300 mb-2">
                      {credito.programa}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="bg-gray-700 px-3 py-1 rounded-full">
                        {credito.episodio}
                      </span>
                      <span>{credito.duracao}</span>
                    </div>
                  </div>

                  {/* Imagem com overlay profissional */}
                  <div className="relative mb-6 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 relative">
                      {/* Placeholder - substitua pela sua imagem real */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-gray-900 text-2xl">🎬</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {credito.programa}
                          </p>
                        </div>
                      </div>
                      
                      {/* Overlay profissional */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Botão de visualização */}
                      <button 
                        onClick={() => setSelectedImage(credito.imagem)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-amber-400 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-amber-300"
                      >
                        Visualizar Crédito
                      </button>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      {credito.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <span className="text-amber-400 text-sm font-medium">
                        {credito.genero}
                      </span>
                      <span className="text-gray-400 text-sm">
                        TV Globo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>

          {/* Modal para imagem ampliada */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-4xl max-h-full">
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white text-lg hover:text-amber-400"
                >
                  ✕ Fechar
                </button>
                
                {/* Container da imagem */}
                <div className="bg-gray-800 rounded-xl p-2">
                  <div className="relative">
                    {/* Substitua pela sua imagem real */}
                    <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-gray-900 text-4xl">📸</span>
                        </div>
                        <p className="text-gray-400">
                          Imagem dos créditos de {creditos.find(c => c.imagem === selectedImage)?.programa}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          (Substitua pela sua imagem real)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4 text-gray-400 text-sm">
                    Clique fora para fechar
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ... restante do código ... */}
    </div>
  )
}
