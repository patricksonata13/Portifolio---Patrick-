import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900">🎭 Patrick Sonata</h1>
        <p className="text-lg text-gray-600 mt-2">
          Roteirista | Comediante | Criador de Histórias
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Image
            src="/trajeto1.png"
            alt="Trajetória Parte 1"
            width={600}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Image
            src="/trajeto2.png"
            alt="Trajetória Parte 2"
            width={600}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Image
            src="/pablo_luisao.png"
            alt="Pablo & Luisão"
            width={600}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Image
            src="/zorra.png"
            alt="Zorra"
            width={600}
            height={800}
            className="rounded-lg"
          />
        </div>
        {/* Adicione os outros projetos seguindo o mesmo padrão */}
      </section>

      <footer className="text-center text-gray-500 mt-12">
        © 2025 Patrick Sonata - Todos os direitos reservados
      </footer>
    </main>
  );
}
