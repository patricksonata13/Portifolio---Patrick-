'use client'
import { useState } from "react"

export default function Home() {
  const [activeSection, setActiveSection] = useState('galeria') // Alterado para mostrar a galeria por padrão
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState('tv')
  const [uploading, setUploading] = useState(false)

  // Dados das imagens organizadas por categoria
  const galeria = {
    tv: [
      { id: 1, src: "/images/tv/zorra.png", title: "Zorra - TV Globo", desc: "Equipe de roteiristas (2019-2021)" },
      { id: 2, src: "/images/tv/humor-negro.png", title: "Humor Negro", desc: "Globoplay - Participação especial" },
      { id: 3, src: "/images/tv/pablo-luisao.png", title: "Pablo & Luisão", desc: "Globoplay 2025 - Roteirista" }
    ],
    teatro: [
      { id: 4, src: "/images/teatro/shell.png", title: "Prêmio Shell", desc: "Indicado por Pelada (2022)" },
      { id: 5, src: "/images/teatro/bonobando.png", title: "Bonobando", desc: "Cidade Correria (2016-2018)" },
      { id: 6, src: "/images/teatro/jongo.png", title: "Jongo Mamulengo", desc: "Espetáculo infanto-juvenil" }
    ],
    shows: [
      { id: 7, src: "/images/shows/provar.png", title: "Show de Humor", desc: "Pra Provar Que Eu Não Minto (2023)" },
      { id: 8, src: "/images/shows/originais.png", title: "Originais da Comédia", desc: "Cidade de Deus (2022)" }
    ],
    formacao: [
      { id: 9, src: "/images/formacao/palhacaria.png", title: "Palhaçaria", desc: "Formação clássica" },
      { id: 10, src: "/images/formacao/trajetoria.png", title: "Trajetória", desc: "20 anos de carreira" }
    ]
  }

  // Função para simular upload (em uma aplicação real, isso se conectaria a um backend)
  const handleUpload = async () => {
    setUploading(true)
    // Simulando um upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    setUploading(false)
    alert('Upload simulado com sucesso! Em uma aplicação real, isso enviaria a imagem para o servidor.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header de navegação */}
      <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-400">Portfólio</div>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveSection('inicio')} 
              className={`hover:text-amber-400 transition ${activeSection === 'inicio' ? 'text-amber-400' : ''}`}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveSection('galeria')} 
              className={`hover:text-amber-400 transition ${activeSection === 'galeria' ? 'text-amber-400' : ''}`}
            >
              Galeria
            </button>
          </div>
        </nav>
      </header>

      {/* Seção Galeria */}
      {activeSection === 'galeria' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-amber-400 mb-8 text-center">Galeria</h2>
            
            {/* Filtros por Categoria */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(galeria).map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCurrentCategory(categoria)}
                  className={`px-6 py-3 rounded-full transition ${
                    currentCategory === categoria
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </button>
              ))}
            </div>

            {/* Grid de Imagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galeria[currentCategory].map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm hover:shadow-2xl transition cursor-pointer group"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <div className="w-full h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-lg overflow-hidden mb-4 relative">
                    {/* Placeholder que só aparece se a imagem não carregar */}
                    <div className="w-full h-full flex items-center justify-center absolute inset-0">
                      <span className="text-4xl">
                        {item.src.includes('tv') ? '📺' : 
                         item.src.includes('teatro') ? '🎭' : 
                         item.src.includes('shows') ? '🎤' : '🎓'}
                      </span>
                    </div>
                    
                    {/* Imagem real - se existir */}
                    <img 
                      src={item.src} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        // Se a imagem não carregar, mostra apenas o placeholder
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-amber-300 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Aviso sobre imagens */}
            <div className="mt-12 p-4 bg-gray-800/30 rounded-lg text-center">
              <p className="text-amber-300 mb-2">⚠️ As imagens ainda não foram carregadas</p>
              <p className="text-gray-400 text-sm">
                Para ver as imagens reais, faça upload delas na pasta <code>public/images/</code> conforme a estrutura indicada.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Modal para imagem ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-amber-400 z-10 bg-gray-800 rounded-full p-2"
            >
              ✕ Fechar
            </button>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="w-full h-96 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Tenta mostrar a imagem, se não existir mostra placeholder */}
                <img 
                  src={selectedImage} 
                  alt="Imagem ampliada"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="text-center absolute">
                  <span className="text-6xl mb-4">
                    {selectedImage.includes('tv') ? '📺' : 
                     selectedImage.includes('teatro') ? '🎭' : 
                     selectedImage.includes('shows') ? '🎤' : '🎓'}
                  </span>
                  <p className="text-gray-300 text-lg mb-2">Imagem: {selectedImage.split('/').pop()}</p>
                  <p className="text-gray-500 text-sm">Faça upload desta imagem em public/images/</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold hover:bg-amber-400 transition disabled:opacity-50"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Fazendo Upload...' : '📸 Fazer Upload Agora'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
