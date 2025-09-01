export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-amber-400">
          Patrick Sonata
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Desenvolvedor | Escritor na TV Globo | Comediante
        </p>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg mb-6">
            🎭 <strong>Humor Negro</strong> e <strong>Zorra</strong> - TV Globo
          </p>
          <p className="text-lg mb-8">
            💻 Desenvolvedor Full Stack | Next.js Specialist
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-amber-300 mb-2">
                Em Breve: Portfólio Completo
              </h2>
              <p className="text-gray-300">
                Meu portfólio profissional está em construção e em breve estará repleto de projetos incríveis!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
