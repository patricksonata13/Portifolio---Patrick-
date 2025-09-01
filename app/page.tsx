'use client'
import { useState } from "react"

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header de Navegação */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-700">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-amber-400">Patrick Sonata</h1>
            
            <div className="hidden md:flex space-x-6">
              {['inicio', 'trajetoria', 'tv', 'teatro', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`px-4 py-2 rounded-full transition ${
                    activeSection === item
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Seção Hero */}
      {activeSection === 'inicio' && (
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Ator & Roteirista
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              20 anos transformando humor em arte, da Cidade de Deus para o mundo
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">🎬 TV Globo</h3>
                <p>Roteirista em Zorra e Humor Negro</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">🎭 Teatro</h3>
                <p>Indicado ao Prêmio Shell 2022</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">✍️ Roteiro</h3>
                <p>Pablo & Luisão (Globoplay 2025)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Trajetória */}
      {activeSection === 'trajetoria' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-amber-400 mb-8">Minha Trajetória</h2>
            
            <div className="space-y-6 text-lg">
              <p>
                Patrick Sonata é um ator e comediante carioca, cria da <strong className="text-amber-300">Cidade de Deus</strong>. 
                Com 36 anos, tem em sua trajetória <strong>20 anos dedicados ao humor e ao teatro</strong>.
              </p>
              
              <p>
                Iniciou sua vida artística na escola municipal Luiz Gonzaga, na comunidade. 
                Estudou em projeto social, foi dirigido pelo grande e saudoso <strong>Cico Caseira</strong>, 
                com quem aprendeu muito sobre comédia.
              </p>
              
              <p>
                Atualmente, faz parte do <strong>Coletivo Bonobando</strong>, com quem circulou com os espetáculos 
                "Cidade Correria" e "Jongo Mamulengo".
              </p>

              <div className="bg-gray-800/50 p-6 rounded-2xl mt-8">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">🎓 Formação</h3>
                <ul className="space-y-2">
                  <li>• Palhaçaria Clássica com Márcio Libar</li>
                  <li>• Oficina de Roteiro com Maurício Rizzo</li>
                  <li>• Teatro de Anônimo com João Carlos Artigos e Fábio Freitas</li>
                  <li>• Direção Teatral com Adriana Schneider (UFRJ)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção TV */}
      {activeSection === 'tv' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-amber-400 mb-8">Trabalhos na TV</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">📺 Zorra (2019-2021)</h3>
                <p className="text-gray-300 mb-4">Roteirista - TV Globo</p>
                <p className="text-sm text-gray-400">Redação Final: Marcius Melhem, Celso Taddei, Gabriela Amaral</p>
                <p className="text-sm text-gray-400 mt-2">Equipe de roteiro: Bia Braune, Cesar Cardoso, Henrique Tavares, Marcelo Martinez, Patrick Sonata, e outros</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🎭 Humor Negro (2023)</h3>
                <p className="text-gray-300 mb-4">Participação Especial - Globoplay</p>
                <p className="text-sm text-gray-400">Episódio: "My Sista, Meus Brother" - T1:E5</p>
                <p className="text-sm text-gray-400">Direção: Rodrigo França | Criação: Val Benvindo</p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🎬 Pablo & Luisão (2025)</h3>
                <p className="text-gray-300 mb-4">Roteirista - Globoplay e TV Globo</p>
                <p className="text-sm text-gray-400">Autores: Paulo Vieira, Maurício Rizzo | Direção: João Gomez</p>
                <p className="text-sm text-gray-400">Equipe de roteiro: Bia Braune, Cafto Mainier, Nathalia Cruz, Patrick Sonata</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Teatro */}
      {activeSection === 'teatro' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-amber-400 mb-8">Teatro e Espetáculos</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🏆 Pelada - A Hora da Gaymada (2022)</h3>
                <p className="text-gray-300 mb-2">Indicado ao 34º Prêmio Shell de Teatro</p>
                <p className="text-sm text-gray-400">Direção: Orlando Caldeira | Roteiro: Patrick Sonata</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🎭 Cidade Correria (2016-2018)</h3>
                <p className="text-gray-300 mb-2">Coletivo Bonobando</p>
                <p className="text-sm text-gray-400">Direção: Adriana Schneider e Lucas Oradovschi</p>
                <p className="text-sm text-gray-400">Elenco: Daniela Joyce, Hugo Bernardo, Igor da Silva, Jardila Baptista, Karla Suarez, Livia Lago, Marcelo Magano, Patrick Sonata, Thiago Rosa</p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🧵 Jongo Mamulengo (2017-2023)</h3>
                <p className="text-gray-300 mb-2">Espetáculo Infanto-Juvenil</p>
                <p className="text-sm text-gray-400">Direção: Adriana Schneider e Lucas Oradovschi</p>
                <p className="text-sm text-gray-400">Elenco: Hugo Bernardo, Patrick Sonata, Lívia Lado, Marcelo Magano</p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🎤 Show de Humor (2023)</h3>
                <p className="text-gray-300 mb-2">"Pra Provar Que Eu Não Minto"</p>
                <p className="text-sm text-gray-400">Direção: Paulo Costa | Roteiro: Patrick Sonata e Tamires Gomes</p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">🎭 Originais da Comédia (2022)</h3>
                <p className="text-gray-300 mb-2">Show de Humor - Cidade de Deus</p>
                <p className="text-sm text-gray-400">Roteiro e Direção: Patrick Sonata e Marcelo Magano</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Contato */}
      {activeSection === 'contato' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-amber-400 mb-8">Contato</h2>
            
            <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-300 mb-4">Informações</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                      <strong>Email:</strong> patrick12reis@gmail.com
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                      <strong>Telefone:</strong> (21) 98397-6299
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                      <strong>Localização:</strong> Rio de Janeiro - RJ
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-amber-300 mb-4">Redes Sociais</h3>
                  <div className="space-y-2">
                    <p>📷 Instagram: @PatrickSonata</p>
                    <p>🐦 Twitter: @PatrickSonata</p>
                    <p>💼 LinkedIn: Patrick Sonata</p>
                    <p>🎬 YouTube: @PatrickSonata</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-400/10 rounded-2xl">
                <h3 className="text-xl font-bold text-amber-300 mb-4">Disponível para:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-center p-3 bg-gray-700 rounded-lg">📝 Roteiro</p>
                  <p className="text-center p-3 bg-gray-700 rounded-lg">🎭 Atuação</p>
                  <p className="text-center p-3 bg-gray-700 rounded-lg">🎤 Stand-up</p>
                  <p className="text-center p-3 bg-gray-700 rounded-lg">💼 Workshops</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© 2024 Patrick Sonata. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Desenvolvido com Next.js e Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
