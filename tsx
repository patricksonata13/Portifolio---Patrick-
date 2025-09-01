export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        
        {/* Seu Nome */}
        <h1 className="text-5xl font-bold mb-6 text-amber-400">
          Patrick Sonata
        </h1>
        
        {/* Sua Profissão */}
        <p className="text-xl text-gray-300 mb-8">
          Desenvolvedor | Escritor na TV Globo | Comediante
        </p>
        
        {/* Conteúdo Principal */}
        <div className="max-w-2xl mx-auto">
          
          {/* Créditos da TV */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-4">
              🎭 TV Globo
            </h2>
            <p className="text-lg mb-2">
              <strong>Humor Negro</strong> - Escritor
            </p>
            <p className="text-lg">
              <strong>Zorra</strong> - Equipe de Escritores
            </p>
          </div>
          
          {/* Mensagem Pessoal */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-lg mb-4">
              Da <strong className="text-amber-300">Cidade de Deus</strong> para o mundo, 
              criando conteúdo que une tecnologia e humor.
            </p>
            <p className="text-gray-400">
              Portfólio em desenvolvimento - Em breve mais novidades!
            </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
